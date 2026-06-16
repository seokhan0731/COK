package com.cok.backend.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PostRecommendItem(@JsonProperty("post_id") Long postId,
                                Float similarity,
                                Integer rank) {
}
