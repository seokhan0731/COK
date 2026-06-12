package com.cok.backend.domain.job;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JobPolicy {
    BACKEND(1L, 24.0, new CompetencyWeightForJob(
            0.35, 0.10, 0.05,
            0.25, 0.15, 0.10)),
    FRONTEND(2L, 19.0, new CompetencyWeightForJob(
            0.35, 0.20, 0.20,
            0.10, 0.10, 0.05
    )),
    MOBILE(3L, 15.0, new CompetencyWeightForJob(
            0.35, 0.10, 0.25,
            0.15, 0.10, 0.05
    )),
    AI_ML(4L, 17.0, new CompetencyWeightForJob(
            0.25, 0.05, 0.15,
            0.10, 0.35, 0.10
    )),
    DEVOPS(5L, 13.0, new CompetencyWeightForJob(
            0.10, 0.15, 0.10,
            0.30, 0.15, 0.25
    )),
    DATA(6L, 16.0, new CompetencyWeightForJob(
            0.15, 0.05, 0.10,
            0.30, 0.15, 0.25
    )),
    MANAGEMENT(7L, 0.0, new CompetencyWeightForJob(
            0.15, 0.40, 0.25,
            0.05, 0.05, 0.10
    )),
    SYSTEM_EMBEDDED(8L, 15.0, new CompetencyWeightForJob(
            0.25, 0.10, 0.05,
            0.35, 0.15, 0.10
    )),
    GRAPHICS(9L, 18.0, new CompetencyWeightForJob(
            0.25, 0.05, 0.10,
            0.15, 0.35, 0.10
    )),
    BLOCKCHAIN(10L, 15.0, new CompetencyWeightForJob(
            0.10, 0.05, 0.15,
            0.35, 0.25, 0.10
    )),
    MEDIA(11L, 15.0, new CompetencyWeightForJob(
            0.25, 0.05, 0.10,
            0.15, 0.35, 0.10
    ));

    private final Long jobId;
    private final double maxExperienceScore;
    private final CompetencyWeightForJob weight;
}
