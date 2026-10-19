import entries from "./data/references.json";
import { defaultReport } from "./reportConfig";
export const references = entries;
export const researchSource = {
  ...defaultReport,
  retrievedAt: "2026-10-19",
  sourceModifiedAt: "2026-10-19T03:07:15.559Z",
  chapters: 7,
};
const legacyIds = {
  "Herman et al. (2023), Quantum computing for finance, Nature Reviews Physics 5, 450–465": 25,
  "Auer et al. (2024), BIS Papers No. 149 — Quantum computing and the financial system: opportunities and risks": 1,
  "NIST IR 8547 (2024), Initial Public Draft — Transition to Post-Quantum Cryptography Standards": 29,
  "Shor (1997), SIAM Journal on Computing 26, 1484–1509": 11,
  "NIST NCCoE — Migration to Post-Quantum Cryptography": 60,
  "CISA, NSA & NIST (2023) — Quantum-Readiness: Migration to Post-Quantum Cryptography": 3,
  "BIS Papers No. 158 (2025) — Quantum-readiness for the financial system: a roadmap": 2,
  "Bell, Physics 1, 195–200 (1964)": 61,
  "Aspect et al., Physical Review Letters 49, 1804–1807 (1982)": 62,
  "Benioff, J. Stat. Phys. 22, 563–591 (1980)": 63,
  "Feynman, Int. J. Theor. Phys. 21, 467–488 (1982)": 64,
  "Deutsch, Proc. R. Soc. A 400, 97–117 (1985)": 65,
  "Deutsch & Jozsa, Proc. R. Soc. A 439, 553–558 (1992)": 66,
  "Simon, SIAM J. Comput. 26, 1474–1483 (1997)": 67,
  "Grover, STOC (1996)": 14,
  "Vandersypen et al., Nature 414, 883–887 (2001)": 68,
  "Raussendorf & Briegel, Phys. Rev. Lett. 86, 5188 (2001)": 69,
  "Lanting et al., Phys. Rev. X 4, 021041 (2014)": 70,
  "IBM — Quantum Roadmap": 71,
  "Preskill, Quantum 2, 79 (2018)": 4,
  "Arute et al., Nature 574, 505–510 (2019)": 72,
  "Zhong et al., Science 370, 1460–1463 (2020)": 73,
  "Acharya et al., Nature 614, 676–681 (2023)": 74,
  "Acharya et al., Nature 638, 920–926 (2025)": 5,
  "Sivak et al., Nature (2026), Reinforcement learning control of quantum error correction": 9,
  "Sivak & Klimov, Google Quantum AI (22 Juli 2026) — Towards a quantum computer that learns from its errors; tautan paper Nature di dalam sumber": 75,
};
export function reference(id) {
  const item = entries.find((entry) => entry.id === id);
  if (!item) throw new Error("Unknown reference [" + id + "]");
  return item;
}
export function resolveReference(item) {
  if (typeof item === "number") return reference(item);
  return reference(item.id || legacyIds[item.title]);
}
export function referenceNumbers(ids) {
  return ids
    .map((id) => {
      reference(id);
      return "[" + id + "]";
    })
    .join(", ");
}
export function shortReference(id) {
  const { citation } = reference(id);
  const title = citation.match(/[“"]([^”"]+)[”"]/);
  const year = citation.match(/\b(?:19|20)\d{2}\b/);
  return title
    ? citation.split(",")[0] +
        ", “" +
        title[1] +
        ",”" +
        (year ? " " + year[0] + "." : "")
    : citation;
}
