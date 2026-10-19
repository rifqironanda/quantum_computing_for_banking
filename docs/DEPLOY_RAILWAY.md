# Backend Qiskit di Railway

Alternatif Render untuk mencoba FastAPI tanpa kartu kredit adalah trial Railway.
Menurut dokumentasi yang diperiksa pada 19 Oktober 2026, akun baru mendapat
kredit US$5 yang berlaku paling lama 30 hari. Setelah itu Free plan memberi
US$1 per bulan. Ini bukan jaminan server dapat hidup terus-menerus tanpa biaya;
penggunaan tetap dibatasi kredit dan kelayakan akun.

## Deployment

1. Masuk ke https://railway.com dengan GitHub, lalu selesaikan verifikasi akun
   jika diminta. Hubungkan repo `rifqironanda/quantum_computing_for_banking`.
2. Buat project dengan satu service dari repo, branch `main`.
3. Gunakan root directory repo (`/`), bukan `/backend`. `railway.json`
   menunjuk `backend/Dockerfile`; Docker build memerlukan konteks root.
4. Konfigurasi service menggunakan Dockerfile dan health check `/api/health`.
   Start command mengikuti Dockerfile: Uvicorn pada `0.0.0.0:$PORT`, satu worker.
5. Isi variable `FRONTEND_ORIGINS=https://rifqironanda.github.io`.
   Thread BLAS/OMP sudah dibatasi satu dalam Dockerfile. Tidak perlu token IBM
   Quantum atau database: Qiskit memakai simulator CPU.
6. Setelah build berhasil, gunakan Networking → Generate Domain untuk membuat
   domain publik Railway. Gunakan URL yang benar-benar diberikan platform.
7. Verifikasi `<URL_RAILWAY>/api/health` memberi `status: ok` dan
   `benchmark: qiskit-statevector`.
8. Di GitHub → Settings → Secrets and variables → Actions → Variables, isi
   `VITE_BENCHMARK_API_URL` dengan URL HTTPS Railway atau endpoint lengkap
   `/api/benchmark`. Jalankan ulang workflow Deploy to GitHub Pages.
9. Di website pilih Computing lab → Qiskit benchmark → Cek koneksi,
   lalu Uji kedua metode untuk N=15. Hasil Qiskit yang diuji lokal: 3 × 5.

Paket berbayar tidak dipilih oleh konfigurasi ini. Sebelum menjalankan layanan,
periksa trial/credit, kelayakan akun dan penggunaan di dashboard. Jika trial tidak
tersedia atau platform meminta pembayaran, jangan menganggap backend sudah aktif.

## Status

File konfigurasi tidak membuat project maupun domain Railway secara otomatis.
Backend publik baru dapat dihubungkan setelah akun Railway tersedia dan deployment
berhasil. Website pengunjung tidak memerlukan akses akun GitHub/Railway.

Batas worker, resource guard dan arti hasil tetap seperti
[DEPLOY_QISKIT.md](./DEPLOY_QISKIT.md). `render.yaml` tetap tersedia sebagai alternatif
jika kelak ingin memakai Render.

Referensi:
- https://docs.railway.com/pricing/free-trial
- https://docs.railway.com/pricing/faqs
- https://docs.railway.com/config-as-code/reference
- https://docs.railway.com/builds/dockerfiles
