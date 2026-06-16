package com.cok.backend.domain.certification.entity;

import com.cok.backend.domain.competency.MasterCompetency;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "certification_competency_score")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CertificationScore {
    @Id
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certification_id", nullable = false)
    MasterCertification certification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id", nullable = false)
    MasterCompetency competency;

    @Column(name = "score")
    Long score;
}
