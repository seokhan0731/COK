# Survey API 명세서

COK 프로젝트 · 설문 모달 (SurveyModal)

---

## 공통 사항

| 항목 | 내용 |
|------|------|
| 인증 방식 | Bearer Token (Authorization 헤더) |
| Content-Type | `application/json` |


## 1. 설문 조회

설문에 표시할 질문·선택지 목록을 조회한다. 각 질문은 평가 역량(`competency_id`)과 선택지를 포함한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | GET |
| URL | `/survey` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `questions` | `Question[]` | O | 설문 질문 목록 |

### Example

Request
```
GET /survey
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response Body
```json
{
  "questions": [
    {
      "question_id": 1,
      "competency_id": 1,
      "content": "새로운 문제를 만났을 때 어떻게 접근하나요?",
      "type": "MULTI",
      "options": [
        { "option_id": 1, "question_id": 1, "content": "체계적으로 분석한다" },
        { "option_id": 2, "question_id": 1, "content": "직관적으로 해결한다" }
      ]
    },
    {
      "question_id": 2,
      "competency_id": 1,
      "content": "최근에 해결한 문제 중 가장 기억에 남는 경험을 자유롭게 서술해주세요.",
      "type": "ESSAY",
      "options": []
    }
  ]
}
```

---

## 2. GitHub 레포지토리 조회

설문 진행 시 사용자가 선택할 GitHub 레포지토리 목록을 조회한다.
백엔드가 사용자의 프로필에 저장된 `githubId`를 기반으로 GitHub에서 레포 목록을 가져와 내려준다.

### 조회 정책

| 항목 | 정책 |
|------|------|
| 공개 범위 | **public 레포만** (private 미포함) |
| 정렬 | 최근 수정순 |
| 개수 | 최대 30개  |

> 클라이언트는 `githubId`가 없는 사용자에게는 본 API를 호출하지 않고 깃허브 아이디 입력을 먼저 유도한다.
> 백엔드는 방어적으로, `githubId`가 비어 있는 사용자가 호출한 경우 빈 배열(`{ "repos": [] }`)을 반환한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | GET |
| URL | `/github/repos` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `repos` | `Repo[]` | O | 사용자의 GitHub 레포지토리 목록 |

### Example

Request
```
GET /github/repos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response Body
```json
{
  "repos": [
    {
      "name": "COK",
      "description": "역량 진단 및 성장 로드맵 서비스"
    },
    {
      "name": "algorithm",
      "description": null
    }
  ]
}
```

---

## 3. 기술 스택 조회 

선택한 레포지토리 이름 목록을 보내면, 해당 레포들에서 감지된 기술 스택 목록을 반환한다.
클라이언트는 이 목록을 체크박스로 보여주고, 사용자가 사용한 스택만 선택하여 제출.

> 클라이언트는 응답으로 받은 `stacks` 목록만 그대로 렌더링한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | POST |
| URL | `/github/stacks` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `selected_repos` | `string[]` | O | 스택을 감지할 레포지토리 이름 목록 (선택한 3개, `Repo.name`) |

### Response Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `stacks` | `Stack[]` | O | 선택한 레포들에서 감지된 기술 스택 목록 (중복 제거) |

### Example

Request
```
POST /github/stacks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Request Body
```json
{
  "selected_repos": [
    "COK",
    "algorithm",
    "study"
  ]
}
```

Response Body
```json
{
  "stacks": [
    { "keyword": "react", "name": "React" },
    { "keyword": "next", "name": "Next.js" },
    { "keyword": "tailwindcss", "name": "Tailwind CSS" },
    { "keyword": "docker", "name": "Docker" }
  ]
}
```

---

## 4. 설문 제출

사용자가 응답한 설문 답변을 제출한다. (깃 레포지토리와 기술 스택은 각각 별도 API로 제출한다.)

### Metadata

| 항목 | 값 |
|------|----|
| Method | POST |
| URL | `/survey/submit` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `answers` | `Answer[]` | O | 응답 목록 |
| `answers[].question_id` | `number` | O | 질문 ID |
| `answers[].option_id` | `number` | △ | 선택한 선택지 ID (객관식일 때 필수) |
| `answers[].essay_answer` | `string` | △ | 주관식 답변 텍스트 (주관식일 때 필수) |

> `△` = 질문 유형에 따라 선택적으로 들어가는 프로퍼티. 객관식은 `option_id`, 주관식은 `essay_answer` 중 하나만 보낸다.

### Response

성공 시 `200 OK`만 반환하며, 응답 바디는 없다.

### Example

Request
```
POST /survey/submit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Request Body
```json
{
  "answers": [
    { "question_id": 1, "option_id": 2 },
    { "question_id": 2, "essay_answer": "대용량 트래픽 처리 중 발생한 병목을 캐시 도입으로 해결한 경험이 있습니다." }
  ]
}
```

---

## 5. 깃 레포지토리 제출

사용자가 선택한 깃 레포지토리 이름 목록(최대 3개)을 제출한다.

### Metadata

| 항목 | 값 |
|------|----|
| Method | POST |
| URL | `/survey/repos` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `selected_repos` | `string[]` | O | 선택한 레포지토리 이름 목록 (선택한 3개, `Repo.name`) |

### Response

성공 시 `200 OK`만 반환하며, 응답 바디는 없다.

### Example

Request

```
POST /survey/repos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Request Body

```json
{
  "selected_repos": [
    "COK",
    "algorithm",
    "study"
  ]
}
```

---

## 6. 기술 스택 제출

사용자가 확인·선택한 기술 스택 `keyword` 목록을 제출한다. (`3. 기술 스택 조회` 응답에서 고른 값)

### Metadata

| 항목 | 값 |
|------|----|
| Method | POST |
| URL | `/survey/stacks` |

### Request Headers

| 헤더 | 값 | 필수 | 설명 |
|------|----|------|------|
| `Authorization` | `Bearer {accessToken}` | O | 로그인 사용자 인증 토큰 |
| `Content-Type` | `application/json` | O | 요청 바디 형식 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `selected_stacks` | `string[]` | O | 사용자가 확인·선택한 기술 스택 `keyword` 목록. 선택한 스택이 없으면 빈 배열 `[]` |

> `selected_stacks`에는 `Stack.name`이 아니라 **`Stack.keyword`** 를 담는다.

### Response

성공 시 `200 OK`만 반환하며, 응답 바디는 없다.

### Example

Request

```
POST /survey/stacks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Request Body

```json
{
  "selected_stacks": ["react", "next", "tailwindcss"]
}
```

---

## 7. Type 정의

### Repo

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | `string` | O | 레포지토리 이름 (제출 시 `selected_repos`에 사용) |
| `description` | `string` | X | 레포지토리 설명 (없으면 `null`) |

- html url 제거

### Stack

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `keyword` | `string` | O | 기술 스택 키워드 (마스터 표 기준 식별자, 제출 시 `selected_stacks`에 사용) |
| `name` | `string` | O | 화면 표시용 이름 |

### Question

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `question_id` | `number` | O | 질문 고유 ID (`AssessmentQuestion.question_id`) |
| `competency_id` | `number` | O | 평가 역량 ID (`AssessmentQuestion.competency_id`) |
| `content` | `string` | O | 질문 내용 |
| `type` | `QuestionType` | O | 질문 유형 (`MULTI` / `ESSAY`) |
| `options` | `Option[]` | O | 선택지 목록 (주관식은 빈 배열 `[]`) |

### QuestionType

| 값 | 설명 |
|----|------|
| `"MULTI"` | 객관식 단일 선택 (선택지 중 하나 선택) |
| `"ESSAY"` | 주관식 (텍스트 서술) |

### Option

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `option_id` | `number` | O | 선택지 고유 ID |
| `question_id` | `number` | O | 상위 질문 ID |
| `content` | `string` | O | 선택지 내용 |

### Answer (제출용)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `question_id` | `number` | O | 질문 ID |
| `option_id` | `number` | △ | 선택한 선택지 ID (객관식일 때 필수) |
| `essay_answer` | `string` | △ | 주관식 답변 텍스트 (주관식 `ESSAY`일 때 필수) |

> `△` = 질문 유형에 따라 선택적으로 들어가는 프로퍼티. 객관식은 `option_id`, 주관식은 `essay_answer` 중 하나만 보낸다.
