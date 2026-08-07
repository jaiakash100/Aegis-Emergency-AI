"""
Planner Agent

Generates an emergency action plan.
"""


class PlannerAgent:

    def generate_plan(self, incident):

        incident_type = incident["incident_type"]

        if incident_type == "Medical Emergency":

            actions = [
                "Call Ambulance (108).",
                "Check breathing and pulse.",
                "Start CPR if trained.",
                "Do not move the patient.",
                "Share your live location."
            ]

        elif incident_type == "Fire Emergency":

            actions = [
                "Evacuate immediately.",
                "Call Fire Department (101).",
                "Switch off electricity if safe.",
                "Do not use elevators.",
                "Move to an open safe area."
            ]

        elif incident_type == "Road Accident":

            actions = [
                "Call Ambulance (108).",
                "Ensure the area is safe.",
                "Control bleeding if possible.",
                "Do not move injured victims.",
                "Wait for emergency responders."
            ]

        else:

            actions = [
                "Stay calm.",
                "Call emergency services.",
                "Explain the situation clearly.",
                "Share your location."
            ]

        return {

            "incident_type": incident_type,

            "severity": incident["severity"],

            "action_plan": actions,

            "estimated_response": "5-15 mins"

        }