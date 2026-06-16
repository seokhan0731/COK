import os
import time

import psycopg2
from pgvector.psycopg2 import register_vector
import requests
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

# TODO MVP 모델이기에, 각 그룹당 한 페이지씩만 크롤링(MVP 개발 모델 끝난 뒤, 모든 공고 크롤링 예정)

embedder = SentenceTransformer('jhgan/ko-sroberta-multitask')
load_dotenv()

DB_CONFIG = {
    "host": "127.0.0.1",
    "database": os.environ.get("POSTGRES_NAME"),
    "user": os.environ.get("POSTGRES_USER"),
    "password": os.environ.get("POSTGRES_PASSWORD"),
    "port": 54321
}

HEADERS = {
    # 접속 차단을 막기 위한 헤더 둔갑
    "User-Agent": "Mozilla/5.0"
}

# 원티드 태그 내, 공고의 고유 id를 파악하기 위한 주소값
BASE_URL = "https://www.wanted.co.kr/api/v4/jobs"

# BASE_URL을 통해 얻어낸 공고 id로 세부 내용들을 파악하기 위한 주소값
DETAIL_URL = "https://www.wanted.co.kr/api/chaos/jobs/v4/{}/details"


def load_tag_lookup(cursor):
    """
    Db에 존재하는 태그별 룩업테이블 불러오기
    다중 태그를 지원하고, 원티드 태그: 마스터 직무 형태이므로, 딕셔너리 이용
    초기에는 빈 set 만든 후, 계속해 set의 값을 매핑되는 마스터 직무로 채움

    :cursor: db 통신 객체, 코드 내에서 객체 생성 후, 매번 cursor.close를 하지 않고, 사용하기 위해 파라미터로 받음
    :return: 태그: [마스터 직무]꼴의 룩업
    """
    cursor.execute("SELECT tag_id, master_job_id FROM job_tag_mapping")
    mapping_data = cursor.fetchall()

    lookup = {}
    for tag_id, master_job_id in mapping_data:
        if tag_id not in lookup:
            lookup[tag_id] = set()

        lookup[tag_id].add(master_job_id)
    return lookup


def load_wanted_tag(cursor):
    """
    원티드 태그별 매핑된 원티드 내 id 꺼내오기
    fetchall()을 통해 id를 부른 경우, (id,) 형태의 튜플을 원소로 갖는 리스트기에,
    별도 리스트 컴프리헨션을 통해, id의 리스트 제작 ([(1,),(2,)] -> [1,2]

    :param cursor: db 통신 객체, 코드 내에서 객체 생성 후, 매번 cursor.close를 하지 않고, 사용하기 위해 파라미터로 받음
    :return: 원티드 태그의 id을 원소로 갖는 list
    """
    cursor.execute("SELECT id FROM wanted_tag")
    return [tag[0] for tag in cursor.fetchall()]


def tag_group(tag_list, size):
    """
    모든 태그를 url에 주입하면, 에러가 나기 떄문에, size만큼만 나누어 첨부하도록 변경
    상태값 저장을 위해 return 대신 yield 사용

    :param tag_list: 원티드 모든 태그 정보
    :param size: 나눌 size
    :return: api 요청값에 실을 태그들의 서브 리스트
    """
    for i in range(0, len(tag_list), size):
        yield tag_list[i:i + size]


def fetch_job_list(tag_ids):
    """
    BASE_URL에 요청할 api 조립 및 응답값 딕셔너리화
    key error를 회피하기 위해 .get의 디폴트 값으로 빈 리스트 제작

    :param tag_ids: 요청할 api 조립시, 들어갈 태그들 존재 리스틑
    :return: data의 키를 가진 딕셔너리 형태의 응답
    """
    url = (BASE_URL + "?country=kr"
           + "&job_sort=job.latest_order"
           + "&locations=all"
           + "&years=-1")

    for tag_id in tag_ids:
        url += f"&tag_type_ids={tag_id}"

    response = requests.get(url, headers=HEADERS)
    # 응답 상태 확인(에러 나면 멈춤)
    response.raise_for_status()

    return response.json().get("data", [])


def fetch_job_detail(wanted_id):
    """
    공고 세부 정보 api 요청 및 필요한 정보에 맞춘 파이썬 딕셔너리화
    raise_for_status는 에러시, 멈추기에, 다른 크롤링할 공고가 있는 경우까지 생각하여 status_code!=200 조건문 사용
    카테고리 태그는 마스터 직무로 매핑시 이용하기 위해, 추출 (db에 실저장X)

    :param wanted_id: 세부 조회를 요청할 공고 고유 id
    :return: 크롤링한 결과값 중 우리 서비스 내 필요한 값을 담은 딕셔너리
    """
    response = requests.get(DETAIL_URL.format(wanted_id), headers=HEADERS)

    if response.status_code != 200:
        return None

    root = response.json().get("data", {})
    job = root.get("job", {})
    detail = job.get("detail", {})
    company = job.get("company", {})
    category = job.get("category_tag", {})

    return {
        "company_name": company.get("name", ""),
        "title": detail.get("position", ""),
        "main_tasks": detail.get("main_tasks", ""),
        "requirements": detail.get("requirements", ""),
        "preferred_points": detail.get("preferred_points", ""),
        "posting_url": f"https://www.wanted.co.kr/wd/{wanted_id}",
        "category_tags": category.get("child_tags", []),
    }


def get_master_jobs(category_tags, tag_lookup):
    """
    다중 태그를 지원하기 위해, 룩업 테이블을 통해 마스터 직무 추출
    다중 태그인 경우, 마스터 직무가 중복되는 경우를 고려하여 set으로 초기 설정

    :param category_tags: 공고 내 원티드 직무 카테고리
    :param tag_lookup: db에 저장되어있던 카테고리별 마스터 직무 매핑 규칙
    :return: 매핑된 마스터직무(카테고리별 여러 마스터 직무를 지원하기에, 리스트 형태
    """
    master_jobs = set()

    for tag in category_tags:
        tag_id = tag.get("id")

        if tag_id is None or tag_id not in tag_lookup:
            continue

        master_jobs.update(tag_lookup[tag_id])
    return list(master_jobs)


def build_embedding_text(detail):
    # 임베딩 정확도를 높이기 위해 .join을 통해 각 항목 줄바꿈 및 strip()을 통해 양끝 공백 제거
    return "\n".join([
        detail["title"],
        detail["main_tasks"],
        detail["requirements"],
        detail["preferred_points"],
    ]).strip()


def save_post(cursor, wanted_id, detail, embedding):
    """
    크롤링 및 임베딩한 공고 저장
    중복된 공고인 경우, 공고 업데이트를 고려하여, db도 최신 내용으로 업데이트
    공고 업데이트 확인을 위해, RETURNING 및 fetchone()[0] 사용

    :param cursor: db 통신 객체, 코드 내에서 객체 생성 후, 매번 cursor.close를 하지 않고, 사용하기 위해 파라미터로 받음
    :param wanted_id: 공고 고유 id
    :param detail: 크롤링된 공고에서 필요한 값을 갖고 있는 파이썬에서의 detail 딕셔너리
    :param embedding: 임베딩된 벡터값
    :return: 적재 완료된 공고 고유 id(디버깅용)
    """
    cursor.execute("""INSERT INTO job_posting(wanted_id, company_name, title, main_tasks,
                                              requirements, preferred_points, posting_url, embedding_vector)
                      VALUES (%s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT (wanted_id)
                   DO
    UPDATE SET
        company_name=EXCLUDED.company_name, title=EXCLUDED.title, main_tasks=EXCLUDED.main_tasks,
        requirements=EXCLUDED.requirements, preferred_points=EXCLUDED.preferred_points,
        posting_url=EXCLUDED.posting_url, embedding_vector=EXCLUDED.embedding_vector
        RETURNING posting_id""", (wanted_id, detail["company_name"], detail["title"], detail["main_tasks"],
                                  detail["requirements"], detail["preferred_points"], detail["posting_url"],
                                  embedding
                                  ))
    posting_id = cursor.fetchone()[0]
    return posting_id


def save_post_job_mapping(cursor, posting_id, master_jobs):
    """
    연관 테이블에 해당 공고와 연관된 마스터 직무 저장

    :param cursor: db 통신 객체, 코드 내에서 객체 생성 후, 매번 cursor.close를 하지 않고, 사용하기 위해 파라미터로 받음
    :param posting_id: 공고 고유 id
    :param master_jobs: 매핑되는 하나 이상의 마스터 직무
    :return:
    """
    for job_id in master_jobs:
        cursor.execute("INSERT INTO post_job_mapping(post_id,job_id)VALUES (%s, %s) ON CONFLICT DO NOTHING",
                       (posting_id, job_id))


def main():
    conn = psycopg2.connect(**DB_CONFIG)
    register_vector(conn)
    cursor = conn.cursor()

    print("룩업 테이블 생성 시작")
    tag_lookup = load_tag_lookup(cursor)

    print("원티드 태그 룩업 테이블 생성 시작")
    wanted_tags = load_wanted_tag(cursor)

    all_jobs = []

    seen_post = set()

    for group in tag_group(wanted_tags, 5):
        jobs = fetch_job_list(group)

        for job in jobs:
            if job["id"] in seen_post:
                continue

            seen_post.add(job["id"])
            all_jobs.append(job)

    for item in all_jobs:
        wanted_id = item["id"]
        detail = fetch_job_detail(wanted_id)

        if detail is None:
            print(f"디테일 추출 실패:{wanted_id}")
            continue

        master_jobs = get_master_jobs(detail["category_tags"], tag_lookup)

        if not master_jobs:
            continue

        embedding_text = build_embedding_text(detail)
        embedding = embedder.encode(embedding_text)

        posting_id = save_post(cursor, wanted_id, detail, embedding)
        print(f"저장 완료: {posting_id}")
        save_post_job_mapping(cursor, posting_id, master_jobs)

        # 차단 방지
        time.sleep(0.3)

    conn.commit()
    cursor.close()
    conn.close()
    print("크롤링 완료")


if __name__ == "__main__":
    main()
