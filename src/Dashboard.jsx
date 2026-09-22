import { useEffect, useState } from "react";
import {
  Atom,
  LayoutDashboard,
  BookOpen,
  ShieldCheck,
  FlaskConical,
  Presentation,
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
  Network,
  Clock,
  Code2,
  FileText,
} from "lucide-react";
import PresentationApp from "./App.jsx";
import { slides } from "./slides";
import { Readiness } from "./Interactive";
import {
  ClassicalLab,
  QuantumLab,
  ComputingLab,
  ShorLab,
} from "./integrations/computing/components/Labs";
import Benchmark from "./integrations/computing/components/Benchmark";
import "./integrations/computing/labs.css";
import "./dashboard.css";
import Research from "./Research";
import HndlCaseStudy from "./HndlCaseStudy";
import ReportOutline from "./ReportOutline";
import {modules} from "./researchData";

const groups = modules;
const labs = [
  ["classical", "Classical bits", ClassicalLab],
  ["physics", "Quantum physics", QuantumLab],
  ["computing", "Interference", ComputingLab],
  ["shor", "Shor algorithm", ShorLab],
];
const nav = [
  ["overview", "Ringkasan", LayoutDashboard],
  ["library", "Materi kajian", BookOpen],
  ["risk", "Contoh kasus HNDL", Clock],
  ["readiness", "Readiness", ShieldCheck],
  ["report", "Outline laporan", FileText],
  ["lab", "Computing lab", FlaskConical],
];
// Hash routes work on GitHub Pages without server rewrite rules.
const readRoute = () => {
  if (location.hash.startsWith("#slide-")) return "presentation";
  if (location.hash.startsWith("#module-")) return "library";
  const route = location.hash.slice(1);
  return nav.some(([id]) => id === route) ? route : "overview";
};

export default function Dashboard() {
  const [route, setRoute] = useState(readRoute),
    [mobile, setMobile] = useState(false),
    [moduleId,setModuleId] = useState(() => location.hash.replace("#module-", "") || "evolution"),
    [selected, setSelected] = useState(6),
    [lab, setLab] = useState("physics");
  useEffect(() => {
    const sync = () => { setRoute(readRoute()); if(location.hash.startsWith("#module-")) setModuleId(location.hash.slice(8)); };
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);
  const go = (value) => {
    location.hash = value;
    setRoute(value);
    setMobile(false);
  };
  const openModule = (id) => {setSelected((modules.find(m=>m.id===id)?.start || 2)-1);setModuleId(id);location.hash=`module-${id}`;setRoute('library');setMobile(false);};
  const showTopic = (index) => {
    setSelected(index);
    openModule(modules.find(m=>index+1>=m.start && index+1<=m.end)?.id || 'evolution');
  };
  const ActiveLab = labs.find((x) => x[0] === lab)[2];
  if (route === "presentation")
    return (
      <>
        <button className="return-dashboard" onClick={() => go("overview")}>
          ← Dashboard
        </button>
        <PresentationApp />
      </>
    );
  return (
    <div className="dashboard-shell">
      <aside className={`dash-sidebar ${mobile ? "is-open" : ""}`}>
        <a href="#overview" className="dash-brand">
          <Atom />
          <span>
            QUANTUM<span>BANKING RESEARCH</span>
          </span>
        </a>
        <button
          className="mobile-close"
          aria-label="Tutup menu"
          onClick={() => setMobile(false)}
        >
          <X />
        </button>
        <p className="nav-caption">WORKSPACE</p>
        <nav>
          {nav.map(([id, label, I]) => (
            <button
              className={route === id ? "active" : ""}
              key={id}
              onClick={() => go(id)}
            >
              <I size={19} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span>KAJIAN BULAN 1</span>
          <p>Physics → Computing → Banking resilience</p>
          <a
            href="https://github.com/rifqironanda/computing_and_quantum"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={16} /> Computing & quantum <ArrowUpRight size={14} />
          </a>
        </div>
      </aside>
      <div className="dash-main">
        <header className="dash-top">
          <button
            className="mobile-menu"
            aria-label="Buka menu"
            onClick={() => setMobile(true)}
          >
            <Menu />
          </button>
          <div>
            Research workspace{" "}
            <span>/ {nav.find((x) => x[0] === route)?.[1] || "Ringkasan"}</span>
          </div>
          <button
            className="presentation-link"
            onClick={() => {
              location.hash = `slide-${selected + 1}`;
              setRoute("presentation");
            }}
          >
            <Presentation size={17} /> Mode presentasi
          </button>
        </header>
        <main className="dash-content">
          {route === "overview" && (
            <>
              <div className="dash-heading">
                <div>
                  <p className="dash-kicker">QUANTUM • PHYSICS • CYBER</p>
                  <h1>
                    {slides[0].title}
                  </h1>
                  <p>
                    {slides[0].subtitle}. {slides[0].note}
                  </p>
                </div>
                <div className="research-badge">
                  <Atom size={46} />
                  <span>RESEARCH BRIEFING</span>
                  <b>Bulan 01</b>
                </div>
              </div>
              <div className="dashboard-cta"><button onClick={()=>openModule('evolution')}>Jelajahi perkembangan Quantum Computing →</button><button onClick={()=>openModule('foundations')}>Apa itu Quantum Computing? →</button></div>
              <div className="dashboard-features">{modules.map(m=><button key={m.id} onClick={()=>openModule(m.id)}><b>{m.name}</b><span>{m.feature}</span><span>{m.summary}</span></button>)}</div>
              <div className="dash-stats">
                {[
                  ["06", "Modul kajian", "library"],
                  ["10", "Bab laporan", "report"],
                  ["04", "Lab interaktif", "lab"],
                  ["08", "Tahap readiness", "readiness"],
                  ["Bank B", "Contoh kasus HNDL", "risk"],
                ].map(([n, l, id]) => (
                  <button key={l} onClick={() => go(id)}>
                    <span>{l}</span>
                    <b>{n}</b>
                    <ArrowUpRight size={19} />
                  </button>
                ))}
              </div>
              <div className="overview-grid">
                <section className="dash-panel">
                  <div className="panel-heading">
                    <h2>Alur pemahaman</h2>
                    <span>06 BAGIAN</span>
                  </div>
                  {groups.map((g, i) => (
                    <button
                      className="journey-row"
                      key={g.name}
                      onClick={() => {
                        showTopic(g.start - 1);
                      }}
                    >
                      <span>0{i + 1}</span>
                      <div>
                        <b>{g.name}</b>
                        <small>
                          Materi {g.start}–{g.end}
                        </small>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                  ))}
                </section>
                <section className="dash-panel lab-preview">
                  <div className="panel-heading">
                    <h2>Quantum state explorer</h2>
                    <FlaskConical size={20} />
                  </div>
                  <img
                    src={`${import.meta.env.BASE_URL}media/bloch-sphere.svg`}
                    alt="Representasi Bloch sphere satu qubit"
                  />
                  <p>
                    Ubah θ dan φ, periksa probabilitas, lalu lakukan
                    measurement.
                  </p>
                  <button
                    className="dash-primary"
                    onClick={() => {
                      setLab("physics");
                      go("lab");
                    }}
                  >
                    Buka physics lab <ArrowUpRight size={16} />
                  </button>
                  <a
                    className="asset-credit"
                    href="https://commons.wikimedia.org/wiki/File:Bloch_sphere.svg"
                  >
                    Smite-Meister / Fibonacci · CC BY-SA 3.0
                  </a>
                </section>
              </div>
              <div className="dash-insight">
                <ShieldCheck />
                <div>
                  <b>Capability ≠ exposure</b>
                  <p>
                    Keunggulan komputasi bersifat problem-specific. Exposure
                    bank perlu dibuktikan melalui cryptographic inventory.
                  </p>
                </div>
                <button onClick={() => showTopic(11)}>
                  Baca kajian <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
          {route === "library" && <Research moduleId={moduleId} onNavigate={openModule} onDashboard={()=>go('overview')} onLab={()=>go('lab')}/>}
          {route === "risk" && <HndlCaseStudy onTheory={()=>openModule('hndl')} onDashboard={()=>go('overview')}/>}
          {route === "readiness" && (
            <>
              <PageTitle
                title="Quantum readiness lifecycle"
                text="Eksplorasi delapan tahap dari governance hingga monitoring dan crypto-agility."
              />
              <section className="dash-panel light-panel">
                <Readiness items={slides[15].items} />
              </section>
              <div className="dash-insight">
                <Network />
                <div>
                  <b>Mulai dari inventory</b>
                  <p>
                    Hubungkan algoritma, pemilik sistem, data yang dilindungi,
                    dan dependensi migrasi.
                  </p>
                </div>
                <button onClick={() => showTopic(16)}>
                  Buka inventory <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
          {route === "report" && <ReportOutline />}
          {route === "lab" && (
            <>
              <PageTitle
                title="Computing & quantum lab"
                text="Eksperimen dari repo computing_and_quantum, terintegrasi langsung dengan kajian perbankan."
              />
              <div
                className="lab-tabs"
                role="tablist"
                aria-label="Lab komputasi"
              >
                {labs.map(([id, title]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={lab === id}
                    onClick={() => setLab(id)}
                  >
                    {title}
                  </button>
                ))}
              </div>
              <div className="lab-surface" key={lab}>
                <ActiveLab />
                {lab === "shor" && (
                  <>
                    <div className="backend-note">
                      <b>Benchmark Python / Qiskit</b>
                      <p>
                        {import.meta.env.VITE_BENCHMARK_API_URL
                          ? "Endpoint backend dikonfigurasi. Hasil hanya tersedia bila server dapat diakses."
                          : "Visualisasi Shor di atas berjalan di browser. Benchmark Qiskit memerlukan server Python terpisah; belum dikonfigurasi pada deployment ini."}
                      </p>
                      <a
                        href="https://github.com/rifqironanda/quantum_computing_for_banking/blob/main/docs/INTEGRATION.md"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Panduan koneksi backend ↗
                      </a>
                    </div>
                    {import.meta.env.VITE_BENCHMARK_API_URL && <Benchmark />}
                  </>
                )}
              </div>
              <div className="dash-insight">
                <BookOpen />
                <div>
                  <b>Kaitan dengan perbankan</b>
                  <p>
                    {lab === "shor"
                      ? "Period finding menjadi jembatan menuju ancaman terhadap asumsi RSA dan Diffie–Hellman."
                      : "Pahami representasi informasi dan operasi sebelum menilai quantum advantage atau risiko kriptografi."}
                  </p>
                </div>
                <button onClick={() => showTopic(lab === "shor" ? 24 : 20)}>
                  Buka materi terkait <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </main>
        <div className="dash-footer">
          Kajian berbasis literatur · Simulasi edukatif{" "}
          <a href="https://github.com/rifqironanda/quantum_computing_for_banking">
            Kode & dokumentasi ↗
          </a>
        </div>
      </div>
    </div>
  );
}
function PageTitle({ title, text }) {
  return (
    <div className="page-title">
      <p className="dash-kicker">EXPLORE & UNDERSTAND</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
