package com.cok.backend.domain.result.dto;

import com.cok.backend.domain.competency.CompetencyPolicy;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record ResultListItem(@JsonProperty("session_id") Long sessionId,
                             @JsonFormat(shape = JsonFormat.Shape.STRING,
                                     pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
                             LocalDateTime createdAt,
                             @JsonProperty("top_job") Long jobId,
                             @JsonProperty("top_competency") CompetencyPolicy topCompetency,
                             @JsonProperty("top_score") double competencyScore) {
}
