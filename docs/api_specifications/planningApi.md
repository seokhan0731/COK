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
| URL | `/get/planning` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `roadmap_id` | `number` | O | 로드맵 고유 ID |
| `session_id` | `number` | O | 학기 세션 ID |
| `job_id` | `number` | O | 직무 ID |
| `created_at` | `string` | O | 로드맵 생성일시 (ISO 8601) |
| `months` | `MonthlyOverview[]` | O | 월별 로드맵 목록 |

### Example

Request
```
GET /get/planning
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
          "category": "CS",
          "overview_id": 1
        },
        {
          "detail_id": 2,
          "content": "운영체제 개념 학습",
          "is_completed": false,
          "category": "CS",
          "overview_id": 1
        }
      ]
    }
  ]
}
```

---

## 2. Type 정의

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
| `category` | `string` | O | 항목 카테고리 (예: CS, 자격증 등) |
| `overview_id` | `number` | O | 상위 월별 개요 ID |

---

## 3. 클라이언트 파생 데이터

서버 응답을 바탕으로 클라이언트에서 계산하는 값들이다.

| 값 | 계산 방식 | 설명 |
|----|-----------|------|
| `completed` | `details.filter(d => d.is_completed).length` | 완료된 세부 목표 수 |
| `remaining` | `details.length - completed` | 남은 세부 목표 수 |
| `currentMonthData` | `months.find(m => m.month_num === selectMonth)` | 현재 선택된 월 데이터 |