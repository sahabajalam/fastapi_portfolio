"""Production environment configuration."""
from .base import BaseSettings


class ProductionSettings(BaseSettings):
    debug: bool = False
    database_url: str = "postgresql://user:password@localhost/portfolio"
    log_level: str = "INFO"
