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
    { "skill": "COLLABORATION", "value": 100 },
    { "skill": "CS_KNOWLEDGE", "value": 65 },
    { "skill": "IMPLEMENTATION", "value": 90 },
    { "skill": "ALGORITHM", "value": 70 },
    { "skill": "TREND", "value": 55 },
    { "skill": "INFRA_STRUCTURE", "value": 60 }
  ],
}
```

---

## 2. 직무 추천 Top 3 조회

유저의 역량 분석 결과를 기반으로 적합도가 높은 직무 Top 3를 조회한다.

### Metadata

| 항목   | 값                    |
| ------ | --------------------- |
| Method | `GET`                 |
| URL    | `/user/recommend/job` |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Response Body

| 필드   | 타입            | 필수 | 설명                              |
| ------ | --------------- | ---- | --------------------------------- |
| `jobs` | `JobDataType[]` | O    | 적합도 내림차순 직무 목록 (Top 3) |

### Example

#### Response Body

```json
{
  "jobs": [
    { "jobId": 1, "match": 96 },
    { "jobId": 8, "match": 87 },
    { "jobId": 3, "match": 58 }
  ]
}
```

---

## 3. 공고 추천 Top 3 조회

유저의 역량 분석 결과를 기반으로 유사도가 높은 채용 공고 Top 3를 조회한다.

### Metadata

| 항목   | 값                        |
| ------ | ------------------------- |
| Method | `GET`                     |
| URL    | `/user/recommend/posting` |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Response Body

| 필드       | 타입                | 필수 | 설명                              |
| ---------- | ------------------- | ---- | --------------------------------- |
| `postings` | `PostingDataType[]` | O    | 유사도 내림차순 공고 목록 (Top 3) |

### Example

#### Response Body

```json
{
  "postings": [
    {
      "companyName": "토스",
      "title": "Data Engineer",
      "match": 98,
      "postingUrl": "https://www.wanted.co.kr/wd/123456"
    },
    {
      "companyName": "당근",
      "title": "Backend Engineer",
      "match": 95,
      "postingUrl": "https://www.wanted.co.kr/wd/234567"
    },
    {
      "companyName": "우아한형제들",
      "title": "Java Backend Developer",
      "match": 91,
      "postingUrl": "https://www.wanted.co.kr/wd/345678"
    }
  ]
}
```

---

## 4. 로드맵 전체 진행도 조회

유저의 로드맵 **전체** 진행도(목표 대비 달성률)를 조회한다.
로드맵 생성 여부(`hasRoadmap`)에 따라 진행도를 표시하거나, 미생성 안내를 노출한다.

> 진행도는 `RoadMap`의 모든 `MonthlyDetail` 중 `is_completed = true`인 항목의 비율로 산출한다.
> 로드맵이 없으면(`RoadMap` 미존재) `hasRoadmap`은 `false`, `progress`는 `null`로 응답한다.

### Metadata

| 항목   | 값                           |
| ------ | ---------------------------- |
| Method | `GET`                        |
| URL    | `/user/roadmap/progress/all` |

### Request Headers

| 헤더            | 값               | 필수 | 설명        |
| --------------- | ---------------- | ---- | ----------- |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰 |

### Response Body

| 필드         | 타입             | 필수 | 설명                                               |
| ------------ | ---------------- | ---- | -------------------------------------------------- |
| `hasRoadmap` | `boolean`        | O    | 로드맵 생성 여부 (`false`면 진행도 영역 블러 처리) |
| `progress`   | `number \| null` | O    | 전체 목표 대비 달성률 (0~100). 미생성 시 `null`    |

### Example

#### Response Body (로드맵 생성됨)

```json
{
  "hasRoadmap": true,
  "progress": 70
}
```

#### Response Body (로드맵 미생성)

```json
{
  "hasRoadmap": false,
  "progress": null
}
```

---

## 5. Type 정의

### `SkillDataType`

| 필드    | 타입        | 필수 | 설명              |
| ------- | ----------- | ---- | ----------------- |
| `skill` | `SkillType` | O    | 역량 종류         |
| `value` | `number`    | O    | 역량 점수 (0~100) |

### `SkillType`

| 값               | 설명     |
| ---------------- | -------- |
| `COLLABORATION`  | 협업     |
| `CS_KNOWLEDGE`   | CS 지식  |
| `IMPLEMENTATION` | 구현력   |
| `ALGORITHM`      | 알고리즘 |
| `TREND`          | 트렌드   |
| `INFRA_STRUCTURE` | 인프라   |

### `JobDataType`

| 필드    | 타입      | 필수 | 설명           |
| ------- | --------- | ---- | -------------- |
| `jobId` | `JobType` | O    | 직무 ID (1~11) |
| `match` | `number`  | O    | 적합도 (0~100) |

### `PostingDataType`

| 필드          | 타입     | 필수 | 설명                           |
| ------------- | -------- | ---- | ------------------------------ |
| `companyName` | `string` | O    | 회사 이름 (`company_name`)     |
| `title`       | `string` | O    | 공고 제목 (`title`)            |
| `match`       | `number` | O    | 유사도 (`similarity`, 0~100)   |
| `postingUrl`  | `string` | O    | 공고 원본 주소 (`posting_url`) |

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
