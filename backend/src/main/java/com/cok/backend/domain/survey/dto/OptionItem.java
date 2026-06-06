package com.cok.backend.domain.survey.dto;

import com.cok.backend.domain.survey.entity.Option;
import com.cok.backend.domain.survey.entity.Question;
import com.fasterxml.jackson.annotation.JsonProperty;

public record OptionItem(@JsonProperty("option_id") Long optionId,
                         @JsonProperty("question_id") Long questionId,
                         String content) {

    public static OptionItem fromOption(Option option, Long questionId) {
        return new OptionItem(option.getId(), questionId, option.getContent());
    }
}
