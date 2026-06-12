-- ProjectRoles
INSERT INTO our_roles(id, role)
VALUES (1, 'Frontend') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_roles(id, role)
VALUES (2, 'Backend') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_roles(id, role)
VALUES (3, 'UI/UX') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_roles(id, role)
VALUES (4, 'AI') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_roles(id, role)
VALUES (5, 'Animation') ON CONFLICT (id) DO NOTHING;

-- Developers
INSERT INTO our_developers(id, name, image_url)
VALUES (1, '김석환',
        'https://cok-mvp-bucket.s3.ap-northeast-2.amazonaws.com/landing/kimseokhwan.jpeg') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_developers(id, name, image_url)
VALUES (2, '오주노',
        'https://cok-mvp-bucket.s3.ap-northeast-2.amazonaws.com/landing/ojuno.jpg') ON CONFLICT (id) DO NOTHING;
INSERT INTO our_developers(id, name, image_url)
VALUES (3, '조인흠',
        'https://cok-mvp-bucket.s3.ap-northeast-2.amazonaws.com/landing/choiinheum.jpg') ON CONFLICT (id) DO NOTHING;

-- DeveloperRoleMapping
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (1, 1, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (2, 1, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (3, 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (4, 2, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (5, 3, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO developer_role_mapping(id, developer_id, role_id)
VALUES (6, 3, 3) ON CONFLICT (id) DO NOTHING;

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

-- MasterCompetency
INSERT INTO master_competency(id, name, description)
VALUES (1, '구현력',
        '단순한 코딩을 넘어 실제 시스템 설계, 디버깅, 예외 처리 등을 수행하는 종합적인 개발 능력을 의미합니다. 단편적인 자격증보다는 실제 경험과 문제 해결 과정이 중요하므로, 상세 설문 진단을 바탕으로 역량을 측정합니다.') ON CONFLICT (id) DO NOTHING;
INSERT INTO master_competency(id, name, description)
VALUES (2, '협업',
        '동료와의 원활한 의사소통, 상호 발전적인 코드 리뷰, 갈등 해결 등 프로젝트를 성공으로 이끄는 핵심적인 소프트 스킬입니다. 객관적 스펙보다는 실제 협업 상황에서의 행동 양식을 파악하기 위해 설문 진단을 통해 평가합니다.') ON CONFLICT (id) DO NOTHING;
INSERT INTO master_competency(id, name, description)
VALUES (3, '트렌드',
        '끊임없이 변화하는 기술 생태계 속에서 새로운 기술에 호기심을 가지고 학습하는 능동적인 태도입니다. 학습 열의를 확인하는 진단 설문을 중심으로 평가하며, 최신 기술 관련 자격증 보유 여부를 보조 지표로 반영합니다.') ON CONFLICT (id) DO NOTHING;
INSERT INTO master_competency(id, name, description)
VALUES (4, 'CS 지식',
        '튼튼한 소프트웨어 아키텍처를 설계하기 위해 필수적인 운영체제, 네트워크, 데이터베이스 등의 전공 기초 지식입니다. 가장 객관적인 역량 검증이 가능한 영역이므로, 관련 국가공인 자격증 취득 여부를 핵심 지표로 삼아 평가합니다.') ON CONFLICT (id) DO NOTHING;
INSERT INTO master_competency(id, name, description)
VALUES (5, '알고리즘',
        '복잡한 문제를 논리적이고 효율적으로 해결하는 실제적인 문제 해결 능력입니다. 백준(Baekjoon) 티어 등 실제 알고리즘 풀이 성과를 주 지표로 활용하여 역량을 증명하며, 관련 자격증은 이론 학습의 보조 지표로 참고합니다.') ON CONFLICT (id) DO NOTHING;
INSERT INTO master_competency(id, name, description)
VALUES (6, '인프라',
        '클라우드 컴퓨팅 및 시스템 운영 환경을 이해하고 관리할 수 있는 역량입니다. 실무에서의 배포 및 운영 경험을 직접적으로 증명하기는 어려우나, 관련 자격증을 통해 탄탄한 시스템 운영 기초 지식을 갖추었는지 보조적으로 검증합니다.') ON CONFLICT (id) DO NOTHING;

-- AssessmentQuestion
-- 구현력
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (1, '새로운 기능 개발을 시작할 때 가장 먼저 하는 행동은?', 1, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (2, '예상치 못한 버그가 발생했을 때 주로 어떻게 해결하는가?', 1, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (3, '외부 API를 연동하는 기능을 구현할 때 가장 중요하게 생각하는 것은?', 1, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (4, '기존 기능은 동작하지만 코드가 매우 복잡합니다. 어떻게 하시겠습니까?', 1, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- 협업
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (5, '기술적 의견이 충돌했을 때 어떻게 행동하는가?', 2, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (6, '팀원의 코드를 리뷰할 때 가장 자주 하는 행동은?', 2, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (7, '프로젝트 진행 내용을 공유해야 한다면?', 2, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- 트렌드
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (8, '새로운 기술을 접했을 때 일반적으로 어떻게 학습하는가?', 3, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (9, '해결 방법이 잘 나오지 않는 문제를 만났을 때 어떻게 정보를 찾는가?', 3, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (10, '새로운 프레임워크를 도입하자는 의견이 나왔다. 어떻게 판단하는가?', 3, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- CS 지식
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (11, '데이터 조회 속도가 급격히 느려졌을 때 가장 먼저 확인할 것은?', 4, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (12, '많은 사용자가 동시에 접속하는 서비스 설계 시 가장 중요하게 생각하는 것은?', 4, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (13, '여러 사용자가 동시에 동일 데이터를 수정할 수 있는 상황에서 가장 우선적으로 고려할 것은?', 4, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (14, '웹 서비스 응답 속도를 개선하기 위한 방법으로 가장 적절한 접근은?', 4, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- 알고리즘
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (15, '대량 데이터에서 중복 제거와 빠른 탐색이 필요할 때 어떻게 접근하는가?', 5, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (16, '복잡한 요구사항을 구현해야 할 때 주로 어떤 방식으로 접근하는가?', 5, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (17, '정렬된 데이터에서 특정 값을 반복적으로 찾아야 한다면?', 5, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- 인프라
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (18, '프로젝트를 실제 서비스 환경에 배포할 때 가장 이상적인 방식은?', 6, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (19, '서비스 운영 중 장애를 가장 효과적으로 감지하는 방법은?', 6, 'MULTI') ON CONFLICT (id) DO NOTHING;
INSERT INTO assessment_question(id, content, competency_id, type)
VALUES (20, '개발 환경과 운영 환경 차이로 문제가 발생했다. 어떻게 해결하는가?', 6, 'MULTI') ON CONFLICT (id) DO NOTHING;

-- 주관식
INSERT INTO assessment_question(id, content, type)
VALUES (21, '지금까지 직접 개발하고 구현해본 경험을 기술 스택 중심으로 자유롭게 작성해주세요.
사용한 언어와 프레임워크, 직접 구현한 기능, 운영하거나 배포해본 경험이 있다면 함께 작성해주시면 좋습니다.

예시)
React와 TypeScript로 상태 관리를 적용한 웹 서비스를 구현했습니다.
TanStack Query로 데이터 패칭을 처리하고 성능 최적화를 위해 코드 스플리팅을 적용했습니다. GitHub Actions로 CI/CD를 구축하고 배포까지 직접 경험해봤습니다.',
        'ESSAY') ON CONFLICT (id) DO NOTHING;
-- QuestionOption
INSERT INTO question_option (id, question_id, content, score)
VALUES
-- [1. 구현력] Q1
(1, 1, '요구사항을 보면서 바로 코드를 작성하기 시작한다.', 25),
(2, 1, '구현 순서를 간단히 정리한 뒤 개발한다.', 50),
(3, 1, '필요한 기능과 데이터 흐름을 먼저 설계한 후 구현한다.', 75),
(4, 1, '향후 확장과 변경 가능성까지 고려하여 구조를 설계한 뒤 구현한다.', 100),

-- [1. 구현력] Q2
(5, 2, '검색을 통해 비슷한 사례를 찾아 적용한다.', 25),
(6, 2, '로그를 출력하며 문제가 발생한 위치를 추적한다.', 50),
(7, 2, '로그와 실행 흐름을 분석하여 근본 원인을 찾는다.', 75),
(8, 2, '원인뿐 아니라 동일 유형의 문제가 재발하지 않도록 구조를 개선한다.', 100),

-- [1. 구현력] Q3
(9, 3, '정상적으로 데이터를 받아오는 기능 구현', 25),
(10, 3, '비정상 데이터에 대한 기본 예외 처리', 50),
(11, 3, '네트워크 장애·응답 지연 등 다양한 실패 상황 대응', 75),
(12, 3, '장애 발생 시에도 서비스 영향이 최소화되도록 복구 전략까지 고려', 100),

-- [1. 구현력] Q4
(13, 4, '동작하므로 그대로 둔다.', 25),
(14, 4, '필요한 부분만 수정한다.', 50),
(15, 4, '리팩토링하여 구조를 개선한다.', 75),
(16, 4, '현재 요구사항뿐 아니라 향후 기능 확장을 고려하여 구조를 개선한다.', 100),

-- [2. 협업] Q5
(17, 5, '경험이 많은 사람이나 다수 의견을 따른다.', 25),
(18, 5, '자신의 의견을 근거와 함께 설명한다.', 50),
(19, 5, '각 방안의 장단점을 비교하여 논의한다.', 75),
(20, 5, '객관적 자료나 간단한 검증 결과를 기반으로 팀 합의를 이끈다.', 100),

-- [2. 협업] Q6
(21, 6, '오류나 오타를 확인한다.', 25),
(22, 6, '개선 가능한 부분을 제안한다.', 50),
(23, 6, '왜 개선이 필요한지 기술적 이유를 설명한다.', 75),
(24, 6, '팀 전체 코드 품질 향상 관점에서 대안과 개선 방향을 제시한다.', 100),

-- [2. 협업] Q7
(25, 7, '구두로 설명', 25),
(26, 7, '채팅으로 전달', 50),
(27, 7, '문서 정리', 75),
(28, 7, '문서화 + 의사결정 근거 기록', 100),

-- [3. 트렌드] Q8
(29, 8, '개념만 확인한다.', 25),
(30, 8, '블로그·영상 등을 통해 사용 사례를 찾아본다.', 50),
(31, 8, '공식 문서를 기반으로 직접 사용해본다.', 75),
(32, 8, '실제 프로젝트 또는 토이 프로젝트에 적용하여 검증한다.', 100),

-- [3. 트렌드] Q9
(33, 9, 'AI 또는 검색 결과를 그대로 적용한다.', 25),
(34, 9, '커뮤니티와 Stack Overflow 사례를 참고한다.', 50),
(35, 9, '공식 문서와 기술 문서를 확인한다.', 75),
(36, 9, '오픈소스 이슈나 소스코드까지 분석하여 원인을 파악한다.', 100),

-- [3. 트렌드] Q10
(37, 10, '최신 기술이므로 도입', 25),
(38, 10, '사용 사례 확인', 50),
(39, 10, '장단점 비교', 75),
(40, 10, '프로젝트 상황과 유지보수 비용까지 고려', 100),

-- [4. CS 지식] Q11
(41, 11, '서버 자원을 확인한다.', 25),
(42, 11, '쿼리 자체를 점검한다.', 50),
(43, 11, '인덱스 및 실행 계획을 확인한다.', 75),
(44, 11, 'DB 구조, 락, 커넥션 상태까지 종합적으로 분석한다.', 100),

-- [4. CS 지식] Q12
(45, 12, '서버 성능 향상', 25),
(46, 12, '서버 분산', 50),
(47, 12, '캐싱 전략 활용', 75),
(48, 12, '비동기 처리와 시스템 확장성 고려', 100),

-- [4. CS 지식] Q13
(49, 13, '중복 요청 방지', 25),
(50, 13, '예외 처리', 50),
(51, 13, '동기화 및 경쟁 상태 방지', 75),
(52, 13, '분산 환경까지 고려한 데이터 정합성 보장', 100),

-- [4. CS 지식] Q14
(53, 14, '전송 데이터 크기 감소', 25),
(54, 14, 'API 호출 횟수 감소', 50),
(55, 14, '캐싱 및 CDN 활용', 75),
(56, 14, '서비스 구조와 통신 방식까지 최적화', 100),

-- [5. 알고리즘] Q15
(57, 15, '단순 반복문 활용', 25),
(58, 15, '내장 함수 활용', 50),
(59, 15, '적절한 자료구조(Hash 등) 선택', 75),
(60, 15, '시간·공간 복잡도를 모두 고려하여 설계', 100),

-- [5. 알고리즘] Q16
(61, 16, '구현하면서 해결한다.', 25),
(62, 16, '유사 사례를 참고한다.', 50),
(63, 16, '문제를 작은 단위로 분해한다.', 75),
(64, 16, '전체 구조와 예외 상황을 먼저 설계한다.', 100),

-- [5. 알고리즘] Q17
(65, 17, '처음부터 순차 탐색한다.', 25),
(66, 17, '제공되는 검색 함수를 활용한다.', 50),
(67, 17, '이진 탐색과 같은 효율적인 방법을 고려한다.', 75),
(68, 17, '데이터 규모와 사용 패턴을 분석해 자료구조 자체를 재설계한다.', 100),

-- [6. 인프라] Q18
(69, 18, '서버에 직접 업로드 후 실행', 25),
(70, 18, '원격 서버에서 수동 배포', 50),
(71, 18, '컨테이너 기반으로 배포', 75),
(72, 18, '빌드·테스트·배포가 자동화된 파이프라인 구축', 100),

-- [6. 인프라] Q19
(73, 19, '사용자 제보 확인', 25),
(74, 19, '서버 로그 수동 확인', 50),
(75, 19, '모니터링 대시보드 활용', 75),
(76, 19, '자동 알림 및 관측 시스템 구축', 100),

-- [6. 인프라] Q20
(77, 20, '환경을 수동으로 맞춘다.', 25),
(78, 20, '설정 문서를 만든다.', 50),
(79, 20, '컨테이너 기반으로 통일한다.', 75),
(80, 20, '환경 구성을 코드로 관리한다.', 100) ON CONFLICT (id) DO NOTHING;

-- CertificationCompetencyScore
INSERT INTO certification_competency_score (id, certification_id, competency_id, score)
VALUES (1, 1, 4, 4),
       (2, 1, 5, 2),
       (3, 2, 4, 2),
       (4, 2, 5, 1),
       (5, 3, 4, 4),
       (6, 4, 4, 6),
       (7, 5, 4, 3),
       (8, 5, 6, 2),
       (9, 6, 4, 2),
       (10, 6, 6, 1),
       (11, 7, 3, 1),
       (12, 7, 5, 2),
       (13, 8, 3, 1),
       (14, 8, 5, 4),
       (15, 9, 1, 2),
       (16, 9, 3, 1),
       (17, 9, 5, 4),
       (18, 10, 3, 1),
       (19, 10, 6, 2),
       (20, 11, 3, 1),
       (21, 11, 4, 1),
       (22, 11, 6, 5),
       (23, 12, 1, 2),
       (24, 12, 3, 1),
       (25, 12, 6, 3),
       (26, 13, 3, 1),
       (27, 13, 6, 6),
       (28, 14, 1, 2),
       (29, 14, 3, 1),
       (30, 14, 6, 5),
       (31, 15, 4, 2),
       (32, 15, 6, 4) ON CONFLICT (id) DO NOTHING;