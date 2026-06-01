package com.cok.backend.domain.user.repository;

import com.cok.backend.domain.user.entity.UserCertification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCertificationRepository extends JpaRepository<UserCertification, Long> {
    List<UserCertification> findAllByUserId(Long userId);
}
