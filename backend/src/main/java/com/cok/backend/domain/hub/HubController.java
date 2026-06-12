package com.cok.backend.domain.hub;

import com.cok.backend.domain.hub.dto.HubResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HubController {
    private final HubService hubService;

    @GetMapping("/hub")
    public ResponseEntity<HubResponse> getItems(@RequestParam(required = false) String type) {
        return ResponseEntity.ok(hubService.getHubItems(type));
    }
}
