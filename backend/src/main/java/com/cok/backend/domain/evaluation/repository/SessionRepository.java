package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.SurveySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<SurveySession, Long> {
    Optional<SurveySession> findFirstByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT s FROM SurveySession s " +
            "JOIN FETCH s.competencyResults cr " +
            "JOIN FETCH cr.competency " +
            "WHERE s.id = :sessionID")
    Optional<SurveySession> findByIdWithResults(@Param("sessionID") Long sessionID);
}
