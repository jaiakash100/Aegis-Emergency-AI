from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    PROJECT_NAME: str = "AEGIS Emergency AI"
    VERSION: str = "1.0.0"

    GEMINI_API_KEY: str = ""

    DATABASE_URL: str = "sqlite:///./agentaid.db"

    class Config:
        env_file = ".env"


settings = Settings()