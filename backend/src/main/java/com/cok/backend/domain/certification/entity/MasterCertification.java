package com.cok.backend.domain.certification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "master_certification")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MasterCertification {

    //data.sql에서 id 직접 입력했기에, 자동 증가 설정 x
    @Id
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String issuer;

    @Column(columnDefinition = "TEXT")
    private String description;

}
