import { useState } from "react";
import { ReferenceLinks } from "./ReferenceLinks";
import {
  references,
  referenceNumbers,
  researchSource,
} from "./researchReferences";
import {
  countryBenchmarks,
  riskSections,
  implementationSections,
  assuranceSections,
} from "./kajianContent";

function ReadingSection({ title, text, refs }) {
  return (
    <section className="research-section">
      <h2>{title}</h2>
      <p>{text}</p>
      <ReferenceLinks items={refs} />
    </section>
  );
}
export function RiskGovernance() {
  return (
    <>
      {riskSections.map((section) => (
        <ReadingSection key={section.title} {...section} />
      ))}
    </>
  );
}
export function PqcImplementation() {
  return (
    <>
      {implementationSections.map((section) => (
        <ReadingSection key={section.title} {...section} />
      ))}
    </>
  );
}
export function Assurance() {
  return (
    <>
      {assuranceSections.map((section) => (
        <ReadingSection key={section.title} {...section} />
      ))}
    </>
  );
}
export function FinanceEvidence() {
  return (
    <ReadingSection
      title="Dari kandidat manfaat ke bukti kelayakan"
      text="Bab 4 kajian memisahkan eksplorasi algoritmik, validasi empiris dan evaluasi operasional. BQ-Bank menyediakan contoh option pricing, Value at Risk dan optimasi portofolio, tetapi contoh simulasi belum membuktikan manfaat produksi. Studi pengurutan pembayaran TARGET2 yang dibahas kajian melaporkan penghematan likuiditas sebanding dengan simulated annealing klasik. Nilai optimasi perlu dipisahkan dari bukti keunggulan kuantum, dengan baseline, state preparation, biaya keseluruhan, stabilitas dan pemulihan tetap dinilai."
      refs={[25, 26, 27, 58, 59]}
    />
  );
}
export function BenchmarkExpansion() {
  const [filter, setFilter] = useState("Semua");
  const countries = countryBenchmarks.filter(
    (row) => filter === "Semua" || row.category === filter,
  );
  return (
    <>
      <ReadingSection
        title="Cara membaca benchmark"
        text="Acuan Bab 3 membedakan standar algoritma, panduan migrasi, kewajiban pengawasan, eksperimen dan strategi kapasitas nasional. Kelimanya memiliki cakupan serta bukti berbeda. Perbandingan berikut merangkum versi sumber dalam kajian; bukan peringkat kesiapan negara atau penetapan tenggat hukum untuk semua bank."
        refs={[16, 2, 31, 38, 39]}
      />
      <section className="research-section">
        <h2>Roadmap, prinsip dan bukti implementasi</h2>
        <details>
          <summary>G7 CEG: enam kegiatan migrasi</summary>
          <p>
            Awareness and Preparation; Discovery and Inventory; Risk Assessment
            and Planning; Migration Execution; Migration Testing; Validation and
            Monitoring. Peran institusi dan otoritas dibedakan, dengan
            koordinasi dependensi bersama. Horizon 2035 dan sistem kritis
            sekitar 2030–2032 merupakan acuan non-preskriptif dalam sumber
            kajian.
          </p>
          <ReferenceLinks items={[16, 32, 33]} />
        </details>
        <details>
          <summary>
            BIS: security by design, defence in depth, crypto-agility
          </summary>
          <p>
            Persiapan → perencanaan → pelaksanaan menghubungkan mandat,
            inventory, prioritas, pengujian dan pemeliharaan. Project Leap
            membuktikan kebutuhan pengujian protokol dan trust chain; verifikasi
            signature yang berhasil pada fase 2 belum menghasilkan settlement
            karena kendala sertifikat pada data referensi. FuSSE memberi contoh
            pemisahan layanan kriptografi, beserta kompleksitas operasional yang
            harus dikelola.
          </p>
          <ReferenceLinks items={[1, 2, 34, 35, 36]} />
        </details>
        <details>
          <summary>GRI: enam fase quantum risk assessment</summary>
          <p>
            Identify Assets → State of Quantum Technologies → Identify Threats →
            Evaluate Risk Factors → Calculate Quantum Risk → Acting to Address
            Quantum Risk. Wawancara ahli, discovery dan catatan aset saling
            melengkapi. Pembaruan 2025 membahas sensitivitas x, durasi migrasi
            y, horizon CRQC z dan jeda pemanfaatan pelaku z′; asumsi ini perlu
            dicatat, bukan diganti dengan satu tanggal pasti. Hasilnya menjadi
            masukan rencana dan kesiapan organisasi.
          </p>
          <ReferenceLinks items={[37, 21]} />
        </details>
        <details>
          <summary>Uni Eropa dan OECD: dua jenis tujuan kebijakan</summary>
          <p>
            Roadmap Uni Eropa menghubungkan inventory, penilaian risiko, rantai
            pasok, pengujian dan crypto-agility dengan milestone menurut tingkat
            risiko. OECD memberi konteks strategi riset, pendanaan, kompetensi
            dan ekosistem. Ukuran kapasitas nasional tidak otomatis mengukur
            efektivitas migrasi PQC perbankan.
          </p>
          <ReferenceLinks items={[31, 38, 39, 40]} />
        </details>
      </section>
      <section className="research-section">
        <h2>Perbandingan 16 negara/yurisdiksi</h2>
        <p>
          Bandingkan cakupan dan status instrumen sebelum membaca milestone.
          Uraian mengikuti kajian acuan Bab 3.6–3.7.
        </p>
        <div className="research-options" aria-label="Filter jenis benchmark">
          {["Semua", ...new Set(countryBenchmarks.map((x) => x.category))].map(
            (value) => (
              <button
                key={value}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ),
          )}
        </div>
        <p aria-live="polite">
          {countries.length} negara/yurisdiksi ditampilkan.
        </p>
        <div className="kajian-table-scroll">
          <table className="kajian-table">
            <thead>
              <tr>
                <th>Negara/yurisdiksi</th>
                <th>Instrumen dan status</th>
                <th>Akuntabilitas / implementasi</th>
                <th>Milestone atau batas bukti</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((row) => (
                <tr key={row.country}>
                  <th scope="row">
                    {row.country}
                    <small>{referenceNumbers(row.refs)}</small>
                  </th>
                  <td>
                    <b>{row.instrument}</b>
                    <p>{row.status}</p>
                  </td>
                  <td>{row.action}</td>
                  <td>{row.milestone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="#module-references">
          Buka daftar referensi IEEE untuk sumber tiap baris →
        </a>
      </section>
      <ReadingSection
        title="Implikasi Indonesia: dari benchmark ke bukti institusi"
        text="Bab 3.8 memetakan kesiapan ke tata kelola TI, risiko, arsitektur, pengadaan, penyedia, audit dan pelaporan dalam rujukan OJK yang ditelaah. Kajian mencatat koordinasi OJK dalam gugus tugas nasional PQC. Usulan inventory, prioritas dan pengujian tetap perlu baseline perbankan: fungsi kritis, masa sensitivitas, durasi perubahan dan konsentrasi vendor. Kehadiran tata kelola umum atau koordinasi belum membuktikan migrasi semua bank telah selesai."
        refs={[55, 56, 57, 8, 47]}
      />
    </>
  );
}
export function ReferenceLibrary() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState("Semua");
  const entries = references.filter(
    (ref) =>
      (origin === "Semua" || ref.origin === origin) &&
      `[${ref.id}] ${ref.citation}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="research-section">
      <h2>Daftar referensi utuh · IEEE</h2>
      <p>
        Acuan:{" "}
        <a href={researchSource.url} target="_blank" rel="noreferrer">
          {researchSource.title}
        </a>
        . Nomor [1]–[59] dan metadata mengikuti daftar pustaka kajian. Sumber
        pendukung materi GitHub diteruskan setelah [59]; sumber yang sama
        menggunakan nomor yang sama.
      </p>
      <p>
        Cuplikan dan metadata ditata dari naskah acuan serta materi lama. Ini
        belum merupakan validasi ulang seluruh sumber primer atau pemutakhiran
        status regulasi.
      </p>
      <details>
        <summary>Catatan rujukan pendukung lama</summary>
        <p>
          Materi sebelumnya juga menyebut OSFI, CSA Singapore, ENISA dan FINMA.
          Metadata publikasi spesifiknya belum lengkap dalam daftar pustaka
          kajian, sehingga nama-nama ini dipertahankan sebagai catatan bacaan
          dan belum diberi nomor IEEE. Rujukan teknis, OJK dan BI yang sudah
          dapat dikenali dicatat pada kelompok sumber pendukung.
        </p>
      </details>
      <label className="reference-search">
        Cari nomor, penulis, judul atau tahun
        <input
          value={query}
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Contoh: [37], BIS, crypto agility…"
        />
      </label>
      <div className="research-options">
        {["Semua", "kajian", "pendukung"].map((value) => (
          <button
            key={value}
            onClick={() => setOrigin(value)}
            aria-pressed={origin === value}
          >
            {value === "kajian"
              ? "Sumber kajian [1]–[59]"
              : value === "pendukung"
                ? "Sumber pendukung GitHub"
                : value}
          </button>
        ))}
      </div>
      <p aria-live="polite">{entries.length} referensi ditampilkan.</p>
      <ol className="ieee-library">
        {entries.map((ref) => (
          <li value={ref.id} key={ref.id}>
            <span className="ieee-number">[{ref.id}]</span>
            <div>
              {ref.citation}
              {ref.url && (
                <a href={ref.url} target="_blank" rel="noreferrer">
                  Buka sumber ↗
                </a>
              )}
              <small>
                {ref.origin === "kajian"
                  ? "Daftar pustaka kajian"
                  : "Materi pendukung yang dipertahankan"}
              </small>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
