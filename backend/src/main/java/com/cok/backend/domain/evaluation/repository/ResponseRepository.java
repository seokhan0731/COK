package com.cok.backend.domain.evaluation.repository;

import com.cok.backend.domain.evaluation.entity.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseRepository extends JpaRepository<UserResponse, Long> {
}
