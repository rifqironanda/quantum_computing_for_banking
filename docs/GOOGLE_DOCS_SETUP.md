# Satu Google Docs + FastAPI

## Alur sistem

React → Google OAuth (akun pembaca) → FastAPI `/api/report` → Google Drive API
(memastikan akses, metadata, dan kemampuan komentar) + Google Docs API (isi).
Semua tab tetap berada di **satu dokumen**, bukan satu dokumen per bab.

Google Docs menjadi sumber isi dan riwayat revisi. Aplikasi menyediakan pembaca
teks, heading, tabel, dan pencarian. Komentar pada teks ditulis melalui tombol
**Beri komentar di Google Docs** yang membuka dokumen yang sama di tab baru.
Gambar, rumus, rich text, komentar dan saran lengkap menggunakan antarmuka asli
Google Docs. Tidak memakai iframe publik atau Publish to web.

## 1. Tentukan dokumen dan hak pembaca

1. Gunakan satu dokumen Google Docs native milik Anda yang sudah berisi laporan.
2. Ambil ID dari `https://docs.google.com/document/d/ID_DOKUMEN/edit`.
3. Pada Share, pilih General access **Restricted**. Beri pemilik/penulis akses
   Editor, dan pembaca akses **Commenter**. Viewer hanya bisa membaca.
4. Periksa juga akses melalui grup, folder, domain, dan shared drive: pembaca yang
   memperoleh Editor dari sumber lain tetap dapat mengedit di Google Docs.

Aplikasi tidak mengubah izin berbagi secara otomatis. Nama role Commenter
mengizinkan membaca dan berkomentar tanpa langsung mengubah isi; Google Docs
juga dapat menawarkan suggestion yang perlu diterima penulis. Mode reader di
aplikasi tetap hanya baca, termasuk bagi pemilik. Hak owner/editor asli tidak
bisa diturunkan hanya dengan mengubah tombol aplikasi.

## 2. Google Cloud dan OAuth

1. Di Google Cloud project, aktifkan **Google Docs API** dan **Google Drive API**.
2. Atur Google Auth Platform/consent screen, audience dan test users. Saat Testing,
   setiap pembaca eksternal perlu terdaftar sebagai test user.
3. Buat OAuth Client ID bertipe **Web application**.
4. Tambahkan Authorized JavaScript origins: `http://localhost:5173` dan
   `https://rifqironanda.github.io` (origin saja, tanpa path repositori).
5. Scope yang diminta: `documents.readonly` dan `drive.readonly`.
   `drive.readonly` termasuk restricted scope. Untuk distribusi eksternal publik,
   ikuti proses verifikasi/assessment Google yang berlaku; untuk uji coba terbatas
   gunakan test users. Persetujuan OAuth tidak otomatis memberikan akses file:
   pembaca tetap harus dibagikan dokumen pada langkah 1.

Tidak memerlukan service account, client secret, refresh token atau database.
Access token berumur singkat disimpan dalam memori React dan dikirim sebagai
Bearer lewat HTTPS ke FastAPI. Backend meneruskannya hanya ke host API Google
untuk dokumen yang dikonfigurasi pemilik, sehingga tidak membaca sebagai owner.
Logout menghapus sesi lokal aplikasi; ini tidak mengeluarkan akun dari Google
atau mencabut persetujuan OAuth. Reload halaman memerlukan login ulang.

## 3. Menjalankan lokal

Memerlukan Python 3.11+ dan Node.js 22+.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt
cp backend/.env.example backend/.env
# Isi GOOGLE_REPORT_DOCUMENT_ID di backend/.env
uvicorn backend.main:app --env-file backend/.env --reload --port 8000
```

Pada Windows, aktivasi venv memakai `.venv\Scripts\activate`.
Di terminal lain:

```bash
cp .env.example .env.local
# Isi VITE_GOOGLE_CLIENT_ID dengan public OAuth Client ID
npm ci
npm run dev
```

Biarkan `VITE_REPORT_API_URL` kosong untuk proxy Vite `/api` ke port 8000.
Buka menu Outline laporan, login dengan akun Google pembaca, baca laporan, lalu
buka Google Docs untuk memilih teks dan memberi komentar.

```bash
npm run check
python -m pytest backend/tests -q
```

## 4. Deployment

Frontend tetap di GitHub Pages. **GitHub Pages tidak menjalankan FastAPI.**
Deploy backend di layanan Python/server HTTPS terpisah, misalnya dengan Docker:

```bash
docker build -f backend/Dockerfile -t quantum-report-api .
docker run --env-file backend/.env -p 8000:8000 quantum-report-api
```

Untuk deployment publik, letakkan backend di balik HTTPS layanan hosting atau
reverse proxy. Set `GOOGLE_REPORT_DOCUMENT_ID` dan
`FRONTEND_ORIGINS=https://rifqironanda.github.io` di environment server.
Set repository Actions variables berikut sebelum build Pages:

| Variable | Nilai |
| --- | --- |
| `VITE_GOOGLE_CLIENT_ID` | OAuth Web Client ID, berakhiran `.apps.googleusercontent.com` |
| `VITE_REPORT_API_URL` | Origin backend HTTPS, misalnya `https://report-api.example.com`, tanpa `/api` |

Jalankan ulang workflow Deploy to GitHub Pages setelah mengubah variables.
`/api/health` hanya memeriksa proses dan keberadaan konfigurasi; bukan bukti bahwa
izin Google/API benar. Uji akun Commenter, Viewer dan akun tanpa akses secara
langsung. Pastikan pembaca tidak punya Editor melalui grup/folder lain. API
mengembalikan 401 saat token kedaluwarsa, 403/404 saat tidak punya akses, 503 saat
ID belum diset, serta 502 saat upstream gagal. Backend tidak menyimpan laporan,
tidak mempunyai endpoint ubah isi/izin, dan menandai response `no-store`.

## 5. Isi lama

`src/data/report-outline.md` dan migration SQL di `database/` dipertahankan
sebagai arsip. Tidak dijalankan oleh sistem baru. Data Supabase maupun localStorage
lama tidak dihapus atau dimigrasikan otomatis. Jika ada revisi yang hanya berada
di sistem lama, export dengan versi aplikasi sebelumnya dan satukan manual ke
Google Docs sebelum beralih. Tidak ada pembacaan cache lama sebagai fallback.

## Referensi implementasi

- [Google Docs documents.get](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/get)
- [Google Docs tabs](https://developers.google.com/workspace/docs/api/how-tos/tabs)
- [Drive sharing dan capabilities](https://developers.google.com/workspace/drive/api/guides/manage-sharing)
- [Google Identity token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- [OAuth scope Drive](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
