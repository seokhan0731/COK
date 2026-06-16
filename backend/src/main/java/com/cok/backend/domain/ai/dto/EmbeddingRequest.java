package com.cok.backend.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EmbeddingRequest(@JsonProperty("essay_answer") String essayAnswer) {
}
