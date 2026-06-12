package com.cok.backend.domain.hub.dto;

import com.cok.backend.domain.certification.entity.MasterCertification;
import com.cok.backend.domain.job.MasterJob;

import java.util.List;

public record HubItem(Long id,
                      String type,
                      String name,
                      String description,
                      List<String> subItems,
                      String issuer) {
    /**
     * 허브 페이지 api 요청에 따른 nested 응답값
     * subItems를 해당 레코드에서 빌드하기엔, 책임이 너무 무거워지기에 서비스 계층에서 빌드하도록 매개 변수로 분리
     *
     * @param job      조회하고자 하는 마스터 직무
     * @param subItems 직무에 대한 원티드 직군들
     * @return 마스터 직무 정보와 태그들이 결합되어 완성된 dto
     */
    public static HubItem fromJob(MasterJob job, List<String> subItems) {
        return new HubItem(job.getId(), "job", job.getName(), job.getDescription(),
                subItems, null);
    }

    public static HubItem fromCertification(MasterCertification certification) {
        return new HubItem(certification.getId(), "certification", certification.getName(),
                certification.getDescription(), null, certification.getIssuer());
    }

}
