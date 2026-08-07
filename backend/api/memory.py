from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/memory",
    tags=["Memory"]
)

memory_store = []


class MemoryRequest(BaseModel):
    user: str
    ai: str


@router.get("/")
def get_memory():
    return {
        "success": True,
        "count": len(memory_store),
        "memory": memory_store
    }


@router.post("/")
def save_memory(request: MemoryRequest):

    memory_store.append({
        "id": len(memory_store) + 1,
        "user": request.user,
        "ai": request.ai
    })

    return {
        "success": True,
        "message": "Conversation saved."
    }


@router.delete("/")
def clear_memory():

    memory_store.clear()

    return {
        "success": True,
        "message": "Memory cleared."
    }