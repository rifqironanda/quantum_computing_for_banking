import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slides } from "./slides.js";
import {
  TopicIcon,
  LearningCards,
  Readiness,
  HndlExplorer,
  PhysicsFigure,
  PresentationPhysicsFigure,
  PresentationOrbit,
  InteractiveTimeline,
  ResearchFrame,
  EvidenceHint,
} from "./Interactive.jsx";

const sourceGroups = {
  evolution: slides.find((s) => s.title === "Milestones 01–04")?.source,
  finance: slides.find((s) => s.title === "Mengapa Quantum Perlu Mulai Dipahami?")?.source,
  risk: slides.find((s) => s.title === "Future Cryptanalytic Threat")?.source,
  readiness: slides.find((s) => s.title === "Quantum Readiness Lifecycle")?.source,
};

function inferredSource(slide) {
  const title = slide.title || "";
  if (/Evolution|Perkembangan|Milestones|Quantum States|Actually Quantum|Classical vs Quantum|Processing Pipeline/i.test(title)) return sourceGroups.evolution;
  if (/Advantage|Algorithms Define|Quantum–Banking|Dual Relevance|Mengapa Quantum/i.test(title)) return sourceGroups.finance;
  if (/Cryptanalytic|Cryptographic|HNDL|Harvest|Public-Key|Dependency/i.test(title)) return sourceGroups.risk;
  if (/Readiness|Inventory|Prioritisation|Institutional Response|Common Themes|Indonesian Banking|What Will We Do/i.test(title)) return sourceGroups.readiness;
  return null;
}

const Arrow = ({ reverse = false }) => (
  <span className={`arrow ${reverse ? "reverse" : ""}`} aria-hidden="true">→</span>
);

function Source({ children, interactive = false }) {
  if (!children) return null;
  return interactive ? <EvidenceHint source={children} /> : <p className="source">Source: {children}</p>;
}

function Header({ slide, interactive = false }) {
  return (
    <header className="slide-header">
      <p className="eyebrow">QUANTUM COMPUTING & PERBANKAN</p>
      <h2>{slide.title}</h2>
      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
      {interactive && <ResearchFrame slide={slide} />}
    </header>
  );
}

function Callout({ children }) {
  return children ? <div className="callout">{children}</div> : null;
}

function SlideLayout({ slide, presentationMode, children, evidence }) {
  return (
    <div className="slide-layout">
      <div className="slide-header-region">
        <Header slide={slide} interactive={presentationMode} />
      </div>
      <div className="slide-body">{children}</div>
      <div className="slide-evidence">{evidence}</div>
    </div>
  );
}

function WhyQuantumBody({ slide }) {
  return (
    <div className="why-quantum-grid">
      {slide.items.map((item) => (
        <article className="why-quantum-card" key={item[0]}>
          <div className="why-card-heading">
            <span>{item[0]}</span>
            <h3>{item[1]}</h3>
          </div>
          <b>{item[2]}</b>
          <p>{item[3]}</p>
          {item[4] && (
            <div className="why-card-points">
              {item[4].map((point) => <span key={point}>{point}</span>)}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function ListPanel({ data, accent = "" }) {
  return (
    <article className={`list-panel ${accent}`}>
      <TopicIcon text={data.title} />
      <h3>{data.title}</h3>
      <ul>{data.items.map((x) => <li key={x}>{x}</li>)}</ul>
    </article>
  );
}

function FlowLane({ data, danger = false }) {
  return (
    <div className={`flow-lane ${danger ? "danger" : ""}`}>
      <strong>{data.label}</strong>
      <div className="flow-lane-items">
        {data.items.map((x, i) => (
          <div className="flow-wrap" key={x}>
            <span>{x}</span>
            {i < data.items.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuantumOrb() {
  return (
    <div className="quantum-orb" aria-hidden="true">
      <i /><i /><i /><b />
    </div>
  );
}

function ComprehensiveVenn({ slide }) {
  const descriptions = [
    "Apakah struktur masalah memiliki pola yang benar-benar dapat dieksploitasi oleh algoritma kuantum?",
    "Apakah tersedia algoritma dengan speedup yang relevan beserta assumptions yang realistis?",
    "Apakah logical qubits, fidelity, circuit depth, runtime, dan error correction mencukupi?",
  ];

  return (
    <div className="venn-comprehensive">
      <div
        className="venn-stage"
        role="img"
        aria-label="Diagram Venn yang menunjukkan irisan problem structure, quantum algorithm, dan hardware resources sebagai syarat kandidat quantum advantage"
      >
        <div className="venn-shape venn-shape-problem" aria-hidden="true" />
        <div className="venn-shape venn-shape-algorithm" aria-hidden="true" />
        <div className="venn-shape venn-shape-hardware" aria-hidden="true" />

        <article className="venn-label venn-label-problem">
          <span>01 · PROBLEM</span>
          <b>{slide.items[0]}</b>
          <p>{descriptions[0]}</p>
        </article>
        <article className="venn-label venn-label-algorithm">
          <span>02 · ALGORITHM</span>
          <b>{slide.items[1]}</b>
          <p>{descriptions[1]}</p>
        </article>
        <article className="venn-label venn-label-hardware">
          <span>03 · RESOURCES</span>
          <b>{slide.items[2]}</b>
          <p>{descriptions[2]}</p>
        </article>

        <div className="venn-fit">
          <small>INTERSECTION</small>
          <strong>{slide.center}</strong>
          <span>Candidate for practical advantage</span>
        </div>
      </div>

      <aside className="venn-validation" aria-label="Lapisan validasi quantum advantage">
        <span className="venn-validation-kicker">VALIDATION LAYER</span>
        <h3>FIT belum sama dengan advantage</h3>
        <p className="venn-validation-lead">
          Kandidat yang cocok tetap harus diuji secara <b>end-to-end</b> terhadap pembanding klasik yang kuat.
        </p>
        <div className="venn-benchmark-path">
          <div>
            <small>QUANTUM PATH</small>
            <b>Prepare → Execute → Sample → Post-process</b>
          </div>
          <span aria-hidden="true">VS</span>
          <div>
            <small>CLASSICAL BASELINE</small>
            <b>Best practical method / strong benchmark</b>
          </div>
        </div>
        <div className="venn-metrics">
          <span>Runtime</span>
          <span>Accuracy</span>
          <span>Resources</span>
          <span>Overhead</span>
        </div>
        <p className="venn-validation-rule">
          Practical advantage memerlukan hasil yang tetap unggul setelah seluruh overhead diperhitungkan.
        </p>
      </aside>
    </div>
  );
}

export function SlideContent({ slide, presentationMode = false }) {
  const displaySource = slide.source || (presentationMode ? inferredSource(slide) : null);
  switch (slide.kind) {
    case "cover":
      return (
        <div className="cover-content">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="lead">{slide.subtitle}</p>
          <div className="cover-rule" />
          <p className="cover-note">{slide.note}</p>
          <QuantumOrb />
        </div>
      );
    case "section":
      return (
        <div className="section-content">
          <p className="eyebrow">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>
          <QuantumOrb />
        </div>
      );
    case "timeline":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          {presentationMode ? (
            <InteractiveTimeline items={slide.items} />
          ) : (
            <div className="timeline">
              {slide.items.map((x, i) => (
                <div className="timeline-item" key={x[0]}>
                  <span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small>{i < slide.items.length - 1 && <i />}
                </div>
              ))}
            </div>
          )}
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "milestones":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <LearningCards items={slide.items} />
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "statement":
      return (
        <div className="statement">
          <p className="eyebrow">RESEARCH TRAJECTORY</p>
          <h1>{slide.title}</h1>
          <p className="lead">{slide.subtitle}</p>
          {presentationMode && <ResearchFrame slide={slide} />}
          <blockquote>{slide.body}</blockquote>
          <div className="tags">{slide.tags.map((x) => <span key={x}>{x}</span>)}</div>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </div>
      );
    case "columns":
      return (
        <SlideLayout
          slide={slide}
          presentationMode={presentationMode}
          evidence={<><Callout>{slide.callout}</Callout><Source interactive={presentationMode}>{displaySource}</Source></>}
        >
          {slide.variant === "why-quantum" ? <WhyQuantumBody slide={slide} /> : <LearningCards items={slide.items} />}
        </SlideLayout>
      );
    case "intersection":
      return (
        <SlideLayout
          slide={slide}
          presentationMode={presentationMode}
          evidence={<><Callout>{slide.callout}</Callout><Source interactive={presentationMode}>{displaySource}</Source></>}
        >
          <div className="intersection">
            <ListPanel data={slide.left} />
            <svg
              className="banking-venn"
              viewBox="0 0 800 350"
              role="img"
              aria-label="Dua lingkaran beririsan: emerging quantum capabilities dan banking activities and infrastructure; irisannya dual relevance for banking"
            >
              <circle
                cx="290"
                cy="173"
                r="155"
                fill="#1b858933"
                stroke="#258b90"
                strokeWidth="2"
              />
              <circle
                cx="510"
                cy="173"
                r="155"
                fill="#da9a3833"
                stroke="#b97c23"
                strokeWidth="2"
              />
              <text x="245" y="155">
                <tspan x="255">Emerging quantum</tspan>
                <tspan x="255" dy="27">
                  capabilities
                </tspan>
                <tspan x="255" dy="38" className="venn-small">
                  Algorithms · computation
                </tspan>
              </text>
              <text x="555" y="155">
                <tspan x="545">Banking activities</tspan>
                <tspan x="545" dy="27">
                  & infrastructure
                </tspan>
                <tspan x="545" dy="38" className="venn-small">
                  Use cases · security
                </tspan>
              </text>
              <text x="400" y="170" className="venn-center">
                <tspan x="400">Dual</tspan>
                <tspan x="400" dy="25">
                  relevance
                </tspan>
              </text>
            </svg>
            <ListPanel data={slide.right} />
          </div>
        </SlideLayout>
      );
    case "split":
      return (
        <SlideLayout
          slide={slide}
          presentationMode={presentationMode}
          evidence={<Source interactive={presentationMode}>{displaySource}</Source>}
        >
          <div className="split">
            <ListPanel data={slide.left} />
            <div className="split-center">{slide.center}</div>
            <ListPanel data={slide.right} accent="orange" />
          </div>
        </SlideLayout>
      );
    case "flow":
      return (
        <SlideLayout
          slide={slide}
          presentationMode={presentationMode}
          evidence={<><Callout>{slide.callout}</Callout><Source interactive={presentationMode}>{displaySource}</Source></>}
        >
          <div className="flow">
            {slide.items.map((x, i) => (
              <div className="flow-wrap" key={x[0]}>
                <article>
                  <TopicIcon text={x[0]} index={i} />
                  <small>{x[0]}</small>
                  <b>{x[1]}</b>
                </article>
                {i < slide.items.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </SlideLayout>
      );
    case "hndl":
      return (
        <SlideLayout
          slide={slide}
          presentationMode={presentationMode}
          evidence={<><Callout>{slide.callout}</Callout><Source interactive={presentationMode}>{displaySource}</Source></>}
        >
          <HndlExplorer items={slide.items} />
        </SlideLayout>
      );
    case "dualflow":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <FlowLane data={slide.top} danger />
          <FlowLane data={slide.bottom} />
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "orbit":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          {presentationMode ? (
            <PresentationOrbit slide={slide} />
          ) : (
            <div className="orbit">
              <div className="orbit-core">{slide.center}</div>
              {slide.items.map((x, i) => (
                <article key={x[0]} style={{ "--i": i }}>
                  <b>{x[0]}</b><span>{x[1]}</span>
                </article>
              ))}
            </div>
          )}
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "cycle":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <Readiness items={slide.items} />
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "inventory":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="inventory">
            <div className="inventory-grid">{slide.items.map((x) => <span key={x}>{x}</span>)}</div>
            <Arrow />
            <strong>{slide.output}</strong>
          </div>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "table":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="table-wrap">
            <table>
              <thead><tr>{slide.headers.map((x) => <th key={x}>{x}</th>)}</tr></thead>
              <tbody>
                {slide.rows.map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={`${i}-${j}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "layers":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="physics-layout">
            {presentationMode ? <PresentationPhysicsFigure /> : <PhysicsFigure />}
            <div className="layers">
              {slide.items.map((x) => (
                <article key={x[0]}>
                  <span>{x[0]}</span>
                  <div><b>{x[1]}</b><p>{x[2]}</p></div>
                </article>
              ))}
            </div>
          </div>
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "pipeline":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="pipeline">
            {slide.groups.map((g, gi) => (
              <section key={g[0]}>
                <h3>{g[0]}</h3>
                <div>
                  {g[1].map((x, i) => (
                    <div className="pipe-wrap" key={x}>
                      <span>{x}</span>
                      {(i < g[1].length - 1 || gi < slide.groups.length - 1) && <Arrow />}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "venn":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          {presentationMode ? (
            <ComprehensiveVenn slide={slide} />
          ) : (
            <div className="venn">
              {slide.items.map((x, i) => <div key={x} className={`venn-${i}`}>{x}</div>)}
              <strong>{slide.center}</strong>
            </div>
          )}
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "mapping":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="mapping">
            {slide.items.map((x) => (
              <div key={x[0]}><b>{x[0]}</b><Arrow /><span>{x[1]}</span></div>
            ))}
          </div>
          <div className="tags wide">{slide.tags.map((x) => <span key={x}>{x}</span>)}</div>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "response":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="response">
            {slide.items.map((x) => <article key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></article>)}
          </div>
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "themes":
      return (
        <>
          <Header slide={slide} interactive={presentationMode} />
          <div className="themes">
            {slide.items.map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
          </div>
          <Callout>{slide.callout}</Callout>
          <Source interactive={presentationMode}>{displaySource}</Source>
        </>
      );
    case "references":
      return (
        <>
          <Header slide={slide} />
          <ol className="references">{slide.items.map((x) => <li key={x}>{x}</li>)}</ol>
          <Callout>{slide.callout}</Callout>
        </>
      );
    default:
      return null;
  }
}

export default function App() {
  const [index, setIndex] = useState(() => {
    const n = Number(location.hash.replace("#slide-", ""));
    return Number.isFinite(n) && n > 0 && n <= slides.length ? n - 1 : 0;
  });
  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const stageRef = useRef(null);
  const touchStart = useRef(null);
  const touchStartY = useRef(null);

  const go = useCallback((next) => {
    setIndex((current) => Math.max(0, Math.min(slides.length - 1, typeof next === "function" ? next(current) : next)));
  }, []);

  useEffect(() => {
    const sync = () => {
      const n = Number(location.hash.replace("#slide-", ""));
      if (Number.isInteger(n) && n >= 1 && n <= slides.length) setIndex(n - 1);
    };
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    history.replaceState(null, "", `#slide-${index + 1}`);
    stageRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      const interactiveTarget = e.target.closest?.("input, button, a, select, textarea");
      if (interactiveTarget || overview || help) {
        if (e.key === "Escape") {
          setOverview(false);
          setHelp(false);
        }
        return;
      }
      if (["ArrowRight", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go((i) => i + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go((i) => i - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(slides.length - 1);
      if (e.key.toLowerCase() === "o") setOverview((v) => !v);
      if (e.key === "?") setHelp((v) => !v);
      if (e.key === "Escape") {
        setOverview(false);
        setHelp(false);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [go, overview, help]);

  const slide = useMemo(() => slides[index], [index]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen support differs by browser; presentation remains usable without it.
    }
  };

  return (
    <main
      className="app presentation-app"
      onTouchStart={(e) => {
        if (e.target.closest("input,button,a")) {
          touchStart.current = null;
          touchStartY.current = null;
          return;
        }
        touchStart.current = e.changedTouches[0].clientX;
        touchStartY.current = e.changedTouches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.35) go((i) => i + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="topbar">
        <button type="button" onClick={() => setOverview(true)} aria-label="Buka daftar slide">☰ <span>Daftar slide</span></button>
        <div className="progress" aria-label={`Slide ${index + 1} dari ${slides.length}`}>
          <i style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
        </div>
        <button type="button" onClick={toggleFullscreen} aria-label="Layar penuh">⛶ <span>Fullscreen</span></button>
      </div>

      <div className="slide-stage" ref={stageRef} tabIndex={0} aria-label="Isi slide, gulir untuk membaca seluruh materi">
        <section className={`slide slide-${slide.kind}`} aria-live="polite">
          <div className="slide-content">
            <SlideContent key={index} slide={slide} presentationMode />
          </div>
          <footer>
            <span>KAJIAN BULAN 1 • QUANTUM COMPUTING & PERBANKAN</span>
            <b>{String(index + 1).padStart(2, "0")}</b>
          </footer>
        </section>
      </div>

      <nav className="controls" aria-label="Navigasi presentasi">
        <button type="button" onClick={() => go((i) => i - 1)} disabled={index === 0} aria-label="Slide sebelumnya">←</button>
        <button type="button" className="counter" onClick={() => setHelp(true)}>{index + 1} / {slides.length}</button>
        <button type="button" onClick={() => go((i) => i + 1)} disabled={index === slides.length - 1} aria-label="Slide berikutnya">→</button>
      </nav>

      {overview && (
        <div className="overlay" role="dialog" aria-modal="true" onClick={() => setOverview(false)}>
          <div className="overview" onClick={(e) => e.stopPropagation()}>
            <header><h2>Daftar slide</h2><button type="button" onClick={() => setOverview(false)}>Tutup ×</button></header>
            <div>
              {slides.map((s, i) => (
                <button
                  type="button"
                  key={`${s.title}-${i}`}
                  className={i === index ? "active" : ""}
                  onClick={() => { go(i); setOverview(false); }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span><b>{s.title}</b>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {help && (
        <div className="overlay" role="dialog" aria-modal="true" onClick={() => setHelp(false)}>
          <div className="help" onClick={(e) => e.stopPropagation()}>
            <h2>Navigasi</h2>
            <p><kbd>←</kbd> <kbd>→</kbd> pindah slide pada laptop.</p>
            <p><kbd>O</kbd> membuka daftar slide.</p>
            <p><kbd>Home</kbd> / <kbd>End</kbd> menuju awal / akhir.</p>
            <p>Mobile/tablet: swipe horizontal pada area kosong atau gunakan tombol bawah.</p>
            <button type="button" onClick={() => setHelp(false)}>Mengerti</button>
          </div>
        </div>
      )}
    </main>
  );
}
