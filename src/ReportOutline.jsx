import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bold,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  Download,
  FileText,
  Italic,
  List,
  ListOrdered,
  LogIn,
  LogOut,
  Redo2,
  Save,
  Search,
  Undo2,
} from "lucide-react";
import outlineMarkdown from "./data/report-outline.md?raw";
import { reportStorage } from "./reportStorage";
import "./reportOutline.css";

const EMPTY_DOC = { content: "", status: "draft", revision: 0 };
const ALLOWED_TAGS = new Set([
  "P", "BR", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI",
  "H2", "H3", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
]);

function slugify(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function inlineMarkdown(value) {
  return value
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = markdown.trim().split("\n");
  let html = "", list = null;
  const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line || line === "---") { closeList(); continue; }
    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|?[\s:|-]+\|$/)) {
      closeList();
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(lines[index].trim().replace(/^\||\|$/g, "").split("|").map((x) => x.trim()));
        index += 1;
      }
      const head = rows[0] || [], body = rows.slice(2);
      html += `<table><thead><tr>${head.map((x) => `<th>${inlineMarkdown(x)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((x) => `<td>${inlineMarkdown(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      index -= 1;
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)/);
    const ordered = line.match(/^\d+\.\s+(.+)/);
    if (bullet || ordered) {
      const type = bullet ? "ul" : "ol";
      if (list !== type) { closeList(); html += `<${type}>`; list = type; }
      html += `<li>${inlineMarkdown((bullet || ordered)[1])}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inlineMarkdown(line)}</p>`;
  }
  closeList();
  return html || "<p><br></p>";
}

function parseOutline(markdown) {
  const nodes = [];
  let current = null;
  markdown.split("\n").forEach((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      if (current) nodes.push(current);
      const title = match[2].trim();
      current = {
        id: slugify(title), title, level: match[1].length,
        number: title.match(/^([\d.]+)/)?.[1]?.replace(/\.$/, "") || "",
        markdown: "",
      };
    } else if (current) current.markdown += `${line}\n`;
  });
  if (current) nodes.push(current);
  const parents = [];
  return nodes.map((node, index) => {
    while (parents.length && parents.at(-1).level >= node.level) parents.pop();
    const parsed = {
      ...node,
      index,
      parentId: parents.at(-1)?.id || null,
      initialHtml: markdownToHtml(node.markdown),
    };
    parents.push(parsed);
    return parsed;
  });
}

function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  [...root.querySelectorAll("*")].forEach((element) => {
    if (!ALLOWED_TAGS.has(element.tagName)) element.replaceWith(...element.childNodes);
    else [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));
  });
  return root.innerHTML;
}

function htmlToText(value) {
  const node = document.createElement("div");
  node.innerHTML = value;
  return node.textContent || "";
}

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = name; anchor.click();
  URL.revokeObjectURL(url);
}

export default function ReportOutline() {
  const nodes = useMemo(() => parseOutline(outlineMarkdown), []);
  const chapters = useMemo(() => nodes.filter((node) => node.level === 2), [nodes]);
  const [selectedId, setSelectedId] = useState(nodes[0]?.id);
  const [documents, setDocuments] = useState({});
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(() => new Set(chapters.map((node) => node.id)));
  const [saveState, setSaveState] = useState("loading");
  const [storageMode, setStorageMode] = useState("local");
  const [hydrated, setHydrated] = useState(false);
  const [authSession, setAuthSession] = useState(null);
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const editorRef = useRef(null);
  const selected = nodes.find((node) => node.id === selectedId) || nodes[0];
  const activeDocument = documents[selected?.id] || { ...EMPTY_DOC, content: selected?.initialHtml || "" };

  const hydrate = async () => {
    setSaveState("loading");
    const { snapshot, mode, session, error } = await reportStorage.load(nodes);
    setDocuments(snapshot?.sections || {});
    setStorageMode(mode);
    setAuthSession(session);
    setHydrated(true);
    setSaveState("saved");
    setAuthMessage(error ? `Sinkronisasi tertunda: ${error.message}` : "");
  };

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!editorRef.current || !selected) return;
    editorRef.current.innerHTML = sanitizeHtml(activeDocument.content || selected.initialHtml);
  }, [selectedId, hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hydrated || saveState !== "dirty") return undefined;
    const timer = setTimeout(() => saveAll(), 800);
    return () => clearTimeout(timer);
  }, [documents, hydrated, saveState]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDocument = (node) => documents[node.id] || { ...EMPTY_DOC, content: node.initialHtml };
  const visibleChapters = chapters.filter((chapter) => {
    if (!query.trim()) return true;
    const start = chapter.index, end = chapters.find((x) => x.index > start)?.index ?? nodes.length;
    return nodes.slice(start, end).some((node) => `${node.title} ${htmlToText(getDocument(node).content)}`.toLowerCase().includes(query.toLowerCase()));
  });
  const completion = Math.round((nodes.filter((node) => getDocument(node).status === "complete").length / nodes.length) * 100);
  const wordCount = htmlToText(activeDocument.content).trim().split(/\s+/).filter(Boolean).length;

  const updateActive = (patch) => {
    setDocuments((current) => ({
      ...current,
      [selected.id]: { ...getDocument(selected), ...patch, revision: getDocument(selected).revision + 1 },
    }));
    setSaveState("dirty");
  };
  const saveAll = async () => {
    setSaveState("saving");
    const completeSections = Object.fromEntries(nodes.map((node) => [node.id, getDocument(node)]));
    const result = await reportStorage.save(
      { sections: completeSections, outlineVersion: 1 },
      nodes,
    );
    setDocuments(result.snapshot?.sections || completeSections);
    setStorageMode(result.mode);
    setAuthSession(result.session);
    setAuthMessage(result.error ? `Sinkronisasi tertunda: ${result.error.message}` : "");
    setSaveState("saved");
  };
  const submitAuth = async (event) => {
    event.preventDefault();
    setAuthBusy(true);
    setAuthMessage("");
    try {
      if (authMode === "signup") {
        const data = await reportStorage.signUp(email, password);
        if (!data.session) {
          setAuthMessage("Akun dibuat. Periksa email untuk konfirmasi sebelum masuk.");
          return;
        }
      } else {
        await reportStorage.signIn(email, password);
      }
      setPassword("");
      await hydrate();
    } catch (error) {
      setAuthMessage(error.message);
    } finally {
      setAuthBusy(false);
    }
  };
  const signOut = async () => {
    setAuthBusy(true);
    try {
      await reportStorage.signOut();
      setAuthSession(null);
      await hydrate();
    } catch (error) {
      setAuthMessage(error.message);
    } finally {
      setAuthBusy(false);
    }
  };
  const runCommand = (command, value) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateActive({ content: sanitizeHtml(editorRef.current.innerHTML) });
  };
  const selectNode = (node) => {
    setSelectedId(node.id);
    if (node.level === 2) setExpanded((value) => new Set(value).add(node.id));
  };
  const exportReport = () => {
    const payload = nodes.map((node) => ({
      id: node.id, title: node.title, level: node.level,
      status: getDocument(node).status, contentHtml: getDocument(node).content,
    }));
    download("quantum-banking-report.json", JSON.stringify({ reportId: reportStorage.id, sections: payload }, null, 2), "application/json");
  };

  return (
    <div className="report-workspace">
      <div className="report-heading">
        <div>
          <p className="dash-kicker">REPORT WORKSPACE</p>
          <h1>Outline laporan quantum banking</h1>
          <p>Susun, edit, dan pantau 10 bab kajian dalam satu ruang kerja terstruktur.</p>
        </div>
        <div className="report-connection">
          <div className={`storage-badge ${storageMode}`}>
            <Database size={17} />
            <span>{storageMode === "database" ? "Supabase tersambung" : storageMode === "offline" ? "Offline · tersimpan lokal" : storageMode === "auth-required" ? "Masuk untuk sinkronisasi" : "Penyimpanan lokal"}</span>
          </div>
          {authSession && <div className="report-user"><span>{authSession.user.email}</span><button onClick={signOut} disabled={authBusy}><LogOut /> Keluar</button></div>}
        </div>
      </div>

      <section className="report-summary" aria-label="Ringkasan laporan">
        <div><span>Bab utama</span><b>{chapters.length}</b></div>
        <div><span>Total bagian</span><b>{nodes.length}</b></div>
        <div><span>Progress selesai</span><b>{completion}%</b></div>
        <div className="report-progress"><span><i style={{ width: `${completion}%` }} /></span><small>{nodes.filter((node) => getDocument(node).status === "complete").length} bagian selesai</small></div>
      </section>

      {reportStorage.isConfigured && !authSession && (
        <form className="report-auth" onSubmit={submitAuth}>
          <div><LogIn /><span><b>{authMode === "signin" ? "Masuk ke report workspace" : "Buat akun report workspace"}</b><small>Gunakan akun Supabase untuk menyimpan dan membuka laporan lintas perangkat.</small></span></div>
          <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
          <input type="password" autoComplete={authMode === "signin" ? "current-password" : "new-password"} required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          <button type="submit" disabled={authBusy}>{authBusy ? "Memproses…" : authMode === "signin" ? "Masuk" : "Daftar"}</button>
          <button type="button" className="auth-switch" onClick={() => { setAuthMode(authMode === "signin" ? "signup" : "signin"); setAuthMessage(""); }}>{authMode === "signin" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}</button>
        </form>
      )}
      {authMessage && <p className="report-message" role="status">{authMessage}</p>}

      <div className="report-grid">
        <aside className="outline-panel">
          <div className="outline-panel-title"><FileText size={18} /><b>Struktur laporan</b></div>
          <label className="outline-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari bab atau isi…" /></label>
          <nav aria-label="Outline laporan">
            {visibleChapters.map((chapter) => {
              const start = chapter.index, end = chapters.find((x) => x.index > start)?.index ?? nodes.length;
              const children = nodes.slice(start + 1, end).filter((node) => !query || `${node.title} ${htmlToText(getDocument(node).content)}`.toLowerCase().includes(query.toLowerCase()));
              const isOpen = expanded.has(chapter.id) || Boolean(query);
              return <div className="outline-chapter" key={chapter.id}>
                <div className={selectedId === chapter.id ? "selected" : ""}>
                  <button className="chapter-toggle" aria-label={`${isOpen ? "Tutup" : "Buka"} ${chapter.title}`} onClick={() => setExpanded((value) => { const next = new Set(value); isOpen ? next.delete(chapter.id) : next.add(chapter.id); return next; })}>{isOpen ? <ChevronDown /> : <ChevronRight />}</button>
                  <button className="chapter-name" onClick={() => selectNode(chapter)}>{chapter.title}</button>
                </div>
                {isOpen && <div className="outline-children">{children.map((node) => <button key={node.id} className={selectedId === node.id ? "selected" : ""} style={{ paddingLeft: `${12 + (node.level - 3) * 14}px` }} onClick={() => selectNode(node)}><span>{node.number || "•"}</span>{node.title.replace(/^([\d.]+)\s*/, "")}</button>)}</div>}
              </div>;
            })}
          </nav>
        </aside>

        <section className="document-panel">
          <div className="document-topline">
            <div><span>{selected?.level === 2 ? "BAB" : "BAGIAN"}</span><b>{selected?.title}</b></div>
            <div className={`save-indicator ${saveState}`}>{saveState === "saving" ? "Menyimpan…" : saveState === "dirty" ? "Belum tersimpan" : <><Check size={14} /> Tersimpan</>}</div>
          </div>
          <div className="editor-toolbar" role="toolbar" aria-label="Format dokumen">
            <button title="Bold" onClick={() => runCommand("bold")}><Bold /></button>
            <button title="Italic" onClick={() => runCommand("italic")}><Italic /></button>
            <span />
            <button title="Bullet list" onClick={() => runCommand("insertUnorderedList")}><List /></button>
            <button title="Numbered list" onClick={() => runCommand("insertOrderedList")}><ListOrdered /></button>
            <span />
            <button title="Undo" onClick={() => runCommand("undo")}><Undo2 /></button>
            <button title="Redo" onClick={() => runCommand("redo")}><Redo2 /></button>
            <button className="toolbar-save" onClick={saveAll}><Save /> Simpan</button>
          </div>
          <div className="document-canvas">
            <div className="paper-heading"><small>{selected?.number ? `BAGIAN ${selected.number}` : "OUTLINE LAPORAN"}</small><h2>{selected?.title.replace(/^([\d.]+)\s*/, "")}</h2></div>
            <div ref={editorRef} className="rich-editor" contentEditable suppressContentEditableWarning spellCheck="true" aria-label={`Editor ${selected?.title}`} onInput={(event) => updateActive({ content: sanitizeHtml(event.currentTarget.innerHTML) })} />
          </div>
          <footer className="document-status"><span>{wordCount} kata</span><span>Revisi {activeDocument.revision}</span><span>Autosave aktif</span></footer>
        </section>

        <aside className="report-meta-panel">
          <div><span>STATUS BAGIAN</span><select value={activeDocument.status} onChange={(event) => updateActive({ status: event.target.value })}><option value="draft">Draft</option><option value="review">Perlu review</option><option value="complete">Selesai</option></select></div>
          <div><span>WORKFLOW</span><ol><li className="active">Tulis outline</li><li>Lengkapi bukti</li><li>Review substansi</li><li>Finalisasi</li></ol></div>
          <div className="database-card"><Database /><b>{storageMode === "database" ? "Tersinkron ke Supabase" : "Local-first workspace"}</b><p>{storageMode === "database" ? "Isi, status, dan revisi tersimpan pada PostgreSQL dengan kontrol akses RLS." : "Perubahan tetap disimpan lokal. Login diperlukan untuk sinkronisasi database lintas perangkat."}</p><a href="https://github.com/rifqironanda/quantum_computing_for_banking/blob/main/docs/DATABASE_ARCHITECTURE.md" target="_blank" rel="noreferrer">Lihat arsitektur ↗</a></div>
          <button className="export-report" onClick={exportReport}><Download /> Export JSON</button>
        </aside>
      </div>
    </div>
  );
}
