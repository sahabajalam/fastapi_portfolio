"""Content API endpoints."""
from fastapi import APIRouter
from src.portfolio.services.content_service import ContentService

router = APIRouter(prefix="/content", tags=["content"])
content_service = ContentService()


@router.get("/metadata")
async def get_site_metadata():
    """Get site metadata"""
    return content_service.get_site_metadata()


@router.get("/navigation")
async def get_navigation_items():
    """Get navigation items"""
    return content_service.get_navigation_items()
