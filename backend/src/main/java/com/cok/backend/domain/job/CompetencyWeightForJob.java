package com.cok.backend.domain.job;

public record CompetencyWeightForJob(double implementationWeight,
                                     double collaborationWeight,
                                     double trendWeight,
                                     double knowledgeWeight,
                                     double algorithmWeight,
                                     double infraWeight) {
}
