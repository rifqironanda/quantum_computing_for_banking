import { useEffect, useRef, useState } from 'react'
import { benchmarkConfig, checkBackend, runBenchmark } from '../benchmarkApi'

const presets = [15, 21, 35, 1022117, 100160063, 999800009]

export default function Benchmark() {
  let config = null, configError = '';
  try { config = benchmarkConfig(import.meta.env.VITE_BENCHMARK_API_URL, import.meta.env.DEV); }
  catch (error) { configError = error.message; }
  const controller = useRef(null);
  const mounted = useRef(true);
  const [connection, setConnection] = useState('Belum diperiksa');
  const [phase, setPhase] = useState('');
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; controller.current?.abort(); }; }, []);
  const [n, setN] = useState('15')
  const [busy, setBusy] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    if (!busy) return
    const start = performance.now()
    const timer = setInterval(() => setSeconds((performance.now() - start) / 1000), 100)
    return () => clearInterval(timer)
  }, [busy])

  async function run() {
    const value = Number(n)
    if (!Number.isSafeInteger(value) || value < 4 || value > 999999999) {
      setError('Masukkan integer 4–999.999.999.'); return
    }
    if (!config) { setError(configError || 'Layanan simulasi sedang disiapkan.'); return; }
    setBusy(true); setSeconds(0); setError(''); setRows([]); setPhase('Menghubungkan');
    controller.current = new AbortController();
    const requestSignal = milliseconds => AbortSignal.any([controller.current.signal, AbortSignal.timeout(milliseconds)]);
    try {
      await checkBackend(config, requestSignal(90000));
      if (!mounted.current) return;
      setConnection('Terhubung');
      // The timer includes network/startup; each result reports the actual worker time.
      for (const method of ['classical', 'qiskit']) {
        setPhase(method === 'classical' ? 'Menghitung klasik' : 'Menjalankan Qiskit');
        const result = await runBenchmark(config, value, method, requestSignal(135000));
        if (!mounted.current) return;
        setRows(previous => [...previous, result]);
      }
    } catch (e) {
      if (!mounted.current) return;
      setConnection('Percobaan gagal');
      setError(`Simulasi belum berhasil (${e.message}). Layanan mungkin sedang memulai ulang. Coba lagi; timeout koneksi bukan waktu faktorisasi.`);
    } finally { if (mounted.current) { setBusy(false); setPhase(''); } }
  }

  async function connect() {
    if (!config) return;
    setBusy(true); setSeconds(0); setPhase('Menghubungkan'); setError('');
    controller.current = new AbortController();
    try {
      await checkBackend(config, AbortSignal.any([controller.current.signal, AbortSignal.timeout(90000)]));
      if (mounted.current) setConnection('Terhubung');
    } catch (e) {
      if (mounted.current) { setConnection('Belum terhubung'); setError(`Layanan belum dapat diakses (${e.message}). Coba lagi setelah layanan selesai memulai.`); }
    } finally { if (mounted.current) { setBusy(false); setPhase(''); } }
  }
  const time = value => value == null ? 'Tidak diketahui / tidak dijalankan' : `${Number(value).toFixed(6)} s`
  return <section className="shor-lab" aria-labelledby="benchmark-title">
    <h2 id="benchmark-title">Benchmark Python & Qiskit</h2>
    <p className="lead">Ini mengukur waktu nyata pada CPU server. Qiskit menjalankan qubits simulasi, bukan quantum hardware; grafik waktu tidak membuktikan quantum speedup. Bilangan jutaan pun dapat selesai sangat cepat secara klasik.</p>
    <div className="benchmark-connection" role="status">
      <p>{config ? `Status layanan: ${connection}. Koneksi awal dapat memerlukan waktu saat server bangun.` : 'Layanan simulasi sedang disiapkan. Lab konsep tetap dapat digunakan.'}</p>
      {configError && <p>{configError}</p>}
      <button type="button" disabled={busy || !config} onClick={connect}>Cek koneksi</button>
    </div>
    <div className="shor-controls">
      <label>Preset N<select disabled={busy} value={presets.includes(Number(n)) ? n : ''} onChange={e => setN(e.target.value)}>
        <option value="" disabled>Custom</option>
        {presets.map(v => <option key={v} value={v}>{v.toLocaleString('id-ID')}</option>)}
      </select></label>
      <label>Integer N<input disabled={busy} aria-label="Integer N" type="number" min="4" max="999999999" value={n} onChange={e => setN(e.target.value)} /></label>
      <button className="primary-button" disabled={busy || !config} onClick={run}>{busy ? `${phase} · ${seconds.toFixed(1)} s` : 'Uji kedua metode'}</button>
    </div>
    <p>Basis a = 2 · 256 shots · seed 42. Batas 120 detik per metode. Simulator dibatasi N ≤ 35 untuk mencegah kehabisan memori.</p>
    {error && <p role="alert">{error}</p>}
    <div aria-live="polite">
      {rows.map(row => <article className="concept-card" key={row.method} style={{ marginTop: 16 }}>
        <h3>{row.method === 'classical' ? 'Classical trial division' : 'Qiskit Shor — statevector simulator'}</h3>
        <p>N = {row.n} · Status: <strong>{row.status}</strong></p>
        <p>Faktor: {row.factors?.join(' × ') || 'Belum tersedia'}</p>
        <p>Waktu worker (termasuk import Qiskit): {time(row.elapsed_seconds)}</p>
        {row.wall_seconds != null && <p>Waktu end-to-end server, termasuk startup proses: {time(row.wall_seconds)}</p>}
        {row.simulation_seconds != null && <p>Circuit construction: {time(row.build_seconds)} · Statevector + sampling: {time(row.simulation_seconds)}</p>}
        {row.qubits && <p>Register model ini: {row.qubits} qubits · Minimum statevector complex128: {row.statevector_bytes} bytes (belum termasuk overhead).</p>}
        {row.message && <p>{row.message}</p>}
        {row.counts && <details><summary>Measurement counts (bitstring → shots)</summary><pre style={{ overflowX: 'auto' }}>{JSON.stringify(row.counts, null, 2)}</pre></details>}
      </article>)}
    </div>
  </section>
}
