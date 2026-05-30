package com.cok.backend.domain.auth;

import com.cok.backend.domain.auth.dto.UserLoginRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/kakao/test")
    public ResponseEntity<String> testKakaoToken(@Valid @RequestBody UserLoginRequest request) {
        String accessToken = authService.getAccessToken(request.codeForToken());
        return ResponseEntity.ok("success for getting token " + accessToken);
    }

    @GetMapping("/kakao/test")
    public ResponseEntity<String> testKakaoId(@RequestParam("token") String accessToken) {
        String kakaoId = authService.getKakaoId(accessToken);
        return ResponseEntity.ok("success for getting id " + kakaoId);
    }
}
