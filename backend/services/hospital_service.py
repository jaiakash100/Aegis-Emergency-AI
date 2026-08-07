"""
Hospital Service

Provides nearby hospitals.
(Currently using mock data.
Later connect with Google Maps API.)
"""

from typing import List


class HospitalService:

    def __init__(self):
        self.hospitals = [

            {
                "id": 1,
                "name": "Apollo Hospital",
                "distance": "2.4 km",
                "eta": "6 mins",
                "beds": 12,
                "contact": "+91 9876543210"
            },

            {
                "id": 2,
                "name": "Fortis Hospital",
                "distance": "4.1 km",
                "eta": "10 mins",
                "beds": 8,
                "contact": "+91 9876501234"
            },

            {
                "id": 3,
                "name": "Government General Hospital",
                "distance": "5.8 km",
                "eta": "14 mins",
                "beds": 20,
                "contact": "+91 9123456789"
            }

        ]

    def get_all_hospitals(self) -> List:
        return self.hospitals

    def get_nearest_hospital(self):

        return min(
            self.hospitals,
            key=lambda x: float(x["distance"].split()[0])
        )


hospital_service = HospitalService()