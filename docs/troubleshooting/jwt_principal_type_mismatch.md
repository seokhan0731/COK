# [Jwt] @AuthenticationPrincipal 자료형 충돌로 인한 403 forbidden

## 1. 개요

* **날짜:** 2026.06.01
* **작성자:** 김석환
* **관련 시스템/기능:** jwt 인가 관련
* **핵심 요약:** 토큰 유무 자체는 잘 인식하여 통과하지만, @PreAuthorize 403 forbidden 인가 에러 발생

## 2. 현상 및 상황

* **문제 발생 환경:** 로컬
* **현상:**
    *     @PreAuthorize("hasRole('GUEST')")

## 3. 시도했던 해결 방안

* **가설1:** jwt 페이로드 속, Role 값 문제(USER) -> **결과:** [실패] jwt.io를 통해 디코딩을 했을 때, GUEST임을 확인
* **가설2:** 시큐리티 필터 토큰 자체 인식 X -> **결과:** [실패] TestController 제작하여, api 요청시, 통과 -> 해당 가설이 아닌 것을 확인
* **가설3:** 스프링 컨텍스트 객체 문제 -> **결과:** [성공] principal 객체 Long으로 변경

## 4. 원인 분석

* POST /profile에서 @AuthenticationPrincipal Long userId -> Principal 객체의 id를 꺼내쓰고자 했음
* 스프링 시큐리티 인증 객체의 principal이 UserDetails이기에, 바로 꺼내쓸수가 없었음.

## 5. 해결 방안

* principal 객체 자료형 Long으로 변경하여 자료형 불일치 문제 해결
    * 변경 전:     'principal 객체 -> UserDetails'
    * 변경 후:     'principal 객체 -> Long'
