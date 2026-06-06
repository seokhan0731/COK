# Dashboard API 명세서

## 공통 사항

| 항목      | 내용                              |
| --------- | --------------------------------- |
| 인증 방식 | Bearer Token (Authorization 헤더) |

## 1. 역량 분석 조회

유저의 역량 분석 결과(6가지 역량 점수)와 AI 코멘트를 조회한다.

### Metadata

| 항목   | 값            |
| ------ | ------------- |
| Method | `GET`         |
| URL    | `/user/skill` |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Response Body

| 필드           | 타입              | 필수 | 설명             |
| -------------- | ----------------- | ---- | ---------------- |
| `competencies` | `SkillDataType[]` | O    | 역량별 점수 목록 |
| `comment`      | `string`          | O    | AI 분석 코멘트   |

### Example

#### Response Body

```json
{
  "competencies": [
    { "skill": "collaboration", "value": 100 },
    { "skill": "csKnowledge", "value": 65 },
    { "skill": "implementation", "value": 90 },
    { "skill": "algorithm", "value": 70 },
    { "skill": "trend", "value": 55 },
    { "skill": "infrastructure", "value": 60 }
  ],
  "comment": "조인흠님은 6가지 역량 중 [CS 지식]과 [구현력]이 특히 돋보입니다. 탄탄한 컴퓨터 구조 이해도를 바탕으로 코드를 직접 설계하고 구현하는 능력이 뛰어나므로, 대용량 트래픽과 서버 아키텍처를 다루는 [백엔드 엔지니어] 직무에 가장 완벽하게 부합합니다."
}
```

---

## 2. Type 정의

### `SkillDataType`

| 필드    | 타입        | 필수 | 설명              |
| ------- | ----------- | ---- | ----------------- |
| `skill` | `SkillType` | O    | 역량 종류         |
| `value` | `number`    | O    | 역량 점수 (0~100) |

### `SkillType`

| 값               | 설명     |
| ---------------- | -------- |
| `collaboration`  | 협업     |
| `csKnowledge`    | CS 지식  |
| `implementation` | 구현력   |
| `algorithm`      | 알고리즘 |
| `trend`          | 트렌드   |
| `infrastructure` | 인프라   |
