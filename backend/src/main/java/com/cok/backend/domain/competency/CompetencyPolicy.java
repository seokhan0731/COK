package com.cok.backend.domain.competency;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum CompetencyPolicy {
    IMPLEMENTATION(1L, 400, 6,
            0.98, 0.02, 0.0),

    COLLABORATION(2L, 300, 0,
            1.00, 0.0, 0.0),

    TREND(3L, 300, 8,
            0.95, 0.05, 0.0),

    CS_KNOWLEDGE(4L, 400, 24,
            0.90, 0.10, 0.0),

    ALGORITHM(5L, 300, 13,
            0.25, 0.05, 0.70),

    INFRA_STRUCTURE(6L, 300, 28,
            0.95, 0.05, 0.0);

    private final Long competencyId;
    private final int maxSurveyScore;
    private final int maxCertificationScore;
    private final double surveyWeight;
    private final double certificationWeight;
    private final double baekjoonWeight;

    public static CompetencyPolicy from(Long id) {
        return Arrays.stream(values())
                .filter(policy -> policy.getCompetencyId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("정의되지 않은 역량 id입니다. " + id));
    }


    public double calculateFinalScore(double surveyScore, double certificationSCore,
                                      boolean isUnrated, double baekjoonScore) {
        //재정규화 필요
        if (isUnrated) {

            double validWeightSum = this.surveyWeight + this.certificationWeight;

            double normalizedSurveyWeight = this.surveyWeight / validWeightSum;
            double normalizedCertificationWeight = this.certificationWeight / validWeightSum;

            return (surveyScore * normalizedSurveyWeight) + (certificationSCore * normalizedCertificationWeight);
        }

        return (surveyScore * surveyWeight)
                + (certificationSCore * certificationWeight)
                + (baekjoonScore * baekjoonWeight);
    }

}
