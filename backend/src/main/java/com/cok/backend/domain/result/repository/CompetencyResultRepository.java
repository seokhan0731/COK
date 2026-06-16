package com.cok.backend.domain.result.repository;

import com.cok.backend.domain.result.entity.CompetencyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompetencyResultRepository extends JpaRepository<CompetencyResult, Long> {
    @Query(value = """
            SELECT * FROM (
                SELECT *, ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY total_score DESC) as rn
                FROM competency_result 
                WHERE session_id IN :sessionIds
            ) as t
            WHERE t.rn = 1
            """, nativeQuery = true)
    List<CompetencyResult> findTop1BySessionIds(@Param("sessionIds") List<Long> sessionIds);
}
