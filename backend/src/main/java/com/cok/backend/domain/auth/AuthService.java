package com.cok.backend.domain.auth;

import com.cok.backend.domain.auth.client.KakaoAuthClient;
import com.cok.backend.domain.auth.client.KakaoInformClient;
import com.cok.backend.domain.auth.dto.KakaoInformResponse;
import com.cok.backend.domain.auth.dto.KakaoTokenResponse;
import com.cok.backend.domain.auth.dto.UserLoginResponse;
import com.cok.backend.domain.user.entity.User;
import com.cok.backend.domain.user.repository.UserRepository;
import com.cok.backend.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final KakaoAuthClient kakaoAuthClient;
    private final KakaoInformClient kakaoInformClient;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private static final String grantType = "authorization_code";

    //application.yml
    @Value("${kakao.client-id}")
    private String clientId;
    @Value("${kakao.redirect-uri}")
    private String redirectUri;
    @Value("${kakao.client-secret}")
    private String clientSecret;

    /**
     * 카카오에게 엑세스 토큰 발급받기
     *
     * @param codeForToken 프론트로부터 받은 인가코드
     * @return 엑세스 토큰
     */
    private String getAccessToken(String codeForToken) {
        KakaoTokenResponse response = kakaoAuthClient.getAccessToken(grantType, clientId, redirectUri,
                codeForToken, clientSecret);

        String accessToken = response.kakaoToken();
        System.out.println("카카오 엑세스 토큰 " + accessToken);

        return accessToken;
    }

    /**
     * 카카오에게 고유 id 발급받기
     *
     * @param accessToken 엑세스 토큰
     * @return 사용자 카카오 고유값
     */
    private String getKakaoId(String accessToken) {
        String headerForId = "Bearer " + accessToken;
        KakaoInformResponse response = kakaoInformClient.getKakaoId(headerForId);

        String kakaoId = response.userKakaoId();
        System.out.println("유저 카카오 id " + kakaoId);
        return kakaoId;
    }

    /**
     * 신규 사용자 저장
     *
     * @param kakaoId 발급받은 카카오 고유 회원 코드
     * @return 신규 유저 객체
     */
    private User registerNewUser(String kakaoId) {
        User newUser = User.builder()
                .kakaoId(kakaoId)
                .build();
        return userRepository.save(newUser);
    }

    @Transactional
    public UserLoginResponse loginWithKakao(String codeForToken) {
        //카카오 서버 통신
        String accessToken = getAccessToken(codeForToken);
        String kakaoId = getKakaoId(accessToken);

        //유저 조회 후, 가입 또는 로그인
        User user = userRepository.findByKakaoId(kakaoId).orElseGet(() -> registerNewUser(kakaoId));

        //토큰 발급
        String ourToken = jwtTokenProvider.createToken(user.getId(), user.getRole());

        return new UserLoginResponse(ourToken, user.getRole());
    }


}
