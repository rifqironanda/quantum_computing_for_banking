import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { SlideContent } = await server.ssrLoadModule("/src/App.jsx");
  const { slides } = await server.ssrLoadModule("/src/slides.js");
  const target = slides.slice(24, 30);

  assert.deepEqual(target.map((slide) => slide.kind), [
    "public_key_exposure",
    "institution_matrix",
    "benchmark_synthesis",
    "indonesia_mapping",
    "evidence_references",
    "evidence_references",
  ]);
  assert.equal(target[0].schemes.length, 3, "three vulnerable public-key scheme families");
  assert.equal(target[1].items.length, 5, "five institutional responses");
  assert.equal(target[2].themes.length, 6, "six scored benchmark themes");
  assert.equal(target[3].mappings.length, 4, "four Indonesian regulatory mappings");
  assert.equal(target[4].groups.length, 3, "three global evidence groups");
  assert.equal(target[5].groups.length, 3, "three Indonesia evidence groups");

  for (const [index, slide] of target.entries()) {
    const html = renderToStaticMarkup(
      React.createElement(SlideContent, { slide, presentationMode: true }),
    );
    assert.ok(html.includes(slide.title), `slide ${index + 25} title`);
    assert.ok(html.includes("closing-progress"), `slide ${index + 25} closing sequence`);
  }

  assert.ok(target[0].callout.includes("Emerging Threats"), "dual-relevance threat bridge");
  assert.equal(target[2].themes[0].score, 97.85, "workbook score preserved");
  assert.ok(target[3].callout.includes("81,81"), "Indonesia workbook priority preserved");
  assert.ok(target[5].callout.includes("do not state an explicit"), "regulatory boundary stated");
  console.log("PASS slides 25-30 interactions, workbook traceability, and regulatory boundary");
} finally {
  await server.close();
}
