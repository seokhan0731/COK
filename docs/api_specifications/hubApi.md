# Hub API 명세서

COK 프로젝트 · 허브 페이지 (InfoPage)

---

## 공통 사항

| 항목 | 내용 |
|------|------|
| 인증 방식 | Bearer Token (Authorization 헤더) |
| Content-Type | `application/json` |

---

## 1. 허브 목록 조회

마스터 직무(job) 또는 자격증(certification) 목록을 조회한다. 탭 선택 및 필터링을 지원하며 정렬은 클라이언트에서 처리한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | `GET` |
| URL | `/hub` |

### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `type` | `ItemType` | X | 필터 타입. 생략 시 전체 조회 |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {token}` | O | 로그인 사용자 인증 토큰 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `items` | `HubItem[]` | O | 허브 아이템 목록 |

### Example

#### Request Example

```
GET /hub
GET /hub?type=job
GET /hub?type=certification
```

#### Response Body
```json
{
  "items": [
    {
      "id": 1,
      "type": "job",
      "name": "백엔드",
      "description": "서버 및 API를 개발하는 직무입니다.",
      "subItems": ["서버 개발자", "자바 개발자"]
    },
    {
      "id": 1,
      "type": "certification",
      "name": "정보처리기사",
      "description": "국가기술자격증으로 소프트웨어 개발 전반을 다룹니다.",
      "issuer": "한국산업인력공단",
      "subItems": ["필기 대비", "실기 대비"]
    }
  ]
}
```

---

## 2. Type 정의

### ItemType

| 값 | 설명 |
|----|------|
| `"job"` | 직무 카테고리 |
| `"certification"` | 자격증 카테고리 |

### HubItem

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `number` | O | 아이템 고유 ID (type별로 1부터 부여, `{type}-{id}` 조합이 유니크) |
| `type` | `ItemType` | O | 아이템 타입 |
| `name` | `string` | O | 아이템 이름 |
| `description` | `string` | O | 아이템 설명 |
| `subItems` | `string[]` | O | 세부 카테고리 목록 |
| `issuer` | `string` | X | 발급 기관 |

---

## 3. 탭 필터 매핑

클라이언트에서 탭 선택 시 아래 값으로 `type` 쿼리 파라미터를 설정한다.

| 탭 이름 | type 파라미터 값 | 설명 |
|---------|----------------|------|
| 전체 | (생략) | type 파라미터 없이 전체 조회 |
| 직무 | `job` | 직무 목록만 조회 |
| 자격증 | `certification` | 자격증 목록만 조회 |