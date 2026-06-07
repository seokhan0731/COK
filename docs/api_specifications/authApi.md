# Auth API 명세서

## 공통 사항

| 항목      | 내용                              |
| --------- | --------------------------------- |
| 인증 방식 | Bearer Token (Authorization 헤더) |

## 1. 카카오 로그인

카카오 인가 코드를 백엔드로 전달하여 자체 `accessToken`으로 교환한다.

### Metadata

| 항목   | 값            |
| ------ | ------------- |
| Method | `POST`        |
| URL    | `/auth/kakao` |

### Request Headers

| 헤더           | 값                 | 필수 | 설명           |
| -------------- | ------------------ | ---- | -------------- |
| `Content-Type` | `application/json` | O    | 요청 바디 형식 |

### Request Body

| 필드   | 타입     | 필수 | 설명                   |
| ------ | -------- | ---- | ---------------------- |
| `code` | `string` | O    | 카카오 OAuth 인가 코드 |

### Response Body

| 필드          | 타입           | 필수 | 설명                  |
| ------------- | -------------- | ---- | --------------------- |
| `accessToken` | `string`       | O    | 자체 발급 액세스 토큰 |
| `role`        | `UserRoleType` | O    | 유저 상태             |

### Example

#### Request Body

```json
{
  "code": "any_authorization_code" // 카카오 인가 코드
}
```

#### Response Body

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoi7YWM7Iqk7Yq47Jyg7KCAIiwiaWF0IjoxNzE2MjkwMDAwLCJleHAiOjE3MTYyOTM2MDB9.mock_signature_abc123",
  "role": "GUEST"
}
```

---

## 2. Type 정의

### `UserRoleType`

| 값      | 설명                            |
| ------- | ------------------------------- |
| `GUEST` | 회원가입 미완료 (프로필 미등록) |
| `USER`  | 정상 유저                       |
