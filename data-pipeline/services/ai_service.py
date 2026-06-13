from sentence_transformers import SentenceTransformer
from schemas.ai_dto import EmbeddingRequest

embedder = SentenceTransformer('jhgan/ko-sroberta-multitask')


def generate_embedding(request: EmbeddingRequest) -> list[float]:
    user_text = request.essay_answer
    # 임베딩 당시에는 np.array 형태이기 떄문에, 스프링 자료형에 맞게 리스트 컴프리헨션 사용
    vector = [float(v) for v in embedder.encode(user_text)]
    return vector
