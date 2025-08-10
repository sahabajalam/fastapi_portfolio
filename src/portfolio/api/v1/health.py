"""Health check endpoints."""
from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }


@router.get("/ready")
async def readiness_check():
    """Readiness check endpoint"""
    return {"status": "ready"}


@router.get("/live")
async def liveness_check():
    """Liveness check endpoint"""
    return {"status": "alive"}
