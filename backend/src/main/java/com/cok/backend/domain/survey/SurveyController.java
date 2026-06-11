package com.cok.backend.domain.survey;

import com.cok.backend.domain.evaluation.EvaluationService;
import com.cok.backend.domain.evaluation.dto.AnswersRequest;
import com.cok.backend.domain.github.GithubService;
import com.cok.backend.domain.github.dto.RepositoryResponseForUser;
import com.cok.backend.domain.survey.dto.QuestionResponse;
import com.cok.backend.domain.survey.dto.RepositorySelectRequest;
import com.cok.backend.domain.survey.dto.TechSkillResponse;
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

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<QuestionResponse> getAllQuestionsAndOptions() {
        return ResponseEntity.ok(surveyService.getAllQuestionsAndOptions());
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> submitSurvey(@Valid @RequestBody AnswersRequest request,
                                             @AuthenticationPrincipal Long userId) {
        evaluationService.submitAndCalculateCompetency(request, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/repos")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RepositoryResponseForUser> getUserRepositories(@AuthenticationPrincipal Long userId) {
        RepositoryResponseForUser response = githubService.getUserRepositories(userId);
        return ResponseEntity.ok(response);
    }


}
