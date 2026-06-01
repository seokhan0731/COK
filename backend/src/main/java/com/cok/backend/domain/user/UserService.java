package com.cok.backend.domain.user;

import com.cok.backend.domain.certification.MasterCertification;
import com.cok.backend.domain.certification.MasterCertificationRepository;
import com.cok.backend.domain.user.dto.*;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.entity.UserCertification;
import com.cok.backend.domain.user.repository.UserCertificationRepository;
import com.cok.backend.domain.user.repository.UserRepository;
import com.cok.backend.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final UserCertificationRepository userCertificationRepository;
    private final MasterCertificationRepository masterCertificationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 프로필 생성 및 Role_USER jwt 토큰 발급
     * 프로필 생성 전/후로 jwt의 ROLE이 바뀌기에, 해당 메소드에서 jwt 토큰 재발급까지 진행
     *
     * @param request 사용자 입력 프로필 정보(인적+역량)
     * @param userId  어떤 사용자의 요청인지 확인하기 위함
     * @return 재발급된 jwt 토큰과 해당 ROLE
     * @throws IllegalArgumentException 요청한 유저가 DB에 없는 경우
     */
    @Transactional
    public ProfileCreateResponse createProfile(ProfileCreateRequest request, Long userId) {
        User userWhoRequest = findUserOrThrow(userId);

        //TODO: 추후 스토리지 업로드 로직 필요
        String mockImageUrl = convertImageToUrl(request.imageFile());

        userWhoRequest.createProfile(request.name(), request.birthYear(),
                request.currentGrade(), request.attendStatus(), mockImageUrl,
                request.algorithmLevel(), request.githubId());

        saveUserCertifications(request, userWhoRequest);

        String newAccessToken = jwtTokenProvider.createToken(userWhoRequest.getId(), userWhoRequest.getRole());
        return new ProfileCreateResponse(newAccessToken, userWhoRequest.getRole());
    }

    /**
     * 프로필 조회
     * 자격증이 없다면, 빈 List 반환
     *
     * @param userId 조회할 사용자 id
     * @return 사용자 프로필값
     * @throws IllegalArgumentException 요청한 유저가 DB에 없는 경우
     */
    public ProfileDetailResponse getUserProfile(Long userId) {
        User userWhoRequest = findUserOrThrow(userId);

        //사용자 자격증, 자격증 고유번호로 포장
        List<Long> userCertifications = new ArrayList<>();
        for (UserCertification certification :
                userCertificationRepository.findAllByUserId(userWhoRequest.getId())) {
            userCertifications.add(certification.getCertification().getId());
        }

        return new ProfileDetailResponse(userWhoRequest.getName(),
                userWhoRequest.getBirthYear(),
                userWhoRequest.getCurrentGrade(),
                userWhoRequest.getAttendStatus(),
                userWhoRequest.getAlgorithmLevel(),
                userWhoRequest.getGithubId(),
                userWhoRequest.getProfileImage(),
                userCertifications);
    }

    @Transactional
    public BasicInformEditResponse editBasicInform(BasicInformEditRequest request, Long userId) {
        User userWhoRequest = findUserOrThrow(userId);

        String finalImageUrl = convertImageToUrl(request.imageFile());

        userWhoRequest.editBasicInform(request.name(),
                request.birthYear(),
                request.currentGrade(),
                request.attendStatus(),
                finalImageUrl);

        return new BasicInformEditResponse(userWhoRequest.getName(),
                userWhoRequest.getBirthYear(),
                userWhoRequest.getAttendStatus(),
                userWhoRequest.getCurrentGrade(),
                userWhoRequest.getProfileImage()
        );
    }

    private String convertImageToUrl(MultipartFile imageFile) {
        String imageUrl = "http://localhost:8080";
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = imageFile.getOriginalFilename();
            log.info("프론트가 보낸 프로필 이미지 파일명: {}", imageName);
            imageUrl = "https://images." + imageName;
        }
        return imageUrl;
    }


    private void saveUserCertifications(ProfileCreateRequest request, User userWhoRequest) {
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
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    }

}
