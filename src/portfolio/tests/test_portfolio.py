"""Portfolio API tests."""


def test_get_personal_info(client):
    """Test getting personal information."""
    response = client.get("/api/portfolio/info")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "title" in data
    assert "bio" in data
    assert "email" in data


def test_get_projects(client):
    """Test getting projects."""
    response = client.get("/api/portfolio/projects")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    for project in data:
        assert "id" in project
        assert "title" in project
        assert "description" in project
        assert "technologies" in project


def test_get_certifications(client):
    """Test getting certifications."""
    response = client.get("/api/portfolio/certifications")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    for cert in data:
        assert "id" in cert
        assert "title" in cert
        assert "issuer" in cert
