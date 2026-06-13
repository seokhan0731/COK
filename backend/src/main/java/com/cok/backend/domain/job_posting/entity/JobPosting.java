package com.cok.backend.domain.job_posting.entity;

import com.cok.backend.domain.job.MasterJob;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "job_posting")
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posting_id")
    private Long id;

    @Column(name = "wanted_id", unique = true)
    private Long wantedId;

    @Column(name = "company_name", length = 100)
    private String companyName;

    //크롤링 기준 position
    @Column(name = "title", length = 500)
    private String title;

    @Column(name = "main_tasks", columnDefinition = "TEXT")
    private String mainTasks;

    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "preferred_points", columnDefinition = "TEXT")
    private String preferredPoints;

    @Column(name = "embedding_vector", columnDefinition = "vector(768)")
    @JdbcTypeCode(SqlTypes.VECTOR)
    private float[] vector;

    //https://www.wanted.co.kr/wd/{wantedId}
    @Column(name = "posting_url")
    private String postingUrl;
}
