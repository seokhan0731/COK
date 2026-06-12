package com.cok.backend.domain.github.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record RepositoryResponseForUser(
        @JsonProperty("repos") List<RepositoryResponseFromGit> repositoryInform) {
}
