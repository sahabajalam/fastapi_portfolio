"""Responsive design tests."""


def test_home_page_loads(client):
    """Test that home page loads successfully."""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_blog_page_loads(client):
    """Test that blog page loads successfully."""
    response = client.get("/blog")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_health_check(client):
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_api_health_check(client):
    """Test API health check endpoint."""
    response = client.get("/api/v1/health/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
