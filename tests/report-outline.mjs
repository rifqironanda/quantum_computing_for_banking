import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [outline, dashboard, component, storage, supabaseClient, workflow] = await Promise.all([
  readFile(new URL("../src/data/report-outline.md", import.meta.url), "utf8"),
  readFile(new URL("../src/Dashboard.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/ReportOutline.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/reportStorage.js", import.meta.url), "utf8"),
  readFile(new URL("../src/supabaseClient.js", import.meta.url), "utf8"),
  readFile(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8"),
]);

assert.equal((outline.match(/^##\s+/gm) || []).length, 10, "outline must contain 10 main chapters");
assert.ok((outline.match(/^#{2,4}\s+/gm) || []).length >= 90, "outline sections must not be truncated");
assert.ok(outline.includes("## 1. Pendahuluan"));
assert.ok(outline.includes("## 10. Kesimpulan dan Rekomendasi"));

const reportNav = dashboard.indexOf('["report", "Outline laporan"');
const labNav = dashboard.indexOf('["lab", "Computing lab"');
assert.ok(reportNav > -1 && labNav > reportNav, "report navigation must appear above computing lab");
assert.ok(component.includes("contentEditable"), "report editor must expose rich-text editing");
assert.ok(component.includes("Autosave aktif"), "autosave state must be visible");
assert.ok(storage.includes('.from("report_sections")'), "Supabase section persistence must exist");
assert.ok(storage.includes("signInWithPassword"), "Supabase authentication must exist");
assert.ok(storage.includes("localStorage"), "local-first fallback must exist");
assert.ok(storage.includes("session.user.id"), "local cache must be scoped per authenticated user");
assert.ok(supabaseClient.includes("VITE_SUPABASE_PUBLISHABLE_KEY"), "publishable key configuration must exist");
assert.ok(!supabaseClient.includes("SERVICE_ROLE"), "service-role secret must never be bundled");
assert.ok(workflow.includes("VITE_SUPABASE_URL"), "deployment must inject Supabase URL");
assert.ok(component.includes("Masuk ke report workspace"), "report authentication UI must exist");
assert.ok(component.includes('VITE_SUPABASE_ALLOW_SIGNUP === "true"'), "public signup must be opt-in");

console.log("PASS report outline, navigation order, editor, and persistence contract");
