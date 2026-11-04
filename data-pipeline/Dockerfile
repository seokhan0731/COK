# `docker build -t cok-ai .`
# 루트에 넣으면 다른 컨텍스트들도 읽어야 하니, data-pipeline 디렉터리에 배치시킴
FROM python:3.13-slim
WORKDIR /app

COPY requirements.txt .

# 기본 torch가 GPU용으로 받아지기 떄문에, 별도 base url로 CPU용 다운
RUN pip install --no-cache-dir torch==2.12.0 -i https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r requirements.txt

# 빌드 시점에, 미리 모델 파일을 받아 이미지화, 컨테이너 기동시마다 네트워크 필요 X
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('jhgan/ko-sroberta-multitask')"

# 소스 코드 파일들
COPY . .

# 실행
EXPOSE 8000
CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]