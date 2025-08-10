from typing import List
from src.portfolio.models.blog import Blog, BlogCreate

# Sample blog data - replace with database operations in production
BLOGS = [
    Blog(
        id=1,
        image="/static/images/blog/1.jpg",
        title="How AI uses distance",
        preview="Exploring the role of distance metrics in AI applications and their practical implementations in machine learning algorithms.",
        link="https://medium.com/@yourusername/how-ai-uses-distance",
        tags=["AI", "Machine Learning", "Data Science"],
        reading_time="9 min read"
    ),
    Blog(
        id=2,
        image="/static/images/blog/2.jpg",
        title="Document ingestion to smart queries",
        preview="A deep dive into document ingestion pipelines and how to build intelligent query systems for better information retrieval.",
        link="https://medium.com/@yourusername/document-ingestion-to-smart-queries",
        tags=["Data Engineering", "NLP", "Search"],
        reading_time="28 min read"
    ),
    Blog(
        id=3,
        image="/static/images/blog/3.jpg",
        title="Beyond Glorified Curve Fitting",
        preview="Understanding the deeper implications of machine learning beyond simple curve fitting and statistical modeling approaches.",
        link="https://medium.com/@yourusername/beyond-glorified-curve-fitting",
        tags=["Machine Learning", "Statistics", "Theory"],
        reading_time="12 min read"
    )
]


class BlogService:
    @staticmethod
    def get_all_blogs() -> List[Blog]:
        return BLOGS

    @staticmethod
    def get_blog_by_id(blog_id: int) -> Blog:
        for blog in BLOGS:
            if blog.id == blog_id:
                return blog
        raise ValueError(f"Blog with id {blog_id} not found")

    @staticmethod
    def get_featured_blogs(limit: int = 3) -> List[Blog]:
        return BLOGS[:limit]
