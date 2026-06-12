package com.cok.backend.domain.tech_skill.analyzer;

import com.cok.backend.domain.tech_skill.TechSkill;

import java.util.Set;

public interface FileAnalyzer {

    Set<TechSkill> analyze(String content);
}
