package com.cok.backend.domain.user;

import com.cok.backend.domain.user.dto.ProfileCreateRequest;
import com.cok.backend.domain.user.dto.ProfileCreateResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
