# Satu Google Docs, tanpa OAuth pembaca

## Pipeline

Website React → pratinjau Google Docs milik penulis → tombol **Buka & beri komentar**
→ dokumen yang sama di Google Docs.

Pembaca tidak memberi aplikasi izin mengakses akun atau Drive mereka. Aplikasi
tidak memuat Google Identity Services, tidak meminta OAuth, tidak menerima access
token, dan tidak membaca isi memakai Docs API/Drive API. Google melayani isi dan
menangani login serta izin file secara langsung.

Google Cloud Project, OAuth Client ID, API key dan aktivasi billing tidak
diperlukan untuk alur ini. FastAPI tetap tersedia secara opsional untuk memberikan
tautan dokumen. Backend tidak memerlukan Google API atau kredensial Google.

## Dokumen laporan yang sudah dipasang

Dokumen pilihan pemilik adalah **Kajian Quantum Computing untuk Ketahanan
Transformasi Digital Perbankan**. Konfigurasi default berada di
`src/reportConfig.js`, sehingga build GitHub Pages langsung mempunyai dokumen
utama tanpa harus mengisi variable atau menjalankan FastAPI. Pada saat
pemeriksaan, izin file adalah Anyone with the link → Commenter. Aplikasi tidak
mengubah izin tersebut. Perubahan isi tetap dilakukan di Google Docs.

Variable `VITE_REPORT_DOCUMENT_URL` dapat mengganti dokumen default. Jika
`VITE_REPORT_API_URL` diisi dan URL langsung kosong, aplikasi memakai FastAPI.
Hapus variable backend yang lama jika ingin memakai dokumen default langsung.

## 1. Tentukan satu dokumen

1. Gunakan satu Google Docs native milik Anda, berisi seluruh laporan/bab/tab.
2. Pada **Share**, tentukan siapa yang boleh membukanya. Untuk pembaca tertentu,
   gunakan **Restricted** dan berikan mereka akses **Commenter**. Jangan memberi
   Editor kepada pembaca jika mereka hanya boleh meninjau.
3. Salin tautan biasa berbentuk `https://docs.google.com/document/d/ID/edit`.

Hak Commenter memungkinkan komentar dan saran tanpa langsung mengubah isi.
Periksa juga akses editor yang mungkin diwariskan dari grup/folder. Situs tidak
mengubah izin atau membagikan dokumen otomatis. Tautan dokumen akan terlihat oleh
pengunjung situs; akses ke isinya tetap diatur oleh Google.

Tidak perlu Publish to web. Publishing berbeda dari sharing dan dapat memperluas
keterbukaan dokumen. Pratinjau dalam iframe adalah upaya tampilan langsung, bukan
jaminan untuk semua kebijakan akun/browser. Pada dokumen Restricted, browser
mungkin memblokir login/cookie di dalam iframe. Karena halaman tidak dapat membaca
isi iframe lintas origin, ia tidak bisa memastikan apakah preview berhasil.
Tautan **Buka langsung di Google Docs** selalu disediakan untuk keadaan tersebut.

## 2. Cara termudah: masukkan tautan pada frontend

Salin `.env.example` menjadi `.env.local`, lalu isi:

```env
VITE_REPORT_DOCUMENT_URL=https://docs.google.com/document/d/ID_DOKUMEN/edit
```

Jalankan `npm ci` lalu `npm run dev`. Menu Outline laporan menampilkan pratinjau
melalui Google Docs. Tombol **Buka & beri komentar** membuka dokumen yang sama di
tab baru dengan antarmuka komentar Google. Komentar di dalam iframe tidak
dijanjikan; gunakan tombol tersebut.

Untuk GitHub Pages, isi **Settings → Secrets and variables → Actions → Variables**
dengan `VITE_REPORT_DOCUMENT_URL` lalu jalankan ulang workflow deployment. Tidak
perlu hosting FastAPI untuk mode ini. ID/URL bukan rahasia, tetapi jangan memasukkan
kredensial apa pun ke variables frontend.

## 3. Jika tetap ingin memakai backend FastAPI

Biarkan `VITE_REPORT_DOCUMENT_URL` kosong. Gunakan Python 3.11+:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt
cp backend/.env.example backend/.env
# Isi GOOGLE_REPORT_DOCUMENT_ID dan opsional GOOGLE_REPORT_TITLE
uvicorn backend.main:app --env-file backend/.env --reload --port 8000
```

Di Windows, aktivasi memakai `.venv\Scripts\activate`.
Saat development, set `VITE_REPORT_API_URL=http://localhost:8000` untuk memakai backend secara eksplisit. API hanya mengembalikan
judul dan tautan dokumen yang ditentukan pengelola, tanpa isi atau token pembaca.

Untuk produksi, deploy FastAPI di layanan Python terpisah melalui HTTPS. Set
`FRONTEND_ORIGINS=https://rifqironanda.github.io`. Isi Actions variable
`VITE_REPORT_API_URL=https://alamat-backend-anda` (tanpa `/api`). Jika kedua mode
diisi, **tautan langsung frontend diprioritaskan**.

```bash
docker build -f backend/Dockerfile -t quantum-report-api .
docker run --env-file backend/.env -p 8000:8000 quantum-report-api
```

GitHub Pages hanya menyajikan frontend dan tidak menjalankan FastAPI. Google
Cloud bukan keharusan untuk hosting backend ini.

## 4. Pengujian

```bash
npm run check
python -m pytest backend/tests -q
```

Uji juga dengan dokumen asli: pembaca Commenter, pembaca Viewer, dan akun tanpa
akses. Login Google mungkin diperlukan untuk membaca file Restricted atau
memberi komentar. Ini merupakan login langsung ke layanan Google, bukan
persetujuan akses akun ke aplikasi Anda. Aplikasi tidak mengetahui akun yang
sedang aktif di Google dan tidak memiliki tombol login/logout Google.

## Data lama

Supabase tidak lagi dipakai. Migration SQL dan `src/data/report-outline.md`
dipertahankan sebagai arsip; data lama tidak dihapus atau dimigrasikan otomatis.
Jika diperlukan, satukan revisi lama secara manual ke dokumen utama.

## Referensi

- [Peran Viewer, Commenter, dan Editor](https://support.google.com/docs/answer/2494822)
- [Akses dokumen Google](https://support.google.com/docs/answer/16722399)
- [Publishing dan embedding](https://support.google.com/docs/answer/183965)
