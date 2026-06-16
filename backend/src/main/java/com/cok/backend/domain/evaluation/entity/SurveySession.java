package com.cok.backend.domain.evaluation.entity;

import com.cok.backend.domain.result.entity.CompetencyResult;
import com.cok.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "survey_session")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    //session_id를 FK로 가진 competency_result 다 불러오기 위한 양방향 매핑
    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY)
    private List<CompetencyResult> competencyResults = new ArrayList<>();

    @Builder
    public SurveySession(User newUser) {
        this.user = newUser;
    }
}
