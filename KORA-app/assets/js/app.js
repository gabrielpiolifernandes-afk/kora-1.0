/* KORA — App mobile (mock + helpers) */

const fmtBRL = (n) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL'
}).format(n);

const fmtDate = (iso) => new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit', month: 'short'
}).format(new Date(iso));

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* Score ring helper */
function makeRing(el, value, size=72, thick=6) {
  const r = (size/2) - (thick/2) - 1;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value/100);
  const klass = value <= 40 ? 'risk' : value <= 60 ? 'unstable' : value <= 80 ? 'healthy' : 'excellent';
  el.classList.add('score-ring--' + klass);
  el.innerHTML = `
    <svg class="score-ring__svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="score-ring__track" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${thick}"/>
      <circle class="score-ring__bar"   cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${thick}"
              stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
    </svg>
    <div class="score-ring__center"><div>
      <div class="score-ring__value">${value}</div>
      ${size >= 120 ? `<div class="score-ring__label">${labelFor(value)}</div>` : ''}
    </div></div>
  `;
}

function makeMiniRing(el, value, size=72, thick=6) {
  const r = (size/2) - (thick/2) - 1;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value/100);
  el.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg)">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="var(--line)" fill="none" stroke-width="${thick}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="var(--accent)" fill="none" stroke-width="${thick}"
              stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
    </svg>
    <div class="score-mini__value">${value}</div>
  `;
}

function labelFor(v) {
  if (v <= 40) return 'Alto risco';
  if (v <= 60) return 'Instável';
  if (v <= 80) return 'Saudável';
  return 'Excelente';
}

/* Forecast chart simplificado para mobile */
function drawForecast(rootSel) {
  const root = $(rootSel);
  if (!root) return;
  const W = 340, H = 200, PAD = 24;

  const today = new Date('2026-04-30');
  const past = [];
  let bal = 6480;
  for (let d = 30; d > 0; d--) {
    const dt = new Date(today); dt.setDate(today.getDate() - d);
    bal += (Math.random() - 0.45) * 220;
    past.push({ date: dt.toISOString(), value: Math.round(bal) });
  }
  const future = [];
  let f = past[past.length - 1].value;
  for (let d = 1; d <= 30; d++) {
    const dt = new Date(today); dt.setDate(today.getDate() + d);
    f += (Math.random() - 0.55) * 240;
    future.push({ date: dt.toISOString(), value: Math.round(f) });
  }
  const all = [...past, ...future];
  const ys = all.map(p => p.value);
  const minY = Math.min(...ys, 0) - 200;
  const maxY = Math.max(...ys) + 400;
  const sx = i => PAD + (i / (all.length - 1)) * (W - 2*PAD);
  const sy = v => H - PAD - ((v - minY)/(maxY - minY)) * (H - 2*PAD);

  const pPast = past.map((p, i) => `${i===0?'M':'L'} ${sx(i).toFixed(1)} ${sy(p.value).toFixed(1)}`).join(' ');
  const pFut = future.map((p, i) => `${i===0?'M':'L'} ${sx(past.length-1+i).toFixed(1)} ${sy(p.value).toFixed(1)}`).join(' ');

  const zeroY = sy(0);
  const todayX = sx(past.length - 1);

  root.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMidYMid meet">
      <line x1="${PAD}" y1="${zeroY}" x2="${W-PAD}" y2="${zeroY}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
      <line x1="${todayX}" y1="${PAD-4}" x2="${todayX}" y2="${H-PAD}" stroke="var(--fg-muted)" stroke-width="1" stroke-dasharray="2 3" opacity=".4"/>
      <text x="${todayX}" y="${PAD-8}" font-size="9" fill="var(--fg-muted)" text-anchor="middle">hoje</text>
      <path d="${pPast}" fill="none" stroke="var(--kora-brown)" stroke-width="2.2"/>
      <path d="${pFut}"  fill="none" stroke="var(--accent)"     stroke-width="2.2" stroke-dasharray="5 4"/>
      <text x="${PAD}" y="${H-6}" font-size="9" fill="var(--fg-subtle)">−30d</text>
      <text x="${W-PAD}" y="${H-6}" font-size="9" fill="var(--fg-subtle)" text-anchor="end">+30d</text>
    </svg>
  `;
}

/* Score history mini */
function drawScoreHistory(rootSel) {
  const root = $(rootSel);
  if (!root) return;
  const points = [
    {date:'nov',v:51},{date:'dez',v:55},{date:'jan',v:58},
    {date:'fev',v:60},{date:'mar',v:63},{date:'abr',v:67}
  ];
  const W=340, H=160, PAD=24;
  const ys = points.map(p=>p.v);
  const minY = Math.min(...ys)-3;
  const maxY = Math.max(...ys)+3;
  const sx = i => PAD + (i/(points.length-1))*(W-2*PAD);
  const sy = v => H - PAD - ((v-minY)/(maxY-minY))*(H-2*PAD);
  const path = points.map((p,i)=>`${i===0?'M':'L'} ${sx(i).toFixed(1)} ${sy(p.v).toFixed(1)}`).join(' ');
  const dots = points.map((p,i)=>`<circle cx="${sx(i)}" cy="${sy(p.v)}" r="3" fill="#fff" stroke="var(--accent)" stroke-width="2"/>`).join('');
  const labs = points.map((p,i)=>`<text x="${sx(i)}" y="${H-6}" font-size="9" fill="var(--fg-subtle)" text-anchor="middle">${p.date}</text>`).join('');
  const vals = points.map((p,i)=>`<text x="${sx(i)}" y="${sy(p.v)-9}" font-size="10" font-weight="700" fill="var(--fg)" text-anchor="middle">${p.v}</text>`).join('');
  root.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%">
      <path d="${path} L ${sx(points.length-1)} ${H-PAD} L ${sx(0)} ${H-PAD} Z" fill="rgba(164,74,63,.08)"/>
      <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
      ${dots}${vals}${labs}
    </svg>
  `;
}

/* Toggles + hide balance */
document.addEventListener('DOMContentLoaded', () => {
  $$('.toggle').forEach(t => t.addEventListener('click', () => t.classList.toggle('is-on')));

  // Hide balance toggle
  const eye = $('.hero-balance__eye');
  const amount = $('.hero-balance__amount-value');
  if (eye && amount) {
    let hidden = false;
    eye.addEventListener('click', () => {
      hidden = !hidden;
      amount.textContent = hidden ? '••••••' : amount.dataset.value;
      eye.textContent = hidden ? '○' : '●';
    });
  }

  // Auto rings
  $$('.score-ring[data-value]').forEach(el => {
    const v = parseInt(el.dataset.value, 10);
    const size = parseInt(el.dataset.size || 200);
    const thick = parseInt(el.dataset.thick || 12);
    makeRing(el, v, size, thick);
  });
  $$('.score-mini__ring[data-value]').forEach(el => {
    const v = parseInt(el.dataset.value, 10);
    makeMiniRing(el, v, 72, 6);
  });

  // Auto charts
  drawForecast('#forecast');
  drawScoreHistory('#score-history');

  // Tab navigation logging (for demo)
  $$('.tab').forEach(t => {
    t.addEventListener('click', e => {
      if (!t.getAttribute('href')) e.preventDefault();
    });
  });
});
