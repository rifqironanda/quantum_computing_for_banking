import { defaultReport } from "./reportConfig";

// No OAuth, access tokens, Google API calls, or local report copies.
// This module builds links. Google itself serves the document to the reader.
export function documentLinks(value, title = "Laporan Quantum Banking") {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("Gunakan tautan Google Docs yang valid.");
  }
  const match = parsed.pathname.match(
    /^\/document\/(?:u\/\d+\/)?d\/([A-Za-z0-9_-]+)(?:\/(?:edit|preview|view))?\/?$/,
  );
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "docs.google.com" ||
    parsed.port ||
    parsed.username ||
    parsed.password ||
    !match
  ) {
    throw new Error(
      "Gunakan tautan dokumen asli https://docs.google.com/document/d/ID/edit.",
    );
  }
  const base = `https://docs.google.com/document/d/${match[1]}`;
  const resourceKey = parsed.searchParams.get("resourcekey");
  const query = resourceKey
    ? `?${new URLSearchParams({ resourcekey: resourceKey })}`
    : "";
  return {
    id: match[1],
    title,
    url: `${base}/edit${query}`,
    previewUrl: `${base}/preview${query}`,
  };
}

export async function loadReport(signal) {
  const directUrl = import.meta.env.VITE_REPORT_DOCUMENT_URL?.trim();
  if (directUrl) return documentLinks(directUrl);
  const baseUrl = (import.meta.env.VITE_REPORT_API_URL || "").replace(
    /\/$/,
    "",
  );
  if (!baseUrl) return documentLinks(defaultReport.url, defaultReport.title);
  const response = await fetch(`${baseUrl}/api/report`, {
    cache: "no-store",
    credentials: "omit",
    signal,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      typeof payload.detail === "string"
        ? payload.detail
        : "Tautan laporan gagal dimuat. Periksa koneksi FastAPI.",
    );
  }
  let report;
  try {
    report = await response.json();
  } catch {
    throw new Error(
      "Respons backend bukan JSON. Periksa URL FastAPI atau isi tautan dokumen langsung.",
    );
  }
  return documentLinks(report.url, report.title);
}
