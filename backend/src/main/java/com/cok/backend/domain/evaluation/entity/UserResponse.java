package com.cok.backend.domain.evaluation.entity;

import com.cok.backend.domain.survey.entity.Option;
import com.cok.backend.domain.survey.entity.Question;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "user_response")
public class UserResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private SurveySession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id")
    private Option option;

    @Column(name = "subjective_answer", columnDefinition = "Text")
    private String essayAnswer;

    //TODO 주관식 벡터값 필드 추가 필요

    @Builder
    public UserResponse(SurveySession session, Question question, Option option, String essayAnswer) {
        this.session = session;
        this.question = question;
        this.option = option;
        this.essayAnswer = essayAnswer;
    }

}
