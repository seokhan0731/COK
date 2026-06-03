package com.cok.backend.domain.hub;

import com.cok.backend.domain.certification.MasterCertificationRepository;
import com.cok.backend.domain.hub.dto.HubItem;
import com.cok.backend.domain.hub.dto.HubResponse;
import com.cok.backend.domain.job.MasterJobRepository;
import com.cok.backend.domain.job_posting.entity.TagMapping;
import com.cok.backend.domain.job_posting.repository.TagMappingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HubService {

    private final MasterJobRepository masterJobRepository;
    private final MasterCertificationRepository masterCertificationRepository;
    private final TagMappingRepository mappingRepository;

    /**
     * 페이지에 노출할 아이템 조회 및 dto(HubResponse) 조립
     * 잘못된 파라미터인 경우, 빈 리스트를 반환
     * 전체 조회를 요청하는 경우, 직무->자격증 순으로 구성
     * 배열이나, 리스트 대신 맵을 사용 -> 불필요한 분기 처리 필요 X
     *
     * @param type 요청 파라미터
     * @return 요청 파라미터에 따른 HubResponse
     */
    public HubResponse getHubItems(String type) {
        List<HubItem> items = new ArrayList<>();

        if (isJobOrAll(type)) {
            List<TagMapping> allColumns = mappingRepository.findAllWithTag();
            Map<Long, List<String>> jobTags = new HashMap<>();

            fillMap(allColumns, jobTags);
            addJobItemsByMap(items, jobTags);
        }

        if (isCertificationOrAll(type)) {
            addCertificationItems(items);
        }
        return new HubResponse(items);
    }

    /**
     * 마스터 직무와 이에 해당하는 원티드 세부 직군들 매핑
     * 마스터 직무 id를 key, 세부 직군들이 value로 구성
     *
     * @param columns 마스터 직무, 원티드 룩업, 원티드 태그 테이블이 결합된 객체
     * @param map 마스터 직무를: [원티드 직무] 형태의 완성된 map
     */
    private void fillMap(List<TagMapping> columns, Map<Long, List<String>> map) {
        for (TagMapping column : columns) {
            Long jobId = column.getMasterJob().getId();
            String tagName = column.getWantedTag().getName();

            if (!map.containsKey(jobId)) {
                map.put(jobId, new ArrayList<>());
            }

            map.get(jobId).add(tagName);
        }
    }

    private void addJobItemsByMap(List<HubItem> items, Map<Long, List<String>> map) {
        masterJobRepository.findAll().forEach(job -> {
            //매핑되는 세부 직무가 없는 경우, 빈 리스트를 반환하기 위해, getOrDefault 사용
            List<String> subItems = map.getOrDefault(job.getId(), new ArrayList<>());
            items.add(HubItem.fromJob(job, subItems));
        });
    }

    private void addCertificationItems(List<HubItem> items) {
        masterCertificationRepository.findAll().forEach(certification -> {
            items.add(HubItem.fromCertification(certification));
        });
    }

    private boolean isJobOrAll(String type) {
        return type == null || type.equals("job");
    }

    private boolean isCertificationOrAll(String type) {
        return type == null || type.equals("certification");
    }
}
