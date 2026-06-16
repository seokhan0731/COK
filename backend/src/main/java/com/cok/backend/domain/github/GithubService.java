package com.cok.backend.domain.github;

import com.cok.backend.domain.github.dto.GitTreeResponse;
import com.cok.backend.domain.github.dto.RepositoryResponseForUser;
import com.cok.backend.domain.github.dto.RepositoryResponseFromGit;
import com.cok.backend.domain.github.dto.TreeNode;
import com.cok.backend.domain.survey.dto.RepositorySelectRequest;
import com.cok.backend.domain.survey.dto.TechSkillResponse;
import com.cok.backend.domain.tech_skill.TechSkill;
import com.cok.backend.domain.tech_skill.analyzer.BuildGradleAnalyzer;
import com.cok.backend.domain.tech_skill.analyzer.PackageJsonAnalyzer;
import com.cok.backend.domain.tech_skill.analyzer.RequirementsAnalyzer;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Slf4j
public class GithubService {
    private final GithubClient githubClient;
    private final UserRepository userRepository;
    private final PackageJsonAnalyzer packageJsonAnalyzer;
    private final BuildGradleAnalyzer buildGradleAnalyzer;
    private final RequirementsAnalyzer requirementsAnalyzer;

    @Value("${github.token}")
    private String accessToken;

    public RepositoryResponseForUser getUserRepositories(Long userId) {
        User userWhoRequest = findUserOrThrow(userId);
        String header = "Bearer " + accessToken;
        List<RepositoryResponseFromGit> responseForGit = githubClient.getRepositories(userWhoRequest.getGithubId(), header);

        return new RepositoryResponseForUser(responseForGit);
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    }

    public TechSkillResponse getUsedSkill(RepositorySelectRequest selected, Long userId) {
        User userWhoRequest = findUserOrThrow(userId);
        String header = "Bearer " + accessToken;
        List<String> repositories = selected.repository();

        Set<TechSkill> techSkills = new HashSet<>();
        for (String repository : repositories) {
            GitTreeResponse tree = githubClient.getGitTree(userWhoRequest.getGithubId(), repository, header);

            techSkills.addAll(extractTechSkills(userWhoRequest.getGithubId(), repository, tree, header));
        }

        List<TechSkill> detectedSkill = new ArrayList<>(techSkills);
        List<TechSkill> additionalSkill = TechSkill.getManualSelectSkills();

        return new TechSkillResponse(detectedSkill, additionalSkill);
    }

    private Set<TechSkill> extractTechSkills(String gitId, String repository, GitTreeResponse response, String header) {
        String accept = "application/vnd.github.v3.raw";
        Set<TechSkill> techSkills = new HashSet<>();

        for (TreeNode node : response.tree()) {
            String filePath = node.path();
            String fileName = Paths.get(filePath)
                    .getFileName().toString();

            switch (fileName) {
                case "package.json" -> {
                    String content = githubClient.getFileContents(gitId, repository, filePath, header, accept);
                    techSkills.addAll(packageJsonAnalyzer.analyze(content));
                }
                case "requirements.txt" -> {
                    String content = githubClient.getFileContents(gitId, repository, filePath, header, accept);
                    techSkills.addAll(requirementsAnalyzer.analyze(content));
                }
                case "build.gradle",
                     "build.gradle.kts" -> {
                    String content = githubClient.getFileContents(gitId, repository, filePath, header, accept);
                    techSkills.addAll(buildGradleAnalyzer.analyze(content));
                }
                case "docker-compose.yml", "docker-compose.yaml" -> techSkills.add(TechSkill.DOCKER);
                case "Makefile" -> techSkills.add(TechSkill.MAKE);
                case "FreeRTOSConfig.h" -> techSkills.add(TechSkill.FREERTOS);
            }

            if (fileName.endsWith(".tf")) {
                techSkills.add(TechSkill.TERRAFORM);
            }
            if (fileName.endsWith(".sol")) {
                techSkills.add(TechSkill.SOLIDITY);
            }
            if (fileName.endsWith(".ino")) {
                techSkills.add((TechSkill.ARDUINO));
            }
        }
        return techSkills;
    }
}
