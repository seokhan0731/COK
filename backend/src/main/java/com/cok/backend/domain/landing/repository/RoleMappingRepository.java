package com.cok.backend.domain.landing.repository;

import com.cok.backend.domain.landing.entity.RoleMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleMappingRepository extends JpaRepository<RoleMapping, Long> {

    @Query("SELECT m FROM RoleMapping m " +
            "JOIN FETCH m.role " +
            "JOIN FETCH m.developer")
    List<RoleMapping> findAllWithRole();
}
