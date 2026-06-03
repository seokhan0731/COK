-- MasterCertification
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (1, '정보처리기사', '한국산업인력공단',
        '소프트웨어 설계, 데이터베이스 구축, 운영체제, 네트워크, 소프트웨어 공학 등 IT 전반의 이론과 실무 능력을 검증하는 국가공인 자격증, 개발자 취업 시 가장 널리 인정받는 기본 자격증으로, CS 지식의 깊이를 객관적으로 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (2, '정보처리산업기사', '한국산업인력공단',
        '프로그래밍, 데이터베이스, 운영체제 등 IT 기초 이론과 실무 능력을 검증하는 국가공인 자격증. 정보처리기사보다 낮은 수준이나 IT 기초 역량을 공식적으로 증명할 수 있다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (3, 'SQLD', '한국데이터산업진흥원',
        '관계형 데이터베이스의 기본 개념, 데이터 모델링, SQL 작성 능력을 검증하는 자격증. SELECT, JOIN, 서브쿼리 등 실무에서 자주 사용하는 SQL 문법과 데이터 모델 설계 기초를 다루며, 한국데이터산업진흥원이 주관한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (4, 'SQLP', '한국데이터산업진흥원',
        '고급 SQL 튜닝, 인덱스 설계, 옵티마이저 원리, 데이터베이스 아키텍처 설계 능력을 검증하는 최고급 자격증. 대용량 데이터 처리와 성능 최적화까지 다루며, 한국데이터산업진흥원이 주관한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (5, '리눅스마스터 1급', '한국정보통신진흥협회',
        '리눅스 커널 이해, 네트워크 서버 구축, 보안 설정, 시스템 성능 튜닝 등 고급 리눅스 운영 능력을 검증하는 국가공인 자격증. 서버 관리자나 DevOps 엔지니어에게 요구되는 수준의 시스템 운영 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (6, '리눅스마스터 2급', '한국정보통신진흥협회',
        '리눅스 기본 명령어, 파일 시스템, 프로세스 관리, 기본 네트워크 설정 등 리눅스 기초 운영 능력을 검증하는 국가공인 자격증. 개발자가 서버 환경을 다루기 위한 기본 리눅스 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (7, 'ADsP', '한국데이터산업진흥원',
        '데이터 분석 기획, 데이터 탐색, 기초 통계 분석, R/Python을 활용한 데이터 분석 능력을 검증하는 자격증. 데이터 분석의 전반적인 프로세스와 기초 방법론을 다루며, 한국데이터산업진흥원이 주관한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (8, 'ADP', '한국데이터산업진흥원',
        '고급 데이터 분석 설계, 통계 모델링, 머신러닝 기법, 빅데이터 처리 기술을 검증하는 최고급 자격증. 데이터 분석 전 과정을 주도적으로 설계하고 수행할 수 있는 역량을 증명하며, 한국데이터산업진흥원이 주관한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (9, 'TensorFlow Developer', 'Google',
        'TensorFlow와 Keras를 활용한 딥러닝 모델 설계, 학습, 최적화 및 배포 능력을 검증하는 Google 공인 자격증. 이미지 분류, 자연어 처리, 시계열 예측 등 실제 AI 문제를 TensorFlow로 해결하는 실무 능력을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (10, 'AWS CCP', 'Amazon Web Services',
        'AWS의 핵심 서비스(EC2, S3, RDS, Lambda 등)와 클라우드 컴퓨팅 기본 개념, 보안, 요금 체계에 대한 이해를 검증하는 Amazon 공인 입문 자격증. AWS 환경에서 기본적인 서비스 구성과 운영 방식을 이해하고 있음을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (11, 'AWS SAA', 'Amazon Web Services',
        '고가용성, 확장성, 보안을 고려한 AWS 클라우드 아키텍처 설계 능력을 검증하는 Amazon 공인 자격증. VPC, IAM, Auto Scaling, Load Balancer 등을 활용하여 실제 서비스 수준의 인프라를 설계할 수 있는 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (12, 'AWS DVA', 'Amazon Web Services',
        'AWS 환경에서 애플리케이션 개발, 테스트, 배포, 디버깅 능력을 검증하는 Amazon 공인 자격증. CodePipeline, Elastic Beanstalk, Lambda 등을 활용한 CI/CD 파이프라인 구축과 서버리스 애플리케이션 개발 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (13, 'CKA', 'Cloud Native Computing Foundation',
        'Kubernetes 클러스터 설치, 구성, 네트워킹, 스토리지, 보안 및 트러블슈팅 능력을 검증하는 CNCF 공인 자격증. 실제 Kubernetes 환경에서 클러스터를 직접 운영하고 관리할 수 있는 실무 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (14, 'CKAD', 'Cloud Native Computing Foundation',
        'Kubernetes 환경에서 컨테이너화된 애플리케이션을 설계, 배포, 구성, 관리하는 능력을 검증하는 CNCF 공인 자격증. Pod, Deployment, Service, ConfigMap 등 Kubernetes 핵심 리소스를 활용한 애플리케이션 운영 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_certification(id, name, issuer, description)
VALUES (15, 'RHCSA', 'Red Hat',
        'Red Hat Enterprise Linux 환경에서 사용자 관리, 파일 시스템, 네트워크 설정, 보안 정책, 컨테이너 기초 등 시스템 관리 핵심 능력을 검증하는 Red Hat 공인 자격증. 엔터프라이즈 리눅스 환경에서의 실무 운영 역량을 증명한다.') ON CONFLICT (id) DO NOTHING;


-- MasterJob
INSERT
INTO master_job(id, name, description)
VALUES (1, '백엔드 개발자',
        '서버 사이드 로직, API 설계, 데이터베이스 연동 등 서비스의 핵심 비즈니스 로직을 구현하는 직무. Spring, Django, Node.js 등의 프레임워크를 활용하여 대용량 트래픽 처리와 안정적인 서버 아키텍처를 설계하고 운영하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (2, '프론트엔드 개발자',
        '사용자가 직접 마주하는 웹 화면을 구현하는 직무. React, Vue, Next.js 등의 프레임워크를 활용하여 UI/UX를 구현하고, 백엔드 API와 연동하여 사용자 경험을 최적화하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (3, '모바일 개발자',
        'iOS, Android 등 모바일 플랫폼에서 동작하는 애플리케이션을 개발하는 직무. Swift, Kotlin, Flutter 등을 활용하여 모바일 환경에 최적화된 사용자 경험을 구현하고 플랫폼별 특성을 고려한 앱을 설계하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (4, 'AI/ML 엔지니어',
        '머신러닝 및 딥러닝 모델을 설계, 학습, 최적화하여 실제 서비스에 적용하는 직무. PyTorch, TensorFlow 등을 활용하여 데이터 분석부터 모델 개발, 서빙까지 AI 파이프라인 전반을 구축하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (5, 'DevOps 엔지니어',
        '개발과 운영의 경계를 허물고 서비스의 안정적인 배포와 운영 자동화를 담당하는 직무. Docker, Kubernetes, CI/CD 파이프라인 등을 활용하여 인프라를 구성하고, 모니터링 시스템을 구축하여 서비스 안정성을 유지하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (6, '데이터 엔지니어',
        '대규모 데이터를 수집, 저장, 처리하는 파이프라인을 설계하고 구축하는 직무. Spark, Kafka, Airflow 등을 활용하여 데이터 웨어하우스를 구성하고, 안정적인 데이터 흐름을 보장하는 인프라를 설계하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (7, 'PM/매니지먼트',
        '제품의 방향성을 설정하고 개발팀과 이해관계자 사이에서 프로젝트를 조율하는 직무. 요구사항 분석, 로드맵 수립, 우선순위 결정 등을 통해 팀 전체의 생산성을 높이고 성공적인 제품 출시를 이끄는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (8, '시스템/임베디드 개발자',
        '운영체제, 펌웨어, 디바이스 드라이버 등 하드웨어와 밀접하게 연동되는 저수준 소프트웨어를 개발하는 직무. C, C++ 등을 활용하여 메모리, 프로세스, 하드웨어 제어를 직접 다루며 고성능 시스템 소프트웨어를 구현하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (9, '그래픽스 엔지니어',
        '렌더링 파이프라인, 셰이더, GPU 최적화 등 시각적 컴퓨팅 기술을 개발하는 직무. OpenGL, Vulkan, Unity, Unreal Engine 등을 활용하여 게임, 시뮬레이션, 시각화 시스템의 그래픽 성능을 극대화하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (10, '블록체인 엔지니어',
        '분산 원장 기술을 기반으로 스마트 컨트랙트와 탈중앙화 애플리케이션을 개발하는 직무. Solidity, Hardhat 등을 활용하여 블록체인 네트워크 위에서 동작하는 안전하고 신뢰할 수 있는 시스템을 구현하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;
INSERT
INTO master_job(id, name, description)
VALUES (11, '영상/음성 엔지니어',
        '영상 및 음성 데이터를 처리, 분석, 최적화하는 직무. FFmpeg, OpenCV, GStreamer 등을 활용하여 미디어 인코딩, 스트리밍, 신호 처리, 컴퓨터 비전 등 멀티미디어 기술을 개발하고 실서비스에 적용하는 역할을 담당한다.') ON CONFLICT (id) DO NOTHING;


-- WantedTag
INSERT INTO wanted_tag(id, name)
VALUES (872, '서버 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (10110, '소프트웨어 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (873, '웹 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (669, '프론트엔드 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (1634, '머신러닝 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (674, 'DevOps/시스템 관리자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (660, '자바 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (899, '파이썬 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (900, 'C, C++ 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (655, '데이터 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (895, 'Node.js 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (665, '시스템, 네트워크 관리자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (1024, '데이터 사이언티스트') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (877, '개발 매니저') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (658, '임베디드 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (672, '하드웨어 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (1025, '빅데이터 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (939, '웹 퍼블리셔') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (677, '안드로이드 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (661, '.NET 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (893, 'PHP 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (876, '프로덕트 매니저') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (678, 'ios 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (10111, '크로스플랫폼 앱 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (1027, '블록체인 플랫폼 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (10231, 'DBA') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (896, '영상, 음성 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (898, '그래픽스 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (795, 'CTO, Chief Technology Officer') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (894, '루비온레일즈 개발자') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (1022, 'BI 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (10112, 'VR 엔지니어') ON CONFLICT (id) DO NOTHING;
INSERT INTO wanted_tag(id, name)
VALUES (793, 'CIO, Chief Information Officer') ON CONFLICT (id) DO NOTHING;


-- JobTagMapping
-- 백엔드 개발자 관련
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (1, 872, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (2, 10110, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (3, 873, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (4, 660, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (5, 899, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (6, 895, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (7, 661, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (8, 893, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (9, 1027, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (10, 894, 1) ON CONFLICT (id) DO NOTHING;

-- 프론트엔드 개발자 관련
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (11, 873, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (12, 669, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (13, 895, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (14, 939, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (15, 10111, 2) ON CONFLICT (id) DO NOTHING;

-- 모바일 개발자
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (16, 677, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (17, 678, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (18, 10111, 3) ON CONFLICT (id) DO NOTHING;

-- AI/ML 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (19, 1634, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (20, 899, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (21, 1024, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (22, 896, 4) ON CONFLICT (id) DO NOTHING;

-- DevOps 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (23, 674, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (24, 665, 5) ON CONFLICT (id) DO NOTHING;

-- 데이터 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (25, 899, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (26, 655, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (27, 1024, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (28, 1025, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (29, 10231, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (30, 1022, 6) ON CONFLICT (id) DO NOTHING;

-- PM/매니지먼트
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (31, 877, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (32, 876, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (33, 795, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (34, 793, 7) ON CONFLICT (id) DO NOTHING;

-- 시스템/임베디드 개발자
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (35, 900, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (36, 658, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (37, 672, 8) ON CONFLICT (id) DO NOTHING;

-- 그래픽스 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (38, 900, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (39, 898, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (40, 10112, 9) ON CONFLICT (id) DO NOTHING;

-- 블록체인 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (41, 1027, 10) ON CONFLICT (id) DO NOTHING;

-- 영상/음성 엔지니어
INSERT INTO job_tag_mapping(id, tag_id, master_job_id)
VALUES (42, 896, 11) ON CONFLICT (id) DO NOTHING;