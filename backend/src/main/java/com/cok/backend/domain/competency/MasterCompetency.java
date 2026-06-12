package com.cok.backend.domain.competency;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "master_competency")
@Getter
@NoArgsConstructor
public class MasterCompetency {

    @Id
    private Long id;

    @Column(name = "name", nullable = false, unique = true, length = 10)
    private String name;

    @Column(name = "description", nullable = false, unique = true, length = 350)
    private String description;
}
