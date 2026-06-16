package com.cok.backend.domain.landing.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "our_roles")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectRoles {
    @Id
    private Long id;

    @Column(nullable = false, unique = true, name = "role")
    private String roleAtThisProject;
}
