import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/#overview" });
for (const key of ["window", "document", "location", "history"])
  globalThis[key] = key === "window" ? dom.window : dom.window[key];
for (const key of ["addEventListener", "removeEventListener"])
  globalThis[key] = dom.window[key].bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLElement.prototype.scrollTo = () => {};
const server = await createServer({ envDir: false, server: { middlewareMode: true }, appType: "custom" });
const root = createRoot(document.getElementById("root"));
const button = (label) => [...document.querySelectorAll("button")].find(b => b.textContent.includes(label));
const navigate = async (hash) => act(async () => {
  location.hash = hash;
  window.dispatchEvent(new window.Event("hashchange"));
  await new Promise(resolve => setTimeout(resolve, 10));
});
try {
  const { default: Dashboard } = await server.ssrLoadModule("/src/Dashboard.jsx");
  await act(async () => root.render(React.createElement(Dashboard)));
  assert.ok(document.querySelector(".research-badge").textContent.includes("Kajian Quantum Computing"));
  await act(async () => {
    button("Mode presentasi").click();
    await new Promise(resolve => setTimeout(resolve, 10));
  });
  assert.equal(location.hash, "#presentations");
  const frame = document.querySelector("iframe");
  assert.equal(frame.src, "https://docs.google.com/presentation/d/1yOX562N23dMO8fg935RixzPQxPEMg6PWgSK6shwxhrY/preview");
  assert.equal(frame.allowFullscreen, true);
  assert.ok(document.querySelector('a[href="#slide-1"]'));
  assert.equal(document.querySelector('.presentation-editions [aria-current="page"]').textContent, "Terbaru · Ringkas");
  const reader = document.querySelector(".slides-reader");
  await act(async () => button("Fullscreen").click());
  assert.ok(reader.classList.contains("is-expanded"));
  assert.equal(document.body.style.overflow, "hidden");
  assert.equal(document.querySelector("iframe"), frame);
  await act(async () => document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" })));
  assert.ok(!reader.classList.contains("is-expanded"));
  assert.equal(document.body.style.overflow, "");
  let nativeElement = null;
  Object.defineProperty(document, "fullscreenElement", { configurable: true, get: () => nativeElement });
  reader.requestFullscreen = async () => { nativeElement = reader; document.dispatchEvent(new window.Event("fullscreenchange")); };
  document.exitFullscreen = async () => { nativeElement = null; document.dispatchEvent(new window.Event("fullscreenchange")); };
  await act(async () => button("Fullscreen").click());
  assert.equal(button("Keluar fullscreen").getAttribute("aria-pressed"), "true");
  await act(async () => button("Keluar fullscreen").click());
  reader.requestFullscreen = async () => { throw new Error("Denied"); };
  await act(async () => button("Fullscreen").click());
  assert.ok(reader.classList.contains("is-expanded"));
  await navigate("#slide-1");
  assert.equal(document.body.style.overflow, "");
  assert.ok(document.querySelector(".slide-content .eyebrow").textContent.includes("KAJIAN BULAN 1"));
  assert.ok(document.querySelector(".slide footer").textContent.includes("KAJIAN BULAN 1"));
  await navigate("#slide-7");
  assert.ok(document.querySelector('.progress').getAttribute("aria-label").startsWith("Slide 7 "));
  await act(async () => {
    button("Pilih versi presentasi").click();
    await new Promise(resolve => setTimeout(resolve, 10));
  });
  assert.equal(location.hash, "#presentations");
  assert.ok(document.querySelector("iframe"));
  console.log("PASS presentation routing, exact selected Slides, Month 1 edition, fullscreen and legacy deep links");
} finally {
  await act(async () => root.unmount());
  dom.window.close();
  await server.close();
}
