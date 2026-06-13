from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

app = FastAPI(
    title="COK_data-pipeline",
    description="크롤링/임베딩/로드맵 생성 담당 FastAPI 서버",
    version="1.0.0"
)

embedder = SentenceTransformer('jhgan/ko-sroberta-multitask')


class EmbeddingRequest(BaseModel):
    essay_answer: str


@app.get("/")
def read_root():
    return {"status": "서버 동작?", "message": "FastAPI is running"}


@app.get("/check")
def check_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return True
    except Exception as e:
        return False


@app.post("/embedding")
def create_embedding(request: EmbeddingRequest):
    user_text = request.essay_answer
    # 임베딩 당시에는 np.array 형태이기 떄문에, 스프링 자료형에 맞게 리스트 컴프리헨션 사용
    vector = [float(v) for v in embedder.encode(user_text)]
    return {"embedding_vector": vector}
