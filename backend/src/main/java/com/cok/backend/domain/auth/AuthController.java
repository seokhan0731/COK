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
    public ResponseEntity<String> loginWithKakao(@Valid @RequestBody UserLoginRequest request) {
        Long userId = authService.loginWithKakao(request.codeForToken());
        return ResponseEntity.ok("success for getting user id " + userId);
    }
}
