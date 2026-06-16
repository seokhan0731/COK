<div align="center">

# 🎯 COK

### 취업을 **콕**, 진로를 **COK**!

사용자 피지컬 기반 **IT 직무·공고 추천** 및 **LLM 기반 맞춤 로드맵 생성** 플랫폼

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20+%20pgvector-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Status](https://img.shields.io/badge/status-in%20development-orange?style=flat-square)

</div>

---

## 📖 소개

**COK**는 사용자의 현재 역량(피지컬)을 분석해 가장 잘 맞는 **IT 직무와 채용 공고를 추천**하고,
목표 직무까지 도달하기 위한 **맞춤형 학습 로드맵을 LLM으로 생성**해주는 진로 설계 플랫폼입니다.

> "내 실력으로 어떤 직무에 지원할 수 있을까?"
> "이 직무를 목표로 한다면, 지금부터 무엇을 공부해야 할까?"
>
> COK는 이 두 질문에 데이터와 AI로 답합니다.

<br/>

## ✨ 주요 기능

| 기능 | 설명 |
| :--- | :--- |
| 🧑‍💻 **프로필 기반 분석** | 사용자의 기술 스택·경험을 입력받아 역량을 진단 |
| 🎯 **직무 / 공고 추천** | 피지컬 기반으로 적합한 IT 직무와 채용 공고를 매칭 |
| 🗺️ **AI 맞춤 로드맵** | LLM(Gemini)이 목표 직무까지의 학습 경로를 단계별로 생성 |
| 📊 **대시보드** | 추천 결과와 진행 상황을 시각화 |
| 🔗 **카카오 OAuth 로그인** | 간편한 소셜 로그인 지원 |
| 🕑 **히스토리** | 과거 추천·로드맵 기록 조회 |

<br/>

## 🛠️ 기술 스택

### Frontend
![React](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite%208-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router%207-CA4245?logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white)

- **상태/데이터**: TanStack Query, Zustand
- **UI**: Tailwind CSS, Radix UI, Lucide / React Icons, Recharts, Framer Motion
- **폼**: React Hook Form · **HTTP**: Axios · **폰트**: Pretendard

### Backend
![Spring Boot](https://img.shields.io/badge/Spring%20Boot%204-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java%2021-ED8B00?logo=openjdk&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

- Spring Boot 4 (Java 21), Spring Data JPA, Spring Security + JWT
- OpenFeign, Spring Cloud AWS

### Data Pipeline
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)

- FastAPI + Uvicorn, Google Gemini(`google-genai`)
- BeautifulSoup4 (공고 크롤링), psycopg2, httpx

### Infrastructure
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker%20Compose-2496ED?logo=docker&logoColor=white)

- PostgreSQL + **pgvector** (벡터 검색 / 임베딩 기반 추천)
- Docker Compose

<br/>

## 🏗️ 시스템 아키텍처

```text
┌──────────────┐      ┌──────────────────┐      ┌────────────────────┐
│   Frontend   │ ───▶ │     Backend      │ ───▶ │     PostgreSQL     │
│ React + Vite │ ◀─── │   Spring Boot    │ ◀─── │   + pgvector       │
└──────────────┘      └──────────────────┘      └────────────────────┘
                              ▲                           ▲
                              │                           │
                      ┌───────┴────────────┐              │
                      │   Data Pipeline     │ ─────────────┘
                      │  FastAPI + Gemini   │
                      │  (크롤링 · 임베딩)   │
                      └─────────────────────┘
```

<br/>

## 📁 프로젝트 구조

```text
COK/
├── frontend/          # React 19 + TypeScript + Vite SPA
│   └── src/
│       ├── api/        # API 통신 레이어
│       ├── component/  # 공통 컴포넌트
│       ├── page/       # 라우트 단위 페이지
│       ├── layout/     # 레이아웃
│       ├── store/      # Zustand 스토어
│       ├── hook/       # 커스텀 훅
│       ├── type/       # 타입 정의
│       └── util/       # 유틸리티
├── backend/           # Spring Boot 4 (Java 21) API 서버
├── data-pipeline/     # FastAPI + Gemini 데이터 파이프라인
├── docs/              # API 명세 · 설계 · 의사결정 기록
└── docker-compose.yml # PostgreSQL(pgvector) 인프라
```

<br/>

## 🚀 시작하기

### 사전 준비

루트에 `.env` 파일을 생성합니다.

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=cok
```

### 1. 데이터베이스 실행

```bash
docker compose up -d        # PostgreSQL + pgvector (localhost:54321)
```

### 2. Backend (Spring Boot)

```bash
cd backend
./gradlew bootRun
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev                 # 개발 서버 실행
```

| 스크립트 | 설명 |
| :--- | :--- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 체크 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

### 4. Data Pipeline (FastAPI)

```bash
cd data-pipeline
pip install -r requirements.txt
python main.py
```

<br/>

## 🤝 협업 규칙 (Convention)

### 🌿 Branch

| 브랜치 | 용도 |
| :--- | :--- |
| `main` | 배포용 브랜치 (**직접 Push 금지**) |
| `develop` | 개발 통합용 브랜치 |
| `feature/[기능명]` | 개인 작업 브랜치 (예: `feature/login`) |

### 📝 Commit

| 태그 | 설명 |
| :--- | :--- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `test` | 테스트 코드 추가 및 수정 |
| `refactor` | 코드 리팩토링 |
| `chore` | 빌드 수정 등 기타 업무 |

<br/>

## 📄 License

이 프로젝트는 [MIT License](LICENSE)를 따릅니다. © 2026

<div align="center">

<br/>

**🎯 취업을 콕, 진로를 COK!**

</div>
