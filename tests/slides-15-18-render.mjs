import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { SlideContent } = await server.ssrLoadModule("/src/App.jsx");
  const { slides } = await server.ssrLoadModule("/src/slides.js");
  const expectedKinds = [
    "readiness_response",
    "readiness_lifecycle",
    "inventory_rationale",
    "risk_prioritisation",
  ];
  const target = slides.slice(14, 18);

  assert.deepEqual(target.map((slide) => slide.kind), expectedKinds);
  assert.equal(target[1].items.length, 8, "dashboard lifecycle compatibility");
  assert.equal(target[2].items.length, 7, "research inventory compatibility");
  assert.equal(target[3].rows.length, 3, "research prioritisation compatibility");

  for (const [index, slide] of target.entries()) {
    const html = renderToStaticMarkup(
      React.createElement(SlideContent, { slide, presentationMode: true }),
    );
    assert.ok(html.includes(slide.title), `slide ${index + 15} title`);
    assert.ok(html.includes("readiness-sequence"), `slide ${index + 15} sequence`);
    assert.ok(html.includes("03 · REFERENSI"), `slide ${index + 15} evidence`);
  }

  console.log("PASS slides 15-18 render, sequence, evidence, and data compatibility");
} finally {
  await server.close();
}
