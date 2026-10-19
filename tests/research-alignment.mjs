import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "vite";
import React, { act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
const server = await createServer({
  envDir: false,
  server: { middlewareMode: true },
  appType: "custom",
});
let root, dom;
try {
  const { references, reference, resolveReference } =
    await server.ssrLoadModule("/src/researchReferences.js");
  const { modules, milestones } = await server.ssrLoadModule(
    "/src/researchData.js",
  );
  const { slides } = await server.ssrLoadModule("/src/slides.js");
  const content = await server.ssrLoadModule("/src/kajianContent.js");
  const views = await server.ssrLoadModule("/src/KajianAlignment.jsx");
  const source = await readFile(
    new URL("../docs/KAJIAN_ACUAN.md", import.meta.url),
    "utf8",
  );
  assert.equal(references.filter((r) => r.origin === "kajian").length, 59);
  assert.deepEqual(
    references.map((r) => r.id),
    Array.from({ length: references.length }, (_, i) => i + 1),
  );
  for (const ref of references.slice(0, 59))
    assert.ok(
      source.includes(`[${ref.id}] ${ref.citation}`),
      `source bibliography [${ref.id}] preserved`,
    );
  for (const item of [
    ...content.countryBenchmarks,
    ...content.riskSections,
    ...content.implementationSections,
    ...content.assuranceSections,
  ])
    for (const id of item.refs) assert.ok(reference(id));
  for (const slide of slides)
    for (const id of slide.referenceIds) assert.ok(reference(id));
  for (const milestone of milestones)
    for (const item of milestone.refs) {
      assert.equal(resolveReference(item).id, item.id);
      assert.ok(!item.url.includes("doi.org/https:"));
    }
  assert.equal(modules.length, 10);
  assert.equal(milestones.length, 8);
  assert.equal(slides.length, 30);
  assert.equal(content.countryBenchmarks.length, 16);
  assert.equal(
    new Set(content.countryBenchmarks.map((row) => row.country)).size,
    16,
  );
  const benchmark = renderToStaticMarkup(
    React.createElement(views.BenchmarkExpansion),
  );
  for (const name of [
    "Global",
    "G7",
    "BIS",
    "Amerika Serikat",
    "Hong Kong",
    "Arab Saudi",
    "Afrika Selatan",
  ]) {
    assert.ok(benchmark.includes(name), name);
  }
  for (const [view, term] of [
    [views.RiskGovernance, "Risk register"],
    [views.PqcImplementation, "ML-KEM"],
    [views.Assurance, "artefak"],
  ])
    assert.ok(renderToStaticMarkup(React.createElement(view)).includes(term));
  for (const file of ["src/Dashboard.jsx", "src/App.jsx", "src/slides.js"])
    assert.ok(
      !/kajian bulan\s*0?1|briefing.*bulan\s*1/i.test(
        await readFile(new URL("../" + file, import.meta.url), "utf8"),
      ),
    );
  dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/#module-benchmark",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(React.createElement(views.BenchmarkExpansion)),
  );
  const filter = [...document.querySelectorAll("button")].find(
    (b) => b.textContent === "Kapasitas nasional",
  );
  await act(async () => filter.click());
  assert.equal(document.querySelectorAll("tbody tr").length, 5);
  assert.equal(filter.getAttribute("aria-pressed"), "true");
  await act(async () =>
    root.render(React.createElement(views.ReferenceLibrary)),
  );
  const input = document.querySelector("input");
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set.call(input, "[37]");
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    input.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
  assert.equal(document.querySelectorAll(".ieee-library li").length, 1);
  assert.ok(
    document.querySelector(".ieee-library").textContent.includes("Mosca"),
  );
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set.call(input, "");
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
  const primary = [...document.querySelectorAll("button")].find(
    (b) => b.textContent === "Sumber kajian [1]–[59]",
  );
  await act(async () => primary.click());
  assert.ok(
    document.querySelector(".ieee-library").textContent.includes("Mosca"),
  );
  assert.equal(document.querySelectorAll(".ieee-library li").length, 59);
  console.log(
    "PASS source snapshot, IEEE registry, 16-country benchmark, preserved concepts and interactive filters",
  );
} finally {
  if (root) await act(async () => root.unmount());
  if (dom) dom.window.close();
  await server.close();
}
