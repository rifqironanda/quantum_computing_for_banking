import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const outline = await readFile(
  new URL("../src/data/report-outline.md", import.meta.url),
  "utf8",
);
assert.equal((outline.match(/^##\s+/gm) || []).length, 10);
const dashboard = await readFile(
  new URL("../src/Dashboard.jsx", import.meta.url),
  "utf8",
);
assert.ok(
  dashboard.indexOf('["report", "Outline laporan"') <
    dashboard.indexOf('["lab", "Computing lab"'),
);
const server = await createServer({
  envDir: false,
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
  assert.ok(!html.includes("Masuk dengan Google"));
  const { loadReport, documentLinks } = await server.ssrLoadModule(
    "/src/reportStorage.js",
  );
  assert.equal(
    documentLinks("https://docs.google.com/document/d/one-doc/edit?usp=sharing")
      .previewUrl,
    "https://docs.google.com/document/d/one-doc/preview",
  );
  for (const url of [
    "javascript:alert(1)",
    "https://evil.example/document/d/a/edit",
    "https://docs.google.com.evil.example/document/d/a/edit",
    "https://docs.google.com/document/d/e/PUBLISHED/pub",
    "http://docs.google.com/document/d/a/edit",
  ]) {
    assert.throws(() => documentLinks(url));
  }
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "/api/report");
    assert.equal(options.headers, undefined);
    assert.equal(options.credentials, "omit");
    return new Response(
      JSON.stringify({
        url: "https://docs.google.com/document/d/one-doc/edit",
      }),
    );
  };
  assert.equal((await loadReport()).id, "one-doc");
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ detail: "Dokumen belum dikonfigurasi" }), {
      status: 503,
    });
  await assert.rejects(loadReport(), /dikonfigurasi/);
  globalThis.fetch = async () => new Response("<html>static hosting</html>");
  await assert.rejects(loadReport(), /bukan JSON/);
  console.log(
    "PASS document links, URL validation, no OAuth and configuration errors",
  );
} finally {
  globalThis.fetch = originalFetch;
  await server.close();
}
