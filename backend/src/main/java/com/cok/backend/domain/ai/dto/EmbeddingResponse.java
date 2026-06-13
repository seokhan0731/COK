package com.cok.backend.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record EmbeddingResponse(@JsonProperty("embedding_vector") float[] vector) {
}
