from fastapi import APIRouter, HTTPException
from typing import List
from src.services.blog_service import BlogService
from src.models.blog import Blog
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

router = APIRouter(prefix="/blogs", tags=["blogs"])
blog_service = BlogService()
templates = Jinja2Templates(directory="templates")


@router.get("/", response_model=List[Blog])
async def get_blogs():
    """Get all blog posts"""
    return blog_service.get_all_blogs()


@router.get("/{blog_id}", response_model=Blog)
async def get_blog(blog_id: int):
    """Get a specific blog post by ID"""
    try:
        return blog_service.get_blog_by_id(blog_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/featured/", response_model=List[Blog])
async def get_featured_blogs(limit: int = 3):
    """Get featured blog posts"""
    return blog_service.get_featured_blogs(limit)


@router.get("/blog-page")
async def blog_page(request: Request):
    """Serve the blog page template"""
    return templates.TemplateResponse("blog.html", {"request": request})
