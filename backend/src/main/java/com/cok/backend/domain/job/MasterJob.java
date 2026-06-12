package com.cok.backend.domain.job;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "master_job")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MasterJob {

    @Id
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
}
