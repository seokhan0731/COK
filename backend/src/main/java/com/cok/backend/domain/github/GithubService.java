package com.cok.backend.domain.github;

import com.cok.backend.domain.github.dto.RepositoryResponseForUser;
import com.cok.backend.domain.github.dto.RepositoryResponseFromGit;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GithubService {
    private final GithubClient githubClient;
    private final UserRepository userRepository;

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
}
