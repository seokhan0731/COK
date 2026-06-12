package com.cok.backend.domain.survey.entity;

import com.cok.backend.domain.competency.MasterCompetency;
import com.cok.backend.domain.survey.QuestionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "assessment_question")
@Getter
@NoArgsConstructor
public class Question {
    @Id
    private Long id;

    @Column(columnDefinition = "Text")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id")
    private MasterCompetency competency;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private QuestionType type;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<Option> options;
}
