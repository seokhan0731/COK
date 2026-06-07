package com.cok.backend.domain.survey.repository;

import com.cok.backend.domain.survey.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OptionRepository extends JpaRepository<Option, Long> {
    @Query("SELECT o FROM Option o " +
            "JOIN FETCH o.question q " +
            "JOIN FETCH q.competency " +
            "WHERE o.id IN :optionIds")
    List<Option> findOptionsWithQuestionAndCompetencyByIds(@Param("optionIds") List<Long> optionIds);
}
