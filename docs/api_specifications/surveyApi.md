# Survey API 명세서

COK 프로젝트 · 설문 모달 (SurveyModal)

---

## 공통 사항

| 항목 | 내용 |
|------|------|
| 인증 방식 | Bearer Token (Authorization 헤더) |
| Content-Type | `application/json` |

---

## 1. 설문 조회

역량 진단 설문 목록을 조회한다. 카테고리별 질문과 선택지를 포함한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | GET |
| URL | `/get/survey` |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `survey` | `Survey[]` | O | 카테고리별 설문 목록 |

### Example

Request
```
GET /get/survey
```

Response Body
```json
{
  "survey": [
    {
      "competency_id": 1,
      "category": "문제 해결력",
      "questions": [
        {
          "question_id": 1,
          "competency_id": 1,
          "content": "새로운 문제를 만났을 때 어떻게 접근하나요?",
          "type": "single",
          "options": [
            { "option_id": 1, "question_id": 1, "content": "체계적으로 분석한다", "score": 5 },
            { "option_id": 2, "question_id": 1, "content": "직관적으로 해결한다", "score": 3 }
          ]
        }
      ]
    }
  ]
}
```

---

## 2. 설문 제출

사용자가 응답한 설문 답변을 제출한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | POST |
| URL | `/api/survey/submit` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `answers` | `Answer[]` | O | 응답 목록 |
| `answers[].question_id` | `number` | O | 질문 ID |
| `answers[].option_id` | `number` | O | 선택한 선택지 ID |

### Example

Request Body
```json
{
  "answers": [
    { "question_id": 1, "option_id": 2 },
    { "question_id": 2, "option_id": 5 }
  ]
}
```

---

## 3. Type 정의

### Survey

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `competency_id` | `number` | O | 역량 고유 ID |
| `category` | `string` | O | 역량 카테고리명 |
| `questions` | `Question[]` | O | 질문 목록 |

### Question

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `question_id` | `number` | O | 질문 고유 ID |
| `competency_id` | `number` | O | 상위 역량 ID |
| `content` | `string` | O | 질문 내용 |
| `type` | `string` | O | 질문 유형 |
| `options` | `Option[]` | O | 선택지 목록 |

### Option

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `option_id` | `number` | O | 선택지 고유 ID |
| `question_id` | `number` | O | 상위 질문 ID |
| `content` | `string` | O | 선택지 내용 |
| `score` | `number` | O | 선택지 점수 |

### Answer (제출용)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `question_id` | `number` | O | 질문 ID |
| `option_id` | `number` | O | 선택한 선택지 ID |