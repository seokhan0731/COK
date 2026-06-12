package com.cok.backend.domain.github.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RepositoryResponseFromGit(@JsonProperty("name") String repositoryName
        , @JsonProperty("description") String repositoryDescription) {
}
