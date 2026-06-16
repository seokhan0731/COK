# Planning API 명세서

COK 프로젝트 · 플래닝 페이지 (PlanningPage)

---

## 공통 사항

| 항목 | 내용 |
|------|------|
| 인증 방식 | Bearer Token (Authorization 헤더) |

---

## 1. 로드맵 조회

사용자의 AI 멘토 분석 로드맵을 조회한다. 월별 목표 및 세부 항목을 포함한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | GET |
| URL | `/planning` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {token}` | O | 로그인 사용자 인증 토큰 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `roadmap_id` | `number` | O | 로드맵 고유 ID |
| `session_id` | `number` | O | 학기 세션 ID |
| `job_id` | `number` | O | 직무 ID |
| `created_at` | `string` | O | 로드맵 생성일시 (ISO 8601) |
| `months` | `MonthlyOverview[]` | O | 월별 로드맵 목록 |

### 설문 미참여 응답

설문에 참여하지 않아 로드맵이 아직 생성되지 않은 사용자는 **`200 OK` + body `null`** 로 응답한다.
404 등 에러 상태로 응답하지 않는다. 클라이언트는 `null`을 "로드맵 없음(설문 미참여)" 상태로 처리한다.

```
GET /planning
→ 200 OK

null
```

### Example

Request
```
GET /planning
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response Body
```json
{
  "roadmap_id": 1,
  "session_id": 1,
  "job_id": 2,
  "created_at": "2025-03-01T00:00:00Z",
  "months": [
    {
      "overview_id": 1,
      "roadmap_id": 1,
      "month_num": 6,
      "comment": "이번 달은 CS 기초를 탄탄히 다지는 것이 핵심입니다.",
      "details": [
        {
          "detail_id": 1,
          "content": "자료구조 정리",
          "is_completed": true,
          "category": "KNOWLEDGE",
          "overview_id": 1
        },
        {
          "detail_id": 2,
          "content": "운영체제 개념 학습",
          "is_completed": false,
          "category": "KNOWLEDGE",
          "overview_id": 1
        }
      ]
    }
  ]
}
```

---

## 2. 미션 완료 처리

세부 목표(미션)의 완료 여부를 변경한다. 사용자가 미션을 체크/해제할 때 호출한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | PATCH |
| URL | `/planning/details/{detail_id}` |

### Path Parameters

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `detail_id` | `number` | O | 변경할 세부 목표 ID |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {token}` | O | 로그인 사용자 인증 토큰 |
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `is_completed` | `boolean` | O | 변경할 완료 여부 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `detail_id` | `number` | O | 세부 목표 ID |
| `is_completed` | `boolean` | O | 변경된 완료 여부 |

### Example

Request
```
PATCH /planning/details/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Request Body
```json
{
  "is_completed": true
}
```

Response Body
```json
{
  "detail_id": 1,
  "is_completed": true
}
```

---

## 3. Type 정의

### RoadmapData

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `roadmap_id` | `number` | O | 로드맵 고유 ID |
| `session_id` | `number` | O | 학기 세션 ID |
| `job_id` | `number` | O | 직무 ID |
| `created_at` | `string` | O | 로드맵 생성일시 (ISO 8601) |
| `months` | `MonthlyOverview[]` | O | 월별 로드맵 목록 |

### MonthlyOverview

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `overview_id` | `number` | O | 월별 개요 고유 ID |
| `roadmap_id` | `number` | O | 상위 로드맵 ID |
| `month_num` | `number` | O | 월 번호 (예: 3 → 3월) |
| `comment` | `string` | O | AI 멘토 코멘트 |
| `details` | `MonthlyDetail[]` | O | 월별 세부 목표 목록 |

### MonthlyDetail

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `detail_id` | `number` | O | 세부 항목 고유 ID |
| `content` | `string` | O | 세부 목표 내용 |
| `is_completed` | `boolean` | O | 완료 여부 |
| `category` | `Category` | O | 항목 카테고리 (아래 Category 참고) |
| `overview_id` | `number` | O | 상위 월별 개요 ID |

==============================================================================================================

### Category

세부 목표의 카테고리 값. 백엔드는 아래 영문 enum 값 중 하나를 내려준다. (한글 표기는 클라이언트에서 라벨 매핑)

| 값 | 한글 라벨 | 설명 |
|----|-----------|------|
| `TECH_STACK` | 기술스택 | 프레임워크·언어 등 기술 스택 |
| `ALGORITHM` | 알고리즘 | 알고리즘·코딩테스트 |
| `KNOWLEDGE` | 관련 지식 | CS 등 관련 지식 |
| `CERTIFICATE` | 자격증 | 자격증 취득 |


```ts
type Category = "TECH_STACK" | "ALGORITHM" | "KNOWLEDGE" | "CERTIFICATE";
```

---

## 4. 클라이언트 파생 데이터

서버 응답을 바탕으로 클라이언트에서 계산하는 값들이다.

| 값 | 계산 방식 | 설명 |
|----|-----------|------|
| `completed` | `details.filter(d => d.is_completed).length` | 완료된 세부 목표 수 |
| `remaining` | `details.length - completed` | 남은 세부 목표 수 |
| `currentMonthData` | `months.find(m => m.month_num === selectMonth)` | 현재 선택된 월 데이터 |

### 월 선택 / 이동 (클라이언트 처리)

월별 로드맵 간 이동은 **별도 API 호출 없이 클라이언트에서 처리**한다. `GET /planning`으로 받은 `months` 배열을 그대로 사용하며, 앞/뒤 이동 시 선택된 월(`selectMonth`)만 변경한다.

- **초기 표시 월**: 클라이언트가 사용자의 현재 날짜(`new Date()`)에서 현재 월을 계산하고, `months` 중 `month_num`이 현재 월과 일치하는 로드맵을 처음 화면에 보여준다.
- **현재 월에 해당하는 로드맵이 없을 경우**: `months`의 첫 번째 항목을 기본으로 표시한다.
- **앞/뒤 이동**: `months` 배열 내 인덱스 기준으로 이전/다음 월로 이동한다. 첫 번째 월에서는 "이전", 마지막 월에서는 "다음" 버튼을 비활성화한다.
