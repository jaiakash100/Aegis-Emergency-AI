"""
Reasoning Agent
"""

class ReasoningAgent:

    def analyze(self, message: str):

        message = message.lower()

        if any(word in message for word in [
            "fire",
            "smoke",
            "burn"
        ]):

            return {
                "incident_type": "Fire Emergency",
                "severity": "HIGH",
                "confidence": 0.95,
                "reason": "Fire-related keywords detected."
            }

        elif any(word in message for word in [
            "heart",
            "collapse",
            "unconscious",
            "breathing"
        ]):

            return {
                "incident_type": "Medical Emergency",
                "severity": "CRITICAL",
                "confidence": 0.98,
                "reason": "Medical emergency keywords detected."
            }

        elif any(word in message for word in [
            "accident",
            "collision",
            "crash"
        ]):

            return {
                "incident_type": "Road Accident",
                "severity": "HIGH",
                "confidence": 0.94,
                "reason": "Accident keywords detected."
            }

        return {

            "incident_type": "Unknown",

            "severity": "MEDIUM",

            "confidence": 0.60,

            "reason": "Unable to classify."

        }