package com.cok.backend.domain.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record UserLoginRequest(
        @JsonProperty("code") @NotBlank(message = "인가 코드가 누락되었습니다.") String codeForToken) {
}
