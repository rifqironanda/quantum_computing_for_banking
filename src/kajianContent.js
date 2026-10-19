// Summaries of the owner-selected source, sections 3.6–3.8. Dates and status
// describe that source version; they are not independent regulatory updates.
export const countryBenchmarks = [
  {
    country: "Amerika Serikat",
    category: "Standar/panduan",
    instrument: "NIST FIPS 203–205; CISA–NSA–NIST",
    status: "Standar algoritma dan panduan persiapan",
    action:
      "Standardisasi, inventory, dan koordinasi vendor; dukungan protokol serta produk tetap perlu diuji.",
    milestone:
      "FIPS final 2024; IR 8547 yang ditelaah masih Initial Public Draft.",
    refs: [3, 10, 22, 23, 29],
  },
  {
    country: "Inggris",
    category: "Standar/panduan",
    instrument: "NCSC migration timelines",
    status: "Panduan lintas industri",
    action:
      "Discovery, penilaian aset kritis, rencana investasi, dan pengelolaan dependensi.",
    milestone: "Discovery/rencana 2028; prioritas 2031; penyelesaian 2035.",
    refs: [17],
  },
  {
    country: "Kanada",
    category: "Pengawasan sektor/pemerintah",
    instrument: "Security Policy Implementation Notice",
    status: "Kebijakan sistem pemerintah",
    action:
      "Pengadaan, pelaporan tahunan, tanggung jawab departemen, TBS dan Shared Services Canada; cakupannya tidak otomatis seluruh bank.",
    milestone:
      "Rencana/pelaporan 2026; inventory/transisi 2028; prioritas 2031 dan lainnya 2035.",
    refs: [19],
  },
  {
    country: "Prancis",
    category: "Eksperimen/koordinasi",
    instrument: "ACPR; Banque de France–MAS",
    status: "Komunikasi pengawas dan eksperimen",
    action:
      "Inventory, prioritisasi dan dialog industri; eksperimen email hybrid menguji PKI, sertifikat dan protokol.",
    milestone:
      "Eksperimen 2024; dialog ACPR 2026. Eksperimen bukan bukti migrasi seluruh sektor.",
    refs: [41, 30],
  },
  {
    country: "Jerman",
    category: "Eksperimen/koordinasi",
    instrument: "Bundesbank; G7 CEG; Project Leap",
    status: "Koordinasi multilateral dan pilot",
    action:
      "Pengujian komunikasi dan dependensi protokol lintas bank sentral bersama BIS dan Banque de France.",
    milestone:
      "Publikasi CEG 2026 dan bukti eksperimen Leap; kesiapan komponen perlu diteruskan ke seluruh alur layanan.",
    refs: [42, 2, 34, 35],
  },
  {
    country: "Italia",
    category: "Eksperimen/koordinasi",
    instrument: "Banca d’Italia; G7 CEG",
    status: "Kontribusi penyusunan roadmap",
    action:
      "Koordinasi otoritas–industri untuk menyelaraskan kegiatan dan keluaran transisi.",
    milestone:
      "Workshop 2024; task force 2025; roadmap 2026. Ini bukti koordinasi, bukan hasil migrasi nasional.",
    refs: [32, 16],
  },
  {
    country: "Jepang",
    category: "Pengawasan sektor/pemerintah",
    instrument: "JFSA study group",
    status: "Rekomendasi untuk deposit-taking institutions",
    action:
      "Mengidentifikasi kebutuhan, persoalan dan pertimbangan migrasi khusus perbankan.",
    milestone:
      "Laporan 2024; sumber kajian belum mencakup hasil penerapan sektor.",
    refs: [43],
  },
  {
    country: "Singapura",
    category: "Pengawasan sektor/pemerintah",
    instrument: "MAS; eksperimen Banque de France",
    status: "Advisory, eksperimen, dan rencana ekspektasi pengawasan",
    action:
      "Inventory, prioritisasi, kompetensi, dan tata kelola; pisahkan pengumuman kebijakan dari bukti implementasi.",
    milestone:
      "Eksperimen 2024; rencana supervisory expectations diumumkan 2026, dengan arah ketahanan sebelum akhir dekade.",
    refs: [30, 44],
  },
  {
    country: "Australia",
    category: "Standar/panduan",
    instrument: "National Quantum Strategy; ASD/ISM",
    status: "Strategi kapasitas dan panduan migrasi",
    action:
      "LATICE, inventory, nilai data, prioritas dan evaluasi roadmap vendor.",
    milestone:
      "Strategi 2023; rencana akhir 2026; awal prioritas 2028; penyelesaian akhir 2030.",
    refs: [45, 20, 8],
  },
  {
    country: "Hong Kong",
    category: "Pengawasan sektor/pemerintah",
    instrument: "HKMA whitepaper dan QPI",
    status: "Pengukuran kesiapan dan dukungan sektor",
    action:
      "Awareness, Planning, Pilots, Practical Preparedness; toolkit, pelatihan dan keterlibatan industri.",
    milestone:
      "Kajian mencatat QPI 2,3/10 pada Juli 2026 dan sasaran dukungan QPI 10 pada 2030; QPI bukan skor risiko bank Indonesia.",
    refs: [46, 47],
  },
  {
    country: "Arab Saudi",
    category: "Pengawasan sektor/pemerintah",
    instrument: "SAMA No. 482021280; RDIA",
    status: "Kewajiban pengawasan dan agenda kapasitas",
    action:
      "Klasifikasi aset, enterprise risk assessment dan rencana tindakan; kendala vendor masuk rencana aset prioritas.",
    milestone:
      "Klasifikasi aset triwulan IV 2026; penilaian dan rencana triwulan I 2027, menurut instrumen yang ditelaah.",
    refs: [48, 49],
  },
  {
    country: "China",
    category: "Kapasitas nasional",
    instrument: "PBOC dan otoritas terkait",
    status: "Rencana aksi keuangan digital",
    action:
      "Pengembangan kapasitas komputasi dan evaluasi kesesuaian serta keamanan teknologi.",
    milestone:
      "Sasaran digital 2027; sumber yang ditelaah tidak menetapkan tonggak migrasi PQC.",
    refs: [50],
  },
  {
    country: "Korea Selatan",
    category: "Kapasitas nasional",
    instrument: "National Quantum Strategy 2023",
    status: "Strategi nasional dan rencana transisi PQC",
    action:
      "Masterplan, testbed produk dan panduan sektor ICT; prioritas pemerintah, publik dan infrastruktur kritis.",
    milestone:
      "Visi 2035; agenda PQC dalam sumber berada pada tingkat perencanaan strategi.",
    refs: [51],
  },
  {
    country: "India",
    category: "Kapasitas nasional",
    instrument: "National Quantum Mission",
    status: "Program riset dan pembangunan kapasitas",
    action:
      "Empat thematic hubs: computing, communication, sensing/metrology, materials/devices.",
    milestone:
      "Disetujui 2023 untuk 2023/24–2030/31; bukan bukti migrasi PQC perbankan.",
    refs: [52],
  },
  {
    country: "Türkiye",
    category: "Kapasitas nasional",
    instrument: "Quantum OTAĞ",
    status: "Roadmap teknologi",
    action:
      "Jejaring pemangku kepentingan sipil–militer untuk konsolidasi kebutuhan dan pengembangan teknologi.",
    milestone:
      "Pengumuman publikasi laporan Juni 2026; hasil penerapan sektor keuangan belum tercakup.",
    refs: [53],
  },
  {
    country: "Afrika Selatan",
    category: "Kapasitas nasional",
    instrument: "SAQuTI; CQCtec UKZN",
    status: "Jejaring riset, pelatihan dan komersialisasi",
    action:
      "Fasilitas dan kompetensi bersama mendukung ekosistem; readiness bank memerlukan bukti institusional tersendiri.",
    milestone:
      "SAQuTI sejak 2021; CQCtec didirikan Juni 2025. Bukan ukuran penyelesaian migrasi bank.",
    refs: [54],
  },
];

export const riskSections = [
  {
    title: "Tiga domain risiko, satu unit layanan",
    text: "Bab 5 menilai layanan bisnis beserta aset dan dependensinya. Pisahkan risiko penggunaan komputasi kuantum (hasil tidak stabil, model dan penyedia), risiko kriptografi (kerahasiaan, autentikasi dan integritas), serta risiko transisi (kompatibilitas dan gangguan layanan). Ketiganya berhubungan tetapi tidak dilebur menjadi satu skor.",
    refs: [16, 48],
  },
  {
    title: "Risk register dan materialitas",
    text: "Catat skenario, aset, fungsi perlindungan, kondisi eksposur, konsekuensi bisnis, kontrol, risiko residual, pemilik dan rencana tindakan. Masa sensitivitas data, kekritisan layanan, umur validasi signature, durasi migrasi dan dependensi bersama menentukan prioritas. Business impact analysis menghubungkan kegagalan kontrol ke konsekuensi layanan.",
    refs: [21, 2],
  },
  {
    title: "Akuntabilitas keputusan",
    text: "Rancangan kajian membagi peran: direksi menetapkan arah dan pendanaan; komisaris mengawasi; pemilik bisnis menentukan materialitas; TI/keamanan merancang perubahan; risiko/kepatuhan menilai kecukupan; audit intern memberi assurance independen. Ini usulan adaptasi tata kelola TI, bukan mandat PQC baru yang dinyatakan oleh aplikasi.",
    refs: [55, 56],
  },
  {
    title: "Vendor, pengecualian dan risiko residual",
    text: "Konfirmasi versi produk, protokol yang didukung, kebutuhan penggantian perangkat, subpenyedia, bukti pengujian, hak audit dan exit strategy. Penundaan aset prioritas perlu alasan, kontrol sementara, pemilik, tanggal evaluasi ulang dan persetujuan. Tinjau ulang ketika standar, kemampuan ancaman atau dukungan vendor berubah.",
    refs: [8, 16, 24],
  },
];
export const implementationSections = [
  {
    title: "1. Inventory dan cakupan",
    text: "Rekonsiliasi discovery, telaah arsitektur, konfigurasi, repositori, sertifikat dan konfirmasi vendor dengan daftar aset/layanan. Catat pemilik, algoritma/parameter, fungsi, protokol, library/versi, kunci, trust chain, klasifikasi data, masa sensitivitas, dependensi dan dukungan PQC. Simpan asal bukti dan tanggal validasi.",
    refs: [3, 2],
  },
  {
    title: "2. Rencana migrasi dan crypto-agility",
    text: "Pemilik risiko menentukan urutan layanan; tim implementasi menentukan urutan komponen berdasarkan dependensi. Tetapkan arsitektur sasaran, anggaran, produk, pengujian, cutover dan kontingensi. Pisahkan konfigurasi algoritma dari logika aplikasi dan uji kemampuan mengganti software, hardware, firmware serta protokol.",
    refs: [24, 16],
  },
  {
    title: "3. Standar menurut fungsi",
    text: "ML-KEM (FIPS 203) membentuk shared secret melalui key encapsulation; ML-DSA (FIPS 204) dan SLH-DSA (FIPS 205) untuk tanda tangan digital. ML-KEM tidak menggantikan autentikasi atau enkripsi payload. Bedakan standar algoritma, keamanan implementasi dan kesiapan produk/protokol.",
    refs: [10, 22, 23],
  },
  {
    title: "4. Profil hybrid dan interoperabilitas",
    text: "Gunakan hybrid jika protokol dan analisis keamanan kombinasinya mendukung. Tentukan negosiasi, pencegahan downgrade, kompatibilitas, serta penghentian komponen lama. Pengujian menjangkau aplikasi, sertifikat, PKI, perangkat dan mitra; satu algoritma yang bekerja belum membuktikan jalur layanan siap.",
    refs: [24, 30, 35],
  },
  {
    title: "5. Pengujian dan penerapan bertahap",
    text: "Uji input tidak valid, kegagalan verifikasi, profil tak didukung, kapasitas, latensi, throughput, ukuran pesan, CPU/memori, timeout, failover dan pemulihan. Bukti penerimaan mencakup konfigurasi berversi, hasil yang dapat direproduksi, penyelesaian temuan dan persetujuan pemilik layanan serta fungsi kontrol. Rollback ke perlindungan lama tetap dicatat sebagai risiko residual.",
    refs: [30, 35, 2],
  },
  {
    title: "6. Keberhasilan yang dapat diperiksa",
    text: "Gunakan denominator eksplisit: aset/layanan dalam cakupan, jalur prioritas yang telah dimigrasikan dan diuji, dependensi vendor yang dikonfirmasi, umur pengecualian dan service level pascaperubahan. Ukur seluruh jalur autentikasi dan pembentukan kunci; penggantian satu komponen tidak otomatis menyelesaikan layanan.",
    refs: [2, 16, 3],
  },
];
export const assuranceSections = [
  {
    title: "Kepatuhan dan kesiapan",
    text: "Pisahkan pengujian kepatuhan terhadap ketentuan yang berlaku dari evaluasi kesiapan quantum risk yang diusulkan kajian. Setiap temuan kepatuhan menunjuk kriteria, objek dan bukti. Susun keterlacakan tujuan kontrol → kriteria → prosedur → bukti → temuan → tindak lanjut.",
    refs: [55, 56],
  },
  {
    title: "Bukti kontrol dan prosedur audit",
    text: "Rekonsiliasi inventory dengan CMDB, konfigurasi, repositori, sertifikat dan dokumen vendor. Telusuri BIA, risk register, alasan prioritas, persetujuan dan pengecualian. Uji ulang konfigurasi algoritma, protokol, signature, trust chain dan pemulihan. Klaim vendor diperiksa terhadap versi dan fungsi yang aktif.",
    refs: [3, 2, 8],
  },
  {
    title: "Kematangan berbasis artefak",
    text: "Kajian mengadaptasi dimensi HKMA menjadi kondisi teridentifikasi, direncanakan, diuji dan terkendali. Kenaikan kondisi harus didukung artefak yang diperiksa. Usulan ini bukan skor resmi baru; bobot serta ambang perlu dikalibrasi sebelum membandingkan bank, dan kesenjangan kritis tidak ditutup oleh capaian administratif lainnya.",
    refs: [47],
  },
  {
    title: "Penutupan dan assurance berkelanjutan",
    text: "Setiap temuan mencatat kondisi, kriteria, penyebab, konsekuensi, pemilik dan tenggat. Penutupan memerlukan verifikasi remediasi atau penerimaan risiko oleh pihak berwenang. Temuan berulang, vendor tanpa jalur penyelesaian dan perubahan material risiko residual menjadi dasar eskalasi.",
    refs: [55, 56, 16],
  },
];
