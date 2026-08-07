from fastapi import APIRouter

router = APIRouter(
    prefix="/hospitals",
    tags=["Hospitals"]
)


@router.get("/")
def get_nearby_hospitals():

    hospitals = [
        {
            "id": 1,
            "name": "Apollo Hospital",
            "distance": "2.4 km",
            "eta": "6 mins",
            "beds_available": 12,
            "contact": "+91 9876543210"
        },
        {
            "id": 2,
            "name": "Fortis Hospital",
            "distance": "4.1 km",
            "eta": "10 mins",
            "beds_available": 8,
            "contact": "+91 9876501234"
        },
        {
            "id": 3,
            "name": "Government General Hospital",
            "distance": "5.7 km",
            "eta": "14 mins",
            "beds_available": 21,
            "contact": "+91 9123456789"
        }
    ]

    return {
        "success": True,
        "count": len(hospitals),
        "hospitals": hospitals
    }