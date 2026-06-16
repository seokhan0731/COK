package com.cok.backend.domain.survey.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "question_option")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Option {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(length = 100)
    private String content;

    @Column(name = "score", nullable = false)
    private Integer score;
}
