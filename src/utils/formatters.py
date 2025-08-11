"""Data formatting utilities."""
from datetime import datetime
from typing import Optional


def format_date(date: datetime, format_string: str = "%B %d, %Y") -> str:
    """Format datetime object to string."""
    return date.strftime(format_string)


def format_reading_time(word_count: int, words_per_minute: int = 200) -> str:
    """Calculate and format reading time."""
    minutes = max(1, round(word_count / words_per_minute))
    return f"{minutes} min read"


def truncate_text(text: str, max_length: int = 150, suffix: str = "...") -> str:
    """Truncate text to specified length."""
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix


def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format."""
    if size_bytes == 0:
        return "0B"

    size_names = ["B", "KB", "MB", "GB", "TB"]
    i = 0

    while size_bytes >= 1024.0 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1

    return f"{size_bytes:.1f}{size_names[i]}"
