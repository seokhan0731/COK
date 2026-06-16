package com.cok.backend.domain.result.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ResultOverviewResponse(
        ResultSessionItem session,
        @JsonProperty("competency_results") List<CompetencyItem> competencies,
        @JsonProperty("job_results") List<JobItem> jobs,
        @JsonProperty("posting_results") List<ResultPostingItem> postings
) {
}
