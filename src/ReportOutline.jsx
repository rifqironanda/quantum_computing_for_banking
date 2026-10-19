import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Maximize2,
  MessageSquare,
  Minimize2,
  RefreshCw,
} from "lucide-react";
import { loadReport } from "./reportStorage";
import "./reportOutline.css";

export default function ReportOutline() {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [screenBusy, setScreenBusy] = useState(false);
  const [screenMessage, setScreenMessage] = useState("");
  const readerRef = useRef(null);
  const fullscreenButton = useRef(null);
  const alive = useRef(true);
  const isFullscreen = expanded || nativeFullscreen;

  useEffect(() => {
    alive.current = true;
    const sync = () => {
      if (alive.current)
        setNativeFullscreen(document.fullscreenElement === readerRef.current);
    };
    document.addEventListener("fullscreenchange", sync);
    return () => {
      alive.current = false;
      document.removeEventListener("fullscreenchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event) => {
      if (event.key === "Escape" && expanded) {
        setExpanded(false);
        setScreenMessage("");
        fullscreenButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", escape);
    };
  }, [isFullscreen, expanded]);

  const toggleFullscreen = async () => {
    setScreenMessage("");
    if (expanded) {
      setExpanded(false);
      fullscreenButton.current?.focus();
      return;
    }
    setScreenBusy(true);
    try {
      if (document.fullscreenElement === readerRef.current) {
        await document.exitFullscreen();
      } else if (readerRef.current?.requestFullscreen) {
        try {
          await readerRef.current.requestFullscreen();
        } catch {
          if (alive.current) {
            setExpanded(true);
            setScreenMessage(
              "Mode baca diperbesar. Gunakan Keluar fullscreen untuk kembali.",
            );
          }
        }
      } else {
        setExpanded(true);
      }
    } catch {
      if (alive.current)
        setScreenMessage("Tekan Esc untuk keluar dari fullscreen.");
    } finally {
      if (alive.current) setScreenBusy(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setMessage("");
    setReport(null);
    loadReport(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setReport(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setMessage(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reload]);

  return (
    <div className="report-workspace docs-workspace">
      <header className="report-heading">
        <p className="report-eyebrow">Outline laporan quantum banking</p>
        <h1>{report?.title || "Laporan penelitian"}</h1>
        <p className="report-intro">
          Baca kajian dengan leluasa. Buka Google Docs untuk memberi komentar
          pada teks.
        </p>
      </header>
      <section
        ref={readerRef}
        className={`docs-reader${expanded ? " is-expanded" : ""}`}
        aria-label="Pembaca laporan"
      >
        <div className="docs-toolbar">
          <span className="docs-reader-label">
            {isFullscreen ? "Mode baca" : "Dokumen utama"}
          </span>
          <div className="docs-actions">
            <button
              onClick={() => setReload((n) => n + 1)}
              disabled={loading}
              aria-label="Muat ulang laporan"
              title="Muat ulang laporan"
            >
              <RefreshCw size={18} />
              <span className="docs-refresh-label">Muat ulang</span>
            </button>
            <button
              ref={fullscreenButton}
              onClick={toggleFullscreen}
              disabled={screenBusy || (!report && !isFullscreen)}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              {isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
            </button>
            {report && (
              <a
                className="docs-comment"
                href={report.url}
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare size={18} />
                Beri komentar
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
        {screenMessage && (
          <p className="docs-screen-message" role="status">
            {screenMessage}
          </p>
        )}
        {loading && (
          <p role="status" className="docs-empty">
            Menyiapkan laporan…
          </p>
        )}
        {message && (
          <p className="report-message" role="alert">
            {message}{" "}
            <button onClick={() => setReload((n) => n + 1)}>Coba lagi</button>
          </p>
        )}
        {report && (
          <iframe
            key={`${report.id}-${reload}`}
            title="Pratinjau laporan Google Docs"
            src={report.previewUrl}
            referrerPolicy="no-referrer"
          />
        )}
      </section>
      {report && (
        <details className="docs-help">
          <summary>Dokumen tidak tampil atau ingin memberi komentar?</summary>
          <p>
            Klik <b>Beri komentar</b> untuk memilih teks dan menulis komentar di
            Google Docs. Login langsung di Google mungkin diperlukan. Aplikasi
            ini tidak meminta akses ke akun Anda.
          </p>
          <p>
            Jika pratinjau terhalang pengaturan browser,{" "}
            <a href={report.url} target="_blank" rel="noreferrer">
              Buka langsung di Google Docs ↗
            </a>
            .
          </p>
        </details>
      )}
    </div>
  );
}
