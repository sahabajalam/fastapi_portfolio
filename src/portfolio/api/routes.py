"""Main route definitions."""
from fastapi import APIRouter
from . import blog, portfolio

api_router = APIRouter()

# Include routers
api_router.include_router(blog.router)
api_router.include_router(portfolio.router)
