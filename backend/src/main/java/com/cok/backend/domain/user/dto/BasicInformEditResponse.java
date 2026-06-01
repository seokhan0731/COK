package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.AttendStatus;
import com.cok.backend.domain.user.enums.Grade;

public record BasicInformEditResponse(
        String name,
        Integer birthYear,
        AttendStatus attendStatus,
        Grade currentGrade,
        String imageUrl) {
}
