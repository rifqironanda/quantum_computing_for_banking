import assert from "node:assert/strict";
import { createServer } from "vite";
delete process.env.VITE_REPORT_API_URL;
delete process.env.VITE_REPORT_DOCUMENT_URL;
const server = await createServer({
  envDir: false,
  server: { middlewareMode: true },
  appType: "custom",
});
const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = () => {
    throw new Error("Default report must not call any backend or Google API");
  };
  const { loadReport } = await server.ssrLoadModule("/src/reportStorage.js");
  const report = await loadReport();
  assert.equal(report.id, "1eekxdkktfaRyaX3A-m6IBD4HlUy87320TSzuFasbsSM");
  assert.equal(
    report.title,
    "Kajian Quantum Computing untuk Ketahanan Transformasi Digital Perbankan",
  );
  assert.equal(new URL(report.url).hostname, "docs.google.com");
  assert.ok(report.previewUrl.endsWith("/preview"));
  console.log("PASS owner-selected document default, without API or OAuth");
} finally {
  globalThis.fetch = originalFetch;
  await server.close();
}
