package com.cok.backend.domain.landing;

import com.cok.backend.domain.landing.dto.OurMemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LandingController {
    private final LandingService landingService;

    @GetMapping("/home")
    public ResponseEntity<OurMemberResponse> getMembersInfo() {
        return ResponseEntity.ok(landingService.getMembersInfo());
    }
}
