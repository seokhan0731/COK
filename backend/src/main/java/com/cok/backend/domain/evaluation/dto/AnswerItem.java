package com.cok.backend.domain.evaluation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record AnswerItem(@NotNull(message = "질문 id가 누락됐습니다.") @JsonProperty("question_id") Long questionId,
                         @JsonProperty("option_id") Long optionId,
                         @JsonProperty("essay_answer") String essayAnswer) {

    public boolean isMulti() {
        return this.optionId != null && this.essayAnswer == null;
    }

    public boolean isEssay() {
        return this.optionId == null && this.essayAnswer != null;
    }
}
