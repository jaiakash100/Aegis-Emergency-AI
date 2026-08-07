from fastapi import APIRouter

router = APIRouter(tags=["Home"])

@router.get("/")
def home():
    return {
        "status": "Backend Running",
        "project": "AEGIS Emergency AI",
        "version": "1.0.0"
    }