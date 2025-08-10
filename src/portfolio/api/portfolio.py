from fastapi import APIRouter
from typing import List
from src.portfolio.services.portfolio_service import PortfolioService
from src.portfolio.models.portfolio import Project, Certification, PersonalInfo

router = APIRouter(prefix="/portfolio", tags=["portfolio"])
portfolio_service = PortfolioService()


@router.get("/info", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    return portfolio_service.get_personal_info()


@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    return portfolio_service.get_projects()


@router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    """Get all certifications"""
    return portfolio_service.get_certifications()
