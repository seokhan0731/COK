package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.AttendStatus;
import com.cok.backend.domain.user.enums.BaekjoonTier;
import com.cok.backend.domain.user.enums.Grade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProfileCreateRequest(
        @NotBlank(message = "이름이 누락됐습니다.") String name,
        @NotNull(message = "생년이 누락됐습니다.") Integer birthYear,
        @NotNull(message = "학년정보가 누락됐습니다.") Grade currentGrade,
        @NotNull(message = "재학정보가 누락됐습니다.") AttendStatus attendStatus,
        @NotNull(message = "알고리즘 레벨정보가 누락됐습니다.") BaekjoonTier algorithmLevel,
        @NotBlank(message = "Github 아이디가 누락됐습니다.") String githubId,
        MultipartFile imageFile,
        List<Long> certifications
) {
}
