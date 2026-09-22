import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [outline, dashboard, component, storage] = await Promise.all([
  readFile(new URL("../src/data/report-outline.md", import.meta.url), "utf8"),
  readFile(new URL("../src/Dashboard.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/ReportOutline.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/reportStorage.js", import.meta.url), "utf8"),
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
assert.ok(storage.includes("VITE_REPORT_API_URL"), "database adapter configuration must exist");
assert.ok(storage.includes("localStorage"), "local-first fallback must exist");

console.log("PASS report outline, navigation order, editor, and persistence contract");
