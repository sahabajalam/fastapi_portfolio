"""Testing environment configuration."""
from .base import BaseSettings


class TestingSettings(BaseSettings):
    debug: bool = True
    database_url: str = "sqlite:///./test_portfolio.db"
    log_level: str = "DEBUG"
