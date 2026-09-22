import { supabase, supabaseConfigured } from "./supabaseClient";

const STORAGE_KEY = "quantum-banking-report-v1";
const REPORT_ID = "quantum-banking-readiness";

function storageKey(userId = "guest") {
  return `${STORAGE_KEY}:${userId}`;
}

function readLocal(userId = "guest") {
  try {
    const current = localStorage.getItem(storageKey(userId));
    const legacy = userId === "guest" ? localStorage.getItem(STORAGE_KEY) : null;
    return JSON.parse(current || legacy || "null");
  } catch {
    return null;
  }
}

function writeLocal(snapshot, userId = "guest") {
  localStorage.setItem(storageKey(userId), JSON.stringify(snapshot));
}

function plainText(html) {
  if (typeof DOMParser === "undefined") return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const document = new DOMParser().parseFromString(html, "text/html");
  return (document.body.textContent || "").replace(/\s+/g, " ").trim();
}

function sectionsToSnapshot(rows) {
  return Object.fromEntries(
    rows.map((row) => [
      row.section_key,
      {
        content: row.content_html,
        status: row.status,
        revision: row.revision,
      },
    ]),
  );
}

async function currentSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

async function ensureReport(userId) {
  const existing = await supabase
    .from("reports")
    .select("id, outline_version")
    .eq("slug", REPORT_ID)
    .maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return existing.data;

  const created = await supabase
    .from("reports")
    .insert({
      slug: REPORT_ID,
      title: "Kajian Quantum Computing untuk Perbankan",
      owner_id: userId,
      outline_version: 1,
    })
    .select("id, outline_version")
    .single();
  if (created.error) throw created.error;
  return created.data;
}

async function readDatabase(reportId) {
  const result = await supabase
    .from("report_sections")
    .select("section_key, content_html, status, revision")
    .eq("report_id", reportId)
    .order("position");
  if (result.error) throw result.error;
  return result.data || [];
}

async function writeDatabase(snapshot, outline, reportId, userId) {
  const rows = outline.map((node) => {
    const document = snapshot.sections?.[node.id] || {
      content: node.initialHtml,
      status: "draft",
    };
    return {
      report_id: reportId,
      section_key: node.id,
      parent_key: node.parentId || null,
      heading_number: node.number || null,
      title: node.title,
      heading_level: node.level,
      position: node.index,
      content_html: document.content || node.initialHtml,
      content_text: plainText(document.content || node.initialHtml),
      status: document.status || "draft",
      updated_by: userId,
    };
  });
  const result = await supabase
    .from("report_sections")
    .upsert(rows, { onConflict: "report_id,section_key" });
  if (result.error) throw result.error;
}

/**
 * Local-first persistence. When Supabase environment variables and a valid
 * session are present, PostgreSQL becomes the source of truth while the local
 * snapshot remains an offline cache.
 */
export const reportStorage = {
  id: REPORT_ID,
  isConfigured: supabaseConfigured,

  async getSession() {
    return currentSession();
  },

  async signIn(email, password) {
    if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  },

  async signUp(email, password) {
    if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async load(outline = []) {
    const guestLocal = readLocal();
    if (!supabaseConfigured) return { snapshot: guestLocal, mode: "local", session: null };
    let session = null;
    try {
      session = await currentSession();
      if (!session) return { snapshot: guestLocal, mode: "auth-required", session: null };
      const local = readLocal(session.user.id);
      const report = await ensureReport(session.user.id);
      let rows = await readDatabase(report.id);

      if (!rows.length && local?.sections && outline.length) {
        await writeDatabase(local, outline, report.id, session.user.id);
        rows = await readDatabase(report.id);
      }

      const snapshot = rows.length
        ? {
            reportId: REPORT_ID,
            outlineVersion: report.outline_version,
            savedAt: new Date().toISOString(),
            sections: sectionsToSnapshot(rows),
          }
        : local;
      if (snapshot) writeLocal(snapshot, session.user.id);
      return { snapshot, mode: "database", session };
    } catch (error) {
      const local = readLocal(session?.user.id);
      return { snapshot: local || guestLocal, mode: "offline", session, error };
    }
  },

  async save(snapshot, outline = []) {
    const next = { ...snapshot, reportId: REPORT_ID, savedAt: new Date().toISOString() };
    if (!supabaseConfigured) {
      writeLocal(next);
      return { snapshot: next, mode: "local", session: null };
    }
    let session = null;
    try {
      session = await currentSession();
      if (!session) {
        writeLocal(next);
        return { snapshot: next, mode: "auth-required", session: null };
      }
      writeLocal(next, session.user.id);
      const report = await ensureReport(session.user.id);
      await writeDatabase(next, outline, report.id, session.user.id);
      const rows = await readDatabase(report.id);
      const confirmed = { ...next, sections: sectionsToSnapshot(rows) };
      writeLocal(confirmed, session.user.id);
      return { snapshot: confirmed, mode: "database", session };
    } catch (error) {
      writeLocal(next, session?.user.id);
      return { snapshot: next, mode: "offline", session, error };
    }
  },
};
