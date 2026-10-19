export function benchmarkConfig(value, development = false) {
  const input = (value || '').trim();
  if (!input) return development ? { endpoint: '/api/benchmark', health: '/api/health' } : null;
  if (development && input === '/api/benchmark') return { endpoint: input, health: '/api/health' };
  const url = new URL(input);
  if (url.username || url.password || url.search || url.hash ||
      (url.protocol !== 'https:' && !(development && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)))) {
    throw new Error('Alamat layanan harus berupa URL HTTPS tanpa token atau parameter.');
  }
  const path = url.pathname.replace(/\/+$/, '');
  url.pathname = path.endsWith('/api/benchmark') ? path : path + '/api/benchmark';
  const endpoint = url.toString();
  return { endpoint, health: endpoint.replace(/\/api\/benchmark$/, '/api/health') };
}

async function responseJson(response) {
  if (!response.ok) {
    if (response.status === 429) throw new Error('Layanan sedang sibuk. Tunggu satu menit lalu coba lagi.');
    throw new Error(`Layanan merespons HTTP ${response.status}.`);
  }
  try { return await response.json(); }
  catch { throw new Error('Respons layanan bukan JSON yang valid.'); }
}

export async function checkBackend(config, signal) {
  const result = await responseJson(await fetch(config.health, { signal, credentials: 'omit' }));
  if (result.status !== 'ok' || result.benchmark !== 'qiskit-statevector')
    throw new Error('Layanan belum mendukung benchmark Qiskit.');
  return result;
}

export async function runBenchmark(config, n, method, signal) {
  const result = await responseJson(await fetch(config.endpoint, {
    method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ n, method, a: 2, shots: 256, seed: 42 }), signal,
  }));
  if (typeof result.status !== 'string') throw new Error('Hasil simulasi tidak valid.');
  return { ...result, n, method };
}
