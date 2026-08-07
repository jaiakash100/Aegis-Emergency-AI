from fastapi import FastAPI

from database.init_db import init_database

app = FastAPI(
    title="AgentAid Backend",
    version="1.0.0"
)


@app.on_event("startup")
def startup():
    init_database()


@app.get("/")
def home():
    return {
        "message": "AgentAid Backend Running Successfully"
    }