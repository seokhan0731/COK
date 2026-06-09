package com.cok.backend.domain.survey;

import com.cok.backend.domain.evaluation.EvaluationService;
import com.cok.backend.domain.evaluation.dto.AnswersRequest;
import com.cok.backend.domain.survey.dto.QuestionResponse;
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
}
