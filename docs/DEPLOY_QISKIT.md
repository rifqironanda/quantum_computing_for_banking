# Computing Lab: GitHub Pages → FastAPI/Qiskit di Render

Website adalah aplikasi statis di GitHub Pages. Python dan Qiskit berjalan sebagai
service terpisah. GitHub Pages tidak dapat menjalankan FastAPI. Browser memanggil
API lewat HTTPS; CORS di API mengizinkan origin website.

Alurnya: **Computing lab → cek kesehatan API → metode klasik → circuit Qiskit → hasil.**
Setiap benchmark dijalankan berurutan. Hasil menyebut waktu worker dan waktu server,
bukan menganggap waktu tunggu jaringan sebagai waktu faktorisasi.

## 1. Terbitkan backend

1. Gabungkan perubahan ini ke `main`.
2. Masuk ke https://dashboard.render.com dan pilih **New → Blueprint**.
3. Hubungkan repo `rifqironanda/quantum_computing_for_banking` pada branch `main`.
4. Render membaca `render.yaml`: Dockerfile `backend/Dockerfile`, plan `free`,
   health check `/api/health`. Tinjau konfigurasi lalu buat service.
5. Setelah berhasil, salin **URL HTTPS yang benar-benar diberikan Render**.
   Nama service bukan jaminan nama domain tersedia; jangan menebak domain.
6. Buka `<URL_RENDER>/api/health`. Respons harus memuat
   `"status":"ok"` dan `"benchmark":"qiskit-statevector"`.

Belum ada URL Render aktif yang ditanam dalam kode. Membuat file konfigurasi tidak
membuat service atau menautkan akun hosting secara otomatis.
Backend laporan tetap opsional: sumber Google Docs di frontend tidak membutuhkan
server ini. Jika ingin memakai `/api/report`, isi variabel laporan seperti sebelumnya.

## 2. Hubungkan website

Di GitHub, buka **Settings → Secrets and variables → Actions → Variables**.
Buat/ubah repository variable:

| Nama | Nilai |
|---|---|
| `VITE_BENCHMARK_API_URL` | URL HTTPS Render, atau URL lengkap dengan `/api/benchmark` |

Nilai tersebut adalah alamat publik, bukan token. Workflow Pages sudah meneruskan
variabel ini ke build Vite. Setelah mengubahnya, jalankan ulang **Deploy to GitHub
Pages** lewat Actions; me-refresh tab saja tidak mengganti konfigurasi bundle lama.

Buka **Computing lab → Qiskit benchmark → Cek koneksi → Uji kedua metode**.
Mulai dari N=15; hasil Qiskit yang diuji menghasilkan faktor 3 × 5 dan 256 shots.
Lab Classical bits, Quantum physics, Interference dan Shor konsep tetap tersedia.

## 3. Konfigurasi layanan dan batas

- `FRONTEND_ORIGINS=https://rifqironanda.github.io`; hanya origin, tanpa path repo
  dan tanpa slash di akhir. Pisahkan origin tambahan dengan koma.
- Satu proses Uvicorn (`--workers 1`) menjaga pembatas satu benchmark bersamaan
  dan penghitung request dalam satu instance.
- Satu worker subprocess, batas 120 detik; thread BLAS/OMP dibatasi satu.
- API maksimal 12 request benchmark per alamat klien per menit; request kelebihan
  kapasitas mendapat HTTP 429. Ini layanan demonstrasi publik, bukan API privat.
  CORS mengatur akses browser dan bukan mekanisme autentikasi klien non-browser.
- Qiskit hanya N ≤ 35 dan shots ≤ 1024. Input lebih besar mengembalikan
  `resource_limit` tanpa menjalankan circuit. Trial division bisa sampai 999.999.999.
- Plan gratis dapat tidur setelah tidak digunakan. Frontend memisahkan cek awal
  (maks. 90 detik) dari benchmark (maks. 135 detik per request), dengan tombol coba lagi.
  Jika kebutuhan RAM/CPU melebihi kapasitas, sesuaikan batas atau tinjau paket hosting.
  Blueprint ini tidak memilih paket berbayar.
- Tidak ada IBM Quantum token: ini Qiskit ideal statevector pada CPU, bukan QPU
  dan bukan bukti quantum speedup.

## 4. Jika belum terhubung

| Gejala | Pemeriksaan |
|---|---|
| Layanan sedang disiapkan | Isi variable GitHub dan build ulang Pages |
| Health URL gagal | Periksa deployment/log Render dan `/api/health` langsung |
| Health bekerja, browser gagal | Pastikan HTTPS, origin CORS persis sesuai URL website dan POST/Content-Type diizinkan |
| HTML/bukan JSON | Pastikan alamat API bukan alamat website GitHub Pages |
| 429 | Tunggu satu menit / benchmark pengguna lain selesai |
| timeout | Server menghentikan worker setelah deadline; waktu selesai faktorisasi tidak diketahui |
| resource_limit | Gunakan N=15, 21 atau 35 untuk simulator |

## 5. Pengembangan dan pengujian

```sh
python -m venv .venv
# Aktifkan virtual environment sesuai OS.
python -m pip install -r backend/requirements-dev.txt
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --workers 1
```

Di terminal lain jalankan `npm ci` dan `npm run dev`.
Tanpa variable endpoint, mode dev menggunakan proxy Vite `/api` ke Python port
8000. Mode produksi tidak mencoba localhost atau server GitHub Pages sebagai API.

```sh
npm run check
python -m pytest backend/tests -q
```

Sumber deploy: https://render.com/docs/deploy-fastapi,
https://render.com/docs/blueprint-spec, https://render.com/docs/free.
