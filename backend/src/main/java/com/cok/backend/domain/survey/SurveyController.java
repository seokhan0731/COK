package com.cok.backend.domain.survey;

import com.cok.backend.domain.survey.dto.QuestionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<QuestionResponse> getAllQuestionsAndOptions() {
        return ResponseEntity.ok(surveyService.getAllQuestionsAndOptions());
    }

}
