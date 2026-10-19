import { useEffect, useMemo, useRef, useState } from "react";
import {
  ExternalLink,
  FileText,
  LogIn,
  LogOut,
  MessageSquare,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  GOOGLE_REPORT_SCOPE,
  loadGoogleIdentity,
  loadReport,
} from "./reportStorage";
import "./reportOutline.css";

function ReportBlock({ block, id }) {
  if (block.type === "table")
    return (
      <div className="docs-table-wrap">
        <table>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {cell.map((item, k) => (
                      <ReportBlock block={item} key={k} />
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  const level = block.style?.match(/^HEADING_([1-6])$/)?.[1];
  const Tag = level
    ? `h${Math.max(2, Number(level))}`
    : block.style === "TITLE"
      ? "h2"
      : "p";
  return (
    <Tag id={id} className={block.bullet ? "docs-bullet" : ""}>
      {block.bullet && "• "}
      {block.text}
    </Tag>
  );
}

export default function ReportOutline() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [oauth, setOauth] = useState(null);
  const [token, setToken] = useState(null);
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [reload, setReload] = useState(0);
  const expiryTimer = useRef(null);
  const generation = useRef(0);
  const mounted = useRef(true);
  useEffect(() => {
    if (clientId)
      loadGoogleIdentity()
        .then((api) => {
          if (mounted.current) setOauth(api);
        })
        .catch((error) => {
          if (mounted.current) setMessage(error.message);
        });
  }, [clientId, reload]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      generation.current += 1;
      clearTimeout(expiryTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!token) return undefined;
    const controller = new AbortController();
    setStatus("loading");
    setMessage("");
    loadReport(token, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setReport(data);
          setStatus("ready");
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setReport(null);
        setStatus("error");
        setMessage(error.message);
        if (error.status === 401) setToken(null);
      });
    return () => controller.abort();
  }, [token, reload]);

  const signIn = () => {
    if (!oauth) return;
    const attempt = ++generation.current;
    setMessage("");
    // Created and requested inside the click handler to preserve popup activation.
    oauth
      .initTokenClient({
        client_id: clientId,
        scope: GOOGLE_REPORT_SCOPE,
        callback: (response) => {
          if (!mounted.current || attempt !== generation.current) return;
          if (
            response.error ||
            !response.access_token ||
            !oauth.hasGrantedAllScopes(
              response,
              ...GOOGLE_REPORT_SCOPE.split(" "),
            )
          ) {
            setMessage(
              "Izin baca Google Docs dan Drive diperlukan untuk membuka laporan.",
            );
            return;
          }
          clearTimeout(expiryTimer.current);
          setReport(null);
          setToken(response.access_token);
          expiryTimer.current = setTimeout(
            () => {
              setToken(null);
              setReport(null);
              setStatus("idle");
              setMessage(
                "Sesi Google berakhir. Masuk kembali untuk melanjutkan.",
              );
            },
            Math.max(1, Number(response.expires_in || 3600) - 30) * 1000,
          );
        },
        error_callback: () => {
          if (mounted.current && attempt === generation.current)
            setMessage(
              "Login dibatalkan atau popup diblokir. Silakan coba lagi.",
            );
        },
      })
      .requestAccessToken({ prompt: "select_account" });
  };
  const signOut = () => {
    generation.current += 1;
    clearTimeout(expiryTimer.current);
    setToken(null);
    setReport(null);
    setStatus("idle");
    setMessage("");
  };
  const items = useMemo(
    () =>
      (report?.tabs || []).flatMap((tab, ti) =>
        tab.blocks.map((block, bi) => ({
          block,
          tab,
          id: `report-${ti}-${bi}`,
        })),
      ),
    [report],
  );
  const headings = items.filter(
    ({ block }) =>
      block.style?.startsWith("HEADING_") &&
      block.text.toLowerCase().includes(query.toLowerCase()),
  );
  const active = items.filter(
    ({ block }) =>
      !query ||
      block.type === "table" ||
      block.text?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="report-workspace docs-workspace">
      <div className="report-heading">
        <div>
          <p className="dash-kicker">RESEARCH REPORT</p>
          <h1>Outline laporan quantum banking</h1>
          <p>Satu dokumen utama untuk membaca kajian dan memberikan masukan.</p>
        </div>
        <span className="docs-access">
          <FileText size={16} /> Google Docs · Baca & komentar
        </span>
      </div>
      <section className="docs-controls" aria-label="Akses laporan">
        <div>
          <b>{report?.title || "Dokumen laporan utama"}</b>
          <p>
            {report
              ? `Terakhir diperbarui: ${report.modifiedTime ? new Date(report.modifiedTime).toLocaleString("id-ID") : "—"}`
              : "Masuk menggunakan akun Google yang telah diberi akses ke laporan."}
          </p>
        </div>
        <div className="docs-actions">
          {!token ? (
            <button onClick={signIn} disabled={!clientId || !oauth}>
              <LogIn size={17} /> Masuk dengan Google
            </button>
          ) : (
            <>
              <button
                onClick={() => setReload((n) => n + 1)}
                disabled={status === "loading"}
              >
                <RefreshCw size={17} /> Muat ulang
              </button>
              <button onClick={signOut}>
                <LogOut size={17} /> Keluar
              </button>
            </>
          )}
          {report && (
            <a href={report.url} target="_blank" rel="noreferrer">
              <MessageSquare size={17} />{" "}
              {report.canComment
                ? "Beri komentar di Google Docs"
                : "Buka Google Docs"}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>
      {!clientId && (
        <p className="report-message" role="status">
          Integrasi Google Docs belum dikonfigurasi. Pengelola perlu memasang
          Google Client ID dan menghubungkan backend laporan.
        </p>
      )}
      {message && (
        <p className="report-message" role="alert">
          {message}{" "}
          <button onClick={() => setReload((n) => n + 1)}>Coba lagi</button>
        </p>
      )}
      {status === "loading" && (
        <p role="status" className="docs-empty">
          Memuat laporan dari Google Docs…
        </p>
      )}
      {report && (
        <>
          <p className="docs-note">
            Isi laporan di aplikasi ini hanya dapat dibaca. Untuk mengomentari
            bagian tertentu, buka Google Docs dan pilih teksnya.{" "}
            {report.canEdit
              ? "Akun Anda memiliki akses editor atau pemilik di Google Docs; untuk pembaca, pengelola perlu memberi akses Commenter."
              : report.canComment
                ? "Akun Anda dapat memberi komentar."
                : "Akun Anda hanya memiliki akses baca. Minta akses Commenter kepada pemilik untuk memberi masukan."}
          </p>
          <div className="docs-grid">
            <aside className="outline-panel">
              <div className="outline-panel-title">
                <FileText size={18} />
                <b>Daftar isi</b>
              </div>
              <label className="outline-search">
                <Search size={16} />
                <input
                  aria-label="Cari isi laporan"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul atau isi…"
                />
              </label>
              <nav aria-label="Outline laporan">
                {headings.map(({ block, tab, id }) => (
                  <a
                    className="docs-heading-link"
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(id)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    key={id}
                  >
                    {block.text}
                    {report.tabs.length > 1 && <small>{tab.title}</small>}
                  </a>
                ))}
                {!headings.length && (
                  <p className="docs-note">
                    {query
                      ? "Judul tidak ditemukan."
                      : "Gunakan gaya Heading di Google Docs untuk menampilkan daftar isi."}
                  </p>
                )}
              </nav>
            </aside>
            <article
              className="docs-paper"
              aria-label="Isi laporan"
              aria-readonly="true"
            >
              {active.length ? (
                active.map(({ block, id, tab }, index) => (
                  <div key={id}>
                    {report.tabs.length > 1 &&
                      (index === 0 || active[index - 1].tab.id !== tab.id) && (
                        <p className="dash-kicker">{tab.title}</p>
                      )}
                    <ReportBlock block={block} id={id} />
                  </div>
                ))
              ) : (
                <p>
                  {query
                    ? "Isi tidak ditemukan."
                    : "Dokumen ini belum berisi teks."}
                </p>
              )}
            </article>
          </div>
          <p className="docs-note">
            Pembaca aplikasi menampilkan teks, heading, dan tabel. Gambar,
            rumus, format lengkap, serta percakapan komentar tersedia di Google
            Docs. Gunakan Muat ulang setelah perubahan dokumen.
          </p>
        </>
      )}
      {!report && status !== "loading" && (
        <div className="docs-empty">
          <FileText size={38} />
          <h2>Baca, tinjau, dan beri masukan</h2>
          <p>
            Laporan dibuka dari satu Google Docs. Akses mengikuti izin akun
            Google Anda.
          </p>
        </div>
      )}
    </div>
  );
}
