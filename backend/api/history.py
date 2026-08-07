from fastapi import APIRouter

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

history_data = [
    {
        "id": 1,
        "incident": "Medical Emergency",
        "severity": "CRITICAL",
        "status": "Resolved",
        "time": "2026-08-07 10:30 AM"
    },
    {
        "id": 2,
        "incident": "Fire Emergency",
        "severity": "HIGH",
        "status": "In Progress",
        "time": "2026-08-07 12:45 PM"
    }
]


@router.get("/")
def get_history():
    return {
        "success": True,
        "total": len(history_data),
        "history": history_data
    }


@router.get("/{incident_id}")
def get_incident(incident_id: int):

    for incident in history_data:
        if incident["id"] == incident_id:
            return incident

    return {
        "success": False,
        "message": "Incident not found"
    }


@router.delete("/{incident_id}")
def delete_incident(incident_id: int):

    global history_data

    history_data = [
        i for i in history_data
        if i["id"] != incident_id
    ]

    return {
        "success": True,
        "message": "Incident deleted successfully"
    }