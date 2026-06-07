package com.cok.backend.domain.evaluation;

import com.cok.backend.domain.evaluation.dto.AnswerItem;
import com.cok.backend.domain.evaluation.dto.AnswersRequest;
import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.evaluation.entity.UserResponse;
import com.cok.backend.domain.evaluation.repository.ResponseRepository;
import com.cok.backend.domain.evaluation.repository.SessionRepository;
import com.cok.backend.domain.survey.entity.Option;
import com.cok.backend.domain.survey.entity.Question;
import com.cok.backend.domain.survey.repository.OptionRepository;
import com.cok.backend.domain.survey.repository.QuestionRepository;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    /**
     * 사용자 설문 응답값 저장
     * 요청 dto로 각 객체의 id만 전달되기 때문에, 매번 id를 통해 객체를 가져오는건 SELECT문을 날리기에 오버헤드가 심할 것이라 생각
     * 이에 대한 해결책으로 프록시 사용, 조회를 안 한채로 PK인 id값만을 알고 있기에, 추후 DB에 id값을 추가할 때 문제 X
     * 또한 모든 응답값을 하나의 List로 묶은 뒤, saveAll을 통해 저장하기에,
     * for문을 순회할 때마다 저장하는 것보다 효율적인 메모리 관리 등의 이점 존재
     *
     * @param request 모든 설문에 대한 응답값
     * @param userId  설문을 수행한 유저의 id
     */
    @Transactional
    public void submitAnswers(AnswersRequest request, Long userId) {
        List<UserResponse> allResponses = new ArrayList<>();
        User userWhoRequest = findUserOrThrow(userId);

        SurveySession newSession = SurveySession.builder()
                .newUser(userWhoRequest)
                .build();

        for (AnswerItem answer : request.answers()) {
            Question questionProxy = questionRepository.getReferenceById(answer.questionId());

            UserResponse newResponse = null;
            if (answer.isMulti()) {
                Option optionProxy = optionRepository.getReferenceById(answer.optionId());
                newResponse = UserResponse.builder()
                        .session(newSession)
                        .question(questionProxy)
                        .option(optionProxy).build();
            }
            //주관식인 경우
            else if (answer.isEssay()) {
                newResponse = UserResponse.builder()
                        .session(newSession)
                        .question(questionProxy)
                        .essayAnswer(answer.essayAnswer())
                        .build();
            }
            else {
                throw new IllegalArgumentException("객관식/주관식 값이 모두 없음 questionId" + answer.questionId());
            }
            allResponses.add(newResponse);
        }


        sessionRepository.save(newSession);
        responseRepository.saveAll(allResponses);
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    }
}
