package com.cok.backend.domain.survey.repository;

import com.cok.backend.domain.survey.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Long> {
}
