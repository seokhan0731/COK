package com.cok.backend.domain.survey.dto;

import com.cok.backend.domain.tech_skill.TechSkill;

import java.util.List;

public record TechSkillResponse(
        List<TechSkill> detected,
        List<TechSkill> additional) {
}
