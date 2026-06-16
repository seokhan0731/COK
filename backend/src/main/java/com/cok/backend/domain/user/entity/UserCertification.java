package com.cok.backend.domain.user.entity;

import com.cok.backend.domain.certification.entity.MasterCertification;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "user_certification")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCertification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_certification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certification_id", nullable = false)
    private MasterCertification certification;

    @Builder
    public UserCertification(User user, MasterCertification certification) {
        this.user = user;
        this.certification = certification;
    }
}
