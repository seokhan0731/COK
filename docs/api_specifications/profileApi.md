# Profile API 명세서

## 공통 사항

| 항목      | 내용                              |
| --------- | --------------------------------- |
| 인증 방식 | Bearer Token (Authorization 헤더) |

## 1. 프로필 & 역량 조회

유저의 프로필 정보와 역량 정보를 함께 조회한다.

### Metadata

| 항목   | 값                |
| ------ | ----------------- |
| Method | `GET`             |
| URL    | `/user/profile` |

### Request Headers

| 헤더            | 값               | 필수 | 설명         |
| --------------- | ---------------- | ---- | ------------ |
| `Authorization` | `Bearer {token}` | O    | 액세스 토큰  |

### Response Body

| 필드             | 타입                | 필수 | 설명           |
| ---------------- | ------------------- | ---- | -------------- |
| `name`           | `string`            | O    | 이름           |
| `birthYear`      | `number`            | O    | 출생 연도      |
| `currentGrade`   | `GradeType`         | O    | 현재 학년      |
| `attendStatus`   | `AttendStatusType`  | O    | 재학 상태      |
| `imageUrl`       | `string`            | X    | 프로필 이미지 URL |
| `algorithmLevel` | `AlgorithmType`     | O    | 알고리즘 등급  |
| `certifications` | `CertificateType[]` | X    | 보유 자격증 목록 |
| `githubId`       | `string`            | O    | 깃허브 아이디  |

### Example

#### Response Body

```json
{
  "name": "홍길동",
  "birthYear": 2000,
  "currentGrade": 3,
  "attendStatus": "ENROLLED",
  "imageUrl": "https://cdn.example.com/profile/1.png",
  "algorithmLevel": "GOLD",
  "certifications": ["INFO_PROCESSING_ENGINEER", "SQLD"],
  "githubId": "gildong"
}
```

---

## 2. 프로필 수정

유저의 프로필 정보를 수정한다. 이미지 업로드를 위해 `multipart/form-data`로 전송한다.

### Metadata

| 항목   | 값              |
| ------ | --------------- |
| Method | `PATCH`         |
| URL    | `/user/profile` |

### Request Headers

| 헤더            | 값                    | 필수 | 설명          |
| --------------- | --------------------- | ---- | ------------- |
| `Authorization` | `Bearer {token}`      | O    | 액세스 토큰   |
| `Content-Type`  | `multipart/form-data` | O    | 요청 바디 형식 |

### Request Body

| 필드           | 타입               | 필수 | 설명             |
| -------------- | ------------------ | ---- | ---------------- |
| `name`         | `string`           | O    | 이름             |
| `birthYear`    | `number`           | O    | 출생 연도        |
| `attendStatus` | `AttendStatusType` | O    | 재학 상태        |
| `currentGrade` | `GradeType`        | X    | 현재 학년        |
| `imageFile`    | `File`             | X    | 프로필 이미지 파일 |

### Response Body

| 필드           | 타입               | 필수 | 설명              |
| -------------- | ------------------ | ---- | ----------------- |
| `name`         | `string`           | O    | 이름              |
| `birthYear`    | `number`           | O    | 출생 연도         |
| `attendStatus` | `AttendStatusType` | O    | 재학 상태         |
| `currentGrade` | `GradeType`        | X    | 현재 학년         |
| `imageUrl`     | `string`           | X    | 프로필 이미지 URL |

### Example

#### Response Body

```json
{
  "name": "홍길동",
  "birthYear": 2000,
  "attendStatus": "ENROLLED",
  "currentGrade": 3,
  "imageUrl": "https://cdn.example.com/profile/1.png"
}
```

---

## 3. 역량 수정

유저의 역량 정보(알고리즘 등급, 자격증, 깃허브 아이디)를 수정한다.

### Metadata

| 항목   | 값                    |
| ------ | --------------------- |
| Method | `PATCH`               |
| URL    | `/user/profile/skill` |

### Request Headers

| 헤더            | 값                 | 필수 | 설명          |
| --------------- | ------------------ | ---- | ------------- |
| `Authorization` | `Bearer {token}`   | O    | 액세스 토큰   |
| `Content-Type`  | `application/json` | O    | 요청 바디 형식 |

### Request Body

| 필드             | 타입                | 필수 | 설명          |
| ---------------- | ------------------- | ---- | ------------- |
| `algorithmLevel` | `AlgorithmType`     | O    | 알고리즘 등급 |
| `certifications` | `CertificateType[]` | X    | 보유 자격증 목록 |
| `githubId`       | `string`            | O    | 깃허브 아이디 |

### Response Body

| 필드             | 타입                | 필수 | 설명          |
| ---------------- | ------------------- | ---- | ------------- |
| `algorithmLevel` | `AlgorithmType`     | O    | 알고리즘 등급 |
| `certifications` | `CertificateType[]` | X    | 보유 자격증 목록 |
| `githubId`       | `string`            | O    | 깃허브 아이디 |

### Example

#### Request Body

```json
{
  "algorithmLevel": "GOLD",
  "certifications": ["INFO_PROCESSING_ENGINEER", "SQLD"],
  "githubId": "gildong"
}
```

#### Response Body

```json
{
  "algorithmLevel": "GOLD",
  "certifications": ["INFO_PROCESSING_ENGINEER", "SQLD"],
  "githubId": "gildong"
}
```

---

## 4. Type 정의

### `GradeType`

| 값  | 설명 |
| --- | ---- |
| `1` | 1학년 |
| `2` | 2학년 |
| `3` | 3학년 |
| `4` | 4학년 이상 |

### `AttendStatusType`

| 값          | 설명 |
| ----------- | ---- |
| `ENROLLED`  | 재학 |
| `ON_LEAVE`  | 휴학 |
| `GRADUATED` | 졸업 |

### `AlgorithmType`

| 값         | 설명       |
| ---------- | ---------- |
| `UNRATED`  | 언레이티드 |
| `BRONZE`   | 브론즈     |
| `SILVER`   | 실버       |
| `GOLD`     | 골드       |
| `PLATINUM` | 플래티넘   |
| `DIAMOND`  | 다이아     |
| `RUBY`     | 루비       |

### `CertificateType`

| 값                           | 설명                 | 발급 기관                         |
| ---------------------------- | -------------------- | --------------------------------- |
| `INFO_PROCESSING_ENGINEER`   | 정보처리기사         | 한국산업인력공단                  |
| `INFO_PROCESSING_INDUSTRIAL` | 정보처리산업기사     | 한국산업인력공단                  |
| `SQLD`                       | SQLD                 | 한국데이터산업진흥원              |
| `SQLP`                       | SQLP                 | 한국데이터산업진흥원              |
| `LINUX_MASTER_1`             | 리눅스마스터 1급     | 한국정보통신진흥협회              |
| `LINUX_MASTER_2`             | 리눅스마스터 2급     | 한국정보통신진흥협회              |
| `ADSP`                       | ADsP                 | 한국데이터산업진흥원              |
| `ADP`                        | ADP                  | 한국데이터산업진흥원              |
| `TENSORFLOW_DEVELOPER`       | TensorFlow Developer | Google                            |
| `AWS_CCP`                    | AWS CCP              | Amazon Web Services               |
| `AWS_SAA`                    | AWS SAA              | Amazon Web Services               |
| `AWS_DVA`                    | AWS DVA              | Amazon Web Services               |
| `CKA`                        | CKA                  | Cloud Native Computing Foundation |
| `CKAD`                       | CKAD                 | Cloud Native Computing Foundation |
| `RHCSA`                      | RHCSA                | Red Hat                           |
