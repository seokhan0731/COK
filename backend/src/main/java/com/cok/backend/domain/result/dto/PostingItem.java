package com.cok.backend.domain.result.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PostingItem(String companyName,
                          @JsonProperty("title") String title,
                          @JsonProperty("math") Float similarity,
                          String postingUrl) {
}
