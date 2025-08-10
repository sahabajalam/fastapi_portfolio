from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str = "sqlite:///./portfolio.db"
    redis_url: str = "redis://localhost:6379"
    
    # Security
    secret_key: str = "your-secret-key-here"
    jwt_secret_key: str = "your-jwt-secret-key"
    
    # Email Configuration
    smtp_host: str = "smtp.gmail.com"
    smtp_port: str = "587"
    smtp_user: str = "your-email@gmail.com"
    smtp_password: str = "your-app-password"
    
    # Application Settings
    debug: bool = True
    app_name: str = "Portfolio Website"
    environment: str = "development"
    allowed_hosts: str = "localhost,127.0.0.1"
    
    # Analytics
    google_analytics_id: Optional[str] = None

    model_config = {"env_file": ".env"}


settings = Settings()
