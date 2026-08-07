from fastapi import APIRouter
from pydantic import BaseModel

from agents.emergency_agent import EmergencyAgent

router = APIRouter(
    prefix="/chat",
    tags=["Emergency Chat"]
)

agent = EmergencyAgent()


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):
    return agent.process(request.message)