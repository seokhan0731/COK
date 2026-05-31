package com.cok.backend.domain.user.repository;

import com.cok.backend.domain.user.entity.UserCertification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCertificationRepository extends JpaRepository<UserCertification, Long> {
}
