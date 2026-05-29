import type { HubItem } from "../../type/infoType";

const MOCK_ITEMS: HubItem[] = [
    { "id": 1, "type": "job", "name": "백엔드 개발자", "description": "백엔드 개발자는 API 설계, 서버 구축 및 요구사항 기반 구현을 수행합니다." },
    { "id": 2, "type": "job", "name": "프론트엔드 개발자", "description": "프론트엔드 개발자는 사용자 인터페이스 설계 및 웹 애플리케이션 구현을 수행합니다." },
    { "id": 3, "type": "job", "name": "데이터 엔지니어", "description": "데이터 엔지니어는 데이터 파이프라인 설계 및 대규모 데이터 처리 시스템을 구축합니다." },
    { "id": 4, "type": "job", "name": "DevOps 엔지니어", "description": "DevOps 엔지니어는 CI/CD 파이프라인 구축 및 인프라 자동화를 수행합니다." },
    { "id": 5, "type": "job", "name": "AI/ML 엔지니어", "description": "AI/ML 엔지니어는 머신러닝 모델 개발 및 서비스 적용을 수행합니다." },
    { "id": 6, "type": "job", "name": "모바일 개발자", "description": "모바일 개발자는 iOS/Android 앱 설계 및 네이티브·크로스플랫폼 개발을 수행합니다." },
    { "id": 7, "type": "job", "name": "보안 엔지니어", "description": "보안 엔지니어는 시스템 취약점 분석 및 보안 솔루션 설계를 수행합니다." },
    { "id": 8, "type": "job", "name": "QA 엔지니어", "description": "QA 엔지니어는 소프트웨어 품질 보증 및 테스트 자동화를 수행합니다." },
    { "id": 1, "type": "certification", "name": "정보처리기사", "issuer": "한국산업인력공단", "description": "소프트웨어 개발 전반에 대한 국가 공인 자격증입니다." },
    { "id": 2, "type": "certification", "name": "SQLD", "issuer": "한국데이터산업진흥원", "description": "SQL 기반 데이터베이스 설계 및 활용 능력을 검증하는 자격증입니다." },
    { "id": 3, "type": "certification", "name": "AWS SAA", "issuer": "Amazon Web Services", "description": "AWS 클라우드 아키텍처 설계 역량을 인증하는 국제 자격증입니다." },
    { "id": 4, "type": "certification", "name": "리눅스마스터 2급", "issuer": "한국정보통신진흥협회", "description": "리눅스 시스템 관리 및 운영 능력을 검증하는 자격증입니다." },
    { "id": 5, "type": "certification", "name": "네트워크관리사 2급", "issuer": "한국정보통신자격협회", "description": "네트워크 구축 및 운영 관리 능력을 검증하는 자격증입니다." },
    { "id": 6, "type": "certification", "name": "ISTQB CTFL", "issuer": "ISTQB", "description": "소프트웨어 테스팅 기초 역량을 인증하는 국제 자격증입니다." },
    { "id": 7, "type": "certification", "name": "CCNA", "issuer": "Cisco", "description": "네트워크 기초 및 라우팅/스위칭 역량을 인증하는 국제 자격증입니다." },
    { "id": 8, "type": "certification", "name": "정보보안기사", "issuer": "한국인터넷진흥원", "description": "정보보안 관리 및 기술 역량을 검증하는 국가 공인 자격증입니다." }
  ]

  export default MOCK_ITEMS