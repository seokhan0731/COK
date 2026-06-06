package com.cok.backend.domain.survey.dto;

import com.cok.backend.domain.survey.QuestionType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record QuestionItem(
        @JsonProperty("question_id") Long questionId,
        @JsonProperty("competency_id") Long competencyId,
        String content,
        QuestionType type,
        List<OptionItem> options
) {
}
