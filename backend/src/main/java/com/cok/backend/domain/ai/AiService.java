package com.cok.backend.domain.ai;

import com.cok.backend.domain.ai.dto.*;
import com.cok.backend.domain.evaluation.entity.SurveySession;
import com.cok.backend.domain.evaluation.repository.SessionRepository;
import com.cok.backend.domain.job_posting.entity.JobPosting;
import com.cok.backend.domain.job_posting.repository.PostingRepository;
import com.cok.backend.domain.result.entity.PostingResult;
import com.cok.backend.domain.result.repository.PostingResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiService {
    private final AiClient aiClient;
    private final SessionRepository sessionRepository;
    private final PostingRepository postingRepository;
    private final PostingResultRepository postingResultRepository;

    public EmbeddingResponse getEmbeddingByFastapi(String essay) {
        EmbeddingRequest request = new EmbeddingRequest(essay);
        return aiClient.getEmbedding(request);
    }

    @Transactional
    public void loadPostRecommend(PostRecommendResponse response, Long sessionId) {
        List<PostingResult> results = new ArrayList<>();
        SurveySession sessionProxy = sessionRepository.getReferenceById(sessionId);

        for (PostRecommendItem item : response.recommendations()) {
            JobPosting postProxy = postingRepository.getReferenceById(item.postId());

            PostingResult newPost = PostingResult.builder()
                    .session(sessionProxy)
                    .similarity(item.similarity())
                    .rank(item.rank())
                    .post(postProxy)
                    .build();

            results.add(newPost);
        }

        postingResultRepository.saveAll(results);
    }
}
