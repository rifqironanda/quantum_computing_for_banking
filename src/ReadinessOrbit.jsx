import { useState } from 'react';
import { Atom, Users, Cpu, ClipboardList, Network } from 'lucide-react';

const pillars = [
  { title: 'People', icon: Users, brief: 'Pemahaman & tanggung jawab', detail: 'Tetapkan owner, latih tim teknologi dan risiko, serta sepakati tanggung jawab.' },
  { title: 'Technology', icon: Cpu, brief: 'Inventory & migration path', detail: 'Petakan algoritma, aplikasi, protokol dan HSM/KMS. Uji opsi migrasi serta interoperability.' },
  { title: 'Policies & Processes', icon: ClipboardList, brief: 'Prioritas & rencana perubahan', detail: 'Susun prioritas berbasis risiko, pengadaan, pengujian, rollback dan assurance.' },
  { title: 'Coordination', icon: Network, brief: 'Vendor & ekosistem', detail: 'Selaraskan roadmap dengan vendor, mitra transaksi dan penyedia layanan.' },
];

// Static orbital positions keep labels readable and keyboard focus stable.
export default function ReadinessOrbit() {
  const [active, setActive] = useState(0);
  return <div className="readiness-orbit-widget">
    <p>Pilih bagian di sekitar inti untuk melihat perannya dalam kesiapan bank.</p>
    <div className="readiness-orbit-map" role="group" aria-label="Empat bagian Quantum Readiness">
      <svg className="readiness-orbit-track" viewBox="0 0 800 440" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="400" cy="220" rx="280" ry="165" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7"/>
        <ellipse cx="400" cy="220" rx="250" ry="145" fill="none" stroke="currentColor" opacity="0.25"/>
      </svg>
      <div className="readiness-orbit-core"><Atom size={36}/><strong>Quantum<br/>Readiness</strong></div>
      {pillars.map(({ title, brief, icon: Icon }, i) => <button key={title}
        className={`readiness-satellite satellite-${i}`} aria-pressed={active === i}
        aria-controls="readiness-pillar-detail" onClick={() => setActive(i)}>
        <Icon size={23}/><b>{title}</b><span>{brief}</span>
      </button>)}
    </div>
    <div id="readiness-pillar-detail" className="research-note" aria-live="polite">
      <h3>{pillars[active].title}</h3><p>{pillars[active].detail}</p>
    </div>
  </div>;
}
