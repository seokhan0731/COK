package com.cok.backend.domain.landing.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "our_developers")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//객체를 map의 키값으로 사용하기 위해, id만으로 동일 객체 유무 식별
@EqualsAndHashCode(of = "id")
public class Developers {
    @Id
    private Long id;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(unique = true, name = "image_url")
    private String image;
}
