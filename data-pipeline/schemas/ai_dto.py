from pydantic import BaseModel


class EmbeddingRequest(BaseModel):
    essay_answer: str
