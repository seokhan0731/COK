package com.cok.backend.domain.job_posting.repository;

import com.cok.backend.domain.job_posting.entity.WantedTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WantedTagRepository extends JpaRepository<WantedTag, Long> {
}
