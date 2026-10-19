import { useEffect, useState } from "react";
import { ExternalLink, FileText, MessageSquare, RefreshCw } from "lucide-react";
import { loadReport } from "./reportStorage";
import "./reportOutline.css";

export default function ReportOutline() {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
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
      <div className="report-heading">
        <div>
          <p className="dash-kicker">RESEARCH REPORT</p>
          <h1>Outline laporan quantum banking</h1>
          <p>Baca laporan dan beri komentar pada satu Google Docs yang sama.</p>
        </div>
        <span className="docs-access">
          <FileText size={16} /> Google Docs
        </span>
      </div>
      <section className="docs-controls" aria-label="Akses laporan">
        <div>
          <b>{report?.title || "Dokumen laporan utama"}</b>
          <p>
            Dokumen dibuka langsung melalui Google. Tidak ada permintaan akses
            akun Google kepada aplikasi ini.
          </p>
        </div>
        <div className="docs-actions">
          <button onClick={() => setReload((n) => n + 1)} disabled={loading}>
            <RefreshCw size={17} /> Muat ulang
          </button>
          {report && (
            <a href={report.url} target="_blank" rel="noreferrer">
              <MessageSquare size={17} /> Buka & beri komentar
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>
      {loading && (
        <p role="status" className="docs-empty">
          Menyiapkan tautan laporan…
        </p>
      )}
      {message && (
        <p className="report-message" role="alert">
          {message}{" "}
          <button onClick={() => setReload((n) => n + 1)}>Coba lagi</button>
        </p>
      )}
      {report && (
        <>
          <p className="docs-note">
            Untuk memberi komentar, klik <b>Buka & beri komentar</b>, pilih teks
            di Google Docs, lalu tambahkan komentar. Anda mungkin perlu masuk ke
            Google dan memiliki akses Commenter. Login tersebut dilakukan di
            Google, tanpa memberikan izin akses akun kepada aplikasi ini.
          </p>
          <div className="docs-preview">
            <iframe
              key={`${report.id}-${reload}`}
              title="Pratinjau laporan Google Docs"
              src={report.previewUrl}
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="docs-note">
            Jika pratinjau kosong, meminta login, atau tidak dapat dibuka,
            gunakan{" "}
            <a href={report.url} target="_blank" rel="noreferrer">
              Buka langsung di Google Docs ↗
            </a>
            . Izin dokumen dan pengaturan browser dapat membatasi tampilan di
            dalam halaman. Komentar tersedia melalui Google Docs yang dibuka
            langsung.
          </p>
        </>
      )}
    </div>
  );
}
