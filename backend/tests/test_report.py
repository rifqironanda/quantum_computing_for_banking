import httpx
import pytest
from fastapi.testclient import TestClient
from backend.main import app

DOC = {"title": "Kajian Quantum Banking", "tabs": [{
    "tabProperties": {"tabId": "first", "title": "Kajian"},
    "documentTab": {"body": {"content": [{"paragraph": {
        "elements": [{"textRun": {"content": "Pendahuluan\n"}}],
        "paragraphStyle": {"namedStyleType": "HEADING_1", "headingId": "h.1"}
    }}, {"table": {"tableRows": [{"tableCells": [{"content": [{"paragraph": {
        "elements": [{"textRun": {"content": "RSA <script>alert(1)</script>\n"}}]
    }}]}]}]}}]}},
    "childTabs": [{"tabProperties": {"tabId": "child", "title": "Lampiran"},
                   "documentTab": {"body": {"content": []}}}]
}]}


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("GOOGLE_REPORT_DOCUMENT_ID", "one-doc")
    with TestClient(app) as client:
        yield client


def mock_google(status=200, can_edit=False):
    def handler(request):
        assert request.headers["Authorization"] == "Bearer user-token"
        assert "one-doc" in request.url.path
        if status != 200:
            return httpx.Response(status, json={"error": "private upstream details"})
        if request.url.host == "docs.googleapis.com":
            assert request.url.params["includeTabsContent"] == "true"
            return httpx.Response(200, json=DOC)
        return httpx.Response(200, json={"mimeType": "application/vnd.google-apps.document",
                             "capabilities": {"canComment": True, "canEdit": can_edit}})
    return httpx.AsyncClient(transport=httpx.MockTransport(handler))


def test_requires_auth_and_never_exposes_write_route(client):
    assert client.get("/api/report").status_code == 401
    assert client.post("/api/report", json={"content": "replace"}).status_code == 405
    assert client.get("/api/report/another-document").status_code == 404


def test_reads_one_document_with_nested_tabs_and_table(client):
    app.state.google_client = mock_google()
    response = client.get("/api/report", headers={"Authorization": "Bearer user-token"})
    assert response.status_code == 200
    assert response.headers["cache-control"] == "no-store"
    result = response.json()
    assert result["id"] == "one-doc"
    assert result["canComment"] is True and result["canEdit"] is False
    assert [tab["id"] for tab in result["tabs"]] == ["first", "child"]
    assert result["tabs"][0]["blocks"][0]["headingId"] == "h.1"
    assert result["tabs"][0]["blocks"][1]["rows"][0][0][0]["text"] == "RSA <script>alert(1)</script>"


@pytest.mark.parametrize("status", [401, 403, 404, 429, 500])
def test_google_denials_never_fall_back_to_cached_content(client, status):
    app.state.google_client = mock_google(status)
    response = client.get("/api/report", headers={"Authorization": "Bearer user-token"})
    assert response.status_code == (502 if status == 500 else status)
    assert "private upstream details" not in response.text
    assert "tabs" not in response.json()


def test_unconfigured_document_is_clear_error(client, monkeypatch):
    monkeypatch.delenv("GOOGLE_REPORT_DOCUMENT_ID")
    assert client.get("/api/report", headers={"Authorization": "Bearer user-token"}).status_code == 503


def test_cors_only_allows_configured_origins(client):
    for origin, allowed in [("http://localhost:5173", True), ("https://untrusted.example", False)]:
        response = client.options("/api/report", headers={"Origin": origin,
            "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "Authorization"})
        assert (response.headers.get("access-control-allow-origin") == origin) is allowed
