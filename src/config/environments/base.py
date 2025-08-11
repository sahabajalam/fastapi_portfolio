"""Base configuration settings."""
from pydantic import BaseSettings


class BaseSettings(BaseSettings):
    app_name: str = "Portfolio Website"
    secret_key: str = "your-secret-key-here"

    class Config:
        env_file = ".env"
