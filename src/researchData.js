// Slide numbers are retained as provenance; modules are the dashboard navigation unit.
export const modules = [
  {
    id: "evolution",
    name: "Perkembangan Quantum Computing",
    start: 2,
    end: 6,
    feature: "8 milestone yang dapat dibuka",
    summary:
      "Dari fondasi korelasi kuantum menuju algoritma, perangkat, dan kontrol koreksi galat.",
  },
  {
    id: "relevance",
    name: "Mengapa Quantum Perlu Mulai Dipahami?",
    start: 7,
    end: 9,
    feature: "Diagram Venn & dua jalur relevansi",
    summary:
      "Hubungkan kemampuan yang muncul dengan aktivitas dan infrastruktur perbankan.",
  },
  {
    id: "cryptography",
    name: "Future Cryptanalytic Threat",
    start: 10,
    end: 12,
    feature: "Eksplorasi algoritma & exposure",
    summary:
      "Pahami CRQC, asumsi matematika, dan fungsi kriptografi yang dapat terdampak.",
  },
  {
    id: "hndl",
    name: "HNDL & Quantum Readiness",
    start: 13,
    end: 18,
    feature: "Skenario waktu, lifecycle & inventory",
    summary:
      "Uji asumsi HNDL dan telusuri persiapan yang dapat dilakukan bank.",
  },
  {
    id: "foundations",
    name: "What Is Actually Quantum?",
    start: 19,
    end: 25,
    feature: "Konsep, algoritma & computing lab",
    summary: "Pelajari state, gates, measurement, dan batas quantum advantage.",
  },
  {
    id: "benchmark",
    name: "Benchmark & Relevansi Indonesia",
    start: 26,
    end: 30,
    feature: "Respons institusi & referensi",
    summary: "Hubungkan kesiapan dengan standar, koordinasi, dan tata kelola.",
  },
];
const doi = (title, id) => ({ title, url: `https://doi.org/${id}` });
export const sources = {
  finance: [
    doi(
      "Herman et al. (2023), Quantum computing for finance, Nature Reviews Physics 5, 450–465",
      "10.1038/s42254-023-00603-1",
    ),
    {
      title:
        "Auer et al. (2024), BIS Papers No. 149 — Quantum computing and the financial system: opportunities and risks",
      url: "https://www.bis.org/publ/bppdf/bispap149.htm",
    },
  ],
  crypto: [
    {
      title:
        "NIST IR 8547 (2024), Initial Public Draft — Transition to Post-Quantum Cryptography Standards",
      url: "https://csrc.nist.gov/pubs/ir/8547/ipd",
    },
    doi(
      "Shor (1997), SIAM Journal on Computing 26, 1484–1509",
      "https://doi.org/10.48550/arXiv.quant-ph/9508027",
    ),
  ],
  readiness: [
    {
      title: "NIST NCCoE — Migration to Post-Quantum Cryptography",
      url: "https://www.nccoe.nist.gov/projects/migration-post-quantum-cryptography",
    },
    {
      title:
        "CISA, NSA & NIST (2023) — Quantum-Readiness: Migration to Post-Quantum Cryptography",
      url: "https://www.cisa.gov/resources-tools/resources/quantum-readiness-migration-post-quantum-cryptography",
    },
    {
      title:
        "BIS Papers No. 158 (2025) — Quantum-readiness for the financial system: a roadmap",
      url: "https://www.bis.org/publ/bppdf/bispap158.htm",
    },
  ],
};
export const milestones = [
  {
    name: "Foundation",
    period: "1964–1982",
    brief:
      "Korelasi kuantum memiliki sifat yang berbeda dari gambaran klasik lokal.",
    detail:
      "Bell merumuskan batas korelasi untuk teori variabel tersembunyi lokal. Eksperimen Aspect dan kolega menguji Bell inequalities dan mendukung prediksi quantum mechanics. Ini fondasi konseptual; bukan demonstrasi komputer kuantum atau komunikasi lebih cepat dari cahaya.",
    refs: [
      doi(
        "Bell, Physics 1, 195–200 (1964)",
        "10.1103/PhysicsPhysiqueFizika.1.195",
      ),
      doi(
        "Aspect et al., Physical Review Letters 49, 1804–1807 (1982)",
        "10.1103/PhysRevLett.49.1804",
      ),
    ],
  },
  {
    name: "Concepts",
    period: "1980–1985",
    brief: "Bagaimana jika komputasi itu sendiri mengikuti quantum mechanics?",
    detail:
      "Benioff memodelkan komputer sebagai sistem quantum mechanical. Feynman mengusulkan simulasi fisika dengan sistem kuantum. Deutsch merumuskan universal quantum computer. Ketiganya menghubungkan hukum fisika dengan model komputasi.",
    refs: [
      doi("Benioff, J. Stat. Phys. 22, 563–591 (1980)", "10.1007/BF01011339"),
      doi(
        "Feynman, Int. J. Theor. Phys. 21, 467–488 (1982)",
        "10.1007/BF02650179",
      ),
      doi(
        "Deutsch, Proc. R. Soc. A 400, 97–117 (1985)",
        "10.1098/rspa.1985.0070",
      ),
    ],
  },
  {
    name: "Algorithms",
    period: "1992–2001",
    brief: "Keunggulan muncul dari algoritma untuk masalah tertentu.",
    detail:
      "Deutsch–Jozsa dan Simon menunjukkan pemisahan dalam model oracle. Shor memberi algoritma polynomial-time untuk factoring dan discrete logarithms; Grover memperbaiki query complexity pencarian tak terstruktur secara kuadratik. Vandersypen mendemonstrasikan factoring 15 memakai NMR; eksperimen kecil ini bukan bukti kemampuan membongkar RSA modern.",
    refs: [
      doi(
        "Deutsch & Jozsa, Proc. R. Soc. A 439, 553–558 (1992)",
        "10.1098/rspa.1992.0167",
      ),
      doi(
        "Simon, SIAM J. Comput. 26, 1474–1483 (1997)",
        "10.1137/S0097539796298637",
      ),
      sources.crypto[1],
      doi("Grover, STOC (1996)", "https://doi.org/10.48550/arXiv.quant-ph/9605043"),
      doi("Vandersypen et al., Nature 414, 883–887 (2001)", "10.1038/414883a"),
    ],
  },
  {
    name: "Architectures",
    period: "2001–2015",
    brief: "Berbagai cara membangun perangkat dan menjalankan komputasi.",
    detail:
      "Measurement-based computation dan quantum annealing memperluas pilihan arsitektur. Bukti entanglement pada prosesor annealing tidak otomatis menunjukkan universal gate-based computing atau practical speedup.",
    refs: [
      doi(
        "Raussendorf & Briegel, Phys. Rev. Lett. 86, 5188 (2001)",
        "10.1103/PhysRevLett.86.5188",
      ),
      doi(
        "Lanting et al., Phys. Rev. X 4, 021041 (2014)",
        "10.1103/PhysRevX.4.021041",
      ),
    ],
  },
  {
    name: "Access",
    period: "2016–2018",
    brief: "Cloud membuka eksperimen; noise tetap membatasi kedalaman circuit.",
    detail:
      "Akses IBM Quantum melalui cloud memperluas penggunaan perangkat nyata. Preskill menyebut era Noisy Intermediate-Scale Quantum (NISQ): perangkat menengah dengan operasi yang belum dikoreksi secara fault-tolerant.",
    refs: [
      {
        title: "IBM — Quantum Roadmap",
        url: "https://www.ibm.com/downloads/documents/us-en/1443d5cda24021e4",
      },
      doi("Preskill, Quantum 2, 79 (2018)", "10.22331/q-2018-08-06-79"),
    ],
  },
  {
    name: "Advantage",
    period: "2019–2020",
    brief: "Benchmark khusus menunjukkan potensi melampaui metode klasik.",
    detail:
      "Sycamore menguji random circuit sampling; Jiuzhang menguji Gaussian boson sampling. Klaim keunggulan terikat tugas dan pembanding klasik saat itu. Ini bukan demonstrasi keuntungan bisnis perbankan; perbaikan algoritma klasik dapat mengubah perbandingan.",
    refs: [
      doi(
        "Arute et al., Nature 574, 505–510 (2019)",
        "10.1038/s41586-019-1666-5",
      ),
      doi(
        "Zhong et al., Science 370, 1460–1463 (2020)",
        "10.1126/science.abe8770",
      ),
    ],
  },
  {
    name: "Error Suppression",
    period: "2023–2025",
    brief: "Banyak physical qubits melindungi informasi logical qubit.",
    detail:
      "Eksperimen surface code memperlihatkan bahwa peningkatan ukuran kode dapat menekan logical error ketika operasi berada pada rezim yang sesuai. Hasil below-threshold memperkuat jalur menuju fault tolerance; bukan berarti noise hilang atau CRQC sudah tersedia.",
    refs: [
      doi(
        "Acharya et al., Nature 614, 676–681 (2023)",
        "10.1038/s41586-022-05434-1",
      ),
      doi(
        "Acharya et al., Nature 638, 920–926 (2025)",
        "10.1038/s41586-024-08449-y",
      ),
    ],
  },
  {
    name: "Adaptive Stability",
    period: "2026",
    brief: "Kontrol menyesuaikan diri terhadap perubahan kondisi perangkat.",
    detail:
      "Reinforcement learning menggunakan sinyal deteksi galat untuk menyesuaikan kontrol selama QEC berjalan. Eksperimen Sivak dan kolega menangani hardware drift. Stabilitas quantum memory yang meningkat tetap berbeda dari menjalankan algoritma kriptanalisis skala besar.",
    refs: [
      doi(
        "Sivak et al., Nature (2026), Reinforcement learning control of quantum error correction",
        "10.1038/s41586-026-10759-2",
      ),
      {
        title:
          "Sivak & Klimov, Google Quantum AI (22 Juli 2026) — Towards a quantum computer that learns from its errors; tautan paper Nature di dalam sumber",
        url: "https://research.google/blog/towards-a-quantum-computer-that-learns-from-its-errors/",
      },
    ],
  },
];
