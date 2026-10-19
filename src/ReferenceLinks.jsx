import {
  resolveReference,
  shortReference,
  researchSource,
} from "./researchReferences";

export function ReferenceLinks({ items = [] }) {
  const refs = [
    ...new Map(
      items.map((item) => {
        const ref = resolveReference(item);
        return [ref.id, ref];
      }),
    ).values(),
  ];
  if (!refs.length) return null;
  return (
    <aside className="research-sources ieee-excerpt">
      <details>
        <summary>
          Cuplikan referensi IEEE ·{" "}
          {refs.map((ref) => `[${ref.id}]`).join(", ")}
        </summary>
        <ul>
          {refs.map((ref) => (
            <li key={ref.id}>
              <span>[{ref.id}] </span>
              {ref.url ? (
                <a href={ref.url} target="_blank" rel="noreferrer">
                  {shortReference(ref.id)}
                </a>
              ) : (
                shortReference(ref.id)
              )}
            </li>
          ))}
        </ul>
      </details>
      <a href="#module-references">Daftar referensi utuh →</a>
    </aside>
  );
}
export function KajianSourceNote() {
  return (
    <div className="kajian-source-note">
      <b>Acuan utama kajian</b>
      <p>
        Materi mengikuti{" "}
        <a href={researchSource.url} target="_blank" rel="noreferrer">
          {researchSource.title}
        </a>
        , Bab 1–7. Penjelasan konsep, sejarah, dan lab yang lebih lengkap tetap
        tersedia sebagai materi pendukung.
      </p>
      <small>
        Sitasi [1]–[59] mengikuti naskah; nomor berikutnya merujuk sumber
        pendukung. <a href="#module-references">Lihat referensi IEEE →</a>
      </small>
    </div>
  );
}
