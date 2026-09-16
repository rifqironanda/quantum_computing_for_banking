const refs = {
  evolution:
    "Bell (1964); Aspect et al. (1982); Benioff (1980); Feynman (1982); Deutsch (1985); Shor (1997); Arute et al. (2019); Acharya et al. (2023, 2025).",
  finance:
    "Herman et al. (2023), Nature Reviews Physics; Auer et al. (2024), BIS Papers No. 149.",
  risk: "NIST IR 8547 (2024); CISA, NSA & NIST (2023); BIS Project Leap Phase 1–2 (2023–2025).",
  readiness:
    "NIST CSWP 39 (2025); NIST NCCoE; G7 Cyber Expert Group (2024); BIS Papers No. 158 (2025).",
};

export const slides = [
  {
    kind: "cover",
    eyebrow: "RESEARCH BRIEFING • BULAN 1",
    title: "Quantum Computing pada Sektor Perbankan",
    subtitle: "Perkembangan, Konsep, Risiko Awal, dan International Benchmark",
    note: "Fondasi evidence-based untuk memahami peluang, risiko, dan tantangan perbankan Indonesia.",
  },
  {
    kind: "section",
    kicker: "BAGIAN 01",
    title: "The Evolution of Quantum Computing",
    subtitle:
      "Quantum Information Foundations menuju Adaptive Error Correction",
  },
  {
    kind: "timeline",
    title: "Alur Perkembangan dan Penjelasan",
    subtitle:
      "Perjalanan ilmiah dan teknologi yang membentuk komputasi kuantum modern.",
    items: [
      ["01", "Foundations", "Dasar informasi kuantum"],
      ["02", "Concept", "Ide dan bukti konsep"],
      ["03", "Algorithms", "Algoritma kuantum"],
      ["04", "Architectures", "Desain perangkat"],
      ["05", "Access", "Cloud dan NISQ"],
      ["06", "Advantage", "Tugas tertentu"],
      ["07", "Error Suppression", "Logical qubit"],
      ["08", "Adaptive Stability", "Kontrol koreksi galat"],
    ],
    source: refs.evolution,
  },
  {
    kind: "milestones",
    title: "Milestones 01–04",
    subtitle: "Fondasi hingga Diversifikasi Arsitektur • 1964–2015",
    items: [
      [
        "1964–1980",
        "Quantum Information Foundations",
        "Bell • Aspect",
        "Korelasi kuantum nonklasik dibuktikan secara teoretis dan eksperimental.",
      ],
      [
        "1981–1991",
        "The Quantum Computer Concept",
        "Benioff • Feynman • Deutsch",
        "Komputasi dirumuskan sebagai proses yang bekerja berdasarkan quantum mechanics.",
      ],
      [
        "1992–2001",
        "Algorithms & Laboratory Proofs",
        "Deutsch–Jozsa • Simon • Shor • Grover",
        "Keunggulan algoritmik ditemukan dan diuji dalam eksperimen berskala kecil.",
      ],
      [
        "2001–2015",
        "Architecture Diversification",
        "Raussendorf–Briegel • D-Wave",
        "Berbagai arsitektur dikembangkan; komersialisasi awal mulai terlihat.",
      ],
    ],
    source: refs.evolution,
  },
  {
    kind: "milestones",
    title: "Milestones 05–08",
    subtitle:
      "Dari akses cloud hingga kontrol adaptif koreksi error • 2016–2026",
    items: [
      [
        "2016–2018",
        "Cloud Access & NISQ",
        "IBM Quantum • Preskill",
        "Cloud memperluas eksperimen, tetapi physical qubit masih rentan terhadap noise.",
      ],
      [
        "2019–2020",
        "Quantum Advantage",
        "Google Sycamore • USTC Jiuzhang",
        "Perangkat NISQ mengungguli metode klasik pada tugas tertentu.",
      ],
      [
        "2021–2025",
        "QEC & Logical Qubits",
        "Google Quantum AI • Acharya et al.",
        "QEC memakai banyak physical qubit untuk melindungi sebuah logical qubit.",
      ],
      [
        "Now",
        "Adaptive QEC Control",
        "Sivak et al.",
        "Kontrol adaptif menjaga QEC tetap efektif saat hardware mengalami drift.",
      ],
    ],
    source: refs.evolution,
  },
  {
    kind: "statement",
    title: "The Evolution of Quantum Computing",
    subtitle:
      "Dari Quantum Information Foundations menuju Adaptive Error Correction",
    body: "Quantum computing telah berkembang dari kemungkinan teoretis menuju quantum advantage pada tugas tertentu dan logical qubit yang semakin andal—tetapi belum mencapai large-scale fault-tolerant quantum computing.",
    tags: ["Algorithms", "Architectures", "Error correction", "Adaptive control"],
    source: refs.evolution,
  },
  {
    kind: "columns",
    title: "Mengapa Quantum Perlu Mulai Dipahami?",
    items: [
      [
        "01",
        "Technological Progress",
        "Kemajuan kini dinilai melalui fidelity, error correction, logical error suppression, dan computational scale.",
      ],
      [
        "02",
        "Computational Frontier",
        "Model komputasi berbeda dapat memberi keuntungan pada kelas masalah tertentu—bukan untuk semua kebutuhan.",
      ],
      [
        "03",
        "Banking Intersection",
        "Computational use cases dan security dependencies perbankan beririsan dengan perkembangan quantum computing.",
      ],
    ],
    callout: "UNDERSTAND EARLY ≠ ADOPT IMMEDIATELY",
    source: refs.finance,
  },
  {
    kind: "intersection",
    title: "Quantum–Banking Intersection",
    left: {
      title: "Emerging Quantum Capabilities",
      items: [
        "Optimisation",
        "Simulation",
        "Stochastic modelling",
        "Sampling & estimation",
        "Selected machine-learning problems",
      ],
    },
    right: {
      title: "Banking Activities & Infrastructure",
      items: [
        "Financial modelling",
        "Risk analysis",
        "Portfolio & asset management",
        "Digital transactions",
        "Security & trust infrastructure",
      ],
    },
    center: "Dual relevance for banking",
    callout:
      "Irisan membentuk dua jalur analisis: Potential Benefits dan Emerging Threats.",
    source: refs.finance,
  },
  {
    kind: "split",
    title: "Dual Relevance",
    subtitle:
      "Possible computational advantage dan perubahan security assumptions perlu dianalisis secara terpisah.",
    left: {
      title: "Potential Benefits",
      items: [
        "Portfolio optimisation",
        "Risk modelling",
        "Financial simulation",
        "Derivatives pricing",
        "Selected financial analytics",
      ],
    },
    right: {
      title: "Emerging Risk Implications",
      items: [
        "Future cryptanalytic threat",
        "Adoption and model risk",
        "Transition and interoperability risk",
      ],
    },
    center:
      "Sebagian besar financial use cases masih prospective atau research-stage.",
    source: refs.finance,
  },
  {
    kind: "flow",
    title: "Future Cryptanalytic Threat",
    subtitle:
      "Future CRQC dapat mengubah asumsi keamanan Public-Key Cryptography.",
    items: [
      ["Future capability", "CRQC + Shor at relevant scale"],
      ["Mathematical assumptions", "Integer factorisation • discrete logarithm"],
      ["Current schemes", "RSA • DH • ECC • ECDH • ECDSA"],
      ["Different impact", "Symmetric cryptography dan hash terdampak berbeda"],
    ],
    callout:
      "Quantum cryptanalytic threat bersifat algorithm-specific dan capability-dependent.",
    source: refs.risk,
  },
  {
    kind: "flow",
    title: "Existing Cryptographic Dependency",
    subtitle: "Menghubungkan future threat dengan banking infrastructure.",
    items: [
      ["Banking digital infrastructure", "Payments • APIs • authentication"],
      ["Security & trust functions", "Confidentiality • integrity • identity"],
      ["Public-key cryptography", "Key establishment • digital signatures"],
      ["Potential dependency", "Systems yang perlu diinventarisasi"],
    ],
    callout:
      "Bottom line: ancaman masa depan relevan karena infrastruktur hari ini masih bergantung pada fungsi public-key.",
    source: refs.risk,
  },
  {
    kind: "columns",
    title: "Conditional Cryptographic Exposure",
    subtitle: "Exposure bergantung pada deployment, function, dan data.",
    items: [
      [
        "INPUT 1",
        "Actual Deployment",
        "System, protocol, hardware, software, service, dan third-party.",
      ],
      [
        "INPUT 2",
        "Cryptographic Function",
        "Confidentiality, key establishment, authentication, integrity, dan digital signatures.",
      ],
      [
        "INPUT 3",
        "Data & System Characteristics",
        "Data sensitivity, secrecy lifetime, criticality, interception, dan dependency.",
      ],
    ],
    callout: "Tanpa inventory, exposure hanya berupa dugaan.",
    source: refs.risk,
  },
  {
    kind: "hndl",
    title: "Harvest Now, Decrypt Later",
    subtitle: "Present Capture, Future Impact",
    items: [
      ["1", "Encrypted sensitive data"],
      ["2", "Intercept or acquire"],
      ["3", "Retain ciphertext"],
      ["4", "CRQC capability matures"],
      ["5", "Potential decryption"],
    ],
    formula: "X + Y > Z",
    formulaNote: "masa kerahasiaan data + waktu migrasi > waktu menuju CRQC",
    callout:
      "Migrasi di masa depan tidak menghapus ciphertext yang sudah direkam hari ini.",
    source: refs.risk,
  },
  {
    kind: "dualflow",
    title: "From HNDL to Quantum Readiness",
    top: {
      label: "Adversary",
      items: ["Capture", "Store", "Potential future decryption"],
    },
    bottom: {
      label: "Bank",
      items: ["Identify exposure", "Plan", "Test", "Migrate"],
    },
    callout: "Urgensi dipengaruhi masa kerahasiaan data dan waktu migrasi.",
    source: refs.risk,
  },
  {
    kind: "orbit",
    title: "What Will We Do?",
    subtitle:
      "Quantum readiness mencakup pengelolaan risiko, perubahan teknologi, dan koordinasi organisasi.",
    center: "Quantum Readiness",
    items: [
      ["People", "Pemahaman & tanggung jawab"],
      ["Technology", "Inventory & migration path"],
      ["Policies & Processes", "Prioritas & rencana perubahan"],
      ["Coordination", "Vendor & ekosistem"],
    ],
    source: refs.readiness,
  },
  {
    kind: "cycle",
    title: "Quantum Readiness Lifecycle",
    subtitle: "Persiapan, pelaksanaan, dan evaluasi berkelanjutan.",
    items: [
      "Govern & build awareness",
      "Discover & inventory",
      "Assess & prioritise",
      "Plan & coordinate",
      "Pilot & test",
      "Migrate in phases",
      "Validate & assure",
      "Monitor & remain agile",
    ],
    callout: "Governance • Vendor coordination • Continuous monitoring",
    source: refs.readiness,
  },
  {
    kind: "inventory",
    title: "Why Inventory Comes First",
    subtitle:
      "Prioritas migrasi memerlukan pemahaman lokasi, fungsi, dan dependensi kriptografi.",
    items: [
      "Algorithms • keys • certificates",
      "Applications • protocols • libraries",
      "HSM/KMS • third-party dependencies",
      "System owner",
      "Business function",
      "Data protected",
      "Migration dependency",
    ],
    output: "Cryptographic inventory",
    source: refs.readiness,
  },
  {
    kind: "table",
    title: "Risk-Based Prioritisation",
    subtitle:
      "Urutan migrasi mengikuti fungsi kriptografi, umur kerahasiaan data, dan dampak gangguan.",
    headers: ["Exposure", "Mechanism", "Consideration"],
    rows: [
      [
        "Long-lived confidentiality",
        "HNDL",
        "Masa kerahasiaan dan perlindungan key establishment",
      ],
      [
        "Authentication & digital signatures",
        "Forgery after capability matures",
        "Identitas, certificates, dan software integrity",
      ],
      [
        "Critical services & dependencies",
        "Migration complexity",
        "Criticality, interoperability, dan vendor readiness",
      ],
    ],
    source: refs.readiness,
  },
  {
    kind: "layers",
    title: "What Is Actually Quantum?",
    subtitle:
      "Quantum computing menggunakan aturan quantum mechanics untuk memproses informasi.",
    items: [
      ["1", "Physical Systems", "Sistem fisik menunjukkan perilaku quantum."],
      ["2", "Quantum Mechanics", "State, evolution, dan measurement menjelaskan perilaku."],
      ["3", "Quantum Computing", "Qubits, gates, dan circuits memanfaatkan aturan tersebut."],
    ],
    callout: "Aturan komputasi, bukan teknologi pemasaran.",
    source: refs.evolution,
  },
  {
    kind: "columns",
    title: "From Quantum States to Computation",
    items: [
      ["01", "Superposition", "State memiliki amplitudo pada basis yang dipilih."],
      ["02", "Entanglement", "State gabungan tidak selalu dapat dipisahkan."],
      ["03", "Interference", "Amplitudo dapat saling memperkuat atau meniadakan."],
      ["04", "Measurement", "Menghasilkan keluaran klasik sesuai probabilitas state."],
    ],
    callout:
      "Measurement tidak memberikan akses langsung ke seluruh amplitudo.",
    source: refs.evolution,
  },
  {
    kind: "table",
    title: "Classical vs Quantum Information Processing",
    subtitle: "Representasi informasi, operasi, dan keluaran berbeda.",
    headers: ["Dimension", "Classical", "Quantum"],
    rows: [
      ["Information", "Bits", "Qubits dengan amplitudo dan fase"],
      ["Operations", "Classical logic", "Quantum gates dan circuits"],
      ["Output", "Nilai klasik", "Output klasik dari measurement"],
      ["Architecture", "CPU/GPU", "QPU terintegrasi dengan proses klasik"],
    ],
    callout:
      "Classical algorithms juga bisa probabilistik; probabilitas bukan pembeda tunggal.",
    source: refs.evolution,
  },
  {
    kind: "pipeline",
    title: "Quantum Processing Pipeline",
    subtitle: "Kinerja dinilai end-to-end, bukan hanya saat circuit berjalan.",
    groups: [
      [
        "Classical preparation",
        ["Problem formulation", "Classical preparation", "State preparation"],
      ],
      [
        "Quantum execution",
        ["Quantum circuit", "Measurement", "Repeated sampling"],
      ],
      ["Classical interpretation", ["Post-processing & validation"]],
    ],
    callout:
      "Keuntungan pada subroutine dapat berkurang akibat overhead end-to-end.",
    source: refs.evolution,
  },
  {
    kind: "venn",
    title: "Quantum Advantage Is Problem Specific",
    subtitle:
      "Potensi keunggulan bergantung pada kecocokan problem, algoritma, dan sumber daya.",
    items: ["Problem structure", "Quantum algorithm", "Hardware resources"],
    center: "FIT",
    callout:
      "Theoretical speedup tidak otomatis membuktikan practical advantage.",
    source: refs.finance,
  },
  {
    kind: "table",
    title: "Algorithms Define the Computational Frontier",
    headers: ["Approach", "Problem", "Qualification"],
    rows: [
      ["Shor", "Factoring & discrete logarithms", "Polynomial-time, tetapi perlu fault-tolerant resources"],
      ["Grover", "Unstructured search", "Quadratic query improvement; oracle cost tetap penting"],
      ["Amplitude estimation", "Probability & expectation", "Quadratic improvement pada model akses sesuai"],
      ["QAOA / variational", "Optimisation", "Practical advantage belum dijamin"],
      ["Quantum machine learning", "Selected learning problems", "Bergantung data, struktur, dan benchmark"],
    ],
    source: refs.finance,
  },
  {
    kind: "mapping",
    title: "Why Public-Key Cryptography Is Exposed",
    subtitle:
      "Shor’s algorithm menargetkan masalah matematika di balik beberapa skema public-key.",
    items: [
      ["RSA", "Integer factorisation"],
      ["Finite-field Diffie–Hellman", "Discrete logarithm"],
      ["ECC-based schemes", "Elliptic-curve discrete logarithm"],
    ],
    tags: [
      "Key establishment → confidentiality exposure",
      "Digital signatures → authentication & integrity",
    ],
    source: refs.risk,
  },
  {
    kind: "response",
    title: "International Institutional Response",
    subtitle:
      "Standar teknis, dukungan implementasi, dan koordinasi sektor keuangan.",
    items: [
      ["Standardisation — NIST", "ML-KEM • ML-DSA • SLH-DSA"],
      ["Implementation — NIST NCCoE", "Discovery • interoperability • migration practice"],
      ["Financial-sector coordination — G7 CEG", "Transition roadmap • ecosystem dependencies"],
    ],
    callout:
      "Peran dan status dokumen berbeda; IT roadmap tidak sama dengan regulatory expectation.",
    source: refs.readiness,
  },
  {
    kind: "themes",
    title: "Common Themes Across Selected Benchmarks",
    items: [
      "Early preparation",
      "Accountable governance",
      "Cryptographic inventory",
      "Risk-based prioritisation",
      "Vendor coordination",
      "Implementation testing",
      "Phased migration",
      "Monitoring & crypto-agility",
    ],
    callout: "Sintesis lintas sumber; bukan matriks endorsement.",
    source: refs.readiness,
  },
  {
    kind: "split",
    title: "Implications for Indonesian Banking",
    subtitle:
      "Quantum readiness dapat diusulkan sebagai penerapan tata kelola dan manajemen risiko TI.",
    left: {
      title: "Existing Governance Areas",
      items: [
        "Tata kelola dan manajemen risiko TI",
        "Pengamanan informasi dan jaringan",
        "Pengelolaan penyedia jasa TI",
        "Pengendalian, audit, dan pelaporan",
      ],
    },
    right: {
      title: "Proposed Quantum-Readiness Applications",
      items: [
        "Tetapkan owner dan baseline assessment",
        "Bangun cryptographic inventory",
        "Evaluasi vendor roadmap & interoperability",
        "Lakukan pilots, assurance, dan monitoring",
      ],
    },
    center:
      "Pemetaan ini bukan bukti kewajiban eksplisit “quantum readiness”; perlu legal traceability.",
    source: refs.readiness,
  },
  {
    kind: "references",
    title: "Referensi Utama — Evolution",
    items: [
      "Bell, J. S. (1964). On the Einstein Podolsky Rosen paradox.",
      "Aspect, A. et al. (1982). Experimental test of Bell inequalities.",
      "Benioff (1980); Feynman (1982); Deutsch (1985).",
      "Shor (1997); Grover (1996); Vandersypen et al. (2001).",
      "Arute et al. (2019). Quantum supremacy using a programmable superconducting processor.",
      "Acharya et al. (2023, 2025). Suppressing quantum errors by scaling surface codes.",
      "Sivak et al. Adaptive quantum error correction.",
    ],
  },
  {
    kind: "references",
    title: "References and Evidence Base",
    items: [
      "Herman, D. et al. (2023). Quantum computing for finance. Nature Reviews Physics, 5, 450–465.",
      "Auer, R. et al. (2024). Quantum computing and the financial system. BIS Papers No. 149.",
      "NIST (2024). FIPS 203, FIPS 204, and FIPS 205.",
      "NIST (2025). Considerations for achieving crypto agility. CSWP 39.",
      "CISA, NSA & NIST (2023). Quantum-Readiness: Migration to Post-Quantum Cryptography.",
      "BIS Innovation Hub (2023, 2025). Project Leap Phase 1 and Phase 2.",
      "G7 Cyber Expert Group (2024). Statement on Planning for the Opportunities and Risks of Quantum Computing.",
      "BIS (2025). The quantum-readiness journey. BIS Papers No. 158.",
    ],
    callout:
      "Rujukan mendukung pengelompokan ancaman, manfaat, dan implikasi risiko; bukan bukti bahwa seluruh bank memiliki exposure yang sama.",
  },
];
