import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import "./presentations.css";

// Native Google Slides selected by the owner; shared with anyone as reader.
export const currentPresentation = {
  title: "Kajian Quantum Computing Perbankan — Ringkas",
  url: "https://docs.google.com/presentation/d/1yOX562N23dMO8fg935RixzPQxPEMg6PWgSK6shwxhrY/edit?usp=drivesdk",
  preview: "https://docs.google.com/presentation/d/1yOX562N23dMO8fg935RixzPQxPEMg6PWgSK6shwxhrY/preview",
};

export default function Presentations() {
  const reader = useRef(null);
  const fullscreenButton = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const full = expanded || nativeFullscreen;

  useEffect(() => {
    const sync = () => setNativeFullscreen(document.fullscreenElement === reader.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    if (!full) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event) => {
      if (event.key === "Escape" && expanded) {
        setExpanded(false);
        fullscreenButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", escape);
    };
  }, [full, expanded]);

  const toggleFullscreen = async () => {
    if (expanded) { setExpanded(false); return; }
    setBusy(true);
    setMessage("");
    try {
      if (document.fullscreenElement === reader.current) await document.exitFullscreen();
      else if (reader.current?.requestFullscreen) {
        try { await reader.current.requestFullscreen(); }
        catch { setExpanded(true); }
      } else setExpanded(true);
    } catch {
      setMessage("Tekan Esc untuk keluar dari layar penuh.");
    } finally { setBusy(false); }
  };

  return (
    <section className="presentations-workspace" aria-labelledby="presentations-title">
      <header className="presentations-heading">
        <p>MODE PRESENTASI</p>
        <h1 id="presentations-title">Kajian Quantum Computing</h1>
        <p>Versi ringkas untuk pemaparan. Pilih Bulan 1 untuk membuka slideshow sebelumnya.</p>
      </header>
      <nav className="presentation-editions" aria-label="Versi presentasi">
        <a href="#presentations" aria-current="page">Terbaru · Ringkas</a>
        <a href="#slide-1">Versi Bulan 1</a>
      </nav>
      <div className={`slides-reader${expanded ? " is-expanded" : ""}`} ref={reader}>
        <div className="slides-reader-toolbar">
          <strong>Presentasi terbaru · Ringkas</strong>
          <div>
            <a href={currentPresentation.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} /> Buka Google Slides</a>
            <button type="button" ref={fullscreenButton} onClick={toggleFullscreen} disabled={busy} aria-pressed={full}>
              {full ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
              {full ? "Keluar fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
        <iframe src={currentPresentation.preview} title={currentPresentation.title} allowFullScreen />
        {message && <p role="status">{message}</p>}
      </div>
      <p className="presentation-help">Jika slide tidak muncul, pilih “Buka Google Slides”. Perubahan pada Google Slides akan mengikuti dokumen sumber.</p>
    </section>
  );
}
