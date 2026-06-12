package com.cok.backend.domain.landing.repository;

import com.cok.backend.domain.landing.entity.ProjectRoles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<ProjectRoles, Long> {
}
