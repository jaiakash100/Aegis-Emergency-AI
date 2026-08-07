"""
Memory Service

Stores AI conversations and emergency history.
(Currently in-memory.
Later replace with SQLite.)
"""

from datetime import datetime


class MemoryService:

    def __init__(self):
        self.memory = []

    def save(self, user_message, ai_response):

        conversation = {

            "id": len(self.memory) + 1,

            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "user": user_message,

            "assistant": ai_response

        }

        self.memory.append(conversation)

        return conversation

    def get_all(self):

        return self.memory

    def get_by_id(self, memory_id):

        for item in self.memory:
            if item["id"] == memory_id:
                return item

        return None

    def delete(self, memory_id):

        self.memory = [
            item
            for item in self.memory
            if item["id"] != memory_id
        ]

        return True

    def clear(self):

        self.memory.clear()

        return True


memory_service = MemoryService()