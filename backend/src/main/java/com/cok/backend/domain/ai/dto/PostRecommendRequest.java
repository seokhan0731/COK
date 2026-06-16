package com.cok.backend.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PostRecommendRequest(
        @JsonProperty("user_vector") float[] userVector,
        @JsonProperty("job_id") Long targetJobId
) {
}
