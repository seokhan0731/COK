package com.cok.backend.domain.result.dto;

import com.cok.backend.domain.competency.CompetencyPolicy;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CompetencyItem(
        CompetencyPolicy skill,
        @JsonProperty("value") Double totalScore
) {
}
