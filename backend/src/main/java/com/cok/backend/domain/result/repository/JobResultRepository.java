package com.cok.backend.domain.result.repository;

import com.cok.backend.domain.result.entity.JobResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobResultRepository extends JpaRepository<JobResult, Long> {
    List<JobResult> findTop3BySessionIdOrderByTotalScoreDesc(Long sessionId);
}
