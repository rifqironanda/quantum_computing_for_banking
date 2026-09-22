const STORAGE_KEY = "quantum-banking-report-v1";
const REPORT_ID = "quantum-banking-readiness";

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeLocal(snapshot) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function apiBase() {
  return import.meta.env.VITE_REPORT_API_URL?.replace(/\/$/, "");
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBase()}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`Report API returned ${response.status}`);
  return response.status === 204 ? null : response.json();
}

/**
 * Storage boundary for the report editor. GitHub Pages works immediately with
 * localStorage; setting VITE_REPORT_API_URL switches the same UI to an
 * authenticated backend without coupling editor components to a vendor SDK.
 */
export const reportStorage = {
  id: REPORT_ID,

  async load() {
    const local = readLocal();
    if (!apiBase()) return { snapshot: local, mode: "local" };
    try {
      const snapshot = await apiRequest(`/reports/${REPORT_ID}`);
      if (snapshot) writeLocal(snapshot);
      return { snapshot: snapshot || local, mode: "database" };
    } catch (error) {
      return { snapshot: local, mode: "offline", error };
    }
  },

  async save(snapshot) {
    const next = { ...snapshot, reportId: REPORT_ID, savedAt: new Date().toISOString() };
    writeLocal(next);
    if (!apiBase()) return { snapshot: next, mode: "local" };
    try {
      const saved = await apiRequest(`/reports/${REPORT_ID}`, {
        method: "PUT",
        body: JSON.stringify(next),
      });
      const confirmed = saved || next;
      writeLocal(confirmed);
      return { snapshot: confirmed, mode: "database" };
    } catch (error) {
      return { snapshot: next, mode: "offline", error };
    }
  },
};
