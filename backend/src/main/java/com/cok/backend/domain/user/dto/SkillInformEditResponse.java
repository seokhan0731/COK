package com.cok.backend.domain.user.dto;

import com.cok.backend.domain.user.enums.BaekjoonTier;

import java.util.List;

public record SkillInformEditResponse(BaekjoonTier algorithmLevel,
                                      List<Long> certifications,
                                      String githubId) {
}
