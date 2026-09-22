import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { SlideContent } = await server.ssrLoadModule("/src/App.jsx");
  const { slides } = await server.ssrLoadModule("/src/slides.js");
  const expectedKinds = [
    "quantum_foundation",
    "state_computation",
    "processing_comparison",
    "quantum_pipeline",
    "advantage_fit",
    "algorithm_frontier",
  ];
  const target = slides.slice(18, 24);

  assert.deepEqual(target.map((slide) => slide.kind), expectedKinds);
  assert.equal(target[1].items.length, 4, "four state concepts");
  assert.equal(target[2].rows.length, 5, "five comparison dimensions");
  assert.equal(target[3].stages.length, 9, "complete hybrid pipeline");
  assert.equal(target[4].conditions.length, 4, "advantage validation conditions");
  assert.equal(target[5].algorithms.length, 5, "algorithm frontier families");

  for (const [index, slide] of target.entries()) {
    const html = renderToStaticMarkup(
      React.createElement(SlideContent, { slide, presentationMode: true }),
    );
    assert.ok(html.includes(slide.title), `slide ${index + 19} title`);
    assert.ok(html.includes("concept-progress"), `slide ${index + 19} concept sequence`);
    assert.ok(html.includes("03 · REFERENSI"), `slide ${index + 19} evidence`);
  }

  assert.ok(target[5].callout.includes("Shor"), "bridge to public-key slide");
  console.log("PASS slides 19-24 conceptual sequence, evidence, and public-key bridge");
} finally {
  await server.close();
}
