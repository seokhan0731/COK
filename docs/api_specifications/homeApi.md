# Home API 명세서

## 공통 사항

| 항목      | 내용                    |
| --------- | ----------------------- |
| 인증 방식 | 없음 (비회원 조회 가능) |

## 1. 멤버 정보 목록 조회

홈 화면에 노출할 멤버 정보 목록을 조회한다.

### Metadata

| 항목   | 값      |
| ------ | ------- |
| Method | `GET`   |
| URL    | `/home` |

### Request Headers

| 헤더           | 값                 | 필수 | 설명           |
| -------------- | ------------------ | ---- | -------------- |
| `Content-Type` | `application/json` | O    | 요청 바디 형식 |

### Request Body

없음

### Response Body

| 필드             | 타입               | 필수 | 설명           |
| ---------------- | ------------------ | ---- | -------------- |
| `memberInfoData` | `MemberInfoType[]` | O    | 멤버 정보 목록 |

### Example

#### Response Body

```json
{
    "memberInfoData": [
        { "name": "조인흠", "role": ["Frontend"], "imageUrl": "/src/asset/member_image/%EC%A1%B0%EC%9D%B8%ED%9D%A0.png" },
        { "name": "김석환", "role": ["Backend", "AI"], "imageUrl": "/src/asset/member_image/%EA%B9%80%EC%84%9D%ED%99%98.png" },
        { "name": "오주노", "role": ["Frontend"], "imageUrl": "/src/asset/member_image/%EC%98%A4%EC%A3%BC%EB%85%B8.png" }
    ]
}
```

---

## 2. Type 정의

### `MemberInfoType`

| 필드       | 타입       | 필수 | 설명               |
| ---------- | ---------- | ---- | ------------------ |
| `imageUrl` | `string`   | O    | 멤버 프로필 이미지 URL |
| `name`     | `string`   | O    | 멤버 이름          |
| `role`     | `string[]` | O    | 멤버 역할 목록     |
