"""Content management service for handling dynamic content."""
from typing import List, Dict, Any


class ContentService:
    @staticmethod
    def get_site_metadata() -> Dict[str, Any]:
        return {
            "title": "Portfolio Website",
            "description": "Personal portfolio showcasing projects, blog posts, and professional experience",
            "keywords": ["portfolio", "developer", "data scientist", "python", "fastapi"],
            "author": "Sahabaj Alam",
            "og_image": "/static/images/og-image.jpg"
        }

    @staticmethod
    def get_navigation_items() -> List[Dict[str, str]]:
        return [
            {"name": "Home", "href": "#home"},
            {"name": "About", "href": "#about"},
            {"name": "Projects", "href": "#projects"},
            {"name": "Blog", "href": "#blog"},
            {"name": "Contact", "href": "#contact"}
        ]
