// Google is the only report store. Tokens and document contents are never persisted.
const baseUrl = (import.meta.env.VITE_REPORT_API_URL || "").replace(/\/$/, "");
export const GOOGLE_REPORT_SCOPE =
  "https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/drive.readonly";

export async function loadReport(token, signal) {
  const response = await fetch(`${baseUrl}/api/report`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(
      typeof payload.detail === "string"
        ? payload.detail
        : "Laporan gagal dimuat. Periksa koneksi backend FastAPI.",
    );
    error.status = response.status;
    throw error;
  }
  try {
    return await response.json();
  } catch {
    throw new Error("Respons backend bukan JSON. Periksa URL backend FastAPI.");
  }
}

let identityPromise;
export function loadGoogleIdentity() {
  if (window.google?.accounts?.oauth2)
    return Promise.resolve(window.google.accounts.oauth2);
  if (!identityPromise) {
    identityPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      const timer = setTimeout(() => {
        script.remove();
        identityPromise = null;
        reject(new Error("Google Login tidak merespons. Coba lagi."));
      }, 15000);
      script.onload = () => {
        clearTimeout(timer);
        resolve(window.google.accounts.oauth2);
      };
      script.onerror = () => {
        clearTimeout(timer);
        script.remove();
        identityPromise = null;
        reject(new Error("Google Login gagal dimuat. Periksa koneksi Anda."));
      };
      document.head.appendChild(script);
    });
  }
  return identityPromise;
}
