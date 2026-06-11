package com.cok.backend.domain.tech_skill.analyzer;

import com.cok.backend.domain.tech_skill.TechSkill;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

@Component
@Slf4j
public class BuildGradleAnalyzer implements FileAnalyzer {


    /**
     * build.gradle 문자열에서 contains를 통해 기술스택 추가
     * TechSkill의 from을 재사용하고자 했으나, 정규식 파싱 등의 로직이 개발 시간 대비 너무 과해지기에 contains 사용
     *
     * @param content Github에서 받은 파일 내용
     * @return 서비스 범위 내, 사용한 기술 Set
     */
    @Override
    public Set<TechSkill> analyze(String content) {
        Set<TechSkill> techSkills = new HashSet<>();

        try {
            String lowerContent = content.toLowerCase();

            for (TechSkill techSkill : TechSkill.values()) {
                for (String alias : techSkill.getAliases()) {
                    if (lowerContent.contains(alias.toLowerCase())) {
                        techSkills.add(techSkill);
                        //이미 추출됐으면 더 루프를 순회할 필요가 없기에
                        break;
                    }
                }
            }
        } catch (Exception e) {
            log.error("build.gradle 오류", e);
        }
        return techSkills;
    }


}
