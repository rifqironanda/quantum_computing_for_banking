"""Report links and bounded public Qiskit experiments."""
import os
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.app import router as benchmark_router

app = FastAPI(title="Quantum Banking API")
app.include_router(benchmark_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv(
        "FRONTEND_ORIGINS", "https://rifqironanda.github.io,http://localhost:5173,http://127.0.0.1:5173"
    ).split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


def document_id():
    value = os.getenv("GOOGLE_REPORT_DOCUMENT_ID", "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_-]+", value):
        raise HTTPException(503, "Tautan Google Docs laporan belum dikonfigurasi oleh pengelola.")
    return value


@app.middleware("http")
async def no_cache(request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@app.get("/api/health")
def health():
    return {"status": "ok", "benchmark": "qiskit-statevector", "reportConfigured": bool(os.getenv("GOOGLE_REPORT_DOCUMENT_ID"))}


@app.get("/api/report")
def get_report():
    doc_id = document_id()
    # Links are visible to visitors. File access is enforced by Google, including
    # in the iframe; this server never reads contents or receives Google tokens.
    return {"id": doc_id,
            "title": os.getenv("GOOGLE_REPORT_TITLE", "Laporan Quantum Banking"),
            "url": f"https://docs.google.com/document/d/{doc_id}/edit"}
