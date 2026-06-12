package com.cok.backend.domain.survey.dto;

import java.util.List;

public record QuestionResponse(List<QuestionItem> questions) {
}
