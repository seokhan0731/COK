package com.cok.backend.domain.evaluation;

import com.cok.backend.domain.competency.CompetencyPolicy;
import com.cok.backend.domain.competency.CompetencyRepository;
import com.cok.backend.domain.competency.MasterCompetency;
import com.cok.backend.domain.evaluation.dto.AnswerItem;
import com.cok.backend.domain.evaluation.dto.AnswersRequest;
import com.cok.backend.domain.job.JobPolicy;
import com.cok.backend.domain.result.entity.CompetencyResult;
import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.evaluation.entity.UserResponse;
import com.cok.backend.domain.result.repository.CompetencyResultRepository;
import com.cok.backend.domain.evaluation.repository.ResponseRepository;
import com.cok.backend.domain.evaluation.repository.SessionRepository;
import com.cok.backend.domain.survey.dto.TechSkillSelect;
import com.cok.backend.domain.survey.entity.Option;
import com.cok.backend.domain.survey.entity.Question;
import com.cok.backend.domain.survey.repository.OptionRepository;
import com.cok.backend.domain.survey.repository.QuestionRepository;
import com.cok.backend.domain.tech_skill.TechSkill;
import com.cok.backend.domain.tech_skill.TechSkillPolicy;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.enums.BaekjoonTier;
import com.cok.backend.domain.user.repository.UserCertificationRepository;
import com.cok.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EvaluationService {
    private final SessionRepository sessionRepository;
    private final ResponseRepository responseRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final UserCertificationRepository userCertificationRepository;
    private final CompetencyRepository competencyRepository;
    private final CompetencyResultRepository competencyResultRepository;

    private static final double MAX_BAEKJOON_SCORE = 100.0;

    /**
     * 응답값 제출과 동시에, 해당 응답값과 사용자의 서비스 이용전 입력값을 통한 역량 계산 및 저장 지휘
     * 설문 및 자격증 점수 저장이 역량 Id: 점수값의 형태이기에, 최종 점수도 이와 같은 형태로 구현 후,
     * 별도 메소드에서 해당 map을 파싱 후, DB에 일괄 저장하는 구조
     *
     * @param request 응답값 저장을 위한 dto(응답 제출과 함꼐 이루어지기에, 매개 변수 필요)
     * @param userId  session 저장 및 유저의 자격증 정보를 조회하기 위해 필요
     */
    @Transactional
    public Long submitAndCalculateCompetency(AnswersRequest request, Long userId) {
        SurveySession newSession = submitAnswers(request, userId);

        //설문 점수
        Map<Long, Double> surveyScores = calculateSurveyScore(request);

        //자격증 점수
        Map<Long, Double> certificationScores = calculateCompetencyScore(userId);

        //newSession에서 이미 유저를 불러왔기 떄문에, 별도 메소드를 쓰기보단 getUser를 통해 호출
        User user = newSession.getUser();
        BaekjoonTier tier = user.getAlgorithmLevel();
        double baekjoonScore = tier.getScore() / MAX_BAEKJOON_SCORE;
        boolean isUnrated = tier == BaekjoonTier.UNRATED;

        Map<Long, Double> scoreResult = calculateFinalScore(surveyScores, certificationScores, baekjoonScore, isUnrated);

        saveCompetencyResults(newSession, scoreResult);

        return newSession.getId();
    }

    private Map<Long, Double> calculateFinalScore(Map<Long, Double> surveyScores, Map<Long, Double> certificationScores
            , double baekjoonScore, boolean isUnrated) {
        Map<Long, Double> scoreResult = new HashMap<>();

        for (CompetencyPolicy policy : CompetencyPolicy.values()) {
            Long competencyId = policy.getCompetencyId();

            double surveyScore = surveyScores.getOrDefault(competencyId, 0.0);
            double certificationScore = certificationScores.getOrDefault(competencyId, 0.0);
            double finalScore = policy.calculateFinalScore(surveyScore, certificationScore, isUnrated, baekjoonScore);

            scoreResult.put(competencyId, finalScore);
        }
        return scoreResult;
    }

    /**
     * 계산된 역량별 최종 결과값들을 저장
     * 역량: 점수값의 형태로 되어 있기 때문에, 실제로 DB에 저장하기 위해서는 key, value값을 분리하는 작업을 먼저 수행해야함
     * 루프를 순회하며, 매 루프마다 값을 저장하기보단, List를 통해 담은 후, saveAll을 통해 일괄 저장하며, 오버헤드 최소화
     *
     * @param newSession  역량 결과값을 저장할 설문 회차
     * @param scoreResult 역량: 점수 형태의 파싱 전 자료구조(Map)
     */
    private void saveCompetencyResults(SurveySession newSession, Map<Long, Double> scoreResult) {
        List<CompetencyResult> results = new ArrayList<>();

        for (Map.Entry<Long, Double> entry : scoreResult.entrySet()) {
            Long competencyId = entry.getKey();
            double score = entry.getValue();

            MasterCompetency competencyProxy = competencyRepository.getReferenceById(competencyId);

            CompetencyResult newResult = CompetencyResult.builder()
                    .session(newSession)
                    .competency(competencyProxy)
                    .totalScore(score)
                    .build();

            results.add(newResult);
        }
        competencyResultRepository.saveAll(results);
    }

    /**
     * 사용자 설문 응답값 저장
     * 요청 dto로 각 객체의 id만 전달되기 때문에, 매번 id를 통해 객체를 가져오는건 SELECT문을 날리기에 오버헤드가 심할 것이라 생각
     * 이에 대한 해결책으로 프록시 사용, 조회를 안 한채로 PK인 id값만을 알고 있기에, 추후 DB에 id값을 추가할 때 문제 X
     * 또한 모든 응답값을 하나의 List로 묶은 뒤, saveAll을 통해 저장하기에,
     * for문을 순회할 때마다 저장하는 것보다 효율적인 메모리 관리 등의 이점 존재
     *
     * @param request 모든 설문에 대한 응답값
     * @param userId  설문을 수행한 유저의 id
     * @return 생성된 설문 회차 -> 역량 결과값 필드로 사용하고자 반환
     */
    private SurveySession submitAnswers(AnswersRequest request, Long userId) {
        List<UserResponse> allResponses = new ArrayList<>();
        User userWhoRequest = findUserOrThrow(userId);

        SurveySession newSession = SurveySession.builder()
                .newUser(userWhoRequest)
                .build();

        for (AnswerItem answer : request.answers()) {
            Question questionProxy = questionRepository.getReferenceById(answer.questionId());

            UserResponse newResponse = buildUserResponse(answer, newSession, questionProxy);
            allResponses.add(newResponse);
        }

        sessionRepository.save(newSession);
        responseRepository.saveAll(allResponses);

        return newSession;
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    }

    private UserResponse buildUserResponse(AnswerItem answer, SurveySession newSession, Question questionProxy) {
        if (answer.isMulti()) {
            return buildWhenMulti(answer, newSession, questionProxy);
        }
        //주관식인 경우
        else if (answer.isEssay()) {
            return buildWhenEssay(answer, newSession, questionProxy);
        }
        log.error("응답값 null {}", answer.questionId());
        throw new IllegalArgumentException("객관식/주관식 값이 모두 없음 questionId " + answer.questionId());
    }

    private UserResponse buildWhenMulti(AnswerItem answer, SurveySession newSession, Question questionProxy) {
        Option optionProxy = optionRepository.getReferenceById(answer.optionId());
        return UserResponse.builder()
                .session(newSession)
                .question(questionProxy)
                .option(optionProxy).build();
    }

    private UserResponse buildWhenEssay(AnswerItem answer, SurveySession newSession, Question questionProxy) {
        return UserResponse.builder()
                .session(newSession)
                .question(questionProxy)
                .essayAnswer(answer.essayAnswer())
                .build();
    }

    private Map<Long, Double> calculateSurveyScore(AnswersRequest request) {
        List<Long> optionsId = new ArrayList<>();
        for (AnswerItem answer : request.answers()) {
            if (answer.isMulti()) {
                optionsId.add(answer.optionId());
            }
        }

        List<Option> options = optionRepository.findOptionsWithQuestionAndCompetencyByIds(optionsId);

        Map<Long, Double> competencyScores = new HashMap<>();

        for (Option option : options) {
            Long competencyId = option.getQuestion().getCompetency().getId();
            double score = option.getScore().doubleValue();

            double currentScore = competencyScores.getOrDefault(competencyId, 0.0);
            competencyScores.put(competencyId, currentScore + score);
        }

        //여기엔 map으로 역량에 대한 최종 산출값이 나와있는 상황
        return normalizeScoreFromSurvey(competencyScores);
    }

    private Map<Long, Double> normalizeScoreFromSurvey(Map<Long, Double> originScores) {
        Map<Long, Double> normalizedScores = new HashMap<>();
        for (Map.Entry<Long, Double> entry : originScores.entrySet()) {
            Long competencyId = entry.getKey();
            Double originScore = entry.getValue();

            int maxScore = CompetencyPolicy.from(competencyId).getMaxSurveyScore();

            double normalizedScore = originScore / maxScore;

            normalizedScores.put(competencyId, normalizedScore);
        }
        return normalizedScores;
    }

    private Map<Long, Double> calculateCompetencyScore(Long userId) {
        List<CertificationCompetencyProjection> scores = userCertificationRepository.findCompetencyScoresByUserId(userId);

        if (scores.isEmpty()) {
            return new HashMap<>();
        }

        Map<Long, Double> competencyScores = new HashMap<>();

        for (CertificationCompetencyProjection score : scores) {
            Long competencyId = score.getCompetencyId();
            double competencyScore = score.getTotalScore().doubleValue();

            double currentScore = competencyScores.getOrDefault(competencyId, 0.0);
            competencyScores.put(competencyId, currentScore + competencyScore);
        }

        return normalizeScoreFromCertification(competencyScores);
    }

    private Map<Long, Double> normalizeScoreFromCertification(Map<Long, Double> originScores) {
        Map<Long, Double> normalizedScores = new HashMap<>();
        for (Map.Entry<Long, Double> entry : originScores.entrySet()) {
            Long competencyId = entry.getKey();
            Double originScore = entry.getValue();

            int maxScore = CompetencyPolicy.from(competencyId).getMaxCertificationScore();

            //협업은 자격증 점수 0이니까
            if (maxScore == 0) {
                continue;
            }

            double normalizedScore = originScore / maxScore;

            normalizedScores.put(competencyId, normalizedScore);
        }
        return normalizedScores;
    }

}
