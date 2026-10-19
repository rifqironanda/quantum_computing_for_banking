import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { createServer } from "vite";
process.env.VITE_GOOGLE_CLIENT_ID = "test-client-id";
const dom = new JSDOM('<div id="root"></div>', {
  url: "http://localhost:5173/#report",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.google = {
  accounts: {
    oauth2: {
      hasGrantedAllScopes: () => true,
      initTokenClient: ({ callback }) => ({
        requestAccessToken: () =>
          callback({ access_token: "mock-user-token", expires_in: 3600 }),
      }),
    },
  },
};
let denied = false;
globalThis.fetch = async (url, options) => {
  assert.equal(options.headers.Authorization, "Bearer mock-user-token");
  return denied
    ? new Response(JSON.stringify({ detail: "Akun tidak memiliki akses." }), {
        status: 403,
      })
    : new Response(
        JSON.stringify({
          id: "one-doc",
          title: "Research report",
          canComment: true,
          canEdit: false,
          url: "https://docs.google.com/document/d/one-doc/edit",
          tabs: [
            {
              id: "first",
              title: "Kajian",
              blocks: [
                { type: "paragraph", style: "HEADING_1", text: "Pendahuluan" },
                { type: "paragraph", text: "RSA <script>alert(1)</script>" },
                {
                  type: "table",
                  rows: [[[{ type: "paragraph", text: "PQC" }]]],
                },
              ],
            },
          ],
        }),
      );
};
const server = await createServer({
  envFile: false,
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
  const button = (name) =>
    [...document.querySelectorAll("button")].find(
      (x) => x.textContent.trim() === name,
    );
  assert.equal(button("Masuk dengan Google").disabled, false);
  await act(async () => {
    button("Masuk dengan Google").click();
  });
  assert.ok(
    document
      .querySelector("article")
      .textContent.includes("RSA <script>alert(1)</script>"),
  );
  assert.equal(document.querySelectorAll("article script").length, 0);
  assert.equal(document.querySelectorAll("[contenteditable=true]").length, 0);
  assert.equal(
    [...document.querySelectorAll("a")].find((x) =>
      x.textContent.includes("Beri komentar"),
    ).href,
    "https://docs.google.com/document/d/one-doc/edit",
  );
  assert.equal(document.querySelector("table").textContent, "PQC");
  await act(async () => {
    button("Keluar").click();
  });
  assert.equal(document.querySelector("article"), null);
  denied = true;
  await act(async () => {
    button("Masuk dengan Google").click();
  });
  assert.ok(
    document
      .querySelector("[role=alert]")
      .textContent.includes("Akun tidak memiliki akses."),
  );
  assert.equal(document.querySelector("article"), null);
  console.log(
    "PASS React DOM: login, user token, safe text/table rendering, same-document comment link, logout clearing and access denial",
  );
} finally {
  await act(async () => root.unmount());
  await server.close();
  dom.window.close();
}
