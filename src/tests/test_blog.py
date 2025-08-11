"""Blog API tests."""


def test_get_all_blogs(client):
    """Test getting all blog posts."""
    response = client.get("/api/blogs/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_get_blog_by_id(client):
    """Test getting blog by ID."""
    response = client.get("/api/blogs/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data
    assert "preview" in data


def test_get_blog_not_found(client):
    """Test getting non-existent blog."""
    response = client.get("/api/blogs/999")
    assert response.status_code == 404


def test_get_featured_blogs(client):
    """Test getting featured blogs."""
    response = client.get("/api/blogs/featured/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) <= 3
