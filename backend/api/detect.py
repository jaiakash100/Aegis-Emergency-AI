from fastapi import APIRouter
from pydantic import BaseModel

from agents.reasoning_agent import ReasoningAgent

router = APIRouter(
    prefix="/detect",
    tags=["Emergency Detection"]
)

reasoner = ReasoningAgent()


class DetectRequest(BaseModel):
    message: str


@router.post("/")
def detect(request: DetectRequest):
    return reasoner.analyze(request.message)