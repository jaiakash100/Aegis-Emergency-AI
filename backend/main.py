from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ----------------------------
# Import Routers
# ----------------------------

from api.home import router as home_router
from api.chat import router as chat_router
from api.detect import router as detect_router
from api.planner import router as planner_router
from api.hospitals import router as hospitals_router
from api.history import router as history_router
from api.memory import router as memory_router
from api.dashboard import router as dashboard_router

# ----------------------------
# FastAPI App
# ----------------------------

app = FastAPI(

    title="AEGIS Emergency AI",

    description="Autonomous AI Emergency Response System",

    version="1.0.0"

)

# ----------------------------
# Enable CORS
# ----------------------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

# ----------------------------
# Register APIs
# ----------------------------

app.include_router(home_router)
app.include_router(chat_router)
app.include_router(detect_router)
app.include_router(planner_router)
app.include_router(hospitals_router)
app.include_router(history_router)
app.include_router(memory_router)
app.include_router(dashboard_router)

# ----------------------------
# Root API
# ----------------------------

@app.get("/status")
def status():

    return {

        "backend": "Running",

        "project": "AEGIS Emergency AI",

        "version": "1.0.0"

    }