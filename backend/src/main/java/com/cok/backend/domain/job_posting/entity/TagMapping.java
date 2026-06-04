package com.cok.backend.domain.job_posting.entity;

import com.cok.backend.domain.job.MasterJob;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "job_tag_mapping",
        uniqueConstraints = {@UniqueConstraint(
                name = "uk_tag_master_job", columnNames = {"tag_id", "master_job_id"})
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TagMapping {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private WantedTag wantedTag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "master_job_id", nullable = false)
    private MasterJob masterJob;
}
