"""Authenticated, read-only gateway to one owner-configured Google document."""
import asyncio
import os
import re
from contextlib import asynccontextmanager

import httpx
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


def document_id():
    value = os.getenv("GOOGLE_REPORT_DOCUMENT_ID", "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_-]+", value):
        raise HTTPException(503, "ID Google Docs laporan belum dikonfigurasi pada server.")
    return value


@asynccontextmanager
async def lifespan(app):
    async with httpx.AsyncClient(timeout=20, follow_redirects=False) as client:
        app.state.google_client = client
        yield


app = FastAPI(title="Quantum Banking Report API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Authorization"],
)
bearer = HTTPBearer(auto_error=False)


def google_token(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)):
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(401, "Masuk dengan Google untuk membaca laporan.",
                            headers={"WWW-Authenticate": "Bearer"})
    return credentials.credentials


@app.middleware("http")
async def no_private_cache(request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


async def google_get(url, token, params=None):
    try:
        response = await app.state.google_client.get(
            url, headers={"Authorization": f"Bearer {token}"}, params=params,
        )
    except httpx.RequestError:
        raise HTTPException(502, "Google tidak dapat dihubungi. Coba lagi.") from None
    if response.status_code == 401:
        raise HTTPException(401, "Sesi Google berakhir. Silakan masuk kembali.")
    if response.status_code in (403, 404):
        raise HTTPException(response.status_code,
                            "Dokumen tidak dapat diakses. Pastikan akun Anda diberi akses dan API Google aktif.")
    if response.status_code == 429:
        raise HTTPException(429, "Batas permintaan Google tercapai. Coba beberapa saat lagi.")
    if response.status_code != 200:
        raise HTTPException(502, "Google gagal memuat laporan.")
    return response.json()


def blocks_from_content(content, tab_id=""):
    """Plain text and table cells only; never return Google-supplied HTML."""
    blocks = []
    for element in content:
        if "paragraph" in element:
            paragraph = element["paragraph"]
            text = "".join(part.get("textRun", {}).get("content", "")
                           for part in paragraph.get("elements", []))
            if not text.strip():
                continue
            style = paragraph.get("paragraphStyle", {})
            blocks.append({"type": "paragraph", "text": text.rstrip("\n"),
                           "style": style.get("namedStyleType", "NORMAL_TEXT"),
                           "headingId": style.get("headingId"), "tabId": tab_id,
                           "bullet": "bullet" in paragraph})
        elif "table" in element:
            blocks.append({"type": "table", "rows": [
                [blocks_from_content(cell.get("content", []), tab_id)
                 for cell in row.get("tableCells", [])]
                for row in element["table"].get("tableRows", [])
            ]})
    return blocks


def document_tabs(document):
    tabs = []

    def visit(items):
        for tab in items:
            properties = tab.get("tabProperties", {})
            tab_id = properties.get("tabId", "")
            tabs.append({"id": tab_id, "title": properties.get("title", "Laporan"),
                         "blocks": blocks_from_content(
                             tab.get("documentTab", {}).get("body", {}).get("content", []), tab_id)})
            visit(tab.get("childTabs", []))

    visit(document.get("tabs", []))
    if not tabs:
        tabs.append({"id": "", "title": "Laporan", "blocks": blocks_from_content(
            document.get("body", {}).get("content", []))})
    return tabs


@app.get("/api/health")
def health():
    return {"status": "ok", "reportConfigured": bool(os.getenv("GOOGLE_REPORT_DOCUMENT_ID"))}


@app.get("/api/report")
async def get_report(token: str = Depends(google_token)):
    doc_id = document_id()
    # Google validates this user's access on EVERY request. No service-account
    # fallback, public content cache, arbitrary document ID, or write endpoint.
    metadata, document = await asyncio.gather(
        google_get(f"https://www.googleapis.com/drive/v3/files/{doc_id}", token,
                   {"fields": "id,name,mimeType,modifiedTime,capabilities(canComment,canEdit)",
                    "supportsAllDrives": "true"}),
        google_get(f"https://docs.googleapis.com/v1/documents/{doc_id}", token,
                   {"includeTabsContent": "true"}),
    )
    if metadata.get("mimeType") != "application/vnd.google-apps.document":
        raise HTTPException(422, "File laporan harus berupa dokumen Google Docs native.")
    capabilities = metadata.get("capabilities", {})
    return {"id": doc_id, "title": document.get("title", metadata.get("name", "Laporan")),
            "modifiedTime": metadata.get("modifiedTime"),
            "url": f"https://docs.google.com/document/d/{doc_id}/edit",
            "canComment": capabilities.get("canComment", False),
            "canEdit": capabilities.get("canEdit", False),
            "tabs": document_tabs(document)}
