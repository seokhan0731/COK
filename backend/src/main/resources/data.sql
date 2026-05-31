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
