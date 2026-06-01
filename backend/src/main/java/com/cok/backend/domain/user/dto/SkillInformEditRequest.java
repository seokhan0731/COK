package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.BaekjoonTier;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SkillInformEditRequest(
        @NotNull(message = "알고리즘 레벨정보가 누락됐습니다.") BaekjoonTier algorithmLevel,
        @NotBlank(message = "Github 아이디가 누락됐습니다.") String githubId,
        List<Long> certifications
) {
}
