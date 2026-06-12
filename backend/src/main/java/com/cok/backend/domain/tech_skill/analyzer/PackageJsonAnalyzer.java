package com.cok.backend.domain.tech_skill.analyzer;

import com.cok.backend.domain.tech_skill.TechSkill;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
public class PackageJsonAnalyzer implements FileAnalyzer {

    //문자열 파일을 Json처럼 사용하기 위해
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final List<String> DEPENDENCY_SECTIONS = List.of(
            "dependencies",
            "devDependencies",
            "peerDependencies",
            "optionalDependencies");

    /**
     * package.json 기술스택 추출
     * 파일을 json형태로 사용하여, key값만을 서비스 내 기술 스택과 비교
     *
     * @param content Github에서 받은 파일 내용
     * @return 서비스 범위 내, 사용한 기술 Set
     */
    @Override
    public Set<TechSkill> analyze(String content) {
        Set<TechSkill> techSkills = new HashSet<>();

        try {
            JsonNode root = OBJECT_MAPPER.readTree(content);
            for (String section : DEPENDENCY_SECTIONS) {
                JsonNode node = root.get(section);

                if (node == null || !node.isObject()) {
                    continue;
                }

                Iterator<String> keys = node.fieldNames();

                while (keys.hasNext()) {
                    String dependency = keys.next();
                    techSkills.addAll(TechSkill.from(dependency));
                }
            }
        } catch (Exception e) {
            log.error("package.json 오류", e);
        }
        return techSkills;
    }
}
