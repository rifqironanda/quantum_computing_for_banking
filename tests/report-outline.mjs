import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const outline = await readFile(
  new URL("../src/data/report-outline.md", import.meta.url),
  "utf8",
);
assert.equal(
  (outline.match(/^##\s+/gm) || []).length,
  10,
  "legacy outline remains available for manual migration",
);
const dashboard = await readFile(
  new URL("../src/Dashboard.jsx", import.meta.url),
  "utf8",
);
assert.ok(
  dashboard.indexOf('["report", "Outline laporan"') <
    dashboard.indexOf('["lab", "Computing lab"'),
);
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const originalFetch = globalThis.fetch;
try {
  const { default: ReportOutline } = await server.ssrLoadModule(
    "/src/ReportOutline.jsx",
  );
  const html = renderToStaticMarkup(React.createElement(ReportOutline));
  assert.ok(html.includes("Outline laporan quantum banking"));
  assert.ok(html.includes("Masuk dengan Google"));
  assert.ok(!html.includes('contenteditable="true"'));
  const { loadReport } = await server.ssrLoadModule("/src/reportStorage.js");
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "/api/report");
    assert.equal(options.headers.Authorization, "Bearer test-token");
    assert.equal(options.cache, "no-store");
    return new Response(JSON.stringify({ id: "one-doc", tabs: [] }));
  };
  assert.equal((await loadReport("test-token")).id, "one-doc");
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ detail: "Access denied" }), { status: 403 });
  await assert.rejects(
    loadReport("test-token"),
    (error) => error.status === 403 && error.message === "Access denied",
  );
  globalThis.fetch = async () =>
    new Response("<html>static hosting fallback</html>");
  await assert.rejects(loadReport("test-token"), /bukan JSON/);
  console.log(
    "PASS report login render, read-only view, authenticated API and denied access",
  );
} finally {
  globalThis.fetch = originalFetch;
  await server.close();
}
