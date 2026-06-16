package com.cok.backend.domain.job_posting.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wanted_tag")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WantedTag {
    @Id
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String name;
}
