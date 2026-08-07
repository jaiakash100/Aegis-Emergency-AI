"""
Emergency Agent

Master AI Agent

Coordinates:
- Reasoning Agent
- Planner Agent
- Gemini Service
- Hospital Service
- Incident Service
- Memory Service
"""

from agents.reasoning_agent import ReasoningAgent
from agents.planner_agent import PlannerAgent

from services.gemini_service import gemini_service
from services.hospital_service import hospital_service
from services.memory_service import memory_service
from services.incident_service import incident_service


class EmergencyAgent:

    def __init__(self):

        self.reasoner = ReasoningAgent()
        self.planner = PlannerAgent()

    def process(self, message: str):

        # STEP 1
        incident = self.reasoner.analyze(message)

        # STEP 2
        plan = self.planner.generate_plan(incident)

        # STEP 3
        ai = gemini_service.generate_response(
            f"""
            User Emergency:
            {message}

            Incident:
            {incident['incident_type']}

            Severity:
            {incident['severity']}

            Give emergency guidance.
            """
        )

        # STEP 4
        hospital = hospital_service.get_nearest_hospital()

        # STEP 5
        incident_service.create_incident(incident)

        # STEP 6
        memory_service.save(
            message,
            ai["response"] if ai["success"] else ""
        )

        # STEP 7
        return {

            "success": True,

            "incident": incident,

            "planner": plan,

            "hospital": hospital,

            "ai_response": ai["response"]
            if ai["success"]
            else "AI unavailable.",

            "timestamp": incident_service.get_all()[-1]["timestamp"]

        }


emergency_agent = EmergencyAgent()