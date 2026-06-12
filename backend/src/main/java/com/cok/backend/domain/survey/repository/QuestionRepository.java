package com.cok.backend.domain.survey.repository;

import com.cok.backend.domain.survey.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT DISTINCT q FROM Question q " +
            "LEFT JOIN FETCH q.options")
    List<Question> findAllWithOptions();
}
