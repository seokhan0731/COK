from pydantic import BaseModel


class EmbeddingRequest(BaseModel):
    essay_answer: str


class PostRecommendRequest(BaseModel):
    user_vector: list[float]
    job_id: int


class PostRecommendItem(BaseModel):
    rank: int
    post_id: int
    similarity: float


class PostRecommendResponse(BaseModel):
    recommendations: list[PostRecommendItem]
