import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { slides } from './slides.js'
import { TopicIcon, LearningCards, Readiness, HndlExplorer, PhysicsFigure } from './Interactive.jsx'

const Arrow = ({ reverse = false }) => <span className={`arrow ${reverse ? 'reverse' : ''}`} aria-hidden="true">→</span>

function Source({ children }) {
  return children ? <p className="source">Source: {children}</p> : null
}

function Cards({items}) { return <LearningCards items={items}/> }

export function SlideContent({ slide }) {
  switch (slide.kind) {
    case 'cover':
      return <div className="cover-content">
        <p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="lead">{slide.subtitle}</p>
        <div className="cover-rule"/><p className="cover-note">{slide.note}</p><QuantumOrb />
      </div>
    case 'section':
      return <div className="section-content"><p className="eyebrow">{slide.kicker}</p><h1>{slide.title}</h1><p>{slide.subtitle}</p><QuantumOrb /></div>
    case 'timeline':
      return <><Header slide={slide}/><div className="timeline">{slide.items.map((x,i)=><div className="timeline-item" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small>{i < slide.items.length-1 && <i/>}</div>)}</div></>
    case 'milestones':
      return <><Header slide={slide}/><Cards items={slide.items}/><Source>{slide.source}</Source></>
    case 'statement':
      return <div className="statement"><p className="eyebrow">RESEARCH TRAJECTORY</p><h1>{slide.title}</h1><p className="lead">{slide.subtitle}</p><blockquote>{slide.body}</blockquote><div className="tags">{slide.tags.map(x=><span key={x}>{x}</span>)}</div></div>
    case 'columns':
      return <><Header slide={slide}/><Cards items={slide.items}/><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'intersection':
      return <><Header slide={slide}/><div className="intersection"><ListPanel data={slide.left}/><div className="intersection-center">{slide.center}</div><ListPanel data={slide.right}/></div><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'split':
      return <><Header slide={slide}/><div className="split"><ListPanel data={slide.left}/><div className="split-center">{slide.center}</div><ListPanel data={slide.right} accent="orange"/></div><Source>{slide.source}</Source></>
    case 'flow':
      return <><Header slide={slide}/><div className="flow">{slide.items.map((x,i)=><div className="flow-wrap" key={x[0]}><article><TopicIcon text={x[0]} index={i}/><small>{x[0]}</small><b>{x[1]}</b></article>{i < slide.items.length-1 && <Arrow/>}</div>)}</div><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'hndl':
      return <><Header slide={slide}/><HndlExplorer items={slide.items}/><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'dualflow':
      return <><Header slide={slide}/><FlowLane data={slide.top} danger/><FlowLane data={slide.bottom}/><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'orbit':
      return <><Header slide={slide}/><div className="orbit"><div className="orbit-core">{slide.center}</div>{slide.items.map((x,i)=><article key={x[0]} style={{'--i':i}}><b>{x[0]}</b><span>{x[1]}</span></article>)}</div></>
    case 'cycle':
      return <><Header slide={slide}/><Readiness items={slide.items}/><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'inventory':
      return <><Header slide={slide}/><div className="inventory"><div className="inventory-grid">{slide.items.map(x=><span key={x}>{x}</span>)}</div><Arrow/><strong>{slide.output}</strong></div></>
    case 'table':
      return <><Header slide={slide}/><div className="table-wrap"><table><thead><tr>{slide.headers.map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{slide.rows.map((r,i)=><tr key={i}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'layers':
      return <><Header slide={slide}/><div className="physics-layout"><PhysicsFigure/><div className="layers">{slide.items.map((x,i)=><article key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div></article>)}</div></div><Callout>{slide.callout}</Callout></>
    case 'pipeline':
      return <><Header slide={slide}/><div className="pipeline">{slide.groups.map((g,gi)=><section key={g[0]}><h3>{g[0]}</h3><div>{g[1].map((x,i)=><div className="pipe-wrap" key={x}><span>{x}</span>{(i<g[1].length-1 || gi<slide.groups.length-1) && <Arrow/>}</div>)}</div></section>)}</div><Callout>{slide.callout}</Callout></>
    case 'venn':
      return <><Header slide={slide}/><div className="venn">{slide.items.map((x,i)=><div key={x} className={`venn-${i}`}>{x}</div>)}<strong>{slide.center}</strong></div><Callout>{slide.callout}</Callout></>
    case 'mapping':
      return <><Header slide={slide}/><div className="mapping">{slide.items.map(x=><div key={x[0]}><b>{x[0]}</b><Arrow/><span>{x[1]}</span></div>)}</div><div className="tags wide">{slide.tags.map(x=><span key={x}>{x}</span>)}</div><Source>{slide.source}</Source></>
    case 'response':
      return <><Header slide={slide}/><div className="response">{slide.items.map(x=><article key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></article>)}</div><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'themes':
      return <><Header slide={slide}/><div className="themes">{slide.items.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div><Callout>{slide.callout}</Callout><Source>{slide.source}</Source></>
    case 'references':
      return <><Header slide={slide}/><ol className="references">{slide.items.map(x=><li key={x}>{x}</li>)}</ol><Callout>{slide.callout}</Callout></>
    default: return null
  }
}

function Header({ slide }) { return <header className="slide-header"><p className="eyebrow">QUANTUM COMPUTING & PERBANKAN</p><h2>{slide.title}</h2>{slide.subtitle && <p>{slide.subtitle}</p>}</header> }
function Callout({children}) { return children ? <div className="callout">{children}</div> : null }
function ListPanel({data, accent=''}) { return <article className={`list-panel ${accent}`}><TopicIcon text={data.title}/><h3>{data.title}</h3><ul>{data.items.map(x=><li key={x}>{x}</li>)}</ul></article> }
function FlowLane({data,danger=false}) { return <div className={`flow-lane ${danger?'danger':''}`}><strong>{data.label}</strong>{data.items.map((x,i)=><div className="flow-wrap" key={x}><span>{x}</span>{i<data.items.length-1&&<Arrow/>}</div>)}</div> }
function QuantumOrb() { return <div className="quantum-orb" aria-hidden="true"><i/><i/><i/><b/></div> }

export default function App() {
  const [index, setIndex] = useState(() => {
    const n = Number(location.hash.replace('#slide-', ''))
    return Number.isFinite(n) && n > 0 && n <= slides.length ? n - 1 : 0
  })
  const [overview, setOverview] = useState(false)
  const [help, setHelp] = useState(false)
  const touchStart = useRef(null)
  const go = useCallback((next) => setIndex(current => Math.max(0, Math.min(slides.length - 1, typeof next === 'function' ? next(current) : next))), [])

  useEffect(() => { const sync=()=>{const n=Number(location.hash.replace('#slide-',''));if(Number.isInteger(n)&&n>=1&&n<=slides.length)setIndex(n-1)}; addEventListener('hashchange',sync);return()=>removeEventListener('hashchange',sync) }, [])
  useEffect(() => { history.replaceState(null, '', `#slide-${index + 1}`) }, [index])
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, button, a, select, textarea') || overview || help) { if(e.key==='Escape'){setOverview(false);setHelp(false)} return } 
      if (['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); go(i=>i+1) }
      if (['ArrowLeft','ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); go(i=>i-1) }
      if (e.key === 'Home') go(0)
      if (e.key === 'End') go(slides.length-1)
      if (e.key.toLowerCase() === 'o') setOverview(v=>!v)
      if (e.key === '?') setHelp(v=>!v)
      if (e.key === 'Escape') { setOverview(false); setHelp(false) }
    }
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey)
  }, [go, overview, help])

  const slide = useMemo(() => slides[index], [index])
  const toggleFullscreen = async () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()

  return <main className="app" onTouchStart={e=>touchStart.current=e.target.closest('input,button,a')?null:e.changedTouches[0].clientX} onTouchEnd={e=>{if(touchStart.current===null)return;const d=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(d)>60)go(i=>i+(d<0?1:-1))}}>
    <div className="topbar">
      <button onClick={()=>setOverview(true)} aria-label="Buka daftar slide">☰ <span>Daftar slide</span></button>
      <div className="progress" aria-label={`Slide ${index+1} dari ${slides.length}`}><i style={{width:`${((index+1)/slides.length)*100}%`}}/></div>
      <button onClick={toggleFullscreen} aria-label="Layar penuh">⛶ <span>Fullscreen</span></button>
    </div>
    <section className={`slide slide-${slide.kind}`} aria-live="polite">
      <SlideContent key={index} slide={slide}/>
      <footer><span>KAJIAN BULAN 1 • QUANTUM COMPUTING & PERBANKAN</span><b>{String(index+1).padStart(2,'0')}</b></footer>
    </section>
    <nav className="controls" aria-label="Navigasi presentasi">
      <button onClick={()=>go(i=>i-1)} disabled={index===0} aria-label="Slide sebelumnya">←</button>
      <button className="counter" onClick={()=>setHelp(true)}>{index+1} / {slides.length}</button>
      <button onClick={()=>go(i=>i+1)} disabled={index===slides.length-1} aria-label="Slide berikutnya">→</button>
    </nav>
    {overview && <div className="overlay" role="dialog" aria-modal="true"><div className="overview"><header><h2>Daftar slide</h2><button onClick={()=>setOverview(false)}>Tutup ×</button></header><div>{slides.map((s,i)=><button key={i} className={i===index?'active':''} onClick={()=>{go(i);setOverview(false)}}><span>{String(i+1).padStart(2,'0')}</span><b>{s.title}</b></button>)}</div></div></div>}
    {help && <div className="overlay" role="dialog" aria-modal="true" onClick={()=>setHelp(false)}><div className="help" onClick={e=>e.stopPropagation()}><h2>Navigasi</h2><p><kbd>←</kbd> <kbd>→</kbd> pindah slide</p><p><kbd>O</kbd> daftar slide</p><p><kbd>Home</kbd> / <kbd>End</kbd> awal / akhir</p><p>Swipe pada layar sentuh</p><button onClick={()=>setHelp(false)}>Mengerti</button></div></div>}
  </main>
}
