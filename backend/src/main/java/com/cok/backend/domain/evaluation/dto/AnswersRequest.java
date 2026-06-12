package com.cok.backend.domain.evaluation.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record AnswersRequest(@NotEmpty(message = "리스트 자체가 누락됐습니다.") List<AnswerItem> answers) {
}
