package com.cok.backend.domain.github;

import com.cok.backend.domain.github.dto.RepositoryResponseFromGit;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "githubClient", url = "https://api.github.com")
public interface GithubClient {
    @GetMapping(value = "/users/{username}/repos")
    List<RepositoryResponseFromGit> getRepositories(@PathVariable String username,
                                                    @RequestHeader("Authorization") String accessToken);
}
