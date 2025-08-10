"""Development environment configuration."""
from .base import BaseSettings


class DevelopmentSettings(BaseSettings):
    debug: bool = True
    database_url: str = "sqlite:///./portfolio_dev.db"
    log_level: str = "DEBUG"
