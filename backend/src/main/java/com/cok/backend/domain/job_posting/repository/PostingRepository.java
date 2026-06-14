package com.cok.backend.domain.job_posting.repository;

import com.cok.backend.domain.job_posting.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingRepository extends JpaRepository<JobPosting, Long> {
}
