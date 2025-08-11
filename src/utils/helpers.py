"""General helper functions."""
import hashlib
import secrets
from typing import Dict, Any, Optional


def generate_uuid() -> str:
    """Generate a secure random UUID."""
    return secrets.token_urlsafe(32)


def hash_password(password: str) -> str:
    """Hash password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()


def create_slug(text: str) -> str:
    """Create URL-friendly slug from text."""
    import re
    # Convert to lowercase and replace spaces with hyphens
    slug = re.sub(r'\s+', '-', text.lower())
    # Remove non-alphanumeric characters except hyphens
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    # Remove multiple consecutive hyphens
    slug = re.sub(r'-+', '-', slug)
    # Remove leading/trailing hyphens
    return slug.strip('-')


def merge_dicts(*dicts: Dict[str, Any]) -> Dict[str, Any]:
    """Merge multiple dictionaries."""
    result = {}
    for d in dicts:
        result.update(d)
    return result


def get_file_extension(filename: str) -> Optional[str]:
    """Get file extension from filename."""
    if '.' in filename:
        return filename.rsplit('.', 1)[1].lower()
    return None
