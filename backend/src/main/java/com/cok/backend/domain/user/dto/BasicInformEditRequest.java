package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.AttendStatus;
import com.cok.backend.domain.user.enums.Grade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;


public record BasicInformEditRequest(
        @NotBlank(message = "이름이 누락됐습니다.") String name,
        @NotNull(message = "생년이 누락됐습니다.") Integer birthYear,
        @NotNull(message = "재학정보가 누락됐습니다.") AttendStatus attendStatus,
        Grade currentGrade,
        MultipartFile imageFile
) {
}
