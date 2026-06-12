package com.cok.backend.domain.landing.repository;

import com.cok.backend.domain.landing.entity.Developers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DevelopersRepository extends JpaRepository<Developers, Long> {
}
