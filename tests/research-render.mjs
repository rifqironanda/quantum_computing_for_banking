import assert from 'node:assert/strict';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {default:Research}=await server.ssrLoadModule('/src/Research.jsx');
 const {modules,milestones}=await server.ssrLoadModule('/src/researchData.js');
 assert.equal(milestones.length,8);
 for(let i=0;i<modules.length;i++){
  const m=modules[i];
  const html=renderToStaticMarkup(React.createElement(Research,{moduleId:m.id,onNavigate(){},onDashboard(){},onLab(){}}));
  assert.ok(html.includes(m.name.replaceAll('&','&amp;')),m.id+' heading');
  assert.ok(html.includes('Kembali ke dashboard'),m.id+' dashboard exit');
  if(modules[i+1])assert.ok(html.includes('Lanjut: '+modules[i+1].name.replaceAll('&','&amp;')),m.id+' next module');
  assert.ok(html.includes('https://'),m.id+' source links');
  if(m.id==='evolution')assert.ok(html.includes('Physics 1, 195–200'));
  if(m.id==='relevance')assert.ok(html.includes('banking-venn'));
  if(m.id==='hndl'){assert.equal((html.match(/type="range"/g)||[]).length,3);assert.equal((html.match(/type="checkbox"/g)||[]).length,7);}
  console.log('PASS render + navigation + sources: '+m.id);
 }
 for(const m of milestones){assert.ok(m.refs.length);for(const r of m.refs)assert.equal(new URL(r.url).protocol,'https:');}
 const invalid=renderToStaticMarkup(React.createElement(Research,{moduleId:'missing'}));assert.ok(invalid.includes('Milestone 01–08'));
 console.log('PASS milestone source URLs and unknown-route fallback');
}finally{await server.close()}
