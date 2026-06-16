package com.cok.backend.domain.job_posting.entity;

import com.cok.backend.domain.job.MasterJob;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_job_mapping", uniqueConstraints = {@UniqueConstraint(
        name = "uk_post_master_job", columnNames = {"post_id", "job_id"})})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostJobMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_job_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private JobPosting jobPost;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private MasterJob masterJob;
}
