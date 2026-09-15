# Dashboard + Computing & Quantum

## Arsitektur

Dashboard menjadi entry point `src/Dashboard.jsx`. Seluruh 30 materi tetap
bersumber dari `src/slides.js` dan dirender menggunakan `SlideContent` yang sama.
`#overview`, `#library`, `#risk`, `#readiness`, dan `#lab` membuka panel dashboard.
Tautan `#slide-N` tetap membuka mode presentasi asli, dengan tombol kembali.
State lab bersifat lokal pada panel; tidak ada akun atau sinkronisasi progres.

## Integrasi repo

Sumber: https://github.com/rifqironanda/computing_and_quantum
Commit: `0dece14027058045fd3f8bb18e7e454e1d468ea6`.
Kode di `src/integrations/computing` adalah snapshot terintegrasi, bukan iframe
atau dependency yang otomatis mengambil branch main saat runtime. Empat lab
langsung bekerja pada GitHub Pages tanpa backend. Lisensi MIT disertakan.

File asal:
- `src/components/Labs.jsx`
- `src/components/Benchmark.jsx`
- `src/utils/math.js`
- `src/styles/index.css` → `labs.css`

Adaptasi lokal:
- CSS dibatasi dengan `@scope (.lab-surface)` dan import font upstream dihapus
  supaya tidak mengubah tema dashboard/presentasi. Gunakan browser modern.
- Measurement QuantumLab mengubah theta menjadi 0/180 dan phi menjadi 0
  setelah pengukuran basis Z, sehingga tampilan mengikuti collapsed state.
- Benchmark memakai URL endpoint dari `VITE_BENCHMARK_API_URL`.

Untuk memperbarui snapshot: pilih commit sumber, bandingkan empat file tersebut,
terapkan kembali tiga adaptasi di atas, jalankan build dan pemeriksaan lab.
Catat commit baru di dokumen ini. Repo sumber tidak dimodifikasi oleh integrasi.

## Backend lokal

Di checkout `computing_and_quantum`, instal `backend/requirements.txt`, lalu:

```sh
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```

Di checkout dashboard, salin `.env.example` ke `.env.local`, isi:

```dotenv
VITE_BENCHMARK_API_URL=/api/benchmark
```

Jalankan `npm run dev`. Proxy Vite meneruskan `/api` ke Python port 8000.
Jalankan kedua server bersamaan. `npm run preview` bukan proxy backend dev.

## Backend untuk web publik

GitHub Pages hanya menjalankan frontend. Deploy backend Python secara terpisah,
aktifkan HTTPS dan CORS untuk origin `https://rifqironanda.github.io`, serta
atur batas kapasitas/rate limiting sebelum mengekspos benchmark publik.
Backend upstream saat ini lokal dan belum memiliki konfigurasi CORS tersebut.

Isi repository variable GitHub Actions `VITE_BENCHMARK_API_URL` dengan URL
lengkap endpoint HTTPS, misalnya `https://server-anda/api/benchmark`, lalu
jalankan deployment ulang. Nilai ini publik dalam bundle, jangan isi token/secret.
Tanpa endpoint, benchmark tidak ditampilkan sebagai layanan yang siap dijalankan;
empat lab browser tetap tersedia. Konfigurasi endpoint bukan bukti server sehat;
error jaringan ditampilkan oleh komponen Benchmark.

Batas upstream: dua metode berurutan, timeout 120 detik per worker, Qiskit N ≤ 35.
Simulator Qiskit menggunakan CPU; hasil timing tidak membuktikan quantum speedup.
