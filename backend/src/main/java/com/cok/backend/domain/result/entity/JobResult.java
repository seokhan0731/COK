package com.cok.backend.domain.result.entity;

import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.job.MasterJob;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "job_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobResult {

    //직무 추천 가중치
    private static final double EXPERIENCE_WEIGHT = 0.4;
    private static final double COMPETENCY_WEIGHT = 0.6;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_result_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    SurveySession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    MasterJob job;

    @Column(name = "competency_score", nullable = false)
    Double competencyScore;

    @Column(name = "experience_score", nullable = false)
    Double experienceScore;

    @Column(name = "total_score", nullable = false)
    Double totalScore;

    @Builder
    public JobResult(SurveySession session, MasterJob job, Double competencyScore, Double experienceScore) {
        this.session = session;
        this.job = job;
        this.competencyScore = competencyScore;
        this.experienceScore = experienceScore;
        this.totalScore = competencyScore * COMPETENCY_WEIGHT + experienceScore * EXPERIENCE_WEIGHT;
    }
}
