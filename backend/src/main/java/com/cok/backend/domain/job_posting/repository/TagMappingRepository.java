package com.cok.backend.domain.job_posting.repository;

import com.cok.backend.domain.job_posting.entity.TagMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagMappingRepository extends JpaRepository<TagMapping, Long> {
}
