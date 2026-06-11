package com.cok.backend.domain.result.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record JobItem(Long jobId,
                      @JsonProperty("match") Double totalScore) {
}
