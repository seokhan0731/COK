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

    public HubResponse getHubItems(String type) {
        List<HubItem> items = new ArrayList<>();

        if (type == null || type.equals("job")) {
            List<TagMapping> allColumns = mappingRepository.findAllWithTag();
            Map<Long, List<String>> jobTags = new HashMap<>();

            for (TagMapping column : allColumns) {
                Long jobId = column.getMasterJob().getId();
                String tagName = column.getWantedTag().getName();

                if (!jobTags.containsKey(jobId)) {
                    jobTags.put(jobId, new ArrayList<>());
                }

                jobTags.get(jobId).add(tagName);
            }

            masterJobRepository.findAll().forEach(job -> {
                List<String> subItems = jobTags.getOrDefault(job.getId(), new ArrayList<>());
                items.add(HubItem.fromJob(job, subItems));
            });
        }

        if (type == null || type.equals("certification")) {
            masterCertificationRepository.findAll().forEach(certification -> {
                items.add(HubItem.fromCertification(certification));
            });
        }
        return new HubResponse(items);
    }
}
