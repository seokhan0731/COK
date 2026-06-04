package com.cok.backend.domain.job_posting.repository;

import com.cok.backend.domain.job_posting.entity.TagMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagMappingRepository extends JpaRepository<TagMapping, Long> {

    @Query("SELECT m FROM TagMapping m " +
            "JOIN FETCH m.masterJob " +
            "JOIN FETCH m.wantedTag")
    List<TagMapping> findAllWithTag();
}
