package com.cok.backend.domain.result.repository;

import com.cok.backend.domain.result.entity.PostingResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostingResultRepository extends JpaRepository<PostingResult, Long> {
}
