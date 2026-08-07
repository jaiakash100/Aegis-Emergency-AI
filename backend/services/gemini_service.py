"""
Gemini AI Service

Responsible for communicating with the Gemini API.
"""

import google.generativeai as genai
from config.settings import settings


class GeminiService:

    def __init__(self):

        genai.configure(api_key=settings.GEMINI_API_KEY)

        self.model = genai.GenerativeModel("gemini-2.5-flash")

    def generate_response(self, prompt: str):

        try:

            response = self.model.generate_content(prompt)

            return {
                "success": True,
                "response": response.text
            }

        except Exception as e:

            return {
                "success": False,
                "error": str(e)
            }


gemini_service = GeminiService()