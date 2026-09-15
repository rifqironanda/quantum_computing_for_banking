# Dashboard kajian interaktif

Slide adalah asal materi, sedangkan modul menjadi unit navigasi dashboard.

| Materi asal | Tampilan dashboard |
| --- | --- |
| 1 | Header dashboard: judul, subtitle dan tujuan kajian |
| 2–6 | Perkembangan: pembukaan, delapan milestone, kesimpulan dan navigasi |
| 7–9 | Mengapa quantum: Venn konseptual, dual relevance, jembatan ke ancaman |
| 10–12 | CRQC, algoritma, fungsi kriptografi, conditional exposure dan jembatan HNDL |
| 13–18 | Skenario HNDL, respons bank, readiness, inventory dan prioritisasi |
| 19–25 | Fondasi quantum dan algoritma; akses ke computing lab |
| 26–30 | Benchmark, relevansi Indonesia dan referensi |

## Struktur kode

- `src/researchData.js`: metadata enam modul, delapan milestone, referensi dengan DOI/URL.
- `src/Research.jsx`: pembaca modul, penjelasan expandable, Venn, pemilih algoritma, inventory dan footer.
- `src/research.css`: layout responsif dan focus states.
- `src/Dashboard.jsx`: integrasi navigasi, header dan kartu fitur.
- Komponen `HndlExplorer` dan `Readiness` tetap dipakai ulang dari `Interactive.jsx`.
- Computing labs dan mode presentasi tetap tersedia.

Route `#module-evolution`, `#module-relevance`, `#module-cryptography`, `#module-hndl`, `#module-foundations`, dan `#module-benchmark` dapat dibuka langsung di GitHub Pages. Hash yang tidak dikenal kembali ke dashboard; module ID tidak dikenal memakai modul evolution. Browser back/forward mengikuti perubahan hash.

Tanda selesai disimpan pada `localStorage` key `quantum-modules-v1`, bersifat lokal pada browser. Kegagalan storage tidak menghalangi pembacaan. Checklist inventory hanya latihan pemahaman dan direset ketika keluar modul, bukan bukti readiness institusi.

## Batas interpretasi

Venn merupakan sintesis konseptual, bukan diagram kuantitatif. HNDL sliders adalah asumsi skenario; X + Y ≤ Z bukan bukti keamanan. CRQC bersifat kemampuan yang diperlukan untuk serangan pada ukuran kunci relevan; milestone QEC atau factoring kecil tidak membuktikan CRQC tersedia. Inventarisasi diperlukan untuk menyatakan exposure bank tertentu. NIST IR 8547 yang ditautkan berstatus Initial Public Draft (2024). Bukti adaptive control 2026 ditautkan ke paper Sivak et al. di Nature dan penjelasan tim penulis.

## Verifikasi

```bash
npm ci
node tests/research-render.mjs
npm run build
npm run dev -- --host 127.0.0.1
```

Test render memastikan keenam modul, tujuan navigasi, tautan sumber, delapan milestone, kontrol HNDL dan fallback modul. Test ini tidak menggantikan uji interaksi browser.

Pemeriksaan manual: buka milestone 01–08, bandingkan isi dan sumber; ubah tiga pilihan Venn dan empat pilihan algoritma; ubah slider HNDL, pilih tahap readiness dan checkbox inventory; tandai modul selesai lalu reload; uji tombol lanjut/kembali, browser back/forward, pencarian tanpa hasil, tab keyboard, layout ponsel dan computing lab.

Deployment mengikuti workflow GitHub Pages yang sudah ada pada push ke `main`.
