package com.cok.backend.domain.result.entity;

import com.cok.backend.domain.competency.MasterCompetency;
import com.cok.backend.domain.evaluation.entity.SurveySession;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "competency_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompetencyResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "competency_result_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    SurveySession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id", nullable = false)
    MasterCompetency competency;

    @Column(name = "total_score", nullable = false)
    Double totalScore;


    @Builder
    public CompetencyResult(SurveySession session, MasterCompetency competency, Double totalScore) {
        this.session = session;
        this.competency = competency;
        this.totalScore = totalScore;
    }
}
