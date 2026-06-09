package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.SurveySession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<SurveySession, Long> {
    Optional<SurveySession> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}
