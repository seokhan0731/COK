from fastapi import FastAPI

app = FastAPI(
    title="COK_data-pipeline",
    description="크롤링/임베딩/로드맵 생성 담당 FastAPI 서버",
    version="1.0.0"
)


@app.get("/")
def read_root():
    return {"status": "서버 동작?", "message": "FastAPI is running"}
