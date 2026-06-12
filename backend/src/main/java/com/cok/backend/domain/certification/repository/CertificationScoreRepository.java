package com.cok.backend.domain.certification.repository;

import com.cok.backend.domain.certification.entity.CertificationScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationScoreRepository extends JpaRepository<CertificationScore, Long> {
}
