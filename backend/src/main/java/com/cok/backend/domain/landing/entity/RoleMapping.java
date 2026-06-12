package com.cok.backend.domain.landing.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "developer_role_mapping",
        uniqueConstraints = {@UniqueConstraint(
                name = "uk_developer_role", columnNames = {"developer_id", "role_id"})
        }
)
public class RoleMapping {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private ProjectRoles role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "developer_id", nullable = false)
    private Developers developer;
}
