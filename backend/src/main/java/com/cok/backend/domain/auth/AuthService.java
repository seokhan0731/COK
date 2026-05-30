package com.cok.backend.domain.auth;

import com.cok.backend.domain.auth.dto.KakaoTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final KakaoAuthClient kakaoAuthClient;
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
    public String getAccessToken(String codeForToken) {
        KakaoTokenResponse response = kakaoAuthClient.getAccessToken(grantType, clientId, redirectUri,
                codeForToken, clientSecret);

        String accessToken = response.kakaoToken();
        System.out.println("카카오 엑세스 토큰" + accessToken);

        return accessToken;
    }
}
