package com.cok.backend.domain.result.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ResultPostingItem(@JsonProperty("posting_id") Long postingId,
                                @JsonProperty("company_name") String companyName,
                                @JsonProperty("title") String title,
                                @JsonProperty("description") String mainTask,
                                @JsonProperty("match") Float similarity) {
}
