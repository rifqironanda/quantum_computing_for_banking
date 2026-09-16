import { useState } from "react";
import {
  Atom,
  ShieldCheck,
  Network,
  Cpu,
  KeyRound,
  Waves,
  ScanEye,
  Database,
  FlaskConical,
  Cloud,
  Landmark,
  GitBranch,
  LockKeyhole,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const icons = [Atom, Cpu, Network, ShieldCheck, Cloud, Waves, FlaskConical, GitBranch];

/* Shared components below keep the existing dashboard/research behavior intact. */
export function TopicIcon({ text = "", index = 0 }) {
  const t = text.toLowerCase();
  const Icon = /bank|financial|portfolio/.test(t)
    ? Landmark
    : /key|rsa|crypto/.test(t)
      ? KeyRound
      : /risk|security|protect|govern/.test(t)
        ? ShieldCheck
        : /data|inventory|store/.test(t)
          ? Database
          : /measurement/.test(t)
            ? ScanEye
            : /quantum|physical|superposition/.test(t)
              ? Atom
              : /interference|phase/.test(t)
                ? Waves
                : icons[index % icons.length];
  return <Icon className="topic-icon" aria-hidden="true" strokeWidth={1.5} />;
}

export function LearningCards({ items }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="learning-grid" style={{ "--columns": Math.min(items.length, 4) }}>
      {items.map((x, i) => (
        <button
          type="button"
          key={i}
          className={`learning-card ${selected === i ? "selected" : ""}`}
          aria-expanded={selected === i}
          onClick={() => setSelected(selected === i ? null : i)}
        >
          <div className="card-top">
            <TopicIcon text={x[1]} index={i} />
            <span>{x[0]}</span>
          </div>
          <h3>{x[1]}</h3>
          <p>{x[2]}</p>
          {x[3] && <p className="card-detail">{selected === i ? x[3] : "Klik untuk penjelasan →"}</p>}
          {!x[3] && <span className="focus-label">{selected === i ? "Fokus aktif" : "Fokus konsep ↗"}</span>}
        </button>
      ))}
    </div>
  );
}

const steps = [
  "Bangun pemahaman bersama, tetapkan owner dan tanggung jawab.",
  "Petakan algoritma, kunci, sertifikat, aplikasi, dan dependensi vendor.",
  "Nilai masa kerahasiaan data, fungsi kriptografi, serta criticality.",
  "Susun urutan perubahan dan koordinasikan rencana dengan vendor.",
  "Uji interoperability, kinerja, dan rollback sebelum penerapan.",
  "Migrasikan bertahap sesuai hasil pengujian dan prioritas risiko.",
  "Validasi konfigurasi, cakupan migrasi, dan bukti assurance.",
  "Pantau perkembangan standar dan pertahankan crypto-agility.",
];

export function Readiness({ items }) {
  const [active, setActive] = useState(0);
  return (
    <div className="readiness-explorer">
      <div className="step-grid">
        {items.map((x, i) => (
          <button
            type="button"
            key={x}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={active === i ? "selected" : ""}
          >
            <TopicIcon text={x} index={i} />
            <span>{String(i + 1).padStart(2, "0")}</span>
            <b>{x}</b>
          </button>
        ))}
      </div>
      <div className="step-detail" aria-live="polite">
        <span>TAHAP {active + 1} / 8</span>
        <h3>{items[active]}</h3>
        <p>{steps[active]}</p>
        <button type="button" onClick={() => setActive((active + 1) % items.length)}>
          Tahap berikutnya <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function HndlExplorer({ items }) {
  const [values, setValues] = useState([10, 5, 12]);
  const exposed = values[0] + values[1] > values[2];
  const [active, setActive] = useState(0);
  const detail = [
    "Data dienkripsi; exposure bergantung pada skema dan data yang dilindungi.",
    "Penyerang merekam trafik atau memperoleh ciphertext.",
    "Ciphertext disimpan sambil menunggu kemampuan kriptanalisis.",
    "Skenario bersyarat: CRQC yang memadai mampu menyerang skema rentan.",
    "Dekripsi bergantung pada skema, rekaman yang cukup, dan kapabilitas penyerang.",
  ];
  const Icon = [LockKeyhole, ScanEye, Database, Cpu, KeyRound];
  return (
    <>
      <div className="harvest-steps">
        {items.map((x, i) => {
          const I = Icon[i];
          return (
            <button
              type="button"
              key={i}
              aria-pressed={active === i}
              className={active === i ? "selected" : ""}
              onClick={() => setActive(i)}
            >
              <I />
              <small>0{i + 1}</small>
              <b>{x[1]}</b>
            </button>
          );
        })}
      </div>
      <p className="harvest-detail" aria-live="polite">{detail[active]}</p>
      <div className="mosca">
        <div>
          {["X · Kerahasiaan data", "Y · Waktu migrasi", "Z · Waktu menuju CRQC"].map((label, i) => (
            <label key={label}>
              {label}<strong>{values[i]} tahun</strong>
              <input
                aria-label={label}
                type="range"
                min="1"
                max="30"
                value={values[i]}
                onChange={(e) => setValues((v) => v.map((n, j) => (j === i ? Number(e.target.value) : n)))}
              />
            </label>
          ))}
        </div>
        <output className={exposed ? "exposed" : ""}>
          <Clock />
          <strong>{values[0]} + {values[1]} {exposed ? ">" : "≤"} {values[2]}</strong>
          <b>{exposed ? "Jendela exposure terbuka" : "Batas waktu belum terlampaui"}</b>
          <small>Skenario ilustratif, bukan prediksi CRQC atau penilaian keamanan bank.</small>
        </output>
      </div>
    </>
  );
}

export function PhysicsFigure() {
  return (
    <figure className="physics-figure">
      <img src={`${import.meta.env.BASE_URL}media/bloch-sphere.svg`} alt="Bloch sphere dengan sumbu x, y, z dan state psi" />
      <figcaption>
        Bloch sphere · representasi state satu qubit<br />
        <a href="https://commons.wikimedia.org/wiki/File:Bloch_sphere.svg" target="_blank" rel="noreferrer">Smite-Meister / Fibonacci</a> ·{" "}
        <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
      </figcaption>
    </figure>
  );
}

/* Presentation-only helpers. They are invoked only by App.jsx in presentationMode. */
const narrativeOverrides = {
  "Alur Perkembangan dan Penjelasan": [
    "Bagaimana komputasi kuantum berkembang dari fondasi fisika menjadi teknologi komputasi yang semakin stabil?",
    "Perkembangannya berlangsung bertahap: foundations → concepts → algorithms → architectures → cloud/NISQ → task-specific advantage → error suppression → adaptive stability.",
  ],
  "Milestones 01–04": [
    "Apa yang berubah dari fondasi quantum information hingga diversifikasi arsitektur?",
    "Fokus bergeser dari pembuktian perilaku nonklasik, menuju model komputasi, algoritma, eksperimen laboratorium, lalu pilihan arsitektur perangkat.",
  ],
  "Milestones 05–08": [
    "Apa yang menandai transisi dari eksperimen terbatas menuju komputasi yang lebih andal?",
    "Akses cloud memperluas eksperimen; benchmark menunjukkan advantage pada tugas tertentu; QEC menekan logical error; adaptive control menjaga performa saat hardware berubah.",
  ],
  "The Evolution of Quantum Computing": [
    "Apakah kemajuan quantum computing berarti large-scale fault-tolerant quantum computer sudah tersedia?",
    "Belum. Perkembangan sudah mencapai benchmark advantage tertentu dan logical error suppression, tetapi skala fault-tolerant yang luas masih merupakan frontier teknologi.",
  ],
  "Mengapa Quantum Perlu Mulai Dipahami?": [
    "Mengapa sektor perbankan perlu memahami quantum computing sebelum teknologi ini matang sepenuhnya?",
    "Karena perubahan computational capability dan security assumptions dapat berkembang lebih cepat daripada siklus inventory, testing, vendor coordination, dan migration bank.",
  ],
  "Quantum–Banking Intersection": [
    "Di mana emerging quantum capabilities dapat beririsan dengan aktivitas dan infrastruktur perbankan?",
    "Irisannya membentuk dual relevance: potential computational use cases dan emerging exposure pada security & trust infrastructure.",
  ],
  "Dual Relevance": [
    "Apakah quantum computing hanya peluang komputasi, atau juga sumber implikasi risiko?",
    "Keduanya perlu dianalisis terpisah. Potential benefits masih banyak yang prospective, sedangkan perubahan security assumptions sudah dapat memicu persiapan inventory dan migration planning.",
  ],
  "Future Cryptanalytic Threat": [
    "Apa yang membuat quantum computing relevan terhadap public-key cryptography?",
    "CRQC yang memadai bersama algoritma seperti Shor dapat mengubah asumsi keamanan factoring dan discrete logarithm; dampaknya algorithm-specific dan capability-dependent.",
  ],
  "Existing Cryptographic Dependency": [
    "Mengapa ancaman kriptografi masa depan relevan terhadap infrastruktur bank hari ini?",
    "Karena fungsi key establishment dan digital signatures dapat bergantung pada public-key schemes. Relevansi aktual harus dibuktikan melalui cryptographic inventory.",
  ],
  "Conditional Cryptographic Exposure": [
    "Kapan sebuah sistem benar-benar dapat disebut memiliki quantum-related cryptographic exposure?",
    "Setelah deployment, cryptographic function, data characteristics, criticality, dan dependencies diketahui. Tanpa inventory, exposure baru berupa dugaan.",
  ],
  "Harvest Now, Decrypt Later": [
    "Mengapa ciphertext yang direkam hari ini tetap relevan meskipun sistem bermigrasi di masa depan?",
    "Migrasi melindungi sesi setelah perubahan diterapkan, tetapi tidak menghapus salinan ciphertext lama. Risiko bergantung pada secrecy lifetime, migration time, dan future capability.",
  ],
  "From HNDL to Quantum Readiness": [
    "Apa respons defensif yang logis terhadap skenario HNDL?",
    "Identify exposure → prioritise → plan → test → migrate. Tujuannya mengurangi exposure baru sambil mengelola data lama dan dependency yang masih relevan.",
  ],
  "What Will We Do?": [
    "Apa yang harus disiapkan agar quantum readiness tidak berhenti sebagai isu teknis?",
    "People, Technology, Policies & Processes, dan Coordination harus bergerak bersama agar perubahan dapat dimiliki, diuji, dilacak, dan diaudit.",
  ],
  "Quantum Readiness Lifecycle": [
    "Bagaimana quantum readiness diterjemahkan menjadi siklus kerja?",
    "Govern → discover → assess → plan → test → migrate → validate → monitor. Siklus ini menempatkan crypto-agility sebagai kemampuan berkelanjutan.",
  ],
  "Why Inventory Comes First": [
    "Mengapa cryptographic inventory ditempatkan sebelum keputusan migrasi?",
    "Karena organisasi perlu mengetahui algorithms, keys, certificates, applications, protocols, owner, data protected, dan dependency sebelum menentukan prioritas serta migration path.",
  ],
  "Risk-Based Prioritisation": [
    "Bagaimana menentukan sistem mana yang perlu ditangani lebih dahulu?",
    "Prioritas mengikuti fungsi kriptografi, secrecy lifetime, criticality, migration complexity, interoperability, dan vendor readiness—bukan hanya nama algoritma.",
  ],
  "What Is Actually Quantum?": [
    "Apa yang benar-benar bersifat quantum di dalam quantum computing?",
    "Physical systems mengikuti quantum mechanics; qubits, gates, circuits, dan measurement menggunakan aturan itu untuk memproses informasi.",
  ],
  "From Quantum States to Computation": [
    "Bagaimana superposition, entanglement, interference, dan measurement menjadi proses komputasi?",
    "State dipersiapkan dan diubah melalui quantum operations; interference membentuk amplitudo hasil; measurement kemudian menghasilkan keluaran klasik.",
  ],
  "Classical vs Quantum Information Processing": [
    "Apa perbedaan proses informasi klasik dan kuantum selain sekadar bit versus qubit?",
    "Perbedaannya mencakup representasi state, operasi, arsitektur, serta measurement. QPU tetap bekerja bersama classical control dan menghasilkan output klasik.",
  ],
  "Quantum Processing Pipeline": [
    "Mengapa quantum advantage harus dievaluasi secara end-to-end?",
    "State preparation, quantum execution, repeated sampling, dan classical post-processing menambah overhead yang dapat mengurangi keuntungan subroutine kuantum.",
  ],
  "Quantum Advantage Is Problem Specific": [
    "Apakah quantum computer otomatis lebih cepat daripada komputer klasik?",
    "Tidak. Advantage bergantung pada problem structure, quantum algorithm, hardware resources, error rate, model akses data, dan classical baseline.",
  ],
  "Algorithms Define the Computational Frontier": [
    "Mengapa pembahasan quantum advantage harus dimulai dari algoritma?",
    "Setiap algoritma menargetkan kelas masalah dan resource assumptions berbeda; theoretical speedup tidak otomatis menjadi practical advantage.",
  ],
  "Why Public-Key Cryptography Is Exposed": [
    "Skema public-key mana yang terkait dengan masalah matematika yang ditargetkan Shor?",
    "RSA terkait integer factorisation; finite-field Diffie–Hellman terkait discrete logarithm; ECC-based schemes terkait elliptic-curve discrete logarithm.",
  ],
  "International Institutional Response": [
    "Bagaimana lembaga internasional merespons transisi menuju post-quantum cryptography?",
    "Respons mencakup standardisation, implementation guidance, discovery/interoperability practice, dan financial-sector coordination. Fungsi setiap dokumen perlu dibedakan.",
  ],
  "Common Themes Across Selected Benchmarks": [
    "Tema apa yang konsisten muncul pada benchmark quantum readiness yang dipilih?",
    "Early preparation, accountable governance, inventory, risk-based prioritisation, vendor coordination, testing, phased migration, monitoring, dan crypto-agility.",
  ],
  "Implications for Indonesian Banking": [
    "Bagaimana quantum readiness dapat ditempatkan dalam konteks tata kelola perbankan Indonesia?",
    "Sebagai aplikasi governance dan technology-risk management: ownership, inventory, vendor management, testing, assurance, dan monitoring—tanpa mengklaim kewajiban quantum eksplisit tanpa legal traceability.",
  ],
};

function defaultAnswer(slide) {
  return slide.callout || slide.body || (typeof slide.center === "string" ? slide.center : "") || slide.subtitle || "Gunakan visual interaktif untuk menelusuri konsep dan implikasinya.";
}

export function ResearchFrame({ slide }) {
  const [question, answer] = narrativeOverrides[slide.title] || [
    `Apa inti yang perlu dipahami dari “${slide.title}”?`,
    defaultAnswer(slide),
  ];
  return (
    <div className="research-frame" aria-label="Alur pertanyaan dan jawaban">
      <div className="research-step question-step">
        <span>01 · PERTANYAAN</span>
        <p>{question}</p>
      </div>
      <ArrowRight className="research-arrow" aria-hidden="true" />
      <div className="research-step answer-step">
        <span>02 · JAWABAN / SOLUSI</span>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export function InteractiveTimeline({ items }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return (
    <div className="timeline-explorer">
      <div className="timeline-track" role="list" aria-label="Milestone perkembangan quantum computing">
        {items.map((x, i) => (
          <button
            type="button"
            role="listitem"
            key={x[0]}
            onClick={() => setActive(i)}
            className={active === i ? "selected" : ""}
            aria-pressed={active === i}
          >
            <span>{x[0]}</span>
            <b>{x[1]}</b>
            <small>{x[2]}</small>
          </button>
        ))}
      </div>
      <div className="timeline-detail" aria-live="polite">
        <span>MILESTONE {item[0]}</span>
        <h3>{item[1]}</h3>
        <p>{item[2]}</p>
        <small>Sentuh milestone lain untuk membandingkan tahap perkembangan.</small>
      </div>
    </div>
  );
}

export function PresentationOrbit({ slide }) {
  const [active, setActive] = useState(0);
  const selected = slide.items[active];
  return (
    <div className="orbit-explorer">
      <div className="orbit-scene" aria-label="Empat dimensi quantum readiness">
        <div className="orbit-path orbit-path-a" aria-hidden="true" />
        <div className="orbit-path orbit-path-b" aria-hidden="true" />
        <div className="orbit-core-3d" aria-hidden="true"><span>{slide.center}</span></div>
        {slide.items.map(([title], i) => (
          <button
            type="button"
            key={title}
            className={`orbit-node orbit-node-${i + 1} ${active === i ? "selected" : ""}`}
            onClick={() => setActive(i)}
            onPointerEnter={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <b>{title}</b>
          </button>
        ))}
      </div>
      <div className="orbit-detail" aria-live="polite">
        <span>DIMENSI {String(active + 1).padStart(2, "0")}</span>
        <h3>{selected[0]}</h3>
        <p>{selected[1]}</p>
        <small>Tap atau hover node lain untuk melihat hubungan readiness.</small>
      </div>
    </div>
  );
}

export function PresentationPhysicsFigure() {
  const [showGuide, setShowGuide] = useState(false);
  return (
    <figure className="physics-figure presentation-physics-figure">
      <div className="bloch-stage" aria-hidden="true">
        <div className="bloch-sphere-css">
          <i className="bloch-ring ring-x" />
          <i className="bloch-ring ring-y" />
          <i className="bloch-ring ring-z" />
          <span className="state-vector" />
          <b className="state-dot" />
        </div>
      </div>
      <figcaption>
        <button type="button" onClick={() => setShowGuide((v) => !v)}>
          <Atom size={16} /> {showGuide ? "Tutup panduan" : "Baca visual Bloch sphere"}
        </button>
        {showGuide && (
          <p>Bloch sphere memvisualisasikan state satu qubit. Arah vector merepresentasikan amplitudo dan relative phase; measurement tetap menghasilkan outcome klasik pada basis yang dipilih.</p>
        )}
        <span>Visual konseptual 3D untuk pembelajaran; bukan simulasi hardware quantum.</span>
      </figcaption>
    </figure>
  );
}

export function EvidenceHint({ source }) {
  const [open, setOpen] = useState(false);
  if (!source) return null;
  return (
    <div className="evidence-hint">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <BookOpen size={15} /> 03 · REFERENSI {open ? "−" : "+"}
      </button>
      {open && <p>{source}</p>}
    </div>
  );
}
