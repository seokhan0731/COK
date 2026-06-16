package com.cok.backend.domain.survey;

import com.cok.backend.domain.ai.AiClient;
import com.cok.backend.domain.ai.AiService;
import com.cok.backend.domain.ai.dto.PostRecommendRequest;
import com.cok.backend.domain.ai.dto.PostRecommendResponse;
import com.cok.backend.domain.evaluation.EvaluationService;
import com.cok.backend.domain.evaluation.dto.AnswersRequest;
import com.cok.backend.domain.github.GithubService;
import com.cok.backend.domain.github.dto.RepositoryResponseForUser;
import com.cok.backend.domain.survey.dto.QuestionResponse;
import com.cok.backend.domain.survey.dto.RepositorySelectRequest;
import com.cok.backend.domain.survey.dto.TechSkillResponse;
import com.cok.backend.domain.survey.dto.TechSkillSelect;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;
    private final EvaluationService evaluationService;
    private final GithubService githubService;
    private final AiService aiService;
    private final AiClient aiClient;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<QuestionResponse> getAllQuestionsAndOptions() {
        return ResponseEntity.ok(surveyService.getAllQuestionsAndOptions());
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Long> submitSurvey(@Valid @RequestBody AnswersRequest request,
                                             @AuthenticationPrincipal Long userId) {
        Long sessionId = evaluationService.submitAndCalculateCompetency(request, userId);
        return ResponseEntity.ok(sessionId);
    }

    //TODO 디폴트 브랜치 정보도 줘야 기술스택 조회시, 모든 브랜치 조회가능
    @GetMapping("/repos")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RepositoryResponseForUser> getUserRepositories(@AuthenticationPrincipal Long userId) {
        RepositoryResponseForUser response = githubService.getUserRepositories(userId);
        return ResponseEntity.ok(response);
    }

    //TODO main 브랜치가 디폴트일때만 가능
    @PostMapping("/repos")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TechSkillResponse> getUsedSkill(@RequestBody RepositorySelectRequest request,
                                                          @AuthenticationPrincipal Long userId) {
        TechSkillResponse response = githubService.getUsedSkill(request, userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stacks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> submitSkillsAndRecommendPost(@RequestBody TechSkillSelect request) {
        PostRecommendRequest requestForPython = evaluationService.submitAndCalculateJob(request);

        //파이썬 서버 요청 보내기(공고 추천 후 저장)
        PostRecommendResponse response = aiClient.getRecommend(requestForPython);
        aiService.loadPostRecommend(response, request.sessionId());

        return ResponseEntity.ok().build();
    }

}
