package com.cok.backend.domain.result.entity;

import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.job_posting.entity.JobPosting;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posting_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostingResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_result_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    SurveySession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posting_id", nullable = false)
    JobPosting post;

    @Column(name = "similarity")
    Float similarity;

    @Column(name = "rank")
    Integer rank;

    @Builder
    public PostingResult(SurveySession session, JobPosting post, Float similarity, Integer rank) {
        this.session = session;
        this.post = post;
        this.similarity = similarity;
        this.rank = rank;
    }
}
