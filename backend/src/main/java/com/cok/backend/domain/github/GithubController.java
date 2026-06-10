package com.cok.backend.domain.github;

import com.cok.backend.domain.github.dto.RepositoryResponseForUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/github")
public class GithubController {
    private final GithubService githubService;

    @GetMapping("/repos")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RepositoryResponseForUser> getUserRepositories(@AuthenticationPrincipal Long userId) {
        RepositoryResponseForUser response = githubService.getUserRepositories(userId);
        return ResponseEntity.ok(response);
    }
}
