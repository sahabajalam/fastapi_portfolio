import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from src.api import blog, portfolio
from src.api.v1 import content, health
from src.config.settings import settings
from src.services.blog_service import BlogService
from src.services.portfolio_service import PortfolioService

app = FastAPI(
    title=settings.app_name,
    description="Personal Portfolio Website with Blog",
    version="1.0.0"
)

# Mount static files - handle both local and Vercel paths
static_dir = "src/static"
if os.path.exists("/var/task/src/static"):
    static_dir = "/var/task/src/static"
elif os.path.exists("static"):
    static_dir = "static"

try:
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
except RuntimeError:
    # Handle case where static directory doesn't exist in serverless
    pass

# Templates configuration - handle both local and Vercel paths
template_dir = "src/templates"
if os.path.exists("/var/task/src/templates"):
    template_dir = "/var/task/src/templates"
elif os.path.exists("templates"):
    template_dir = "templates"

templates = Jinja2Templates(directory=template_dir)

# Include API routers
app.include_router(blog.router, prefix="/api")
app.include_router(portfolio.router, prefix="/api")
app.include_router(content.router, prefix="/api/v1")
app.include_router(health.router, prefix="/api/v1")

# Initialize services
blog_service = BlogService()
portfolio_service = PortfolioService()


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Main portfolio page"""
    personal_info = portfolio_service.get_personal_info()
    featured_blogs = blog_service.get_featured_blogs(3)
    projects = portfolio_service.get_projects()
    certifications = portfolio_service.get_certifications()

    return templates.TemplateResponse("index.html", {
        "request": request,
        "personal_info": personal_info,
        "featured_blogs": featured_blogs,
        "projects": projects,
        "certifications": certifications
    })


@app.get("/blog", response_class=HTMLResponse)
async def blog_page(request: Request):
    """Dedicated blog page"""
    blogs = blog_service.get_all_blogs()
    return templates.TemplateResponse("blog.html", {
        "request": request,
        "blogs": blogs
    })


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
