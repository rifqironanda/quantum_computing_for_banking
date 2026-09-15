# Arsitektur Aplikasi

## Tujuan desain

Aplikasi dirancang sebagai static single-page application. Tidak ada backend, database, atau data sensitif. Semua materi dikirim sebagai aset statis sehingga cocok untuk GitHub Pages.

## Alur data

```text
src/slides.js
      ↓
SlideContent (pemilih renderer)
      ↓
Komponen layout berdasarkan `kind`
      ↓
Slide aktif + navigasi + URL hash
```

`slides.js` adalah source of truth materi presentasi. `SlideContent` memilih layout berdasarkan `kind`, misalnya `timeline`, `flow`, `table`, atau `references`. Pendekatan ini memisahkan isi dari mekanisme navigasi dan styling.

## State aplikasi

`App` menyimpan tiga state lokal:

- `index`: nomor slide aktif.
- `overview`: status panel daftar slide.
- `help`: status dialog bantuan.

State slide juga disinkronkan dengan URL hash. Contoh `#slide-13` membuka materi HNDL secara langsung. Aplikasi tidak memakai penyimpanan permanen.

## Navigasi dan aksesibilitas

- Keyboard listener mendukung arrow keys, PageUp/PageDown, Home/End, `O`, `?`, dan Escape.
- Tombol memiliki `aria-label`.
- Slide aktif menggunakan `aria-live="polite"`.
- Dialog daftar slide dan bantuan memakai `role="dialog"`.
- Swipe dihitung dari perbedaan koordinat sentuhan awal dan akhir.

## Styling

`styles.css` menggunakan custom properties untuk palet navy, teal, cyan, orange, dan neutral. Ukuran teks menggunakan kombinasi `clamp()` agar proporsional terhadap viewport. Canvas utama selalu mempertahankan rasio 16:9.

Breakpoint perangkat bergerak menyederhanakan metadata berukuran kecil agar materi utama tetap terbaca. Print stylesheet menghilangkan navigation chrome.

## Menambah jenis slide

1. Tambahkan objek dengan `kind` baru di `slides.js`.
2. Tambahkan `case` pada `SlideContent` di `App.jsx`.
3. Tambahkan styling khusus di `styles.css`.
4. Jalankan `npm run build` untuk memeriksa kompilasi.

## Deployment

Vite membangun aplikasi ke `dist`. Workflow GitHub Actions mengunggah direktori tersebut sebagai artifact Pages. `base` harus mengikuti pola `/<nama-repository>/` untuk project site GitHub Pages.

## Batasan saat ini

- Simulasi quantum/Qiskit belum dijalankan karena versi ini merupakan presentasi statis.
- Referensi belum terhubung ke bibliography manager eksternal.
- Materi disimpan di JavaScript, belum memakai CMS.

Ketiga batasan tersebut dapat ditambahkan kemudian tanpa mengubah fondasi navigasi presentasi.
