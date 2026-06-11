package com.cok.backend.domain.github;

import com.cok.backend.domain.github.dto.GitTreeResponse;
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

    @GetMapping(value = "/repos/{username}/{repository}/git/trees/main?recursive=1")
    GitTreeResponse getGitTree(@PathVariable String username, @PathVariable String repository,
                               @RequestHeader("Authorization") String accessToken);

    @GetMapping(value = "/repos/{username}/{repository}/contents/{path}")
    String getFileContents(@PathVariable String username, @PathVariable String repository,
                           @PathVariable String path, @RequestHeader("Authorization") String accessToken,
                           @RequestHeader("Accept") String accept);
}
