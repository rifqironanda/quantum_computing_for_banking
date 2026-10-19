# Penyelarasan Kajian Quantum Computing

Acuan: [Kajian Quantum Computing untuk Ketahanan Transformasi Digital Perbankan](KAJIAN_ACUAN.md), snapshot 19 Oktober 2026 dari Google Docs penulis. Dokumen asli tidak diubah. Pengantarnya masih menyebut Bab 1–3, sedangkan isi tersedia sampai Bab 7; web mengikuti isi tujuh bab tersebut.

## Satu sumber referensi

- `src/data/references.json` menjadi registri tunggal. Nomor [1]–[59] beserta metadata mengikuti daftar pustaka kajian. Ini bukan penomoran ulang menurut kemunculan pertama di setiap halaman.
- Sumber pendukung materi lama disatukan setelah [59], tanpa mengganti nomor kajian. Sumber sama menggunakan ID sama. Link DOI ganda pada Shor dan Grover diperbaiki.
- `ReferenceLinks.jsx` menampilkan cuplikan bernomor bergaya IEEE; modul Referensi menyediakan daftar utuh dan pencarian. Metadata pendukung yang singkat tetap merupakan cuplikan, bukan klaim bibliografi lengkap yang telah diverifikasi.
- `researchReferences.js` menyediakan lookup serta pemetaan referensi lama. Semua slide memperoleh `referenceIds` yang tervalidasi. Evidence groups memakai nomor IEEE, sedangkan grup lama disimpan sebagai `legacyGroups` untuk jejak perubahan.
- Snapshot kajian menyimpan teks dan urutan sel tabel hasil ekspor. Ini bukan rendering ulang tata letak Google Docs. Pembaruan sumber memerlukan sinkronisasi manual; iframe tetap membuka dokumen asli yang dapat berubah.

## Peta materi

| Acuan | Materi dipertahankan | Pelengkap dari kajian |
| --- | --- | --- |
| Bab 1 | Delapan milestone, perkembangan QEC dan batas CRQC | Hubungan kesiapan dengan ketergantungan layanan dan konteks migrasi |
| Bab 2 dan 4 | Dual relevance, algoritma, state/gates/measurement, pipeline dan lab | BQ-Bank, TARGET2, baseline klasik, tiga tingkat keputusan adopsi |
| Bab 3.1–3.5 | Matriks institusi dan tema readiness | G7, BIS/Leap/FuSSE, enam fase QRA GRI, OECD dan EU |
| Bab 3.6–3.7 | Sintesis benchmark dan skor prioritas lama | Enam belas negara/yurisdiksi; status, cakupan, akuntabilitas dan batas bukti dibedakan |
| Bab 3.8 | Pemetaan OJK dan konteks BI | Koordinasi OJK–BSSN dan kebutuhan baseline institusional |
| Bab 5 | Inventory dan risk-based prioritisation | Tiga domain risiko, risk register, materialitas, peran, vendor dan pengecualian |
| Bab 6 | Lifecycle dan crypto-agility | Inventory rinci, standar menurut fungsi, hybrid, interoperabilitas, pengujian, penerapan dan indikator |
| Bab 7 | Assurance dalam siklus readiness | Kriteria, bukti, kematangan, temuan dan penutupan |

## Batas interpretasi

Isi tambahan merupakan ringkasan/sintesis dari versi kajian acuan, bukan pembaruan hukum atau pemeriksaan independen seluruh sumber primer. Target kebijakan, rencana, eksperimen dan hasil penerapan dipisahkan. Kategori benchmark bukan peringkat kesiapan negara.

Skor prioritas lama dipertahankan sebagai materi pendukung. Workbook yang dirujuk belum terdapat dalam repository ini; skor bukan probabilitas CRQC, hasil penilaian bank tertentu atau keluaran QRA Bab 5. Pemetaan BI, POJK dan estimasi sumber daya lama dipertahankan sebagai konteks pendukung dengan cuplikan bibliografi tersendiri setelah referensi sejarah. Nama instrumen mengikuti materi lama dan belum ditinjau ulang status hukumnya. Rujukan sumber utamanya tetap OJK [55]–[57].

Label periode “Kajian Bulan 1” diganti menjadi “Kajian Quantum Computing” pada sidebar, ringkasan dan presentasi. Statistik mengikuti sepuluh modul dan tujuh bab laporan.

## Pemeriksaan

`npm run check` menjalankan build, tes render seluruh modul/slide, dan tes penyelarasan. Tes memeriksa kecocokan [1]–[59] dengan snapshot, keutuhan milestone/lab, 16 negara, validitas ID sitasi serta interaksi filter benchmark dan pencarian referensi.
