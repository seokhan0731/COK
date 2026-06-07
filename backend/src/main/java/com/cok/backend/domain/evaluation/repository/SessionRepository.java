package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.SurveySession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<SurveySession, Long> {
}
