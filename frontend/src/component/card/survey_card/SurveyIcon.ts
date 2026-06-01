import { 
  FaCode, FaMagnifyingGlass, FaPlug, FaWrench,        // 개발역량
  FaUsers, FaComments, FaFileLines, FaHandshake,       // 협업
  FaBook, FaStackOverflow, FaScroll, FaFlask,          // 트렌드
  FaServer, FaDatabase, FaLock, FaBolt,                // CS 지식
  FaRepeat, FaPuzzlePiece, FaBinoculars, FaChartLine,  // 알고리즘
  FaUpload, FaBell,                             // 인프라
} from 'react-icons/fa6'

import { FaBoxes } from 'react-icons/fa'

export const OPTION_ICONS: Record<number, React.ElementType> = {
  // 개발역량 - Q1 (새로운 기능 개발)
  1:  FaCode,              // 바로 코드 작성
  2:  FaWrench,            // 구현 순서 정리
  3:  FaMagnifyingGlass,   // 데이터 흐름 설계
  4:  FaChartLine,         // 확장성까지 고려

  // 개발역량 - Q2 (버그 해결)
  5:  FaMagnifyingGlass,   // 검색으로 사례 탐색
  6:  FaCode,              // 로그 출력
  7:  FaBinoculars,        // 실행 흐름 분석
  8:  FaWrench,            // 구조 개선

  // 개발역량 - Q3 (외부 API 연동)
  9:  FaPlug,              // 기능 구현
  10: FaLock,              // 예외 처리
  11: FaBolt,              // 실패 상황 대응
  12: FaFlask,             // 복구 전략

  // 개발역량 - Q4 (복잡한 코드)
  13: FaWrench,            // 그대로 둔다
  14: FaCode,              // 필요한 부분만 수정
  15: FaPuzzlePiece,       // 리팩토링
  16: FaChartLine,         // 확장 고려 개선

  // 협업 - Q5 (의견 충돌)
  17: FaUsers,             // 다수 의견 따름
  18: FaComments,          // 근거와 함께 설명
  19: FaHandshake,         // 장단점 비교 논의
  20: FaFileLines,         // 팀 합의 이끌기

  // 협업 - Q6 (코드 리뷰)
  21: FaMagnifyingGlass,   // 오류 확인
  22: FaComments,          // 개선 제안
  23: FaCode,              // 기술적 이유 설명
  24: FaChartLine,         // 팀 품질 향상 관점

  // 협업 - Q7 (진행 내용 공유)
  25: FaComments,          // 구두 설명
  26: FaHandshake,         // 채팅 전달
  27: FaFileLines,         // 문서 정리
  28: FaScroll,            // 문서화 + 근거 기록

  // 트렌드 - Q8 (새로운 기술 학습)
  29: FaBook,              // 개념만 확인
  30: FaBinoculars,        // 블로그·영상 탐색
  31: FaScroll,            // 공식 문서 기반
  32: FaFlask,             // 프로젝트 적용 검증

  // 트렌드 - Q9 (정보 탐색)
  33: FaMagnifyingGlass,   // AI·검색 결과 적용
  34: FaStackOverflow,     // 커뮤니티 참고
  35: FaScroll,            // 공식 문서 확인
  36: FaCode,              // 소스코드 분석

  // 트렌드 - Q10 (프레임워크 도입)
  37: FaBolt,              // 최신이므로 도입
  38: FaBinoculars,        // 사용 사례 확인
  39: FaPuzzlePiece,       // 장단점 비교
  40: FaChartLine,         // 유지보수 비용 고려

  // CS지식 - Q11 (데이터 조회 속도)
  41: FaServer,            // 서버 자원 확인
  42: FaCode,              // 쿼리 점검
  43: FaDatabase,          // 인덱스 확인
  44: FaMagnifyingGlass,   // 종합 분석

  // CS지식 - Q12 (동시 접속 설계)
  45: FaBolt,              // 서버 성능 향상
  46: FaServer,            // 서버 분산
  47: FaDatabase,          // 캐싱 전략
  48: FaChartLine,         // 비동기·확장성

  // CS지식 - Q13 (동시 데이터 수정)
  49: FaLock,              // 중복 요청 방지
  50: FaWrench,            // 예외 처리
  51: FaBolt,              // 동기화·경쟁 상태
  52: FaDatabase,          // 데이터 정합성

  // CS지식 - Q14 (응답 속도 개선)
  53: FaServer,            // 데이터 크기 감소
  54: FaPlug,              // API 호출 감소
  55: FaDatabase,          // 캐싱·CDN
  56: FaChartLine,         // 구조·통신 최적화

  // 알고리즘 - Q15 (중복 제거·탐색)
  57: FaRepeat,            // 반복문
  58: FaWrench,            // 내장 함수
  59: FaDatabase,          // 자료구조 선택
  60: FaChartLine,         // 복잡도 고려 설계

  // 알고리즘 - Q16 (복잡한 요구사항)
  61: FaCode,              // 구현하면서 해결
  62: FaBinoculars,        // 유사 사례 참고
  63: FaPuzzlePiece,       // 작은 단위 분해
  64: FaChartLine,         // 전체 구조 설계

  // 알고리즘 - Q17 (정렬 데이터 탐색)
  65: FaRepeat,            // 순차 탐색
  66: FaWrench,            // 검색 함수 활용
  67: FaBolt,              // 이진 탐색
  68: FaDatabase,          // 자료구조 재설계

  // 인프라 - Q18 (배포 방식)
  69: FaUpload,            // 직접 업로드
  70: FaServer,            // 원격 수동 배포
  71: FaBoxes,             // 컨테이너 배포
  72: FaChartLine,         // 자동화 파이프라인

  // 인프라 - Q19 (장애 감지)
  73: FaUsers,             // 사용자 제보
  74: FaScroll,            // 로그 수동 확인
  75: FaBinoculars,        // 모니터링 대시보드
  76: FaBell,              // 자동 알림 시스템

  // 인프라 - Q20 (환경 차이 해결)
  77: FaWrench,            // 수동으로 맞춤
  78: FaFileLines,         // 설정 문서 작성
  79: FaBoxes,             // 컨테이너 통일
  80: FaCode,              // 환경 구성 코드화
}