import type { Survey } from "../../../type/surveyType"

export const SURVEY_DATA: Survey[] = [
  {
    competency_id: 1,
    category: '개발 역량',
    questions: [
      {
        question_id: 1,
        competency_id: 1,
        content: '새로운 기능 개발을 시작할 때 가장 먼저 하는 행동은?',
        type: '객관식',
        options: [
          { option_id: 1, question_id: 1, content: '요구사항을 보면서 바로 코드를 작성하기 시작한다.', score: 1 },
          { option_id: 2, question_id: 1, content: '구현 순서를 간단히 정리한 뒤 개발한다.', score: 2 },
          { option_id: 3, question_id: 1, content: '필요한 기능과 데이터 흐름을 먼저 설계한 후 구현한다.', score: 3 },
          { option_id: 4, question_id: 1, content: '향후 확장과 변경 가능성까지 고려하여 구조를 설계한 뒤 구현한다.', score: 4 },
        ],
      },
      {
        question_id: 2,
        competency_id: 1,
        content: '예상치 못한 버그가 발생했을 때 주로 어떻게 해결하는가?',
        type: '객관식',
        options: [
          { option_id: 5, question_id: 2, content: '검색을 통해 비슷한 사례를 찾아 적용한다.', score: 1 },
          { option_id: 6, question_id: 2, content: '로그를 출력하며 문제가 발생한 위치를 추적한다.', score: 2 },
          { option_id: 7, question_id: 2, content: '로그와 실행 흐름을 분석하여 근본 원인을 찾는다.', score: 3 },
          { option_id: 8, question_id: 2, content: '원인뿐 아니라 동일 유형의 문제가 재발하지 않도록 구조를 개선한다.', score: 4 },
        ],
      },
      {
        question_id: 3,
        competency_id: 1,
        content: '외부 API를 연동하는 기능을 구현할 때 가장 중요하게 생각하는 것은?',
        type: '객관식',
        options: [
          { option_id: 9,  question_id: 3, content: '정상적으로 데이터를 받아오는 기능 구현', score: 1 },
          { option_id: 10, question_id: 3, content: '비정상 데이터에 대한 기본 예외 처리', score: 2 },
          { option_id: 11, question_id: 3, content: '네트워크 장애·응답 지연 등 다양한 실패 상황 대응', score: 3 },
          { option_id: 12, question_id: 3, content: '장애 발생 시에도 서비스 영향이 최소화되도록 복구 전략까지 고려', score: 4 },
        ],
      },
      {
        question_id: 4,
        competency_id: 1,
        content: '기존 기능은 동작하지만 코드가 매우 복잡합니다. 어떻게 하시겠습니까?',
        type: '객관식',
        options: [
          { option_id: 13, question_id: 4, content: '동작하므로 그대로 둔다.', score: 1 },
          { option_id: 14, question_id: 4, content: '필요한 부분만 수정한다.', score: 2 },
          { option_id: 15, question_id: 4, content: '리팩토링하여 구조를 개선한다.', score: 3 },
          { option_id: 16, question_id: 4, content: '현재 요구사항뿐 아니라 향후 기능 확장을 고려하여 구조를 개선한다.', score: 4 },
        ],
      },
    ],
  },
  {
    competency_id: 2,
    category: '협업',
    questions: [
      {
        question_id: 5,
        competency_id: 2,
        content: '기술적 의견이 충돌했을 때 어떻게 행동하는가?',
        type: '객관식',
        options: [
          { option_id: 17, question_id: 5, content: '경험이 많은 사람이나 다수 의견을 따른다.', score: 1 },
          { option_id: 18, question_id: 5, content: '자신의 의견을 근거와 함께 설명한다.', score: 2 },
          { option_id: 19, question_id: 5, content: '각 방안의 장단점을 비교하여 논의한다.', score: 3 },
          { option_id: 20, question_id: 5, content: '객관적 자료나 간단한 검증 결과를 기반으로 팀 합의를 이끈다.', score: 4 },
        ],
      },
      {
        question_id: 6,
        competency_id: 2,
        content: '팀원의 코드를 리뷰할 때 가장 자주 하는 행동은?',
        type: '객관식',
        options: [
          { option_id: 21, question_id: 6, content: '오류나 오타를 확인한다.', score: 1 },
          { option_id: 22, question_id: 6, content: '개선 가능한 부분을 제안한다.', score: 2 },
          { option_id: 23, question_id: 6, content: '왜 개선이 필요한지 기술적 이유를 설명한다.', score: 3 },
          { option_id: 24, question_id: 6, content: '팀 전체 코드 품질 향상 관점에서 대안과 개선 방향을 제시한다.', score: 4 },
        ],
      },
      {
        question_id: 7,
        competency_id: 2,
        content: '프로젝트 진행 내용을 공유해야 한다면?',
        type: '객관식',
        options: [
          { option_id: 25, question_id: 7, content: '구두로 설명', score: 1 },
          { option_id: 26, question_id: 7, content: '채팅으로 전달', score: 2 },
          { option_id: 27, question_id: 7, content: '문서 정리', score: 3 },
          { option_id: 28, question_id: 7, content: '문서화 + 의사결정 근거 기록', score: 4 },
        ],
      },
    ],
  },
  {
    competency_id: 3,
    category: '트렌드',
    questions: [
      {
        question_id: 8,
        competency_id: 3,
        content: '새로운 기술을 접했을 때 일반적으로 어떻게 학습하는가?',
        type: '객관식',
        options: [
          { option_id: 29, question_id: 8, content: '개념만 확인한다.', score: 1 },
          { option_id: 30, question_id: 8, content: '블로그·영상 등을 통해 사용 사례를 찾아본다.', score: 2 },
          { option_id: 31, question_id: 8, content: '공식 문서를 기반으로 직접 사용해본다.', score: 3 },
          { option_id: 32, question_id: 8, content: '실제 프로젝트 또는 토이 프로젝트에 적용하여 검증한다.', score: 4 },
        ],
      },
      {
        question_id: 9,
        competency_id: 3,
        content: '해결 방법이 잘 나오지 않는 문제를 만났을 때 어떻게 정보를 찾는가?',
        type: '객관식',
        options: [
          { option_id: 33, question_id: 9, content: 'AI 또는 검색 결과를 그대로 적용한다.', score: 1 },
          { option_id: 34, question_id: 9, content: '커뮤니티와 Stack Overflow 사례를 참고한다.', score: 2 },
          { option_id: 35, question_id: 9, content: '공식 문서와 기술 문서를 확인한다.', score: 3 },
          { option_id: 36, question_id: 9, content: '오픈소스 이슈나 소스코드까지 분석하여 원인을 파악한다.', score: 4 },
        ],
      },
      {
        question_id: 10,
        competency_id: 3,
        content: '새로운 프레임워크를 도입하자는 의견이 나왔다. 어떻게 판단하는가?',
        type: '객관식',
        options: [
          { option_id: 37, question_id: 10, content: '최신 기술이므로 도입', score: 1 },
          { option_id: 38, question_id: 10, content: '사용 사례 확인', score: 2 },
          { option_id: 39, question_id: 10, content: '장단점 비교', score: 3 },
          { option_id: 40, question_id: 10, content: '프로젝트 상황과 유지보수 비용까지 고려', score: 4 },
        ],
      },
    ],
  },
  {
    competency_id: 4,
    category: 'CS 지식',
    questions: [
      {
        question_id: 11,
        competency_id: 4,
        content: '데이터 조회 속도가 급격히 느려졌을 때 가장 먼저 확인할 것은?',
        type: '객관식',
        options: [
          { option_id: 41, question_id: 11, content: '서버 자원을 확인한다.', score: 1 },
          { option_id: 42, question_id: 11, content: '쿼리 자체를 점검한다.', score: 2 },
          { option_id: 43, question_id: 11, content: '인덱스 및 실행 계획을 확인한다.', score: 3 },
          { option_id: 44, question_id: 11, content: 'DB 구조, 락, 커넥션 상태까지 종합적으로 분석한다.', score: 4 },
        ],
      },
      {
        question_id: 12,
        competency_id: 4,
        content: '많은 사용자가 동시에 접속하는 서비스 설계 시 가장 중요하게 생각하는 것은?',
        type: '객관식',
        options: [
          { option_id: 45, question_id: 12, content: '서버 성능 향상', score: 1 },
          { option_id: 46, question_id: 12, content: '서버 분산', score: 2 },
          { option_id: 47, question_id: 12, content: '캐싱 전략 활용', score: 3 },
          { option_id: 48, question_id: 12, content: '비동기 처리와 시스템 확장성 고려', score: 4 },
        ],
      },
      {
        question_id: 13,
        competency_id: 4,
        content: '여러 사용자가 동시에 동일 데이터를 수정할 수 있는 상황에서 가장 우선적으로 고려할 것은?',
        type: '객관식',
        options: [
          { option_id: 49, question_id: 13, content: '중복 요청 방지', score: 1 },
          { option_id: 50, question_id: 13, content: '예외 처리', score: 2 },
          { option_id: 51, question_id: 13, content: '동기화 및 경쟁 상태 방지', score: 3 },
          { option_id: 52, question_id: 13, content: '분산 환경까지 고려한 데이터 정합성 보장', score: 4 },
        ],
      },
      {
        question_id: 14,
        competency_id: 4,
        content: '웹 서비스 응답 속도를 개선하기 위한 방법으로 가장 적절한 접근은?',
        type: '객관식',
        options: [
          { option_id: 53, question_id: 14, content: '전송 데이터 크기 감소', score: 1 },
          { option_id: 54, question_id: 14, content: 'API 호출 횟수 감소', score: 2 },
          { option_id: 55, question_id: 14, content: '캐싱 및 CDN 활용', score: 3 },
          { option_id: 56, question_id: 14, content: '서비스 구조와 통신 방식까지 최적화', score: 4 },
        ],
      },
    ],
  },
  {
    competency_id: 5,
    category: '알고리즘',
    questions: [
      {
        question_id: 15,
        competency_id: 5,
        content: '대량 데이터에서 중복 제거와 빠른 탐색이 필요할 때 어떻게 접근하는가?',
        type: '객관식',
        options: [
          { option_id: 57, question_id: 15, content: '단순 반복문 활용', score: 1 },
          { option_id: 58, question_id: 15, content: '내장 함수 활용', score: 2 },
          { option_id: 59, question_id: 15, content: '적절한 자료구조(Hash 등) 선택', score: 3 },
          { option_id: 60, question_id: 15, content: '시간·공간 복잡도를 모두 고려하여 설계', score: 4 },
        ],
      },
      {
        question_id: 16,
        competency_id: 5,
        content: '복잡한 요구사항을 구현해야 할 때 주로 어떤 방식으로 접근하는가?',
        type: '객관식',
        options: [
          { option_id: 61, question_id: 16, content: '구현하면서 해결한다.', score: 1 },
          { option_id: 62, question_id: 16, content: '유사 사례를 참고한다.', score: 2 },
          { option_id: 63, question_id: 16, content: '문제를 작은 단위로 분해한다.', score: 3 },
          { option_id: 64, question_id: 16, content: '전체 구조와 예외 상황을 먼저 설계한다.', score: 4 },
        ],
      },
      {
        question_id: 17,
        competency_id: 5,
        content: '정렬된 데이터에서 특정 값을 반복적으로 찾아야 한다면?',
        type: '객관식',
        options: [
          { option_id: 65, question_id: 17, content: '처음부터 순차 탐색한다.', score: 1 },
          { option_id: 66, question_id: 17, content: '제공되는 검색 함수를 활용한다.', score: 2 },
          { option_id: 67, question_id: 17, content: '이진 탐색과 같은 효율적인 방법을 고려한다.', score: 3 },
          { option_id: 68, question_id: 17, content: '데이터 규모와 사용 패턴을 분석해 자료구조 자체를 재설계한다.', score: 4 },
        ],
      },
    ],
  },
  {
    competency_id: 6,
    category: '인프라',
    questions: [
      {
        question_id: 18,
        competency_id: 6,
        content: '프로젝트를 실제 서비스 환경에 배포할 때 가장 이상적인 방식은?',
        type: '객관식',
        options: [
          { option_id: 69, question_id: 18, content: '서버에 직접 업로드 후 실행', score: 1 },
          { option_id: 70, question_id: 18, content: '원격 서버에서 수동 배포', score: 2 },
          { option_id: 71, question_id: 18, content: '컨테이너 기반으로 배포', score: 3 },
          { option_id: 72, question_id: 18, content: '빌드·테스트·배포가 자동화된 파이프라인 구축', score: 4 },
        ],
      },
      {
        question_id: 19,
        competency_id: 6,
        content: '서비스 운영 중 장애를 가장 효과적으로 감지하는 방법은?',
        type: '객관식',
        options: [
          { option_id: 73, question_id: 19, content: '사용자 제보 확인', score: 1 },
          { option_id: 74, question_id: 19, content: '서버 로그 수동 확인', score: 2 },
          { option_id: 75, question_id: 19, content: '모니터링 대시보드 활용', score: 3 },
          { option_id: 76, question_id: 19, content: '자동 알림 및 관측 시스템 구축', score: 4 },
        ],
      },
      {
        question_id: 20,
        competency_id: 6,
        content: '개발 환경과 운영 환경 차이로 문제가 발생했다. 어떻게 해결하는가?',
        type: '객관식',
        options: [
          { option_id: 77, question_id: 20, content: '환경을 수동으로 맞춘다.', score: 1 },
          { option_id: 78, question_id: 20, content: '설정 문서를 만든다.', score: 2 },
          { option_id: 79, question_id: 20, content: '컨테이너 기반으로 통일한다.', score: 3 },
          { option_id: 80, question_id: 20, content: '환경 구성을 코드로 관리한다.', score: 4 },
        ],
      },
    ],
  },
]


// POST /api/survey/submit
// Request Body

// {
//   "answers": [
//     { "question_id": 1, "option_id": 3 },
//     { "question_id": 2, "option_id": 7 },
//     ..
//   ]
// }    20개 문항에 대한 배열
//      qeustion_id : 문항 ID (Number) , option_id: 선택한 보기 ID (Number)