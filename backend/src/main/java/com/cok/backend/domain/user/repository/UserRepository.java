package com.cok.backend.domain.user.repository;

import com.cok.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //기존 회원 식별용
    Optional<User> findByKakaoId(String kakaoId);
}
