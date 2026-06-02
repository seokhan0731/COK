package com.cok.backend.domain.auth.client;

import com.cok.backend.domain.auth.dto.KakaoInformResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "kakaoInformClient", url = "https://kapi.kakao.com")
public interface KakaoInformClient {

    @GetMapping(value = "/v1/user/access_token_info")
    KakaoInformResponse getKakaoId(@RequestHeader("Authorization") String accessToken);
}
