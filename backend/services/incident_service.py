"""
Incident Service

Manages all emergency incidents.
(Currently in-memory.
Later connect with SQLite.)
"""

from datetime import datetime


class IncidentService:

    def __init__(self):
        self.incidents = []

    def create_incident(self, incident_data):

        incident = {

            "id": len(self.incidents) + 1,

            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "incident_type": incident_data.get("incident_type"),

            "severity": incident_data.get("severity"),

            "confidence": incident_data.get("confidence"),

            "reason": incident_data.get("reason"),

            "status": "ACTIVE"

        }

        self.incidents.append(incident)

        return incident

    def get_all(self):
        return self.incidents

    def get_by_id(self, incident_id):

        for incident in self.incidents:
            if incident["id"] == incident_id:
                return incident

        return None

    def resolve_incident(self, incident_id):

        for incident in self.incidents:

            if incident["id"] == incident_id:

                incident["status"] = "RESOLVED"

                return incident

        return None

    def delete_incident(self, incident_id):

        self.incidents = [

            incident

            for incident in self.incidents

            if incident["id"] != incident_id

        ]

        return True


incident_service = IncidentService()