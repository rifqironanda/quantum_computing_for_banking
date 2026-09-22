# Database architecture — Report Outline

## Keputusan arsitektur

Editor berjalan pada GitHub Pages dengan pendekatan local-first. Ketika Supabase
belum tersedia atau jaringan terputus, `localStorage` menjadi cache. Setelah login,
`src/reportStorage.js` menyinkronkan data langsung ke PostgreSQL melalui Supabase
client dan RLS.

```env
VITE_SUPABASE_URL=https://PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

Supabase menyediakan PostgreSQL, Auth, REST API, dan Realtime dalam satu layanan.
RLS tetap wajib; service-role/secret key tidak boleh dimasukkan ke Vite atau
GitHub Pages. Publishable key aman diekspos hanya jika seluruh tabel publik
dilindungi policy RLS yang benar.

## Alur data

```mermaid
flowchart LR
  UI[React report editor] --> A[reportStorage adapter]
  A --> L[Local cache]
  A --> AUTH[Supabase Auth]
  AUTH --> DB[(PostgreSQL + RLS)]
  DB --> V[Section revisions]
```

- Local cache memberi autosave dan fallback ketika jaringan gagal.
- Auth session dikirim oleh Supabase client dan dievaluasi oleh policy RLS.
- Satu record `report_sections` menyimpan keadaan terbaru tiap bagian.
- Trigger menulis salinan perubahan ke `report_section_revisions` sebagai audit trail.

## Kontrak persistence

### Load

Mengembalikan snapshot yang sesuai dengan kontrak frontend:

```json
{
  "reportId": "quantum-banking-readiness",
  "outlineVersion": 1,
  "savedAt": "2026-09-22T10:00:00.000Z",
  "sections": {
    "1-pendahuluan": {
      "content": "<p>...</p>",
      "status": "draft",
      "revision": 3
    }
  }
}
```

### Save

- Seluruh operasi database wajib membutuhkan session pengguna.
- Validasi ukuran payload, `status`, dan HTML yang diizinkan di server.
- Tolak update usang menggunakan `revision`/`If-Match` dengan status `409`.
- Jangan mempercayai HTML yang sudah dibersihkan oleh browser; sanitasi ulang di server.

## Model data

Migration awal tersedia di [`database/001_report_workspace.sql`](../database/001_report_workspace.sql).
Setelah itu jalankan [`database/002_supabase_access_hardening.sql`](../database/002_supabase_access_hardening.sql)
untuk memperketat grants dan mengaktifkan pengelolaan collaborator oleh owner.

| Tabel | Tanggung jawab |
| --- | --- |
| `reports` | Metadata dokumen dan owner |
| `report_collaborators` | Hak akses editor/reviewer/viewer |
| `report_sections` | Isi terbaru, status, urutan, dan nomor revisi |
| `report_section_revisions` | Riwayat immutable untuk audit dan pemulihan |

## Tahapan implementasi

1. **Saat ini:** local-first editor, Supabase Auth, RLS, autosave, dan audit revision.
2. **Hardening:** server-side sanitizer, conflict detection, dan recovery UI.
3. **Kolaborasi:** komentar, presence, dan Realtime/Broadcast.
4. **Governance:** retention policy, backup, audit export, dan recovery test.

## Kontrol keamanan

- Gunakan hanya public/anon key di browser; simpan secret/service-role di server.
- Aktifkan RLS dan prinsip default-deny untuk seluruh tabel dokumen.
- Terapkan Content Security Policy dan sanitasi HTML di server.
- Catat siapa, kapan, dan revisi apa yang berubah.
- Enkripsi transport dengan TLS serta aktifkan backup dan uji pemulihan.
- Hindari memasukkan data bank/nasabah yang sensitif sebelum klasifikasi data,
  persetujuan organisasi, lokasi pemrosesan, dan kontrol vendor diselesaikan.

## Referensi resmi

- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Realtime database changes](https://supabase.com/docs/guides/realtime/subscribing-to-database-changes)
- [PostgreSQL Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
