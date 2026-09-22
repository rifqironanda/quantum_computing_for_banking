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
  "Alur Perkembangan Quantum Computing": [
    "Bagaimana Perkembangan Quantum Computing Hingga saat ini?",
    "Perkembangannya berlangsung bertahap mulai dari fondasi fisika kuantum, perumusan konsep dan algoritma quantum, hingga pengembangan teknologi komputasi kuantum.",
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
    "Dimana emerging quantum capabilities dapat beririsan dengan aktivitas dan infrastruktur perbankan?",
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
    "Apa yang perlu dilakukan setelah HNDL diidentifikasi sebagai exposure yang perlu diperhatikan?",
    "Bangun quantum readiness melalui empat workstream: ownership, technology visibility, decision process, dan koordinasi vendor.",
  ],
  "Quantum Readiness Lifecycle": [
    "Bagaimana pustaka readiness menerjemahkan persiapan menjadi siklus kerja?",
    "Mobilise, discover, transition, dan sustain menghubungkan governance hingga monitoring. Evidence dari satu tahap menjadi input tahap berikutnya.",
  ],
  "Why Inventory Comes First": [
    "Mengapa inventory muncul sebelum assessment dan migration planning?",
    "Karena prioritas memerlukan fakta tentang penggunaan kriptografi, konteks bisnis, owner, data yang dilindungi, serta dependency migrasi.",
  ],
  "Risk-Based Prioritisation": [
    "Bagaimana hasil inventory berubah menjadi urutan tindakan?",
    "Assessment membandingkan crypto function, secrecy lifetime, criticality, migration complexity, dan vendor readiness untuk membentuk migration backlog.",
  ],
  "What Is Actually Quantum?": [
    "Bagian mana yang membuat sebuah komputer benar-benar bersifat quantum?",
    "Sistem fisik menyimpan quantum state, controlled unitary operations mengubah state, dan measurement menghasilkan outcome klasik.",
  ],
  "From Quantum States to Computation": [
    "Bagaimana superposition, entanglement, interference, dan measurement menjadi proses komputasi?",
    "Quantum gates mengatur amplitude dan relative phase. Interference membentuk outcome distribution yang kemudian diperkirakan melalui repeated measurement.",
  ],
  "Classical vs Quantum Information Processing": [
    "Apa perbedaan proses informasi klasik dan kuantum selain sekadar bit versus qubit?",
    "Quantum processing memakai complex amplitude, phase, entanglement, unitary evolution, dan measurement. QPU tetap bekerja bersama classical control.",
  ],
  "Quantum Processing Pipeline": [
    "Mengapa quantum advantage harus dievaluasi secara end-to-end?",
    "Encoding, state preparation, quantum execution, sampling, error correction, dan post-processing menentukan total resource cost.",
  ],
  "Quantum Advantage Is Problem Specific": [
    "Kapan quantum computer dapat memberi advantage yang bermakna?",
    "Advantage memerlukan kecocokan problem, algorithm, hardware resources, access model, dan classical baseline pada task yang didefinisikan.",
  ],
  "Algorithms Define the Computational Frontier": [
    "Mengapa algoritma menentukan batas capability yang relevan?",
    "Setiap algoritma menargetkan problem class dan resource assumptions tertentu. Shor menjadi penting karena memetakan langsung ke IFP, DLP, dan ECDLP.",
  ],
  "Why Public-Key Cryptography Is Exposed": [
    "Bagaimana Shor mengubah security assumption pada public-key cryptography?",
    "Shor menargetkan integer factorisation, discrete logarithm, dan elliptic-curve discrete logarithm. Dampaknya bergantung pada CRQC dan deployment aktual.",
  ],
  "International Institutional Response": [
    "Mengapa respons internasional terdiri dari banyak jenis dokumen dan institusi?",
    "NIST menetapkan standar, implementers menguji migrasi, dan otoritas keuangan mengoordinasikan dependency serta supervisory readiness.",
  ],
  "Common Themes Across Selected Benchmarks": [
    "Apakah benchmark internasional mendukung prioritas yang muncul dari workbook?",
    "Ya. Tema terkuat berpusat pada long-lived data, public-key dependency, inventory, migration complexity, governance, dan ecosystem coordination.",
  ],
  "Implications for Indonesian Banking": [
    "Bagaimana temuan global diterjemahkan ke kerangka regulasi perbankan Indonesia?",
    "POJK, SEOJK, PADK OJK, PBI, dan PADG menyediakan governance hooks untuk inventory, assessment, vendor control, testing, serta monitoring. Reviewed texts belum menetapkan mandat PQC eksplisit.",
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
        <small>{item[3]}</small>
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


const sequenceLabels = ["DUAL RELEVANCE", "PRIORITISATION", "FUTURE THREAT", "DEPENDENCY", "CONDITIONS", "HNDL"];

function SequenceProgress({ active }) {
  return (
    <nav className="evidence-sequence" aria-label="Alur analisis slide 9 sampai 14">
      {sequenceLabels.map((label, index) => (
        <span key={label} className={index === active ? "active" : index < active ? "done" : ""}>
          <i>{String(index + 1).padStart(2, "0")}</i>{label}
        </span>
      ))}
    </nav>
  );
}

export function DualRelevanceFlow({ slide }) {
  const [view, setView] = useState("compare");
  const visible = view === "compare" ? slide.pathways : slide.pathways.filter((item) => item.id === view);
  return (
    <div className="strategic-slide">
      <SequenceProgress active={0} />
      <div className="dual-path-control" role="group" aria-label="Pilih jalur dual relevance">
        <button type="button" aria-pressed={view === "benefits"} onClick={() => setView("benefits")}>Potential Benefits</button>
        <button type="button" className="dual-core" aria-pressed={view === "compare"} onClick={() => setView("compare")}>Dual Relevance</button>
        <button type="button" aria-pressed={view === "threats"} onClick={() => setView("threats")}>Emerging Threats</button>
      </div>
      <div className={`dual-path-panels ${view}`}>
        {visible.map((path) => (
          <article key={path.id} className={`dual-path-card ${path.id}`}>
            <div><span>{path.status}</span><h3>{path.title}</h3></div>
            <ul>{path.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <b>{path.action}</b>
            <small>{path.caveat}</small>
          </article>
        ))}
      </div>
      <p className="strategic-transition">Jika kedua jalur relevan, evidence mana yang memerlukan perhatian institusional lebih awal?</p>
    </div>
  );
}

export function PriorityComparison({ slide }) {
  const [mode, setMode] = useState("compare");
  const [selected, setSelected] = useState(slide.threats[0]);
  const groups = mode === "benefits" ? [{ id: "benefits", title: "Explore and validate", rows: slide.benefits }] :
    mode === "threats" ? [{ id: "threats", title: "Understand and prepare earlier", rows: slide.threats }] :
    [{ id: "benefits", title: "Explore and validate", rows: slide.benefits }, { id: "threats", title: "Understand and prepare earlier", rows: slide.threats }];
  return (
    <div className="strategic-slide">
      <SequenceProgress active={1} />
      <div className="view-tabs" role="group" aria-label="Tampilan prioritisasi">
        {["benefits", "compare", "threats"].map((id) => <button type="button" key={id} aria-pressed={mode === id} onClick={() => setMode(id)}>{id === "compare" ? "Compare" : id === "benefits" ? "Benefits" : "Threats"}</button>)}
      </div>
      <div className={`priority-groups ${mode}`}>
        {groups.map((group) => (
          <section key={group.id} className={`priority-group ${group.id}`}>
            <h3>{group.title}</h3>
            {group.rows.map((row) => (
              <button type="button" className="priority-row" key={row.label} onClick={() => setSelected(row)} aria-label={`${row.label}, skor ${row.score}`}>
                <span>{row.label}</span>
                <div><i style={{ width: `${row.score}%` }} /></div>
                <b>{row.score.toLocaleString("id-ID", { minimumFractionDigits: 1 })}</b>
                <small>{row.tier}</small>
              </button>
            ))}
          </section>
        ))}
      </div>
      <aside className="priority-evidence" aria-live="polite"><b>{selected.label}</b><span>{selected.decision}</span><small>{slide.methodology}</small></aside>
    </div>
  );
}

export function CryptanalyticPath({ slide }) {
  const [mode, setMode] = useState("current");
  const [scheme, setScheme] = useState("RSA");
  return (
    <div className="strategic-slide">
      <SequenceProgress active={2} />
      <div className="view-tabs" role="group" aria-label="Pilih capability">
        <button type="button" aria-pressed={mode === "current"} onClick={() => setMode("current")}>Current Capability</button>
        <button type="button" aria-pressed={mode === "future"} onClick={() => setMode("future")}>Future CRQC</button>
      </div>
      <div className={`crypto-causal ${mode}`}>
        {slide.layers.map((layer, index) => (
          <div className="crypto-layer-wrap" key={layer.label}>
            <article className={index === 0 ? "uncertain" : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{layer.label}</h3>
              <div>{layer.items.map((item) => index === 2 ? <button type="button" key={item} aria-pressed={scheme === item} onClick={() => setScheme(item)}>{item}</button> : <small key={item}>{item}</small>)}</div>
            </article>
            {index < slide.layers.length - 1 && <ArrowRight aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="crypto-result" aria-live="polite">
        <b>{mode === "current" ? "CURRENT STATE" : `${scheme} → ${slide.mappings[scheme]}`}</b>
        <p>{mode === "current" ? slide.current : slide.future}</p>
        <small>{slide.caveat}</small>
      </div>
    </div>
  );
}

export function DependencyMap({ slide }) {
  const [active, setActive] = useState(0);
  const [distinction, setDistinction] = useState(false);
  const item = slide.functions[active];
  return (
    <div className="strategic-slide">
      <SequenceProgress active={3} />
      <div className="dependency-layout">
        <div className="dependency-map">
          <strong>{slide.center}</strong>
          <div>{slide.functions.map((fn, index) => <button type="button" key={fn.title} aria-pressed={active === index} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)}>{fn.title}</button>)}</div>
        </div>
        <article className="dependency-detail" aria-live="polite">
          <span>POTENTIAL DEPENDENCY</span><h3>{item.title}</h3>
          <p>{item.examples.join(" · ")}</p>
          <div>{item.algorithms.map((algorithm) => <b key={algorithm}>{algorithm}</b>)}</div>
          <small>Actual deployment may differ by bank and system.</small>
        </article>
      </div>
      <button type="button" className="distinction-toggle" aria-expanded={distinction} onClick={() => setDistinction((value) => !value)}>DEPENDENCY ≠ EXPOSURE {distinction ? "−" : "+"}</button>
      {distinction && <p className="distinction-note">{slide.distinction}</p>}
    </div>
  );
}

export function ExposureConditions({ slide }) {
  const [pathway, setPathway] = useState("confidentiality");
  const [checked, setChecked] = useState([]);
  const path = slide.pathways[pathway];
  const complete = checked.length === path.conditions.length;
  const changePath = (id) => { setPathway(id); setChecked([]); };
  const toggle = (condition) => setChecked((items) => items.includes(condition) ? items.filter((item) => item !== condition) : [...items, condition]);
  return (
    <div className="strategic-slide">
      <SequenceProgress active={4} />
      <div className="exposure-inputs">{slide.inputs.map(([title, text], index) => <article key={title}><span>INPUT {index + 1}</span><b>{title}</b><p>{text}</p></article>)}</div>
      <div className="view-tabs" role="group" aria-label="Pilih exposure pathway">
        {Object.entries(slide.pathways).map(([id, data]) => <button type="button" key={id} aria-pressed={pathway === id} onClick={() => changePath(id)}>{data.title}</button>)}
      </div>
      <div className="condition-checks">{path.conditions.map((condition) => <button type="button" key={condition} aria-pressed={checked.includes(condition)} onClick={() => toggle(condition)}><span>{checked.includes(condition) ? "✓" : "+"}</span>{condition}</button>)}</div>
      <output className={complete ? "exposure-output complete" : "exposure-output"}><b>{complete ? path.complete : path.incomplete}</b><small>{slide.boundary}</small></output>
    </div>
  );
}

export function HndlPriority({ slide }) {
  const [view, setView] = useState("scenario");
  const [active, setActive] = useState(0);
  return (
    <div className="strategic-slide">
      <SequenceProgress active={5} />
      <div className="view-tabs" role="group" aria-label="Tampilan HNDL">
        <button type="button" aria-pressed={view === "scenario"} onClick={() => setView("scenario")}>Scenario</button>
        <button type="button" aria-pressed={view === "priority"} onClick={() => setView("priority")}>Why priority?</button>
      </div>
      {view === "scenario" ? (
        <>
          <div className="hndl-timeline">{slide.timeline.map(([label, text], index) => <button type="button" key={label} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b><small>{text}</small></button>)}</div>
          <div className="hndl-selected" aria-live="polite"><b>{slide.timeline[active][0]}</b><span>{slide.timeline[active][1]}</span></div>
          <div className="timing-logic"><b>{slide.formula}</b><small>Decision framework—not a prediction of Q-Day.</small></div>
        </>
      ) : (
        <div className="hndl-priority-layout">
          <div className="score-list">{slide.scores.map(([label, score]) => <div key={label}><span>{label}</span><i><b style={{ width: `${(score / 5) * 100}%` }} /></i><strong>{String(score).replace(".", ",")} / 5</strong></div>)}</div>
          <aside><span>ADJUSTED PRIORITY</span><strong>{String(slide.adjustedPriority).replace(".", ",")}</strong><small>/ 100 · literature-based decision ordering</small></aside>
        </div>
      )}
      <p className="method-caveat">{slide.caveat}</p>
    </div>
  );
}

const readinessSequence = ["ACTIONS", "LIFECYCLE", "INVENTORY", "PRIORITISE"];

function ReadinessProgress({ active }) {
  return (
    <nav className="readiness-sequence" aria-label="Alur quantum readiness slide 15 sampai 18">
      {readinessSequence.map((label, index) => (
        <span key={label} className={index === active ? "active" : index < active ? "done" : ""}>
          <i>{String(index + 1).padStart(2, "0")}</i>{label}
        </span>
      ))}
    </nav>
  );
}

export function ReadinessResponse({ slide }) {
  const [active, setActive] = useState(0);
  const item = slide.items[active];
  return (
    <div className="readiness-story">
      <ReadinessProgress active={0} />
      <div className="response-map">
        <div className="response-core"><span>HNDL</span><b>{slide.center}</b></div>
        <div className="response-workstreams" role="list" aria-label="Workstream quantum readiness">
          {slide.items.map(([title], index) => (
            <button
              type="button"
              role="listitem"
              key={title}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b>
            </button>
          ))}
        </div>
        <article className="response-detail" aria-live="polite">
          <span>WORKSTREAM {String(active + 1).padStart(2, "0")}</span>
          <h3>{item[0]}</h3>
          <p>{item[1]}</p>
          <small>OUTPUT</small>
          <strong>{slide.outcomes[active]}</strong>
        </article>
      </div>
      <p className="readiness-transition">Empat workstream tersebut dijalankan melalui lifecycle yang berulang.</p>
    </div>
  );
}

export function ReadinessLifecycle({ slide }) {
  const [phaseIndex, setPhaseIndex] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);
  const phase = slide.phases[phaseIndex];
  const step = phase.steps[Math.min(stepIndex, phase.steps.length - 1)];
  const choosePhase = (index) => {
    setPhaseIndex(index);
    setStepIndex(0);
  };
  return (
    <div className="readiness-story">
      <ReadinessProgress active={1} />
      <div className="lifecycle-line" role="list" aria-label="Empat fase quantum readiness lifecycle">
        {slide.phases.map((item, index) => (
          <button type="button" role="listitem" key={item.label} aria-pressed={phaseIndex === index} onClick={() => choosePhase(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.label}</b>
            <small>{item.purpose}</small>
          </button>
        ))}
      </div>
      <div className="lifecycle-detail">
        <div className="lifecycle-steps" role="group" aria-label={`Langkah fase ${phase.label}`}>
          {phase.steps.map(([title], index) => (
            <button type="button" key={title} aria-pressed={stepIndex === index} onClick={() => setStepIndex(index)}>
              <i>{String(index + 1).padStart(2, "0")}</i><span>{title}</span>
            </button>
          ))}
        </div>
        <article aria-live="polite">
          <span>{phase.label.toUpperCase()}</span>
          <h3>{step[0]}</h3>
          <p>{step[1]}</p>
          <small>{phaseIndex === slide.phases.length - 1 ? "Monitoring memicu siklus berikutnya." : "Evidence tahap ini menjadi input bagi tahap berikutnya."}</small>
        </article>
      </div>
    </div>
  );
}

export function InventoryFirst({ slide }) {
  const [active, setActive] = useState(0);
  const group = slide.groups[active];
  return (
    <div className="readiness-story">
      <ReadinessProgress active={2} />
      <div className="inventory-rationale">
        <div className="inventory-groups" role="list" aria-label="Kelompok data cryptographic inventory">
          {slide.groups.map((item, index) => (
            <button type="button" role="listitem" key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>INPUT {String(index + 1).padStart(2, "0")}</span><b>{item.label}</b><small>{item.question}</small>
            </button>
          ))}
        </div>
        <article className="inventory-evidence" aria-live="polite">
          <span>{group.question}</span>
          <h3>{group.label}</h3>
          <ul>{group.fields.map((field) => <li key={field}>{field}</li>)}</ul>
          <p>{group.decision}</p>
        </article>
        <div className="inventory-output">
          <span>OUTPUT</span><b>{slide.output}</b>
          <small>Exposure + ownership + migration context</small>
        </div>
      </div>
      <p className="readiness-transition">Inventory mengubah dugaan umum menjadi evidence yang dapat dibandingkan.</p>
    </div>
  );
}

export function RiskPrioritisation({ slide }) {
  const [active, setActive] = useState(0);
  const candidate = slide.candidates[active];
  return (
    <div className="readiness-story">
      <ReadinessProgress active={3} />
      <div className="risk-input-strip" aria-label="Data inventory yang digunakan untuk assessment">
        {slide.inventoryInputs.map(([title, text], index) => (
          <article key={title}><span>DATA {index + 1}</span><b>{title}</b><small>{text}</small></article>
        ))}
      </div>
      <div className="risk-priority-layout">
        <div className="risk-candidates" role="list" aria-label="Contoh jalur prioritisasi">
          {slide.candidates.map((item, index) => (
            <button type="button" role="listitem" key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.label}</b>
              <small>{item.mechanism}</small>
            </button>
          ))}
        </div>
        <article className="risk-decision" aria-live="polite">
          <div><span>DECISION ORDER</span><strong>{candidate.priority}</strong></div>
          <h3>{candidate.label}</h3>
          <ul>{candidate.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{candidate.decision}</p>
        </article>
      </div>
      <p className="method-caveat">{slide.methodology}</p>
    </div>
  );
}

const conceptualSequence = ["PHYSICAL", "STATE", "PROCESSING", "PIPELINE", "ADVANTAGE", "ALGORITHMS"];

function ConceptProgress({ active }) {
  return (
    <nav className="concept-progress" aria-label="Alur konsep quantum computing slide 19 sampai 24">
      {conceptualSequence.map((label, index) => (
        <span key={label} className={index === active ? "active" : index < active ? "done" : ""}>
          <i>{String(index + 1).padStart(2, "0")}</i>{label}
        </span>
      ))}
    </nav>
  );
}

export function QuantumFoundation({ slide }) {
  const [active, setActive] = useState(0);
  const item = slide.items[active];
  return (
    <div className="conceptual-story">
      <ConceptProgress active={0} />
      <div className="foundation-layout">
        <div className="foundation-chain" role="list" aria-label="Empat lapisan quantum computation">
          {slide.items.map(([number, title], index) => (
            <button type="button" role="listitem" key={title} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{number}</span><b>{title}</b>
            </button>
          ))}
        </div>
        <article className="foundation-detail" aria-live="polite">
          <span>LAYER {item[0]}</span>
          <h3>{item[1]}</h3>
          <p>{item[2]}</p>
          <strong>{slide.principle}</strong>
        </article>
      </div>
      <p className="concept-transition">Physical system menyediakan state. Computation muncul ketika state dapat disiapkan, diubah, dan diukur secara terkontrol.</p>
    </div>
  );
}

export function StateComputation({ slide }) {
  const [active, setActive] = useState(0);
  const item = slide.items[active];
  return (
    <div className="conceptual-story">
      <ConceptProgress active={1} />
      <div className="state-selector" role="list" aria-label="Konsep yang membentuk quantum computation">
        {slide.items.map(([number, title], index) => (
          <button type="button" role="listitem" key={title} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span>{number}</span><b>{title}</b>
          </button>
        ))}
      </div>
      <article className="state-detail" aria-live="polite">
        <div><span>CONCEPT</span><h3>{item[1]}</h3><p>{item[2]}</p></div>
        <output><small>REPRESENTATION</small><strong>{item[3]}</strong><p>{item[4]}</p></output>
      </article>
      <p className="concept-transition">Algorithm menyusun operasi agar interference meningkatkan probability outcome yang membawa informasi berguna.</p>
    </div>
  );
}

export function ProcessingComparison({ slide }) {
  const [active, setActive] = useState(0);
  const row = slide.rows[active];
  return (
    <div className="conceptual-story">
      <ConceptProgress active={2} />
      <div className="comparison-layout">
        <div className="comparison-dimensions" role="list" aria-label="Dimensi perbandingan pemrosesan informasi">
          {slide.rows.map((item, index) => (
            <button type="button" role="listitem" key={item[0]} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><b>{item[0]}</b>
            </button>
          ))}
        </div>
        <div className="processing-split" aria-live="polite">
          <article className="classical-side"><span>CLASSICAL</span><h3>{row[0]}</h3><p>{row[1]}</p></article>
          <article className="quantum-side"><span>QUANTUM</span><h3>{row[0]}</h3><p>{row[2]}</p></article>
        </div>
      </div>
      <p className="concept-transition">{slide.distinction}</p>
    </div>
  );
}

export function QuantumPipeline({ slide }) {
  const [active, setActive] = useState(0);
  const stage = slide.stages[active];
  return (
    <div className="conceptual-story">
      <ConceptProgress active={3} />
      <div className="pipeline-stage-grid" role="list" aria-label="Quantum processing pipeline">
        {slide.stages.map(([title], index) => (
          <button type="button" role="listitem" key={title} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b>
          </button>
        ))}
      </div>
      <article className="pipeline-stage-detail" aria-live="polite">
        <div><span>STAGE {String(active + 1).padStart(2, "0")}</span><h3>{stage[0]}</h3></div>
        <p>{stage[1]}</p>
      </article>
      <p className="concept-transition">Satu quantum subroutine menjadi relevan jika keuntungan tetap terlihat pada total pipeline.</p>
    </div>
  );
}

export function QuantumAdvantageFit({ slide }) {
  const [checked, setChecked] = useState([0]);
  const complete = checked.length === slide.conditions.length;
  const toggle = (index) => setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  return (
    <div className="conceptual-story">
      <ConceptProgress active={4} />
      <div className="advantage-conditions" role="list" aria-label="Syarat evaluasi quantum advantage">
        {slide.conditions.map(([title, text], index) => (
          <button type="button" role="listitem" key={title} aria-pressed={checked.includes(index)} onClick={() => toggle(index)}>
            <span>{checked.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><b>{title}</b><small>{text}</small>
          </button>
        ))}
      </div>
      <output className={`advantage-result ${complete ? "complete" : ""}`} aria-live="polite">
        <span>{complete ? "CANDIDATE FIT" : `${checked.length} / ${slide.conditions.length} CONDITIONS`}</span>
        <strong>{complete ? "Ready for end-to-end validation" : "Advantage claim remains incomplete"}</strong>
        <p>{complete ? "Bandingkan runtime, accuracy, resource cost, dan operational constraints." : "Pilih seluruh kondisi untuk membentuk evaluasi yang lengkap."}</p>
      </output>
    </div>
  );
}

export function AlgorithmFrontier({ slide }) {
  const [active, setActive] = useState(0);
  const algorithm = slide.algorithms[active];
  return (
    <div className="conceptual-story">
      <ConceptProgress active={5} />
      <div className="algorithm-layout">
        <div className="algorithm-list" role="list" aria-label="Quantum algorithm families">
          {slide.algorithms.map((item, index) => (
            <button type="button" role="listitem" key={item.name} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><b>{item.name}</b><small>{item.problem}</small>
            </button>
          ))}
        </div>
        <article className="algorithm-detail" aria-live="polite">
          <div><span>PROBLEM CLASS</span><h3>{algorithm.problem}</h3></div>
          <section><b>Computational capability</b><p>{algorithm.capability}</p></section>
          <section><b>Resource condition</b><p>{algorithm.constraint}</p></section>
          <strong>{algorithm.bridge}</strong>
        </article>
      </div>
    </div>
  );
}

const closingSequence = ["EXPOSURE", "RESPONSE", "THEMES", "INDONESIA", "EVIDENCE", "REGULATION"];

function ClosingProgress({ active }) {
  return (
    <nav className="closing-progress" aria-label="Alur sintesis slide 25 sampai 30">
      {closingSequence.map((label, index) => (
        <span key={label} className={index === active ? "active" : index < active ? "done" : ""}>
          <i>{String(index + 1).padStart(2, "0")}</i>{label}
        </span>
      ))}
    </nav>
  );
}

export function PublicKeyExposure({ slide }) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState("crqc");
  const scheme = slide.schemes[active];
  return (
    <div className="closing-story">
      <ClosingProgress active={0} />
      <div className="threat-branch"><span>DUAL RELEVANCE</span><b>Emerging Threats</b><small>Cryptanalytic pathway</small></div>
      <div className="scheme-tabs" role="list" aria-label="Public-key schemes">
        {slide.schemes.map((item, index) => (
          <button type="button" role="listitem" key={item.id} aria-pressed={active === index} onClick={() => setActive(index)}>
            <b>{item.scheme}</b><small>{item.assumption}</small>
          </button>
        ))}
      </div>
      <div className="capability-switch" role="group" aria-label="Pilih capability state">
        <button type="button" aria-pressed={mode === "current"} onClick={() => setMode("current")}>Current capability</button>
        <button type="button" aria-pressed={mode === "crqc"} onClick={() => setMode("crqc")}>Future CRQC scenario</button>
      </div>
      {mode === "current" ? (
        <article className="current-security" aria-live="polite"><span>CURRENT STATE</span><h3>{scheme.scheme}</h3><p>No demonstrated CRQC currently breaks deployed cryptographic-scale instances. Security still depends on implementation quality, key management, and classical threats.</p></article>
      ) : (
        <div className="exposure-path" aria-live="polite">
          <article><span>01 · PUBLIC INPUT</span><p>{scheme.publicInput}</p></article>
          <article><span>02 · SHOR</span><p>{scheme.quantumStep}</p></article>
          <article><span>03 · PRIVATE MATERIAL</span><p>{scheme.recovered}</p></article>
          <article><span>04 · AFFECTED FUNCTION</span><p>{scheme.functions.join(" / ")}</p></article>
          <article className="exposure-impact"><span>POTENTIAL IMPACT</span><p>{scheme.impacts.join(". ")}</p></article>
        </div>
      )}
      <p className="analysis-boundary">{slide.boundary}</p>
    </div>
  );
}

export function InstitutionMatrix({ slide }) {
  const [active, setActive] = useState(0);
  return (
    <div className="closing-story">
      <ClosingProgress active={1} />
      <div className="institution-matrix" role="table" aria-label="Matrix respons institusi internasional">
        <div className="institution-head" role="row">{slide.columns.map((column) => <b role="columnheader" key={column}>{column}</b>)}</div>
        {slide.items.map((row, index) => (
          <button type="button" role="row" key={row[0]} aria-pressed={active === index} onClick={() => setActive(index)}>
            {row.map((cell, cellIndex) => <span role="cell" key={cell}>{cellIndex === 0 ? <strong>{cell}</strong> : cell}</span>)}
          </button>
        ))}
      </div>
      <p className="matrix-explainer" aria-live="polite"><b>{slide.items[active][0]}</b><span>{slide.items[active][3]}</span></p>
    </div>
  );
}

export function BenchmarkSynthesis({ slide }) {
  const [active, setActive] = useState(0);
  const theme = slide.themes[active];
  return (
    <div className="closing-story">
      <ClosingProgress active={2} />
      <div className="theme-priority-layout">
        <div className="theme-score-list" role="list" aria-label="Prioritas tema berdasarkan workbook">
          {slide.themes.map((item, index) => (
            <button type="button" role="listitem" key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{item.rank}</span><b>{item.label}</b><i><em style={{ width: `${item.score}%` }} /></i><strong>{item.score.toLocaleString("id-ID", { maximumFractionDigits: 2 })}</strong>
            </button>
          ))}
        </div>
        <article className="theme-score-detail" aria-live="polite">
          <span>{theme.ids} · RANK {theme.rank}</span><h3>{theme.label}</h3><strong>{theme.score.toLocaleString("id-ID", { maximumFractionDigits: 2 })} / 100</strong>
          <p>{theme.evidence}</p><small>DECISION</small><b>{theme.action}</b>
        </article>
      </div>
      <p className="analysis-boundary">{slide.methodology}</p>
    </div>
  );
}

export function IndonesiaMapping({ slide }) {
  const [active, setActive] = useState(0);
  const mapping = slide.mappings[active];
  return (
    <div className="closing-story">
      <ClosingProgress active={3} />
      <div className="indonesia-layout">
        <div className="regulation-list" role="list" aria-label="Instrumen regulasi Indonesia">
          {slide.mappings.map((item, index) => (
            <button type="button" role="listitem" key={item.instrument} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><b>{item.instrument}</b><small>{item.scope}</small>
            </button>
          ))}
        </div>
        <article className="regulation-detail" aria-live="polite">
          <span>REGULATORY ANCHOR</span><h3>{mapping.instrument}</h3><p>{mapping.anchors}</p>
          <small>READINESS APPLICATION</small><strong>{mapping.application}</strong>
        </article>
      </div>
      <div className="indonesia-priorities">{slide.priorities.map(([number, title, text]) => <article key={number}><span>{number}</span><b>{title}</b><small>{text}</small></article>)}</div>
      <p className="analysis-boundary">{slide.boundary}</p>
    </div>
  );
}

export function EvidenceReferences({ slide, sequenceIndex }) {
  const [active, setActive] = useState(0);
  const group = slide.groups[active];
  return (
    <div className="closing-story reference-story">
      <ClosingProgress active={sequenceIndex} />
      <div className="reference-tabs" role="list" aria-label="Kelompok referensi">
        {slide.groups.map((item, index) => <button type="button" role="listitem" key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}>{item.label}</button>)}
      </div>
      <article className="reference-detail" aria-live="polite">
        <span>{group.label.toUpperCase()}</span>
        <ol>{group.items.map((item) => <li key={item}>{item}</li>)}</ol>
      </article>
    </div>
  );
}

export function EvidenceHint({ source }) {
  const [open, setOpen] = useState(true);
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
