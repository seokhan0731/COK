package com.cok.backend.domain.certification.repository;

import com.cok.backend.domain.certification.entity.MasterCertification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterCertificationRepository extends JpaRepository<MasterCertification, Long> {
}
