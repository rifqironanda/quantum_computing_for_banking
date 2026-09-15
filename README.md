# Quantum Banking Research Dashboard

Dashboard menyatukan 30 materi, HNDL explorer, readiness lifecycle, dan empat lab
dari repo computing_and_quantum. Mode presentasi tersedia melalui tombol di kanan atas.

Lihat [dokumentasi integrasi](docs/INTEGRATION.md) untuk arsitektur, versi sumber,
adaptasi, dan konfigurasi backend Qiskit opsional. Empat lab browser dapat dipakai
langsung; benchmark Python memerlukan server terpisah.

# Quantum Computing for Banking

Presentasi web interaktif yang mengadaptasi kajian **Quantum Computing pada Sektor Perbankan**. Aplikasi memuat 30 slide dengan navigasi keyboard, daftar slide, mode fullscreen, dukungan swipe, dan tata letak responsif.

## Fitur

- 30 slide berbasis data dan komponen React.
- Navigasi dengan tombol, keyboard, dan swipe.
- Daftar slide untuk berpindah langsung ke bagian tertentu.
- URL hash (`#slide-12`) sehingga slide dapat ditautkan langsung.
- Mode fullscreen dan progress indicator.
- Desain responsif untuk desktop dan perangkat bergerak.
- Print stylesheet untuk ekspor melalui fitur Print browser.
- Deployment otomatis ke GitHub Pages.

## Menjalankan secara lokal

Persyaratan: Node.js 20 atau lebih baru dan npm.

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build berada di direktori `dist/`.

## Kontrol presentasi

| Input | Fungsi |
| --- | --- |
| `←` / `→` | Slide sebelumnya / berikutnya |
| `PageUp` / `PageDown` | Slide sebelumnya / berikutnya |
| `Home` / `End` | Slide pertama / terakhir |
| `O` | Buka atau tutup daftar slide |
| `?` | Buka bantuan navigasi |
| Swipe | Navigasi pada perangkat sentuh |

## Mengubah isi presentasi

Materi seluruh slide berada di `src/slides.js`. Setiap objek mempunyai properti `kind` yang menentukan komponen visual yang digunakan. Contoh:

```js
{
  kind: 'statement',
  title: 'Judul slide',
  subtitle: 'Subjudul',
  body: 'Pernyataan utama',
  tags: ['Tag 1', 'Tag 2']
}
```

Renderer setiap `kind` berada di `src/App.jsx`. Tema, layout, dan responsive rules berada di `src/styles.css`.

## Deployment GitHub Pages

Workflow `.github/workflows/deploy.yml` akan:

1. Berjalan ketika ada push ke branch `main`.
2. Menginstal dependency dengan `npm ci`.
3. Membuat build produksi dengan `npm run build`.
4. Mengunggah direktori `dist`.
5. Mempublikasikan hasilnya ke GitHub Pages.

Pada repository GitHub, pilih **Settings → Pages → Source: GitHub Actions**. Nilai `base` pada `vite.config.js` sudah disesuaikan dengan nama repository.

## Struktur proyek

```text
.
├── .github/workflows/deploy.yml  # CI/CD GitHub Pages
├── public/favicon.svg            # Ikon aplikasi
├── src/App.jsx                   # Renderer dan interaksi presentasi
├── src/slides.js                 # Seluruh materi slide
├── src/styles.css                # Tema dan responsive layout
├── index.html                    # Entry HTML
├── package.json                  # Dependency dan script
└── vite.config.js                # Konfigurasi Vite/GitHub Pages
```

Dokumentasi teknis lebih rinci tersedia di [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Catatan sumber

Presentasi menyederhanakan teks dari materi riset. Referensi penting ditampilkan pada slide terkait dan daftar referensi akhir. Perubahan substansi sebaiknya selalu diperiksa kembali terhadap sumber primer.

## Alur kajian dashboard

Dashboard kini memakai enam modul berurutan dengan milestone, Venn konseptual, penjelasan kriptografi, HNDL dan readiness yang interaktif. Setiap modul memiliki navigasi kembali/lanjut serta tautan sumber. Lihat [panduan modul dan pengujian](docs/RESEARCH_MODULES.md).
