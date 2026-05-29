package com.cok.backend.domain.user;

import com.cok.backend.domain.user.enums.AttendStatus;
import com.cok.backend.domain.user.enums.BaekjoonTier;
import com.cok.backend.domain.user.enums.Grade;
import com.cok.backend.domain.user.enums.UserRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"kakao_id"}
)})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "kakao_id", nullable = false)
    private Long kakaoId;

    @Column(name = "name", length = 10)
    private String name;

    @Column(name = "birth_year")
    private Integer birthYear;

    @Column(name = "current_grade")
    @Enumerated(EnumType.STRING)
    private Grade currentGrade;

    @Column(name = "attend_status")
    @Enumerated(EnumType.STRING)
    private AttendStatus attendStatus;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "github_id", length = 40)
    private String githubId;

    @Column(name = "image_url")
    private String profileImage;

    @Column(name = "algorithm_level")
    @Enumerated(EnumType.STRING)
    //향후 다른 알고리즘 플랫폼 들어올 수도 있기에, enum의 이름과 변수명 분리
    private BaekjoonTier algorithmLevel;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public User(Long kakaoId) {
        this.kakaoId = kakaoId;
        //프로필 생성 전이기에 GUEST로 설정
        role = UserRole.GUEST;
    }
}
