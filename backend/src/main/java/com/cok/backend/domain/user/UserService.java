package com.cok.backend.domain.user;

import com.cok.backend.domain.certification.MasterCertification;
import com.cok.backend.domain.certification.MasterCertificationRepository;
import com.cok.backend.domain.user.dto.ProfileCreateRequest;
import com.cok.backend.domain.user.dto.ProfileCreateResponse;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.entity.UserCertification;
import com.cok.backend.domain.user.repository.UserCertificationRepository;
import com.cok.backend.domain.user.repository.UserRepository;
import com.cok.backend.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserCertificationRepository userCertificationRepository;
    private final MasterCertificationRepository masterCertificationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ProfileCreateResponse createProfile(ProfileCreateRequest request, Long userId) {
        User userWhoRequest = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        String mockImageUrl = "http://localhost:8080";
        if (request.imageFile() != null && !request.imageFile().isEmpty()) {
            String imageName = request.imageFile().getOriginalFilename();
            log.info("프론트가 보낸 프로필 이미지 파일명: {}", imageName);
            mockImageUrl = "https://images." + imageName;
        }

        userWhoRequest.createProfile(request.name(), request.birthYear(),
                request.currentGrade(), request.attendStatus(), mockImageUrl,
                request.algorithmLevel(), request.githubId());


        if (request.certifications() != null && !request.certifications().isEmpty()) {
            List<MasterCertification> masterCertifications =
                    masterCertificationRepository.findAllById(request.certifications());

            List<UserCertification> userCertifications = new ArrayList<>();
            for (MasterCertification certification : masterCertifications) {
                UserCertification userCertification = UserCertification.builder()
                        .user(userWhoRequest)
                        .certification(certification)
                        .build();
                userCertifications.add(userCertification);
            }
            userCertificationRepository.saveAll(userCertifications);
        }

        String newAccessToken = jwtTokenProvider.createToken(userWhoRequest.getId(), userWhoRequest.getRole());

        return new ProfileCreateResponse(newAccessToken, userWhoRequest.getRole());
    }
}
