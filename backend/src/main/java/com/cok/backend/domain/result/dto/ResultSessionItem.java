package com.cok.backend.domain.result.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record ResultSessionItem(@JsonProperty("session_id") Long sessionId,
                                @JsonProperty("user_id") Long userId,
                                @JsonProperty("created_at")
                                @JsonFormat(shape = JsonFormat.Shape.STRING,
                                        pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
                                LocalDateTime createdAt) {
}
