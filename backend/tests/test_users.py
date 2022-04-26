from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Sun.Day Backend Application!"}

def test_read_users_me():
    response = client.get("api/v1/users/me")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

def test_create_user_with_missing_params():
    response = client.post("api/v1/users/register", json={"username": "test", "password": "test"})
    assert response.status_code == 422

def test_get_customers():
    response = client.get("api/v1/customers")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

def test_not_found():
    response = client.get("api/v1/notfound")
    assert response.status_code == 404