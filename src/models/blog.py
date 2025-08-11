from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Blog(BaseModel):
    id: int
    image: str
    title: str
    preview: str
    link: str
    published_date: Optional[datetime] = None
    tags: Optional[list[str]] = []
    reading_time: Optional[str] = None


class BlogCreate(BaseModel):
    image: str
    title: str
    preview: str
    link: str
    tags: Optional[list[str]] = []
    reading_time: Optional[str] = None
