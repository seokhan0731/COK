from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database.database import get_db
from routers.ai_router import router as ai_router

app = FastAPI(
    title="COK_data-pipeline",
    description="크롤링/임베딩/로드맵 생성 담당 FastAPI 서버",
    version="1.0.0"
)

app.include_router(ai_router)


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
