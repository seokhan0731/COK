package com.cok.backend.domain.tech_skill.analyzer;

import com.cok.backend.domain.tech_skill.TechSkill;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class RequirementsAnalyzer implements FileAnalyzer {

    /**
     * requirements.txt에서 기술스택 추출
     * 각 라인별로, 정규식을 이용하여 기술 스택만 분리
     * torch>=2.0 이런꼴이기에, 정규식을 이용한 split 이 휴 [0]을 패키지 이름으로 사용
     *
     * @param content Github에서 받은 파일 내용
     * @return 서비스 범위 내, 사용한 기술 Set
     */
    @Override
    public Set<TechSkill> analyze(String content) {
        Set<TechSkill> techSkills = new HashSet<>();

        try {
            String[] lines = content.split("\n");

            for (String line : lines) {
                line = line.trim();

                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                String packageName = line.split("[<>=!~]")[0]
                        .trim();

                techSkills.addAll(TechSkill.from(packageName));
            }
        } catch (Exception e) {
            log.error("requirements 오류", e);
        }

        return techSkills;
    }

}
