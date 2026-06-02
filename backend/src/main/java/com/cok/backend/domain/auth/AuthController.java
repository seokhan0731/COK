package com.cok.backend.domain.auth;

import com.cok.backend.domain.auth.dto.UserLoginRequest;
import com.cok.backend.domain.auth.dto.UserLoginResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/kakao")
    public ResponseEntity<UserLoginResponse> loginWithKakao(@Valid @RequestBody UserLoginRequest request) {
        UserLoginResponse response = authService.loginWithKakao(request.codeForToken());
        return ResponseEntity.ok(response);
    }
}
