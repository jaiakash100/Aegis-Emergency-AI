from fastapi import APIRouter

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard():

    return {

        "success": True,

        "summary": {

            "total_incidents": 24,

            "active_incidents": 5,

            "resolved_incidents": 19,

            "critical_cases": 2,

            "average_response_time": "4 mins"

        },

        "system_status": {

            "backend": "Running",

            "ai_agent": "Active",

            "database": "Connected",

            "hospital_service": "Online"

        },

        "recent_incidents": [

            {
                "id": 101,
                "type": "Medical Emergency",
                "status": "Resolved"
            },

            {
                "id": 102,
                "type": "Fire Emergency",
                "status": "Active"
            },

            {
                "id": 103,
                "type": "Road Accident",
                "status": "Resolved"
            }

        ]

    }