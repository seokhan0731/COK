package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.UserRole;

public record ProfileCreateResponse(String accessToken, UserRole currentRole) {
}
