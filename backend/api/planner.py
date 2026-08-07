from fastapi import APIRouter
from pydantic import BaseModel

from agents.planner_agent import PlannerAgent

router = APIRouter(
    prefix="/planner",
    tags=["Emergency Planner"]
)

planner = PlannerAgent()


class PlannerRequest(BaseModel):
    incident_type: str
    severity: str


@router.post("/")
def planner_api(request: PlannerRequest):

    incident = {
        "incident_type": request.incident_type,
        "severity": request.severity
    }

    return planner.generate_plan(incident)