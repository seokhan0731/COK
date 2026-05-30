package com.cok.backend.domain.auth.client;

import com.cok.backend.domain.auth.dto.KakaoTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "kakaoAuthClient", url = "https://kauth.kakao.com/oauth")
public interface KakaoAuthClient {

    @PostMapping(value = "/token", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    KakaoTokenResponse getAccessToken(@RequestParam("grant_type") String grantType,
                                      @RequestParam("client_id") String apiKey,
                                      @RequestParam("redirect_uri") String uri,
                                      @RequestParam("code") String code,
                                      @RequestParam("client_secret") String secretCode);
}
