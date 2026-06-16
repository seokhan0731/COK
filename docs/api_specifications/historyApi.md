# History API 명세서

## 공통 사항

| 항목      | 내용                              |
| --------- | --------------------------------- |
| 인증 방식 | Bearer Token (Authorization 헤더) |

## 1. 설문 세션 결과 조회

지정한 설문 세션의 분석 결과(역량 점수 · 추천 직무 · 매칭 공고)를 조회한다.

> `session_id`에 해당하는 세션이 존재하지 않거나 토큰 유저의 세션이 아닌 경우 `404 Not Found`를 반환한다.

### Metadata

| 항목   | 값                             |
| ------ | ------------------------------ |
| Method | `GET`                          |
| URL    | `/history/result/{session_id}` |

### Path Parameters

| 파라미터     | 타입     | 필수 | 설명                                        |
| ------------ | -------- | ---- | ------------------------------------------- |
| `session_id` | `number` | O    | 조회할 설문 세션 ID (설문 답변 제출 시 발급) |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Request Body

없음

### Response Body

| 필드                 | 타입                 | 필수 | 설명                                            |
| -------------------- | -------------------- | ---- | ----------------------------------------------- |
| `session`            | `Session`            | O    | 설문 세션 정보                                  |
| `competency_results` | `CompetencyResult[]` | O    | 역량별 점수 목록 (전체 6개, `value` 내림차순)   |
| `job_results`        | `JobResult[]`        | O    | 추천 직무 Top 3 (`match` 내림차순)              |
| `posting_results`    | `PostingResult[]`    | O    | 매칭 공고 Top 3 (`match` 내림차순)              |


> 점수(`value`, `match`)는 0~100 범위의 **정수**(반올림)로 반환한다.

### Example

#### Response Body

```json
{
  "session": {
    "session_id": 12,
    "user_id": 3,
    "created_at": "2026-06-10T14:23:00Z"
  },
  "competency_results": [
    { "skill": "COLLABORATION", "value": 85 },
    { "skill": "IMPLEMENTATION", "value": 78 },
    { "skill": "ALGORITHM", "value": 64 },
    { "skill": "CS_KNOWLEDGE", "value": 61 },
    { "skill": "TREND", "value": 55 },
    { "skill": "INFRA_STRUCTURE", "value": 50 }
  ],
  "job_results": [
    { "job_id": 1, "match": 92 },
    { "job_id": 6, "match": 81 },
    { "job_id": 5, "match": 74 }
  ],
  "posting_results": [
    {
      "posting_id": 101,
      "company_name": "토스",
      "title": "Server Developer",
      "description": "결제 서버 개발",
      "match": 95
    },
    {
      "posting_id": 214,
      "company_name": "당근",
      "title": "Backend Engineer",
      "description": "지역 서비스 백엔드 개발",
      "match": 88
    }
  ]
}
```

---

## 2. 설문 이력 목록 조회

유저가 진행한 설문 세션 이력 목록을 조회한다.
목록의 각 항목은 해당 세션의 1순위 추천 직무(`top_job`)와 최고 점수 역량(`top_competency`, `top_score`)을 요약해 담는다.

> `history`는 서버에서 `created_at` 기준 최신순(내림차순)으로 정렬해 반환한다.


### Metadata

| 항목   | 값              |
| ------ | --------------- |
| Method | `GET`           |
| URL    | `/history/list` |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Request Body

없음

### Response Body

| 필드      | 타입               | 필수 | 설명                           |
| --------- | ------------------ | ---- | ------------------------------ |
| `history` | `SessionHistory[]` | O    | 설문 세션 이력 목록            |
| `total`   | `number`           | O    | 전체 설문 이력 개수            |

### Example

#### Response Body

```json
{
  "history": [
    {
      "session_id": 12,
      "created_at": "2026-06-10T14:23:00Z",
      "top_job": 1,
      "top_competency": "COLLABORATION",
      "top_score": 85
    },
    {
      "session_id": 9,
      "created_at": "2026-05-28T10:02:00Z",
      "top_job": 6,
      "top_competency": "IMPLEMENTATION",
      "top_score": 78
    }
  ],
  "total": 2
}
```

---

## 3. Type 정의

### `Session`

| 필드         | 타입     | 필수 | 설명                 |
| ------------ | -------- | ---- | -------------------- |
| `session_id` | `number` | O    | 설문 세션 ID         |
| `user_id`    | `number` | O    | 유저 ID              |
| `created_at` | `string` | O    | 설문 일시 (ISO 8601, UTC) |

### `CompetencyResult`

| 필드    | 타입        | 필수 | 설명              |
| ------- | ----------- | ---- | ----------------- |
| `skill` | `SkillType` | O    | 역량 종류         |
| `value` | `number`    | O    | 역량 점수 |

### `JobResult`

| 필드     | 타입      | 필수 | 설명           |
| -------- | --------- | ---- | -------------- |
| `job_id` | `JobType` | O    | 직무 ID  |
| `match`  | `number`  | O    | 적합도  |

### `PostingResult`

| 필드           | 타입     | 필수 | 설명           |
| -------------- | -------- | ---- | -------------- |
| `posting_id`   | `number` | O    | 공고 ID        |
| `company_name` | `string` | O    | 회사 이름      |
| `title`        | `string` | O    | 공고 제목      |
| `description`  | `string` | O    | 공고 설명      |
| `match`        | `number` | O    | 유사도 (0~100) |

### `SessionHistory`

| 필드             | 타입        | 필수 | 설명                   |
| ---------------- | ----------- | ---- | ---------------------- |
| `session_id`     | `number`    | O    | 설문 세션 ID           |
| `created_at`     | `string`    | O    | 설문 일시 (ISO 8601, UTC) |
| `top_job`        | `JobType`   | O    | 1순위 추천 직무 ID     |
| `top_competency` | `SkillType` | O    | 최고 점수 역량         |
| `top_score`      | `number`    | O    | 최고 역량 점수 (0~100) |

### `SkillType`

| 값                | 설명     |
| ----------------- | -------- |
| `COLLABORATION`   | 협업     |
| `CS_KNOWLEDGE`    | CS 지식  |
| `IMPLEMENTATION`  | 구현력   |
| `ALGORITHM`       | 알고리즘 |
| `TREND`           | 트렌드   |
| `INFRA_STRUCTURE` | 인프라   |

### `JobType`

| 값  | 직무                   |
| --- | ---------------------- |
| 1   | 백엔드 개발자          |
| 2   | 프론트엔드 개발자      |
| 3   | 모바일 개발자          |
| 4   | AI/ML 엔지니어         |
| 5   | DevOps 엔지니어        |
| 6   | 데이터 엔지니어        |
| 7   | PM/매니지먼트          |
| 8   | 시스템/임베디드 개발자 |
| 9   | 그래픽스 엔지니어      |
| 10  | 블록체인 엔지니어      |
| 11  | 영상/음성 엔지니어     |
