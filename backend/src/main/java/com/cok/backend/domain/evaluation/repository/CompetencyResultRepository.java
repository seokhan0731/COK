package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.CompetencyResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetencyResultRepository extends JpaRepository<CompetencyResult, Long> {
}
