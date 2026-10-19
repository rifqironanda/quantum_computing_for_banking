import pytest
from fastapi.testclient import TestClient
from backend.main import app


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("GOOGLE_REPORT_DOCUMENT_ID", "one-doc")
    with TestClient(app) as client:
        yield client


def test_links_work_without_login_or_google_tokens(client):
    response = client.get("/api/report")
    assert response.status_code == 200
    assert response.headers["cache-control"] == "no-store"
    assert response.json() == {"id": "one-doc", "title": "Laporan Quantum Banking",
                               "url": "https://docs.google.com/document/d/one-doc/edit"}


def test_no_write_or_arbitrary_document_endpoint(client):
    assert client.post("/api/report", json={"content": "replace"}).status_code == 405
    assert client.get("/api/report/another-document").status_code == 404


@pytest.mark.parametrize("value", ["", "https://docs.google.com/document/d/x/edit", "../other", "a?b"])
def test_bad_or_missing_id_is_clear_error(client, monkeypatch, value):
    monkeypatch.setenv("GOOGLE_REPORT_DOCUMENT_ID", value)
    assert client.get("/api/report").status_code == 503


def test_cors_only_allows_configured_origins(client):
    for origin, allowed in [("http://localhost:5173", True), ("https://untrusted.example", False)]:
        response = client.options("/api/report", headers={"Origin": origin,
            "Access-Control-Request-Method": "GET"})
        assert (response.headers.get("access-control-allow-origin") == origin) is allowed
