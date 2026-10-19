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

## Backend Qiskit terintegrasi

Engine, worker dan kontrak benchmark diambil dari folder `backend/` repo sumber
pada commit yang sama. Kode MIT disertakan pada `src/integrations/computing/LICENSE`.
`backend/main.py` sekarang menggabungkan router benchmark dengan API tautan laporan.
Adaptasi hosting: CORS untuk GitHub Pages, health check yang menyatakan engine,
batas request per klien, satu worker proses, Docker dengan `$PORT` dan Render Blueprint.

Tab **Qiskit benchmark** menjadi pilihan awal Computing lab. Empat lab konsep
berbasis browser tetap terpisah; penjelasan Shor konsep tidak diklaim sebagai circuit Qiskit.
Tidak ada pemutakhiran otomatis dari repo sumber pada runtime.

Panduan terbitkan service, konfigurasi variable Pages dan pemeriksaan koneksi:
[DEPLOY_QISKIT.md](./DEPLOY_QISKIT.md).
