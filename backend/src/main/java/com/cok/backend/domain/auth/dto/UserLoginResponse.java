package com.cok.backend.domain.auth.dto;

import com.cok.backend.domain.user.enums.UserRole;

public record UserLoginResponse(String accessToken, UserRole role) {
}
