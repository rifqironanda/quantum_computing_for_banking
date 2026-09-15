import { useState } from 'react'
import { Atom, ShieldCheck, Network, Cpu, KeyRound, Waves, ScanEye, Database, FlaskConical, Cloud, Landmark, GitBranch, LockKeyhole, Search, Clock, ArrowRight, RotateCcw } from 'lucide-react'

const icons = [Atom, Cpu, Network, ShieldCheck, Cloud, Waves, FlaskConical, GitBranch]
export function TopicIcon({text='',index=0}) {
  const t=text.toLowerCase()
  const Icon=/bank|financial|portfolio/.test(t)?Landmark:/key|rsa|crypto/.test(t)?KeyRound:/risk|security|protect|govern/.test(t)?ShieldCheck:/data|inventory|store/.test(t)?Database:/measurement/.test(t)?ScanEye:/quantum|physical|superposition/.test(t)?Atom:/interference|phase/.test(t)?Waves:icons[index%icons.length]
  return <Icon className="topic-icon" aria-hidden="true" strokeWidth={1.5}/>
}
export function LearningCards({items}) {
  const [selected,setSelected]=useState(null)
  return <div className="learning-grid" style={{'--columns':Math.min(items.length,4)}}>{items.map((x,i)=><button key={i} className={`learning-card ${selected===i?'selected':''}`} aria-expanded={selected===i} onClick={()=>setSelected(selected===i?null:i)}><div className="card-top"><TopicIcon text={x[1]} index={i}/><span>{x[0]}</span></div><h3>{x[1]}</h3><p>{x[2]}</p>{x[3]&&<p className="card-detail">{selected===i?x[3]:'Klik untuk penjelasan →'}</p>}{!x[3]&&<span className="focus-label">{selected===i?'Fokus aktif':'Fokus konsep ↗'}</span>}</button>)}</div>
}
const steps=[
'Bangun pemahaman bersama, tetapkan owner dan tanggung jawab.',
'Petakan algoritma, kunci, sertifikat, aplikasi, dan dependensi vendor.',
'Nilai masa kerahasiaan data, fungsi kriptografi, serta criticality.',
'Susun urutan perubahan dan koordinasikan rencana dengan vendor.',
'Uji interoperability, kinerja, dan rollback sebelum penerapan.',
'Migrasikan bertahap sesuai hasil pengujian dan prioritas risiko.',
'Validasi konfigurasi, cakupan migrasi, dan bukti assurance.',
'Pantau perkembangan standar dan pertahankan crypto-agility.'
]
export function Readiness({items}) {
 const [active,setActive]=useState(0)
 return <div className="readiness-explorer"><div className="step-grid">{items.map((x,i)=><button key={x} onClick={()=>setActive(i)} aria-pressed={active===i} className={active===i?'selected':''}><TopicIcon text={x} index={i}/><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b></button>)}</div><div className="step-detail" aria-live="polite"><span>TAHAP {active+1} / 8</span><h3>{items[active]}</h3><p>{steps[active]}</p><button onClick={()=>setActive((active+1)%items.length)}>Tahap berikutnya <ArrowRight size={18}/></button></div></div>
}
export function HndlExplorer({items}) {
 const [values,setValues]=useState([10,5,12]);const exposed=values[0]+values[1]>values[2]
 const [active,setActive]=useState(0)
 const detail=['Data dienkripsi; exposure bergantung pada skema dan data yang dilindungi.','Penyerang merekam trafik atau memperoleh ciphertext.','Ciphertext disimpan sambil menunggu kemampuan kriptanalisis.','Skenario bersyarat: CRQC yang memadai mampu menyerang skema rentan.','Dekripsi bergantung pada skema, rekaman yang cukup, dan kapabilitas penyerang.']
 const Icon=[LockKeyhole,ScanEye,Database,Cpu,KeyRound]
 return <><div className="harvest-steps">{items.map((x,i)=>{const I=Icon[i];return <button key={i} aria-pressed={active===i} className={active===i?'selected':''} onClick={()=>setActive(i)}><I/><small>0{i+1}</small><b>{x[1]}</b></button>})}</div><p className="harvest-detail" aria-live="polite">{detail[active]}</p><div className="mosca"><div>{['X · Kerahasiaan data','Y · Waktu migrasi','Z · Waktu menuju CRQC'].map((label,i)=><label key={label}>{label}<strong>{values[i]} tahun</strong><input aria-label={label} type="range" min="1" max="30" value={values[i]} onChange={e=>setValues(v=>v.map((n,j)=>j===i?Number(e.target.value):n))}/></label>)}</div><output className={exposed?'exposed':''}><Clock/><strong>{values[0]} + {values[1]} {exposed?'>':'≤'} {values[2]}</strong><b>{exposed?'Jendela exposure terbuka':'Batas waktu belum terlampaui'}</b><small>Skenario ilustratif, bukan prediksi CRQC atau penilaian keamanan bank.</small></output></div></>
}
export function PhysicsFigure(){return <figure className="physics-figure"><img src={`${import.meta.env.BASE_URL}media/bloch-sphere.svg`} alt="Bloch sphere dengan sumbu x, y, z dan state psi"/><figcaption>Bloch sphere · representasi state satu qubit<br/><a href="https://commons.wikimedia.org/wiki/File:Bloch_sphere.svg" target="_blank" rel="noreferrer">Smite-Meister / Fibonacci</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a></figcaption></figure>}
