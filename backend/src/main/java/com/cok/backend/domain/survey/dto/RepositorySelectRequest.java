package com.cok.backend.domain.survey.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record RepositorySelectRequest(@JsonProperty("selected_repos") List<String> repository) {
}
