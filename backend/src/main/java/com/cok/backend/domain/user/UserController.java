package com.cok.backend.domain.user;

import com.cok.backend.domain.user.dto.ProfileCreateRequest;
import com.cok.backend.domain.user.dto.ProfileCreateResponse;
import com.cok.backend.domain.user.dto.ProfileDetailResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/profile")
    @PreAuthorize("hasRole('GUEST')")
    public ResponseEntity<ProfileCreateResponse> createProfile(@Valid @ModelAttribute ProfileCreateRequest request,
                                                               @AuthenticationPrincipal Long userId) {
        ProfileCreateResponse response = userService.createProfile(request, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ProfileDetailResponse> getProfile(@AuthenticationPrincipal Long userId) {
        ProfileDetailResponse response = userService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }
}
