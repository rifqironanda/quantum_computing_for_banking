import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { createServer } from "vite";
const dom = new JSDOM('<div id="root"></div>', {
  url: "http://localhost:5173/#report",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const originalFetch = globalThis.fetch;
let unavailable = false;
globalThis.fetch = async (url, options) => {
  assert.equal(options.headers, undefined);
  assert.equal(options.credentials, "omit");
  return unavailable
    ? new Response(JSON.stringify({ detail: "Dokumen belum dikonfigurasi." }), {
        status: 503,
      })
    : new Response(
        JSON.stringify({
          url: "https://docs.google.com/document/d/one-doc/edit",
          title: "Laporan saya",
        }),
      );
};
const server = await createServer({
  envDir: false,
  server: { middlewareMode: true },
  appType: "custom",
});
const root = createRoot(document.getElementById("root"));
try {
  const { default: Report } = await server.ssrLoadModule(
    "/src/ReportOutline.jsx",
  );
  await act(async () => {
    root.render(React.createElement(Report));
  });
  assert.equal(
    document.querySelector("iframe").src,
    "https://docs.google.com/document/d/one-doc/preview",
  );
  assert.equal(
    document.querySelector("iframe").title,
    "Pratinjau laporan Google Docs",
  );
  assert.ok(
    [...document.querySelectorAll("a")].every(
      (a) => a.href === "https://docs.google.com/document/d/one-doc/edit",
    ),
  );
  assert.ok(!document.body.textContent.includes("Masuk dengan Google"));
  assert.equal(document.querySelector('script[src*="gsi"]'), null);
  assert.ok(document.body.textContent.includes("Buka langsung di Google Docs"));
  unavailable = true;
  await act(async () => {
    document.querySelector("button").click();
  });
  assert.equal(document.querySelector("iframe"), null);
  assert.ok(
    document
      .querySelector("[role=alert]")
      .textContent.includes("belum dikonfigurasi"),
  );
  console.log(
    "PASS React embed, same-document comment link, no account consent and error fallback",
  );
} finally {
  await act(async () => root.unmount());
  await server.close();
  dom.window.close();
  globalThis.fetch = originalFetch;
}
