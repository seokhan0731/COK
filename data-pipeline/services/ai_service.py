from sentence_transformers import SentenceTransformer
from schemas.ai_dto import EmbeddingRequest, PostRecommendResponse, PostRecommendRequest, PostRecommendItem
from sqlalchemy import text
from sqlalchemy.orm import Session

embedder = SentenceTransformer('jhgan/ko-sroberta-multitask')


def generate_embedding(request: EmbeddingRequest) -> list[float]:
    user_text = request.essay_answer
    # 임베딩 당시에는 np.array 형태이기 떄문에, 스프링 자료형에 맞게 리스트 컴프리헨션 사용
    vector = [float(v) for v in embedder.encode(user_text)]
    return vector


def calculate_similarity(request: PostRecommendRequest, db: Session) -> PostRecommendResponse:
    user_vector = str(request.user_vector)
    query = text("""
                 SELECT jp.posting_id,
                        1 - (jp.embedding_vector <=> CAST(:user_vector AS vector)) AS similarity
                 FROM job_posting jp
                          JOIN post_job_mapping pjm ON jp.posting_id = pjm.post_id
                 WHERE pjm.job_id = :target_job_id
                 ORDER BY jp.embedding_vector <=> CAST(:user_vector AS vector)
                LIMIT 3;
                 """)
    result = db.execute(query, {
        "target_job_id": request.job_id,
        "user_vector": user_vector
    }).mappings().fetchall()

    return [PostRecommendItem(post_id=row["posting_id"],
                              rank=idx + 1,
                              similarity=float(row["similarity"])
                              ) for idx, row in enumerate(result)]
