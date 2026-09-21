const refs = {
  evolution:
    "Bell (1964); Aspect et al. (1982); Benioff (1980); Feynman (1982); Deutsch (1985); Shor (1997); Arute et al. (2019); Acharya et al. (2023, 2025).",
  finance:
    "Google Quantum AI and Collaborators (2023; 2025); Herman et al. (2023), Nature Reviews Physics; Auer et al. (2024), BIS Papers No. 149.",
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
    title: "Alur Perkembangan Quantum Computing",
    subtitle:
      "Perkembangan ilmiah dan teknologi yang membentuk Quantum Computing modern.",
    items: [
      ["01", "Foundations", "Dasar informasi kuantum", "Eksperimen Bell dan Aspect membangun dasar pemahaman bahwa informasi kuantum memiliki karakteristik yang berbeda dari informasi klasik"],
      ["02", "Concept", "Ide dan bukti konsep", "Benioff, Feynman, dan Deutsch membuktikan bahwa proses komputasi dapat dimodelkan sebagai sistem fisik kuantum."],
      ["03", "Algorithms", "Algoritma kuantum", "Algoritma kuantum menunjukkan bahwa superposisi dan interferensi dapat digunakan untuk menyelesaikan kelas masalah tertentu lebih effisien daripada algoritma klasik."],
      ["04", "Architectures", "Desain perangkat", "Arsitektur Komputasi kuantum berkembang melalui berbagai pendekatan yang memanfaatkan entanglement sebagai sumber daya utama, termasuk measurement-based quantum computing dan quantum annealing."],
      ["05", "Access", "Cloud dan NISQ", "Akses komputasi kuantum berkembang melalui perangkat NISQ sebagai tahap transisi menuju sistem fault-tolerant berskala besar."],
      ["06", "Advantage", "Tugas tertentu", "keunggulan komputasi kuantum telah ditunjukkan melalui prosesor superkonduktor dan sistem fotonik pada tugas komputasi khusus."],
      ["07", "Error Suppression", "Logical qubit", "Error suppression menggunakan banyak physical qubits untuk melindungi informasi pada satu logical qubit sehungga kesalahan komputasi dapat ditekan."],
      ["08", "Adaptive Stability", "Kontrol koreksi galat", "Adaptive stability menggunakan feedback kesalahan untuk menyesuaikan pengaturan sistem kuantum secara otomatis selama komputasi berlangsung"],
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
        "Bell (1964) merumuskan cara untuk menguji perbedaan antara prediksi fisika kuantum dan teori klasik yang bersifat lokal (teori local realism). sedangkan Aspect et al.(1982) menunjukkan secara eksperimental bahwa korelasi kuantum dapat melampaui batas teori tersebut.",
      ],
      [
        "1981–1991",
        "The Quantum Computer Concept",
        "Benioff • Feynman • Deutsch",
        "Benioff mengawali fondasi quantum computing dengan menunjukkan bahwa mesin Turing dapat dimodelkan sebagai sistem fisik mikroskopis melalui Hamiltonian kuantum. Feynman mengusulkan bahwa komputer kuantum dapat meniru sistem fisik kuantum lain secara efisien. Deutsch memperluas konsep ini dengan merumuskan model universal untuk quantum computing.",
      ],
      [
        "1992–2001",
        "Algorithms & Laboratory Proofs",
        "Deutsch–Jozsa • Simon • Shor • Grover",
        "Pengembangan algoritma kuantum dimulai dari pembuktian teoritis bahwa terdapat masalah tertentu yang dapat diselesaikan secara pasti dalam waktu jauh lebih singkat dibandingkan komputasi klasik determinisitik maupun probabilistik. temuan tersebut menunjukkan bahwa model komputasi kuantum memiliki kemampuan komputasional yang berbeda.",
      ],
      [
        "2001–2015",
        "Architecture Diversification",
        "Raussendorf–Briegel • D-Wave",
        "Raussendorf dan Briegel (2001) memperkenalkan one-way quantum computer (arsitektur komputasi berbasis pengukuran yang menjalankan rangkaian logika melalui serangkaian pengukuran satu-qubit pada cluster state yang telah terentanglement). lantinget al (2014) menunjukan bukti eksperimental adanya koherensi dan entanglement pada sistem dua dan delapan qubit dalam processor quantum annealing.",
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
        "Preskill (2018) menjelaskan NISQ sebagai era perangkat 50-100 qubit yang berpotensi melampaui komputer klasik pada tugas tertentu, tetapi masih dibatasi oleh noise. sejalan dengan itu, IBM Quantum Roadmap menggambarkan pengembangan bertahap dari peningkatan skala dan kualitas qubit menuju komputasi kuantummodular serta fault-tolerant.",
      ],
      [
        "2019–2020",
        "Quantum Advantage",
        "Google Sycamore • USTC Jiuzhang",
        "Arute et al. (2019) menunjukkan bahwa prosesor kuantum superkonduktor dapat menjalankan tugas random circuit sampling yang sangat sulit disimulasikan secara klasik. Selanjutnya, Zhong et al. (2020) menggunakan komputer kuantum fotonik Jiuzhang untuk melakukan Gaussian boson sampling dengan kecepatan yang diperkirakan jauh melampaui superkomputer saat itu. Kedua penelitian ini menunjukkan adanya quantum computational advantage, tetapi hanya untuk permasalahan khusus, bukan seluruh tugas komputasi.",
      ],
      [
        "2021–2025",
        "QEC & Logical Qubits",
        "Google Quantum AI • Acharya et al.",
        "Eksperimen surface code menunjukkan bahwa peningkatan code distance dapat menurunkan logical error rate ketika kesalahan fisik berada di bawah error threshold. perkembangan dari distance -3, -5, hingga -7 membuktikan bahwa penambahan physical qubits mampu meningkatkan perlindungan logical qubits, sekaligus menjadi langkah penting menuju komputasi kuantum yang andal dan fault-tolerant.",
      ],
      [
        "Now",
        "Adaptive QEC Control",
        "Sivak et al.",
        "Pendekatan ini memanfaatkan sinyal dari quantum error correction sebagai masukan bagi reiforcement learning untuk memperbarui parameter kontrol secara berkelanjutan. dengan demikian, sistem dapat mempertahankan kestabilan operasi, serta membuat sistem yang lebih adaptif.",
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
    variant: "why-quantum",
    title: "Mengapa Quantum Perlu Mulai Dipahami?",
    subtitle: "Tiga alasan untuk membangun pemahaman institusional sebelum menentukan adopsi dan respons risiko.",
    items: [
      [
        "01",
        "Technological Progress",
        "Perkembangan mulai bergerak menuju peningkatan kualitas komputasi.",
        "Kemajuan tidak lagi hanya ditunjukkan oleh jumlah physical qubits, tetapi juga oleh kemampuan membentuk logical qubit yang lebih terlindungi.",
        ["Higher fidelity", "Lower error rate", "Circuit depth", "Logical error suppression"],
      ],
      [
        "02",
        "Computational Frontier",
        "Batas kemampuan komputasi berpotensi berubah.",
        "Quantum computing menawarkan computational model yang berbeda dan dapat memberi keuntungan pada kelas masalah tertentu, bukan percepatan untuk semua kebutuhan.",
        ["Simulation", "Optimisation", "Sampling", "Amplitude estimation"],
      ],
      [
        "03",
        "Banking Intersection",
        "Perubahan tersebut beririsan dengan aktivitas dan infrastruktur perbankan.",
        "Perbankan memiliki computational use cases sekaligus technology and security dependencies yang dapat terdampak oleh perkembangan quantum computing.",
        ["Potential capability", "Banking activities", "Emerging exposure"],
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
    kind: "dual_relevance",
    title: "Dual Relevance, Different Implications for Banking",
    subtitle:
      "Potential Benefits dan Emerging Threats sama-sama relevan, tetapi membutuhkan respons dan decision horizon yang berbeda.",
    pathways: [
      {
        id: "benefits",
        title: "Potential Benefits",
        items: ["Optimisation", "Simulation", "Sampling and estimation", "Selected machine-learning problems"],
        status: "Prospective and research-stage",
        action: "Explore → Experiment → Validate against classical baselines",
        caveat: "Practical advantage untuk use case perbankan belum terbukti secara umum.",
      },
      {
        id: "threats",
        title: "Emerging Threats",
        items: ["Future cryptanalytic capability", "Changes to security assumptions", "Cryptographic dependency", "Potential trust and confidentiality exposure"],
        status: "Future capability with potentially present preparation needs",
        action: "Identify → Assess → Prepare",
        caveat: "Persiapan dapat relevan sebelum waktu kemunculan CRQC diketahui.",
      },
    ],
    callout: "Both pathways matter, but they do not require the same response or decision horizon.",
    source: refs.finance,
  },
  {
    kind: "priority_comparison",
    title: "Dual Relevance, Different Decision Horizons",
    subtitle: "Which pathway requires earlier institutional attention?",
    benefits: [
      { label: "Quantum optimisation / financial analytics", score: 48.7, tier: "Watch", decision: "Explore and validate against strong classical baselines." },
      { label: "Simulation, sampling and estimation", score: 50.0, tier: "Watch", decision: "Monitor special benchmarks; banking advantage remains unproven." },
      { label: "Quantum machine learning / fraud analytics", score: 41.3, tier: "Watch", decision: "Experimental and sensitive to data-loading assumptions." },
    ],
    threats: [
      { label: "Long-lived confidentiality / HNDL", score: 97.9, tier: "Critical", decision: "Map data secrecy lifetime and interceptability." },
      { label: "Public-key cryptanalytic threat", score: 95.8, tier: "Critical", decision: "Separate algorithmic vulnerability from engineering timing." },
      { label: "Cryptographic inventory gap", score: 93.9, tier: "Critical", decision: "Establish deployment visibility before risk conclusions." },
      { label: "PQC migration complexity", score: 91.8, tier: "Critical", decision: "Plan staged testing and interoperability work." },
      { label: "Governance, skills and crypto-agility", score: 89.0, tier: "Critical", decision: "Build accountable, no-regrets readiness capability." },
      { label: "Digital signatures, PKI and software trust", score: 85.8, tier: "Critical", decision: "Assess separately from confidentiality and HNDL." },
    ],
    methodology: "Scores are decision-ordering indicators based on literature and structured expert judgement—not probabilities of CRQC arrival, expected financial losses, or bank-specific risk ratings.",
    callout: "Potential Benefits justify continued exploration; future cryptanalytic exposure justifies earlier readiness.",
    source: `${refs.finance} ${refs.risk}`,
  },
  {
    kind: "cryptanalytic_path",
    title: "Future Cryptanalytic Capability Changes Selected Security Assumptions",
    subtitle: "What future capability creates the cryptographic concern?",
    layers: [
      { label: "Future capability", items: ["Cryptographically Relevant Quantum Computer", "Fault-Tolerant Quantum Computing", "Shor’s Algorithm at relevant scale"] },
      { label: "Mathematical problems", items: ["Integer factorisation", "Discrete logarithm", "Elliptic-curve discrete logarithm"] },
      { label: "Current public-key schemes", items: ["RSA", "Diffie–Hellman", "ECC", "ECDH", "ECDSA"] },
    ],
    mappings: {
      RSA: "Integer factorisation",
      "Diffie–Hellman": "Discrete logarithm",
      ECC: "Elliptic-curve discrete logarithm",
      ECDH: "Elliptic-curve discrete logarithm",
      ECDSA: "Elliptic-curve discrete logarithm",
    },
    current: "No demonstrated capability to break modern banking keys at relevant scale.",
    future: "A sufficiently capable CRQC running Shor’s Algorithm could attack factoring and discrete-logarithm assumptions.",
    caveat: "Algorithmic vulnerability is established, but engineering feasibility and timing remain uncertain.",
    callout: "Future cryptanalytic capability is the hazard. It does not automatically prove that every bank is exposed.",
    source: refs.risk,
  },
  {
    kind: "dependency_map",
    title: "Banking Infrastructure Depends on Public-Key Cryptography",
    subtitle: "Why is a future capability relevant to systems operating today?",
    center: "Banking Digital Infrastructure",
    functions: [
      { title: "Key Establishment", examples: ["TLS", "VPN", "APIs", "Interbank communication"], algorithms: ["RSA", "DH", "ECC", "ECDH"] },
      { title: "Digital Signatures", examples: ["Message signing", "Document signing", "Authentication"], algorithms: ["RSA", "ECC", "ECDSA"] },
      { title: "PKI and Certificates", examples: ["Digital identity", "Certificate trust", "Machine authentication"], algorithms: ["RSA", "ECC", "ECDSA"] },
      { title: "Software and System Trust", examples: ["Code signing", "Firmware signing", "Trusted updates"], algorithms: ["RSA", "ECC", "ECDSA"] },
    ],
    distinction: "Dependency identifies potential relevance. Exposure requires actual deployment, protected assets, and time characteristics.",
    callout: "Existing cryptographic dependency connects future quantum capability with current banking infrastructure.",
    source: refs.risk,
  },
  {
    kind: "exposure_conditions",
    title: "Cryptographic Exposure Is Conditional",
    subtitle: "When does an existing cryptographic dependency become a relevant exposure?",
    pathways: {
      confidentiality: {
        title: "Confidentiality pathway",
        conditions: ["Quantum-vulnerable dependency", "Interceptable encrypted data", "Long Data Secrecy Lifetime"],
        incomplete: "Dependency identified, but HNDL conditions are incomplete.",
        complete: "Potential temporal confidentiality exposure identified.",
      },
      trust: {
        title: "Trust pathway",
        conditions: ["Vulnerable signature dependency", "Critical trust function", "Future active forgery capability"],
        incomplete: "Dependency identified, but trust-path conditions are incomplete.",
        complete: "Potential authentication and integrity exposure identified.",
      },
    },
    inputs: [
      ["Actual Deployment", "Application, protocol, hardware, software, KMS/HSM, third party"],
      ["Cryptographic Function", "Confidentiality, key establishment, authentication, signatures, software trust"],
      ["Asset and Time", "Sensitivity, secrecy lifetime, criticality, interceptability, replaceability, migration time"],
    ],
    boundary: "Bank-specific exposure cannot be concluded without a cryptographic inventory.",
    callout: "Capability creates the hazard; dependency creates relevance; deployment and asset characteristics determine exposure.",
    source: refs.risk,
  },
  {
    kind: "hndl_priority",
    title: "Harvest Now, Decrypt Later: Future Capability, Present Exposure",
    subtitle: "How can a future capability create a concern today?",
    timeline: [
      ["Today", "Encrypted sensitive data"],
      ["Harvest", "Intercept or acquire ciphertext"],
      ["Store", "Retain data while it still has future value"],
      ["Future", "CRQC capability becomes available"],
      ["Decrypt later", "Potential confidentiality compromise"],
    ],
    scores: [["Impact", 5], ["Urgency", 5], ["Exposure breadth", 5], ["Irreversibility / data lifetime", 5], ["Systemic propagation", 4], ["Actionability", 5], ["Evidence strength", 4.85]],
    adjustedPriority: 97.9,
    formula: "Data Secrecy Lifetime + Migration Time > Time Until Cryptographic Compromise",
    caveat: "HNDL is a literature-identified focal threat scenario—not evidence of widespread active attacks and not an assessed highest risk for Indonesian banks.",
    callout: "Readiness can begin under uncertainty: map data lifetime, discover dependencies, assess exposure, and preserve migration options.",
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
