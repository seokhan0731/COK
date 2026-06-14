package com.cok.backend.domain.result;

import com.cok.backend.domain.result.dto.ResultOverviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
public class ResultController {
    private final ResultResponseService resultService;

    @GetMapping("/result/{sessionId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResultOverviewResponse> getResultOverview(@PathVariable Long sessionId) {
        ResultOverviewResponse response = resultService.getResultOverview(sessionId);

        return ResponseEntity.ok(response);
    }
}
