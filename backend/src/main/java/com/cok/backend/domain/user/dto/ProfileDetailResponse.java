package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.AttendStatus;
import com.cok.backend.domain.user.enums.BaekjoonTier;
import com.cok.backend.domain.user.enums.Grade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProfileDetailResponse(
        String name,
        Integer birthYear,
        Grade currentGrade,
        AttendStatus attendStatus,
        BaekjoonTier algorithmLevel,
        String githubId,
        String imageUrl,
        List<Long> certifications
) {
}
