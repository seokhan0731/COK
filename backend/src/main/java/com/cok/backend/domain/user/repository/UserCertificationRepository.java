package com.cok.backend.domain.user.repository;

import com.cok.backend.domain.evaluation.CertificationCompetencyProjection;
import com.cok.backend.domain.user.entity.UserCertification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCertificationRepository extends JpaRepository<UserCertification, Long> {
    List<UserCertification> findAllByUserId(Long userId);

    void deleteAllByUserId(Long userId);

    @Query("SELECT ccs.competency.id AS competencyId, " +
            "SUM(ccs.score) AS totalScore " +
            "FROM UserCertification uc " +
            "JOIN CertificationScore ccs " +
            "ON uc.certification=ccs.certification " +
            "WHERE uc.user.id=:userId " +
            "GROUP BY ccs.competency.id")
    List<CertificationCompetencyProjection> findCompetencyScoresByUserId(@Param("userId") Long userId);
}
