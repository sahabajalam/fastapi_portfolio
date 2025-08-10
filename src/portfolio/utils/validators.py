"""Data validation utilities."""
import re
from typing import Optional


def validate_email(email: str) -> bool:
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_url(url: str) -> bool:
    """Validate URL format."""
    pattern = r'^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$'
    return re.match(pattern, url) is not None


def sanitize_text(text: str, max_length: Optional[int] = None) -> str:
    """Sanitize text input."""
    # Remove potentially harmful characters
    sanitized = re.sub(r'[<>"\']', '', text.strip())

    if max_length and len(sanitized) > max_length:
        sanitized = sanitized[:max_length] + '...'

    return sanitized
