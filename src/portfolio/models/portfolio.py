from pydantic import BaseModel
from typing import Optional, List


class Project(BaseModel):
    id: int
    title: str
    description: str
    image: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = False


class Certification(BaseModel):
    id: int
    title: str
    issuer: str
    image: str
    issue_date: str
    credential_url: Optional[str] = None


class PersonalInfo(BaseModel):
    name: str
    title: str
    bio: str
    email: str
    linkedin: Optional[str] = None
    github: Optional[str] = None
    twitter: Optional[str] = None
    location: Optional[str] = None
