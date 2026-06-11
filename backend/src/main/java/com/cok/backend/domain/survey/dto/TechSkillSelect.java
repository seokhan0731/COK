package com.cok.backend.domain.survey.dto;

import com.cok.backend.domain.tech_skill.TechSkill;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TechSkillSelect(@JsonProperty("selected_stacks") List<TechSkill> selectedSkills) {
}
