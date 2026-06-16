package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<UserResponse, Long> {

    @Query("SELECT r FROM UserResponse r WHERE r.session.id =:sessionId AND r.vector IS NOT NULL ")
    Optional<UserResponse> findBySessionIdWithVector(@Param("sessionId") Long sessionId);
}
