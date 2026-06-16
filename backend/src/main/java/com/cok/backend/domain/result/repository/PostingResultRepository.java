package com.cok.backend.domain.result.repository;

import com.cok.backend.domain.result.entity.PostingResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostingResultRepository extends JpaRepository<PostingResult, Long> {
    @Query("SELECT pr FROM PostingResult pr " +
            "JOIN FETCH pr.post " +
            "WHERE pr.session.id=:sessionId " +
            "ORDER BY pr.rank ASC")
    List<PostingResult> findBySessionIdWithPostings(@Param("sessionId") Long sessionId);
}
