package com.cok.backend.domain.github.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GitTreeResponse(List<TreeNode> tree) {
}
