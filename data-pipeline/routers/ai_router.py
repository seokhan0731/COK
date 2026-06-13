from fastapi import APIRouter
from schemas.ai_dto import EmbeddingRequest
from services.ai_service import generate_embedding

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/embedding")
def create_embedding(request: EmbeddingRequest):
    vector = generate_embedding(request)
    return {"embedding_vector": vector}
