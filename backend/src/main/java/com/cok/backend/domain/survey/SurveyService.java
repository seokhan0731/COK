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
