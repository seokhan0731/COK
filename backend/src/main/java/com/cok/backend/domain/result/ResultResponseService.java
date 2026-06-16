package com.cok.backend.domain.result;

import com.cok.backend.domain.competency.CompetencyPolicy;
import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.evaluation.repository.SessionRepository;
import com.cok.backend.domain.job_posting.entity.JobPosting;
import com.cok.backend.domain.result.dto.*;
import com.cok.backend.domain.result.entity.CompetencyResult;
import com.cok.backend.domain.result.entity.JobResult;
import com.cok.backend.domain.result.entity.PostingResult;
import com.cok.backend.domain.result.repository.CompetencyResultRepository;
import com.cok.backend.domain.result.repository.JobResultRepository;
import com.cok.backend.domain.result.repository.PostingResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ResultResponseService {
    private final CompetencyResultRepository competencyResultRepository;
    private final SessionRepository sessionRepository;
    private final JobResultRepository jobResultRepository;

    private static final double PERCENTAGE_CORRECTION = 100.0;
    private final PostingResultRepository postingResultRepository;

    /**
     * DB에서 가장 최근의 측정된 역량 조회 및 반환
     * 역량값이 정의된 CompetencyPolicy가 있기에, join을 사용하기보단, 프록시의 역량 id를 이용
     *
     * @param userId 조회 요청핞 사용자 id
     * @return skill: value형태의 모든 역량 값을 담은 리스트
     */
    public CompetencyResultResponse getLatestCompetencyResult(Long userId) {
        SurveySession latestSession = getLatestSessionOrThrow(userId);

        List<CompetencyResult> results = latestSession.getCompetencyResults();
        List<CompetencyItem> items = buildCompetencyItems(results);

        return new CompetencyResultResponse(items);
    }

    private SurveySession getLatestSessionOrThrow(Long userId) {
        return sessionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new IllegalArgumentException("설문 회차가 존재하지 않습니다."));
    }

    private List<CompetencyItem> buildCompetencyItems(List<CompetencyResult> results) {
        List<CompetencyItem> items = new ArrayList<>();

        for (CompetencyResult result : results) {
            Long competencyId = result.getCompetency().getId();
            CompetencyPolicy competency = CompetencyPolicy.from(competencyId);
            double percentageScore = result.getTotalScore() * PERCENTAGE_CORRECTION;

            items.add(new CompetencyItem(competency, percentageScore));
        }
        return items;
    }

    public JobResultResponse getLatestJobResult(Long userId) {
        SurveySession latestSession = getLatestSessionOrThrow(userId);

        List<JobResult> top3Job = jobResultRepository.findTop3BySessionIdOrderByTotalScoreDesc(latestSession.getId());
        List<JobItem> items = buildJobItems(top3Job);

        return new JobResultResponse(items);
    }

    private List<JobItem> buildJobItems(List<JobResult> jobResults) {
        List<JobItem> items = new ArrayList<>();

        for (JobResult result : jobResults) {
            Long jobId = result.getJob().getId();
            double percentageScore = result.getTotalScore() * PERCENTAGE_CORRECTION;

            items.add(new JobItem(jobId, percentageScore));
        }
        return items;
    }

    public PostingResultResponse getLatestPostingResult(Long userId) {
        SurveySession latestSession = getLatestSessionOrThrow(userId);

        List<PostingResult> results = postingResultRepository.findBySessionIdWithPostings(latestSession.getId());
        List<PostingItem> items = buildPostingItems(results);
        return new PostingResultResponse(items);
    }

    private List<PostingItem> buildPostingItems(List<PostingResult> results) {
        List<PostingItem> items = new ArrayList<>();

        for (PostingResult result : results) {
            JobPosting posting = result.getPost();
            String companyName = posting.getCompanyName();
            String title = posting.getTitle();
            String url = posting.getPostingUrl();
            float percentageScore = (float) (result.getSimilarity() * PERCENTAGE_CORRECTION);
            items.add(new PostingItem(companyName, title, percentageScore, url));
        }
        return items;
    }
}
