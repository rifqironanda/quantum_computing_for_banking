import { useState } from 'react';
import { SourceLinks } from './Research';
import { sources } from './researchData';

const events = [
  ['Tahun 0 · Data direkam', 'Dalam skenario Bank B, pihak luar telah memperoleh ciphertext dan rekaman pertukaran kunci yang cukup dari skema rentan. Data diasumsikan perlu tetap rahasia selama 10 tahun.', 'Catat jenis data, tanggal paparan, masa kerahasiaan, fungsi kriptografi dan bukti rekaman yang tersedia.'],
  ['Tahun 1–5 · Bank bermigrasi', 'Bank memetakan dependensi, menguji solusi dan menyelesaikan migrasi pada tahun ke-5. Perlindungan sesi baru berubah; salinan yang sudah dimiliki pihak luar tidak ikut terhapus.', 'Dokumentasikan owner, cakupan migrasi, hasil pengujian, dependensi vendor dan risiko sisa data lama.'],
  ['Tahun 8 · Kemampuan serangan diasumsikan tersedia', 'Hanya untuk latihan, diasumsikan penyerang memiliki CRQC yang memadai pada tahun ke-8. Bila skema dapat diserang dan rekaman mencukupi, data lama berpotensi didekripsi.', 'Tinjau apakah kerahasiaan masih diperlukan dan siapa yang terdampak. Tahun 8 bukan prediksi CRQC.'],
  ['Evaluasi · Mengapa data lama tetap relevan?', 'Data harus rahasia sampai tahun ke-10, sehingga pembukaan pada tahun ke-8 masih berdampak. Keberhasilan migrasi tidak otomatis menghilangkan confidentiality exposure dari salinan lama.', 'Pisahkan keberhasilan migrasi sistem dari risiko residual data yang pernah terekspos.'],
];

export default function HndlCaseStudy({ onTheory, onDashboard }) {
  const [active, setActive] = useState(0);
  return <div className="research hndl-case-study">
    <header className="module-heading"><p>CONTOH KASUS & DOKUMENTASI</p><h1>HNDL · Dari skenario ke catatan kajian</h1>
      <p>Latihan membaca kejadian, mencatat bukti, dan merumuskan tindak lanjut.</p></header>
    <section className="research-section"><h2>Skenario Bank B</h2>
      <p className="research-note"><b>Ilustrasi fiktif.</b> Bukan laporan insiden bank nyata atau bukti bahwa dekripsi dengan CRQC telah terjadi. Angka waktu dipilih untuk pembelajaran.</p>
      <div className="research-options" aria-label="Tahapan contoh HNDL">{events.map(([title], i) => <button key={title} aria-pressed={active === i} aria-controls="hndl-case-detail" onClick={() => setActive(i)}>{title}</button>)}</div>
      <article id="hndl-case-detail" aria-live="polite"><h3>{events[active][0]}</h3><p>{events[active][1]}</p><p><b>Yang perlu didokumentasikan:</b> {events[active][2]}</p></article>
    </section>
    <section className="research-section"><h2>Contoh dokumentasi kegiatan kajian</h2>
      <p>Contoh isian berikut dapat dipakai sebagai acuan diskusi tim. Isinya tidak menyatakan kegiatan telah dilakukan di bank Anda.</p>
      <div className="table-wrap"><table><thead><tr><th>Kegiatan</th><th>Contoh catatan / bukti</th><th>Tindak lanjut</th></tr></thead><tbody>
        <tr><td>Identifikasi data</td><td>Data nasabah fiktif; kebutuhan kerahasiaan 10 tahun.</td><td>Validasi masa kerahasiaan bersama pemilik data.</td></tr>
        <tr><td>Petakan kriptografi</td><td>Asumsi key establishment rentan; konfigurasi aktual belum diperiksa.</td><td>Periksa protokol, algoritma, parameter dan dependensi.</td></tr>
        <tr><td>Nilai kemungkinan rekaman</td><td>Kelengkapan ciphertext dan material protokol masih perlu dibuktikan.</td><td>Kumpulkan bukti melalui tim yang berwenang; jangan menyimpulkan dekripsi pasti.</td></tr>
        <tr><td>Evaluasi migrasi</td><td>Skenario migrasi 5 tahun, termasuk pengujian dan vendor.</td><td>Susun milestone, owner, hasil uji dan risiko residual.</td></tr>
        <tr><td>Catat hasil diskusi</td><td>Data lama masih memerlukan kerahasiaan setelah migrasi.</td><td>Laporkan asumsi, ketidakpastian dan keputusan prioritas.</td></tr>
      </tbody></table></div>
      <SourceLinks items={[sources.crypto[0], ...sources.readiness.slice(0, 2)]}/>
    </section>
    <footer className="module-footer"><h2>Lanjutkan pembelajaran</h2><p>Penjelasan konsep, slider waktu dan readiness lifecycle tersedia dalam materi kajian.</p><div className="research-options"><button onClick={onDashboard}>← Kembali ke dashboard</button><button onClick={onTheory}>Buka kajian HNDL & readiness →</button></div></footer>
  </div>;
}
