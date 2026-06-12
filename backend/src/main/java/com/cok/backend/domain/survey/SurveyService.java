package com.cok.backend.domain.survey;

import com.cok.backend.domain.survey.dto.OptionItem;
import com.cok.backend.domain.survey.dto.QuestionItem;
import com.cok.backend.domain.survey.dto.QuestionResponse;
import com.cok.backend.domain.survey.entity.Option;
import com.cok.backend.domain.survey.entity.Question;
import com.cok.backend.domain.survey.repository.OptionRepository;
import com.cok.backend.domain.survey.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SurveyService {
    private final OptionRepository optionRepository;
    private final QuestionRepository questionRepository;


    /**
     * 설문 문항 및 옵션 조회
     * optionRepository에서 join fetch를 조회보단, 상대적으로 개수가 적은 questionRepository에서 join fetch를 통해 조회
     * 주관식 문항의 경우, 연관된 마스터 역량이 없기에, 초기값을 null로 설정 후, 객관식인 경우에만 question.getId()를 통해
     * 응답값을 채우도록 구현
     *
     * @return 모든 설문 문항과 모든 옵션을 담은 dto(QUestionResponse)
     */
    public QuestionResponse getAllQuestionsAndOptions() {
        List<QuestionItem> questionItems = new ArrayList<>();

        List<Question> questions = questionRepository.findAllWithOptions();
        for (Question question : questions) {
            Long questionId = question.getId();
            List<OptionItem> optionInfos = new ArrayList<>();
            List<Option> options = question.getOptions();

            for (Option option : options) {
                optionInfos.add(OptionItem.fromOption(option, questionId));
            }

            Long competencyId = null;
            if (!isCompetencyNull(question)) {
                competencyId = question.getCompetency().getId();
            }
            questionItems.add(new QuestionItem(questionId, competencyId, question.getContent()
                    , question.getType(), optionInfos));
        }

        return new QuestionResponse(questionItems);
    }

    private boolean isCompetencyNull(Question question) {
        return question.getType() == QuestionType.ESSAY;
    }
}
