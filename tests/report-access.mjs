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
process.env.VITE_REPORT_API_URL = "https://report-api.example.test";
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
  const fullscreenButton = () =>
    [...document.querySelectorAll("button")].find((button) =>
      /Fullscreen|Keluar fullscreen/.test(button.textContent),
    );
  const reader = document.querySelector(".docs-reader");
  const frame = document.querySelector("iframe");
  // Unsupported browsers get a full-window reading mode without reloading the iframe.
  await act(async () => fullscreenButton().click());
  assert.ok(reader.classList.contains("is-expanded"));
  assert.equal(fullscreenButton().getAttribute("aria-pressed"), "true");
  assert.equal(document.body.style.overflow, "hidden");
  assert.equal(document.querySelector("iframe"), frame);
  await act(async () =>
    document.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Escape" }),
    ),
  );
  assert.ok(!reader.classList.contains("is-expanded"));
  assert.equal(document.body.style.overflow, "");
  // Native fullscreen follows browser events, including Esc outside React.
  let nativeElement = null;
  Object.defineProperty(document, "fullscreenElement", {
    configurable: true,
    get: () => nativeElement,
  });
  reader.requestFullscreen = async () => {
    nativeElement = reader;
    document.dispatchEvent(new window.Event("fullscreenchange"));
  };
  document.exitFullscreen = async () => {
    nativeElement = null;
    document.dispatchEvent(new window.Event("fullscreenchange"));
  };
  await act(async () => fullscreenButton().click());
  assert.equal(fullscreenButton().getAttribute("aria-pressed"), "true");
  await act(async () => fullscreenButton().click());
  assert.equal(fullscreenButton().getAttribute("aria-pressed"), "false");
  reader.requestFullscreen = async () => {
    throw new Error("Fullscreen blocked");
  };
  await act(async () => fullscreenButton().click());
  assert.ok(reader.classList.contains("is-expanded"));
  await act(async () => fullscreenButton().click());
  assert.ok(!reader.classList.contains("is-expanded"));
  await act(async () => fullscreenButton().click());
  unavailable = true;
  await act(async () => {
    document.querySelector('[aria-label="Muat ulang laporan"]').click();
  });
  assert.equal(document.querySelector("iframe"), null);
  assert.ok(
    document
      .querySelector("[role=alert]")
      .textContent.includes("belum dikonfigurasi"),
  );
  assert.equal(
    fullscreenButton().disabled,
    false,
    "exit remains available if reload fails in fullscreen",
  );
  await act(async () => fullscreenButton().click());
  assert.ok(!reader.classList.contains("is-expanded"));
  assert.equal(document.body.style.overflow, "");
  console.log(
    "PASS reader embed, native/fallback fullscreen, Esc, reload failure exit and no OAuth",
  );
} finally {
  await act(async () => root.unmount());
  await server.close();
  dom.window.close();
  globalThis.fetch = originalFetch;
}
