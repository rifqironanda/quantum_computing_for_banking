import assert from 'node:assert/strict';
import { benchmarkConfig, checkBackend, runBenchmark } from '../src/integrations/computing/benchmarkApi.js';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { createServer } from 'vite';
assert.equal(benchmarkConfig('', false), null);
assert.equal(benchmarkConfig('', true).endpoint, '/api/benchmark');
for (const value of ['https://lab.example', 'https://lab.example/', 'https://lab.example/api/benchmark'])
  assert.deepEqual(benchmarkConfig(value), { endpoint: 'https://lab.example/api/benchmark', health: 'https://lab.example/api/health' });
for (const value of ['http://localhost:8000', '/api/benchmark', 'https://user:secret@lab.example', 'https://lab.example?token=secret'])
  assert.throws(() => benchmarkConfig(value));
const originalFetch = globalThis.fetch;
const calls = [];
let failure = false;
globalThis.fetch = async (url, options = {}) => {
  calls.push({ url, options });
  assert.equal(options.credentials, 'omit');
  if (failure) return new Response('{}', { status: 429 });
  return new Response(JSON.stringify(url.endsWith('/health')
    ? { status: 'ok', benchmark: 'qiskit-statevector' }
    : { status: 'success', factors: [3, 5], elapsed_seconds: 0.01 }));
};
const config = benchmarkConfig('https://lab.example');
await checkBackend(config);
assert.equal((await runBenchmark(config, 15, 'qiskit')).method, 'qiskit');
failure = true;
await assert.rejects(checkBackend(config), /satu menit/);
failure = false;
const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/#lab' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const server = await createServer({ envDir: false, server: { middlewareMode: true }, appType: 'custom' });
const root = createRoot(document.getElementById('root'));
const button = text => [...document.querySelectorAll('button')].find(b => b.textContent.includes(text));
try {
  const { default: Benchmark } = await server.ssrLoadModule('/src/integrations/computing/components/Benchmark.jsx');
  await act(async () => root.render(React.createElement(Benchmark)));
  await act(async () => button('Cek koneksi').click());
  assert.ok(document.body.textContent.includes('Terhubung'));
  calls.length = 0;
  await act(async () => button('Uji kedua metode').click());
  assert.equal(calls.length, 3);
  assert.ok(calls[0].url.endsWith('/api/health'));
  assert.deepEqual(calls.slice(1).map(c => JSON.parse(c.options.body).method), ['classical', 'qiskit']);
  assert.equal(document.querySelectorAll('.concept-card').length, 2);
  failure = true;
  await act(async () => button('Uji kedua metode').click());
  assert.ok(document.querySelector('[role="alert"]').textContent.includes('satu menit'));
  assert.equal(document.querySelectorAll('.concept-card').length, 0);
  assert.equal(button('Uji kedua metode').disabled, false);
  console.log('PASS benchmark URL configuration, health, CORS request contract, sequential methods, busy/error handling');
} finally {
  await act(async () => root.unmount());
  await server.close();
  dom.window.close();
  globalThis.fetch = originalFetch;
}
