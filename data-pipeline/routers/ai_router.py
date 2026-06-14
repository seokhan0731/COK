from fastapi import APIRouter, Depends
from schemas.ai_dto import EmbeddingRequest, PostRecommendRequest, PostRecommendResponse
from database.database import get_db
from sqlalchemy.orm import Session
from services.ai_service import generate_embedding, calculate_similarity

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/embedding")
def create_embedding(request: EmbeddingRequest):
    vector = generate_embedding(request)
    return {"embedding_vector": vector}


@router.post("/posting", response_model=PostRecommendResponse)
def get_similarity(request: PostRecommendRequest, db: Session = Depends(get_db)):
    recommended_list = calculate_similarity(request, db)
    return PostRecommendResponse(recommendations=recommended_list)
