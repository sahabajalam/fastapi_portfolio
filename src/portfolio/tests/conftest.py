"""Test configuration and fixtures."""
import pytest
from fastapi.testclient import TestClient
from src.portfolio.main import app


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


@pytest.fixture
def sample_blog_data():
    """Sample blog data for testing."""
    return {
        "id": 1,
        "image": "/static/images/blog/test.jpg",
        "title": "Test Blog Post",
        "preview": "This is a test blog post preview.",
        "link": "https://medium.com/@test/test-blog",
        "tags": ["test", "python"],
        "reading_time": "5 min read"
    }
