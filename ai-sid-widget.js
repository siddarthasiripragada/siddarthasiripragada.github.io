/**
 * AI Sid — Floating Chat Widget
 * ─────────────────────────────
 * Drop-in widget for siddarthasiripragada.github.io
 * One script tag. Works on every page. Zero dependencies.
 *
 * Usage: <script src="ai-sid-widget.js" defer></script>
 */
(function () {
  'use strict';

  // ════════════════════════════════════════════
  //  CONFIG
  // ════════════════════════════════════════════
  const CAL = {
    q15: 'https://calendly.com/siddarthasiripragada/siddarthasiripragada',
    i30: 'https://calendly.com/siddarthasiripragada/siddarthasiripragada',
    c45: 'https://calendly.com/siddarthasiripragada/siddarthasiripragada',
    r60: 'https://calendly.com/siddarthasiripragada/siddarthasiripragada',
  };
  const EMAIL = 'Siddarthasiripragada@gmail.com';

  // ════════════════════════════════════════════
  //  INJECT CSS
  // ════════════════════════════════════════════
  const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');

  :root {
    --sid-navy: #1e3a5f;
    --sid-navy2: #2a4f7c;
    --sid-navy3: rgba(30,58,95,.08);
    --sid-navy4: rgba(30,58,95,.05);
    --sid-paper: #f5f3ef;
    --sid-white: #ffffff;
    --sid-ink: #18181b;
    --sid-ink2: #3f3f46;
    --sid-ink3: #71717a;
    --sid-ink4: #a1a1aa;
    --sid-ink5: #d4d4d8;
    --sid-border: rgba(24,24,27,.08);
    --sid-border2: rgba(24,24,27,.14);
    --sid-green: #16a34a;
    --sid-gold: #b45309;
    --sid-shadow: 0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -1px rgba(0,0,0,.04);
    --sid-shadow2: 0 10px 25px -5px rgba(0,0,0,.1), 0 4px 10px -3px rgba(0,0,0,.05);
    --sid-shadow3: 0 25px 50px -12px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.04);
    --sid-grad: linear-gradient(135deg, #1e3a5f 0%, #2a4f7c 50%, #1d4ed8 100%);
    --sid-ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── FAB ── */
  #sid-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--sid-grad);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(30,58,95,.35), 0 2px 8px rgba(30,58,95,.2);
    transition: transform .25s var(--sid-ease), box-shadow .25s var(--sid-ease), opacity .2s;
    z-index: 2147483640;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  #sid-fab:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 16px 40px rgba(30,58,95,.4), 0 4px 12px rgba(30,58,95,.25);
  }
  #sid-fab:active { transform: scale(0.96); }
  #sid-fab.sid-hidden { opacity: 0; pointer-events: none; transform: scale(0.8); }

  #sid-fab-avatar {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    line-height: 1;
    letter-spacing: -.5px;
  }
  #sid-fab-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #22c55e;
    border: 2px solid #fff;
    animation: sid-pulse-dot 2.5s ease-in-out infinite;
  }
  @keyframes sid-pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.4); }
    50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }
  #sid-fab-ripple {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1.5px solid rgba(30,58,95,.3);
    animation: sid-ripple 2.8s ease-out infinite;
    pointer-events: none;
  }
  @keyframes sid-ripple {
    0% { transform: scale(1); opacity: .6; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  /* ── PANEL ── */
  #sid-panel {
    position: fixed;
    bottom: 100px;
    right: 28px;
    width: 380px;
    height: 560px;
    background: var(--sid-white);
    border-radius: 20px;
    box-shadow: var(--sid-shadow3);
    border: 1px solid var(--sid-border2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 2147483641;
    transition: width .3s var(--sid-ease), height .3s var(--sid-ease),
                bottom .3s var(--sid-ease), right .3s var(--sid-ease),
                border-radius .3s var(--sid-ease),
                transform .3s var(--sid-ease), opacity .25s var(--sid-ease);
    transform-origin: bottom right;
  }
  #sid-panel.sid-hidden {
    opacity: 0;
    pointer-events: none;
    transform: scale(.92) translateY(12px);
  }
  #sid-panel.sid-maximized {
    width: 560px;
    height: 720px;
    bottom: 28px;
    right: 28px;
    border-radius: 20px;
  }
  #sid-panel.sid-minimized {
    height: 68px;
    border-radius: 16px;
  }

  /* ── HEADER ── */
  #sid-header {
    background: var(--sid-grad);
    padding: 16px 18px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    user-select: none;
  }
  #sid-hdr-av {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    background: rgba(255,255,255,.15);
    border: 1.5px solid rgba(255,255,255,.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Instrument Serif', serif;
    font-size: 20px;
    color: #fff;
    flex-shrink: 0;
    backdrop-filter: blur(4px);
  }
  #sid-hdr-info { flex: 1; min-width: 0; }
  #sid-hdr-name {
    font-family: 'Instrument Serif', serif;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    letter-spacing: .01em;
    line-height: 1.2;
  }
  #sid-hdr-sub {
    font-size: 10px;
    color: rgba(255,255,255,.65);
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  #sid-hdr-status {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.2);
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 10px;
    color: rgba(255,255,255,.9);
    letter-spacing: .04em;
    backdrop-filter: blur(4px);
    font-family: 'DM Sans', sans-serif;
  }
  #sid-hdr-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74,222,128,.7);
    flex-shrink: 0;
    animation: sid-pulse-dot 2.5s ease-in-out infinite;
  }
  .sid-hdr-btns {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  .sid-hdr-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.18);
    color: rgba(255,255,255,.85);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s;
    font-family: inherit;
    font-size: 13px;
  }
  .sid-hdr-btn:hover { background: rgba(255,255,255,.22); color: #fff; }

  /* ── POWERED BAR ── */
  #sid-powered {
    padding: 6px 18px;
    background: var(--sid-paper);
    border-bottom: 1px solid var(--sid-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  #sid-powered span {
    font-size: 9.5px;
    color: var(--sid-ink4);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: .04em;
  }
  #sid-powered a {
    font-size: 9.5px;
    color: var(--sid-navy2);
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: .04em;
    opacity: .7;
  }
  #sid-powered a:hover { opacity: 1; }

  /* ── MESSAGES ── */
  #sid-msgs {
    flex: 1;
    overflow-y: auto;
    padding: 18px 16px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--sid-paper);
    scroll-behavior: smooth;
  }
  #sid-msgs::-webkit-scrollbar { width: 3px; }
  #sid-msgs::-webkit-scrollbar-track { background: transparent; }
  #sid-msgs::-webkit-scrollbar-thumb { background: var(--sid-ink5); border-radius: 3px; }

  .sid-row {
    display: flex;
    margin-top: 8px;
    animation: sid-fadeup .2s var(--sid-ease) forwards;
  }
  .sid-row.u { justify-content: flex-end; }
  .sid-row.a { justify-content: flex-start; }
  @keyframes sid-fadeup {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .sid-bbl {
    max-width: 84%;
    padding: 10px 13px;
    font-size: 12.5px;
    line-height: 1.68;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    border-radius: 14px;
    letter-spacing: .01em;
  }
  .sid-bbl.u {
    background: var(--sid-grad);
    color: #fff;
    border-radius: 14px 14px 3px 14px;
    font-weight: 500;
  }
  .sid-bbl.a {
    background: var(--sid-white);
    color: var(--sid-ink2);
    border: 1px solid var(--sid-border2);
    border-radius: 14px 14px 14px 3px;
    box-shadow: var(--sid-shadow);
  }

  /* ── DATE DIVIDER ── */
  .sid-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 4px;
  }
  .sid-divider-line { flex: 1; height: 1px; background: var(--sid-border); }
  .sid-divider-text {
    font-size: 9px;
    color: var(--sid-ink4);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  /* ── TYPING ── */
  .sid-typing {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 11px 14px;
    background: var(--sid-white);
    border: 1px solid var(--sid-border2);
    border-radius: 14px 14px 14px 3px;
    width: fit-content;
    margin-top: 8px;
    box-shadow: var(--sid-shadow);
  }
  .sid-typing-label {
    font-size: 10px;
    color: var(--sid-ink4);
    font-family: 'JetBrains Mono', monospace;
    margin-right: 4px;
    letter-spacing: .03em;
  }
  .sid-d {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sid-navy2);
    opacity: .4;
    animation: sid-bnc 1.3s ease-in-out infinite;
  }
  .sid-d:nth-child(3) { animation-delay: .15s; }
  .sid-d:nth-child(4) { animation-delay: .3s; }
  @keyframes sid-bnc {
    0%,60%,100% { transform: translateY(0); opacity: .4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
  .sid-cur {
    display: inline-block;
    width: 1.5px; height: 12px;
    background: var(--sid-navy2);
    margin-left: 1px;
    vertical-align: text-bottom;
    animation: sid-blk .7s step-end infinite;
  }
  @keyframes sid-blk { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── BOOKING CARD ── */
  .sid-book-card {
    background: var(--sid-white);
    border: 1px solid var(--sid-border2);
    border-radius: 14px 14px 14px 3px;
    overflow: hidden;
    margin-top: 8px;
    max-width: 92%;
    box-shadow: var(--sid-shadow);
    animation: sid-fadeup .2s var(--sid-ease) forwards;
  }
  .sid-book-hdr {
    padding: 12px 14px 9px;
    border-bottom: 1px solid var(--sid-border);
    background: var(--sid-paper);
  }
  .sid-book-hdr strong {
    font-size: 12.5px;
    color: var(--sid-ink);
    font-family: 'Instrument Serif', serif;
    font-weight: 400;
    font-style: italic;
    display: block;
    letter-spacing: -.1px;
  }
  .sid-book-hdr p {
    font-size: 10.5px;
    color: var(--sid-ink4);
    margin-top: 2px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  .sid-book-opts { padding: 8px 10px 10px; display: flex; flex-direction: column; gap: 5px; }
  .sid-book-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 12px;
    background: var(--sid-paper);
    border: 1px solid var(--sid-border);
    border-radius: 8px;
    text-decoration: none;
    transition: all .15s;
    cursor: pointer;
  }
  .sid-book-btn:hover {
    border-color: var(--sid-navy2);
    background: var(--sid-navy4);
    transform: translateX(2px);
  }
  .sid-book-btn-l { display: flex; flex-direction: column; gap: 1px; }
  .sid-book-btn-t {
    font-size: 11.5px;
    color: var(--sid-ink);
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: -.1px;
  }
  .sid-book-btn-s {
    font-size: 9.5px;
    color: var(--sid-ink4);
    font-family: 'DM Sans', sans-serif;
  }
  .sid-book-badge {
    font-size: 9px;
    color: var(--sid-navy2);
    letter-spacing: .05em;
    background: var(--sid-navy3);
    border: 1px solid rgba(30,58,95,.12);
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }
  .sid-book-foot {
    padding: 7px 14px 9px;
    font-size: 9.5px;
    color: var(--sid-ink5);
    letter-spacing: .03em;
    border-top: 1px solid var(--sid-border);
    font-family: 'DM Sans', sans-serif;
  }
  .sid-book-foot a { color: var(--sid-navy2); text-decoration: none; }
  .sid-book-foot a:hover { color: var(--sid-navy); text-decoration: underline; }

  /* ── QUICK REPLIES ── */
  #sid-quick {
    padding: 8px 14px 10px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    background: var(--sid-paper);
    border-top: 1px solid var(--sid-border);
    flex-shrink: 0;
  }
  .sid-qr {
    background: var(--sid-white);
    border: 1px solid var(--sid-border2);
    color: var(--sid-ink3);
    padding: 4px 11px;
    border-radius: 20px;
    font-size: 10.5px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all .15s;
    white-space: nowrap;
    letter-spacing: .01em;
  }
  .sid-qr:hover:not(:disabled) {
    border-color: var(--sid-navy2);
    color: var(--sid-navy);
    background: var(--sid-navy4);
  }
  .sid-qr:disabled { opacity: .4; cursor: not-allowed; }

  /* ── INPUT ── */
  #sid-input-row {
    padding: 10px 12px 12px;
    border-top: 1px solid var(--sid-border);
    background: var(--sid-white);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
  }
  #sid-ta {
    flex: 1;
    background: var(--sid-paper);
    border: 1px solid var(--sid-border2);
    border-radius: 10px;
    padding: 9px 12px;
    color: var(--sid-ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 400;
    resize: none;
    outline: none;
    line-height: 1.5;
    min-height: 38px;
    max-height: 96px;
    transition: border-color .15s;
    overflow-y: auto;
    letter-spacing: .01em;
  }
  #sid-ta::placeholder { color: var(--sid-ink5); }
  #sid-ta:focus { border-color: var(--sid-navy2); background: var(--sid-white); }
  #sid-send {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: var(--sid-grad);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all .15s;
    color: #fff;
    box-shadow: 0 2px 8px rgba(30,58,95,.25);
  }
  #sid-send:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(30,58,95,.35);
  }
  #sid-send:disabled { opacity: .35; cursor: not-allowed; transform: none; box-shadow: none; }

  /* ── MINIMIZED state ── */
  #sid-panel.sid-minimized #sid-powered,
  #sid-panel.sid-minimized #sid-msgs,
  #sid-panel.sid-minimized #sid-quick,
  #sid-panel.sid-minimized #sid-input-row {
    display: none !important;
  }
  #sid-panel.sid-minimized #sid-header { border-radius: 16px; cursor: pointer; }

  /* ── MOBILE ── */
  @media (max-width: 480px) {
    #sid-fab { bottom: 20px; right: 20px; width: 54px; height: 54px; }
    #sid-panel {
      right: 12px !important;
      left: 12px !important;
      bottom: 88px !important;
      width: auto !important;
    }
    #sid-panel.sid-maximized {
      top: 12px !important;
      bottom: 12px !important;
      height: auto !important;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'sid-widget-styles';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ════════════════════════════════════════════
  //  BUILD DOM
  // ════════════════════════════════════════════
  function svg(path, size = 16) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }
  const ICON_MAX  = svg('<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>', 13);
  const ICON_MIN  = svg('<polyline points="9 3 3 3 3 9"/><polyline points="15 21 21 21 21 15"/><line x1="3" y1="3" x2="10" y2="10"/><line x1="21" y1="21" x2="14" y2="14"/>', 13);
  const ICON_DASH = svg('<line x1="5" y1="12" x2="19" y2="12"/>', 13);
  const ICON_X    = svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 13);
  const ICON_SEND = svg('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>', 15);
  const ICON_CHAT = svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', 22);

  // FAB
  const fab = document.createElement('button');
  fab.id = 'sid-fab';
  fab.setAttribute('aria-label', 'Chat with AI Sid');
  fab.innerHTML = `<div id="sid-fab-ripple"></div><span id="sid-fab-avatar">S</span><div id="sid-fab-badge"></div>`;

  // PANEL
  const panel = document.createElement('div');
  panel.id = 'sid-panel';
  panel.classList.add('sid-hidden');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'AI Sid Chat');

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  panel.innerHTML = `
    <div id="sid-header">
      <div id="sid-hdr-av">S</div>
      <div id="sid-hdr-info">
        <div id="sid-hdr-name">AI Sid</div>
        <div id="sid-hdr-sub">ML Engineer · Data Architect · Toronto</div>
      </div>
      <div id="sid-hdr-status"><div id="sid-hdr-dot"></div><span>Online</span></div>
      <div class="sid-hdr-btns">
        <button class="sid-hdr-btn" id="sid-min-btn" title="Minimise">${ICON_DASH}</button>
        <button class="sid-hdr-btn" id="sid-max-btn" title="Maximise">${ICON_MAX}</button>
        <button class="sid-hdr-btn" id="sid-close-btn" title="Close">${ICON_X}</button>
      </div>
    </div>
    <div id="sid-powered">
      <span>✦ AI Sid · Portfolio Assistant</span>
      <a href="https://siddarthasiripragada.github.io/" target="_blank">View full portfolio →</a>
    </div>
    <div id="sid-msgs">
      <div class="sid-divider"><div class="sid-divider-line"></div><div class="sid-divider-text">${timeStr}</div><div class="sid-divider-line"></div></div>
      <div class="sid-row a">
        <div class="sid-bbl a">Hey 👋 I'm AI Sid. Ask me anything about my work — RAG, LLMs, data architecture, hot takes on the modern data stack. Or say <strong>book a meeting</strong> to talk to the real me.</div>
      </div>
    </div>
    <div id="sid-quick">
      <button class="sid-qr" data-q="Will AI replace engineers?">Will AI replace engineers? 🤖</button>
      <button class="sid-qr" data-q="Hot take on data stacks">Hot take 🔥</button>
      <button class="sid-qr" data-q="Snowflake or Databricks?">Snowflake vs Databricks</button>
      <button class="sid-qr" data-q="What's your best project?">Best project?</button>
      <button class="sid-qr" data-q="Book a meeting">Book a meeting 📅</button>
      <button class="sid-qr" data-q="Open Local RAG Chat">Open Local RAG 🧠</button>
    </div>
    <div id="sid-input-row">
      <textarea id="sid-ta" rows="1" placeholder="Ask me anything…"></textarea>
      <button id="sid-send" title="Send">${ICON_SEND}</button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  // ════════════════════════════════════════════
  //  STATE
  // ════════════════════════════════════════════
  let isOpen = false, isMax = false, isMin = false, busy = false;

  function openPanel() {
    isOpen = true;
    panel.classList.remove('sid-hidden');
    fab.classList.add('sid-hidden');
    requestAnimationFrame(() => { scrollBottom(); });
  }
  function closePanel() {
    isOpen = false;
    panel.classList.add('sid-hidden');
    fab.classList.remove('sid-hidden');
    if (isMin) { panel.classList.remove('sid-minimized'); isMin = false; }
  }
  function toggleMax() {
    if (isMin) { toggleMin(); return; }
    isMax = !isMax;
    panel.classList.toggle('sid-maximized', isMax);
    document.getElementById('sid-max-btn').innerHTML = isMax ? ICON_MIN : ICON_MAX;
    document.getElementById('sid-max-btn').title = isMax ? 'Restore' : 'Maximise';
  }
  function toggleMin() {
    isMin = !isMin;
    panel.classList.toggle('sid-minimized', isMin);
    document.getElementById('sid-min-btn').title = isMin ? 'Restore' : 'Minimise';
    if (isMin && isMax) { panel.classList.remove('sid-maximized'); isMax = false; }
  }

  fab.addEventListener('click', openPanel);
  document.getElementById('sid-close-btn').addEventListener('click', closePanel);
  document.getElementById('sid-max-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleMax(); });
  document.getElementById('sid-min-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleMin(); });
  document.getElementById('sid-header').addEventListener('click', (e) => {
    if (e.target.closest('.sid-hdr-btn')) return;
    if (isMin) toggleMin();
  });

  // Quick replies
  document.getElementById('sid-quick').addEventListener('click', (e) => {
    const btn = e.target.closest('.sid-qr');
    if (btn && !btn.disabled) send(btn.getAttribute('data-q'));
  });

  // Input
  const ta = document.getElementById('sid-ta');
  ta.addEventListener('input', () => {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
  });
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  document.getElementById('sid-send').addEventListener('click', () => send());

  // ════════════════════════════════════════════
  //  INTENTS ENGINE
  // ════════════════════════════════════════════
  const INTENTS = [
    { m: [/\bwho are you\b/,/\bintroduce\b/,/\btell me about (your)?self\b/,/\bwhat are you\b/,/\babout you\b/,/\bwho is sid\b/],
      r: ["I'm the digital twin of Siddhartha — Senior ML Engineer and Data Architect from Toronto. 12 years building systems that actually run in production. Ask me anything specific, or say 'book a meeting' to talk to the human version.",
          "Siddhartha Siripragada, ML engineer and data architect. 12+ years of production scars across LLMs, RAG, Data Vault, Spark, cloud ML. I've gone from writing PL/SQL packages to fine-tuning LLMs — and I still have strong opinions about both."]},
    { m: [/^hi\b/,/^hello\b/,/^hey\b/,/^howdy/,/^good (morning|afternoon|evening)/,/^sup\b/,/^yo\b/,/^greetings/],
      r: ["Hey! Ask me anything — RAG, Snowflake, Spark, hot takes on the data industry. Or say 'book a meeting' if you want the real Sid.",
          "Hi! I'm AI Sid. Fire away — technical questions, career questions, spicy takes. I've got answers.",
          "Hey there! What are you curious about? I'm good at ML systems, data architecture, and unpopular opinions."]},
    { m: [/\blocal rag\b/,/\brag chat\b/,/\bopen rag\b/,/\bfull rag\b/,/\bbrowser ai\b/,/\bportfolio rag\b/,/\blocal chatbot\b/,/\brun rag\b/,/\bopen local rag chat\b/],
      r: ["OPEN_LOCAL_RAG"]},
    { m: [/\bbook\b/,/\bmeeting\b/,/\bschedule\b/,/\bcalendly\b/,/\bconsulting enquiry\b/,/\bproject review\b/,/\bquick chat\b/,/\btalk to (the real|sid|you)\b/,/\bget time\b/,/\bappointment\b/,/\bhire me\b/,/\bengage\b/,/\bavailab/],
      r: ["SHOW_BOOKING"]},
    { m: [/\bai.*replace\b/,/\breplace.*human\b/,/\bjobs.*ai\b/,/\bai.*jobs\b/,/\boutdated\b/,/\bobsolete\b/,/\bfuture.*work\b/,/\bai.*take.*job\b/,/\bwill.*ai\b/,/\bengineers.*future\b/],
      r: ["AI will replace engineers who use it as a crutch — the ones who can't explain what the model is doing or why the pipeline failed. It won't replace engineers who use it as a force multiplier. I already write better systems faster with AI assistance. The gap between those two groups is enormous and growing.",
          "Hot take: AI won't replace data engineers, it'll replace the parts nobody wanted anyway — writing boilerplate, documenting schemas, formatting queries. The hard parts — system design, debugging production failures at 2am, knowing which business question the data actually *can't* answer — those stay human for a while.",
          "The engineers who get replaced aren't replaced by AI — they're replaced by engineers *using* AI. That's already happening. I'm firmly in the second camp."]},
    { m: [/\bhot take\b/,/\bopinion\b/,/\bcontrovers/,/\bunpopular.*opinion\b/,/\boverrated\b/,/\bunderrated\b/,/\breal talk\b/,/\btruth.*about\b/,/\bfight me\b/],
      r: ["Hot take: most companies don't have a data problem, they have a data *trust* problem. The warehouse is full of data nobody believes. Fix data quality before you build the next dashboard. Unpopular in meetings. Accurate in practice.",
          "Unpopular opinion: 90% of ML projects should have been a SQL query. People reach for models when the answer was already in the data. Did you check if a simple threshold rule gets you 80% there in a day? Nobody wants to hear that.",
          "Real talk: the modern data stack is overengineered for most companies. Kafka + Spark + Delta + Databricks + dbt + Airflow + Snowflake is beautiful architecture. It's also overkill if you have 10GB of data and three analysts. Know what you actually need."]},
    { m: [/\bfuture.*data\b/,/\bdata.*future\b/,/\bfuture.*ml\b/,/\btrend\b/,/\bnext.*big\b/,/\bwhat.*next\b/,/\bwhere.*heading\b/,/\bevolution\b/,/\b2025\b/,/\b2026\b/,/\bcoming years\b/],
      r: ["Where it's going: the separation between data engineering and ML engineering disappears. The pipeline IS the model. Real-time feature computation, streaming inference, feedback loops built into the architecture from day one. The batch vs. streaming distinction also fades.",
          "The next competitive advantage isn't having AI — everyone will have AI. It's having clean, trusted, well-modeled data that AI can actually reason over. Data quality is back as the differentiator. Same as always, just higher stakes.",
          "Prediction: agentic AI starts doing what junior data engineers do today — writing pipelines, monitoring jobs, suggesting schema changes. That doesn't eliminate the role, it elevates it. You become the architect of systems that partially manage themselves."]},
    { m: [/\brag\b/,/\bretrieval.augmented\b/,/retrieval augmented/,/\bvector search\b/,/\bembedding/,/\bpinecone\b/,/\bfaiss\b/,/\bchunking\b/,/\bsemantic search\b/,/\bcross.encoder\b/,/\breranking\b/,/\bgte model\b/],
      r: ["RAG is my comfort zone. GTE embeddings with spaCy NER for entity-aware chunking — that's the part most people skip, and it's why their recall is patchy. Retrieval → cross-encoder reranking → LLM synthesis with citation grounding. Run it in production on AWS Bedrock. The NER-chunking combo is the actual secret weapon.",
          "I've built real RAG in production, not just tutorials. The entity-aware chunking using spaCy is the part most RAG demos skip. It means your chunks respect named entities instead of slicing through them mid-sentence. That alone moves the needle significantly on retrieval precision.",
          "Ask me anything about RAG — I've built it end-to-end. The part people underestimate is chunking strategy. Sentence-based chunking sounds reasonable until your retrieval starts pulling half an entity name. NER-aware boundaries fix that."]},
    { m: [/\bllm\b/,/\blarge language model\b/,/\bgpt\b/,/\bbedrock\b/,/\bsagemaker\b/,/\bfine.tun/,/\bfinetun/,/\bqlora\b/,/\blora\b/,/\bllama\b/,/\bgenerative ai\b/,/\bgen ai\b/,/\bcortex\b/,/\bsentiment\b/,/\bnlp\b/,/\bhuggingface\b/,/\btransformer\b/],
      r: ["I led LLM deployments on AWS Bedrock and SageMaker for large-scale text classification — sentiment analysis at scale. Fine-tuned with LoRA/QLoRA on domain-specific datasets using Databricks ML Runtime. Hugging Face for experimentation, Bedrock for production inference. I also hold the Databricks LLMs through Production cert from 2024.",
          "Fine-tuning with QLoRA is something I've done in production, not just on toy datasets. Databricks ML Runtime + Ray for distributed training. The real skill is knowing when fine-tuning is worth it versus just improving your prompt and retrieval. Most problems are retrieval problems, not model problems.",
          "Bedrock for inference at scale, SageMaker for training pipelines, Hugging Face for everything in between. The unglamorous part — data cleaning before fine-tuning — takes longer than the training. That's where the actual quality comes from."]},
    { m: [/\bmlflow\b/,/\bmlops\b/,/\bexperiment track/,/\bmodel registry\b/,/\bmodel lifecycle\b/,/\bmodel deploy/,/\bml pipeline\b/],
      r: ["MLFlow is my production standard. Experiment tracking, model versioning, artifact logging, deployment — the full loop. The thing people skip: making sure the production environment matches training exactly. MLFlow solves that when you're disciplined about it.",
          "MLOps is underrated. Everyone talks about the model; nobody talks about reproducing it six months later when it's drifting. MLFlow handles that. Experiment tracking, model registry, deployment — I use it on every ML project."]},
    { m: [/\bsnowflake.*vs.*databricks\b/,/\bdatabricks.*vs.*snowflake\b/,/\bsnowflake or databricks\b/,/\bdatabricks or snowflake\b/,/\bcompare.*snowflake.*databricks\b/],
      r: ["Use both. Databricks for ML pipelines, heavy Spark workloads, streaming. Snowflake as the analytics warehouse for SQL-heavy BI teams. They're complementary. The mistake is forcing one to do the job of the other. If budget forces a choice: Databricks for ML-heavy orgs, Snowflake for analytics-heavy ones.",
          "Not a versus question — it's a 'which layer are you solving for' question. Databricks is compute. Snowflake is warehouse. I've run them together on the same projects. The tension only exists if you're trying to cut costs by eliminating one."]},
    { m: [/\bsnowflake\b/,/\bsnowsql\b/,/\bclustering key\b/,/\bmaterialized view\b/,/\bvirtual warehouse\b/],
      r: ["Snowflake is my primary warehouse. Physical modeling, clustering key strategy, materialized view tuning. Hot take: most Snowflake performance problems are clustering key problems. People choose them based on intuition instead of query profiling.",
          "I've done full Snowflake migrations from SQL Server — remodeled tables, rebuilt ETL, automated ingestion. Cost governance is underrated. Warehouse sizing decisions made on day one haunt you for years."]},
    { m: [/\bdatabricks\b/,/\bdelta lake\b/,/\bmedallion\b/,/\bbronze.*silver\b/,/\blakehouse\b/,/\bml runtime\b/],
      r: ["Databricks is my ML and data engineering platform. Medallion architecture (Bronze → Silver → Gold), Spark optimization — skew with salting, broadcast joins, partition tuning — and ML Runtime with Ray for distributed LLM fine-tuning. Delta Lake for ACID-compliant lakehouse patterns.",
          "I use Databricks for compute-heavy work — distributed ML training, complex Spark jobs, streaming pipelines with Delta Lake. The mistake is treating it like a notebook environment instead of a production platform."]},
    { m: [/\bspark\b/,/\bpyspark\b/,/\bdata skew\b/,/\bbroadcast join\b/,/\bspark.*optim/,/\bspark.*perform/],
      r: ["Spark performance is half science, half archaeology. I've reduced job times dramatically in production — wins from skew resolution with salting, replacing shuffle joins with broadcast joins, and partition strategy tuning. Most Spark problems are the same three problems in different clothes: skew, shuffle, wrong parallelism.",
          "PySpark is a primary tool for me. The most common mistake: not looking at the execution plan before optimizing. `explain()` first — you might be fixing the wrong thing. Skew + salting, broadcast for small dimensions, right-sized partitions. That covers 80% of the wins."]},
    { m: [/\bkafka\b/,/\bstreaming\b/,/\breal.time\b/,/\bspark streaming\b/,/\blambda architecture\b/,/\bavro\b/],
      r: ["Built Lambda architectures with 2TB+ daily — Kafka → Spark Structured Streaming → Delta Lake → Synapse for BI. Sub-90 second end-to-end SLA. The parts nobody talks about: Avro schema registry for schema evolution, dead-letter queue design so bad records don't silently disappear.",
          "Kafka partition design is one of those decisions that's cheap to get right and expensive to fix later. I've designed for 18+ source systems with proper consumer group isolation, Avro schemas, and consumer lag alerting so you know about problems before the business does."]},
    { m: [/\bazure\b/,/\badf\b/,/\bsynapse\b/,/\badls\b/,/\bazure data lake\b/,/\bazure databricks\b/],
      r: ["4+ years in Azure. Databricks for compute and ML, ADF for orchestration, ADLS Gen2 for storage, Synapse for warehousing. I've built custom Airflow operators and sensors for Azure service integration — when ADF isn't flexible enough, custom operators give you the control back.",
          "Azure data platform is well-designed when used as intended. ADF for pipeline orchestration, Databricks for heavy compute, Synapse for SQL analytics, ADLS as the storage backbone. Lambda architecture on Azure at 2TB+ daily with sub-90s SLAs."]},
    { m: [/\baws\b/,/\bamazon\b/,/\bs3\b/,/\bemr\b/,/\bathena\b/,/\bredshift\b/,/\baws bedrock\b/,/\baws sagemaker\b/],
      r: ["AWS ML stack: Bedrock for foundation model inference, SageMaker for training and fine-tuning, EMR for Spark at scale, S3 as the data backbone. Athena for ad-hoc queries over S3 when you don't want to spin up a warehouse just for exploration.",
          "Solid AWS across data and ML. Bedrock gave me managed foundation model inference without managing infrastructure. SageMaker for training pipelines with proper experiment tracking. S3 + EMR + Athena as the data lake stack."]},
    { m: [/\bdata vault\b/,/\bhub.*satellite\b/,/\bdv2\b/,/\bhash key\b/,/\bhashdiff\b/,/\binformation mart\b/],
      r: ["Data Vault 2.0 is my choice when audit trails and source system independence matter. Hubs for business keys, Links for relationships, Satellites for descriptive history. Metadata-driven ELT with automated hash keys, HASH_DIFF change detection, full historization. The Information Mart layer serves a Kimball star schema to BI.",
          "Data Vault gets a bad reputation for complexity — some of it deserved when people implement it dogmatically. The right approach: use it where it solves a real problem (auditability, multiple sources, frequent schema changes). Don't force it where a simple star schema would do."]},
    { m: [/\bkimball\b/,/\bstar schema\b/,/\bdimensional\b/,/\bfact table\b/,/\bscd\b/,/\bslowly changing\b/],
      r: ["Kimball dimensional modeling is the right answer for BI-facing layers. The BI tool's query patterns should drive grain decisions — something teams often figure out after the fact. I've supported Tableau and Power BI layers built on these models, and the design decisions you make upfront directly determine dashboard load times.",
          "Star schemas done right are elegant. Done wrong, they're a maze of slowly changing dimensions nobody wants to touch. The key is grain discipline — define the grain before any other column. That one rule prevents most of the regrettable design decisions."]},
    { m: [/\bpython\b/,/\bpandas\b/,/\bnumpy\b/,/\bpytorch\b/,/\btensorflow\b/,/\bscikit.?learn\b/,/\bsklearn\b/],
      r: ["Python is my primary language — Pandas for data, PyTorch for ML, PySpark for distributed, Hugging Face for LLMs, scikit-learn for classical ML. I write production-quality Python: modular, tested, CI/CD ready. Not notebooks that work once and then become archaeological artifacts.",
          "Python fluency means different things in different contexts: clean Pandas pipelines, PyTorch for model training, PySpark for scale, FastAPI when I need to serve something. The common thread is writing code other people can actually maintain."]},
    { m: [/\bsql\b/,/\bpl.sql\b/,/\bt-sql\b/,/\bstored proc/,/\bcte\b/,/\bwindow function\b/,/\bquery optim/,/\bexecution plan\b/],
      r: ["SQL is a first-class skill for me — T-SQL, PL/SQL, Snowflake SQL, all fluent. Complex stored procedures, CTEs, window functions, execution plan analysis, index strategy. The execution plan is always the starting point — you can't optimize what you haven't measured.",
          "Strong SQL is underrated in the ML world. I've rewritten queries that took hours and got them under a minute. Understanding what the database is *actually* doing — not just what you told it to do — is the difference."]},
    { m: [/\bwhat makes.*great\b/,/\bgood engineer\b/,/\bsenior.*mindset\b/,/\bprinciple\b/,/\bphilosophy\b.*\beng/,/\bbest.*engineer\b/],
      r: ["The best engineers I've worked with share one trait: they ask 'why' before 'how'. Understanding the business problem before writing code sounds obvious and is constantly skipped. Second trait: they make things observable. If you can't monitor it, you don't know if it's working.",
          "Great engineers are defined by how they handle being wrong. Not whether they're wrong — everyone is sometimes. The ones who investigate first, update their mental model, and fix it cleanly — those are the people I want on a team."]},
    { m: [/\bbuild.*vs.*buy\b/,/\bbuy.*vs.*build\b/,/\bbuild or buy\b/,/\bvendor\b/,/\bcustom.*vs\b/],
      r: ["Build vs buy: buy the commodity, build the differentiation. Nobody's business logic is so unique they need a custom orchestration engine. But your feature engineering pipeline that encodes domain knowledge? Worth building carefully. The trap is building what you should buy and buying what you should own.",
          "Default to buy for infrastructure, build for domain logic. I've seen teams spend six months building a data catalog that Unity Catalog does out of the box. Save the custom work for problems nobody else has solved."]},
    { m: [/\bbest project\b/,/\bfavorite project\b/,/\bproudest\b/,/\bbiggest achievement\b/,/\bbiggest flex\b/,/\bmost impressive\b/,/\bmost proud\b/],
      r: ["The one I'm most proud of: a production RAG system over a large document corpus. Not because RAG is fancy, but because getting it to work *reliably* in production — entity-aware chunking, reranking, citation grounding, low latency — required solving about eight non-obvious problems. Most RAG demos are easy. Production RAG is hard.",
          "Hard to pick one. The LLM fine-tuning pipeline on Databricks with Ray was technically most challenging. But the Data Vault warehouse that became the foundation for an entire company's analytics layer is the one I'd call most impactful."]},
    { m: [/\bimposter\b/,/\bcareer.*advice\b/,/\badvice.*career\b/,/\bstarting out\b/,/\bjunior\b/,/\bbreak into\b/,/\blearn\b.*\bdata\b/],
      r: ["Career advice I wish someone told me earlier: go deep on fundamentals — SQL, data modeling, distributed systems thinking. The tools change every few years. The fundamentals don't. Someone who deeply understands data at rest and data in motion can adapt to any new platform.",
          "Every engineer who's being honest has felt imposter syndrome. The cure isn't confidence — it's reps. You build something that works in production and the doubt shrinks a little. After 12 years I still hit problems I've never seen before. The difference is I know I've solved hard problems before."]},
    { m: [/\bwhy (should|hire|would)\b/,/\bwhy you\b/,/\bvalue.*bring\b/,/\bstand out\b/,/\bunique\b.*\byou\b/,/\bwhat.*offer\b/],
      r: ["12 years of production scars. I can architect the system in the morning, review the Spark execution plan at lunch, and talk to the business stakeholder in the afternoon. That full-stack thinking — from data model to ML model to business outcome — is rarer than any individual skill on a resume.",
          "I don't just build models, I build systems that keep running after I leave. Proper MLOps, documented data models, monitored pipelines, code the next person can maintain. The flashy part is fine-tuning an LLM. The hard part is making sure it's still working correctly six months later."]},
    { m: [/\bconsult/,/\bfreelance\b/,/\bcontract\b/,/\bopen to\b/,/\bopportunit/,/\bengagement\b/,/\brate\b/],
      r: ["Open to senior FTE roles and consulting engagements in ML engineering, data architecture, and cloud platform design. Consulting works best as project-based architecture work or embedded engineering in an existing team. Say 'book a meeting' and let's talk.",
          "Open to the right opportunity — FTE or consulting. I specialize in production ML systems, data architecture, and cloud platform modernization. If you have a real problem, book a 30-minute call. No pitch, just a conversation."]},
    { m: [/\bwhere.*based\b/,/\btoronto\b/,/\bcanada\b/,/\bcanadian\b/,/\bvisa\b/,/\bremote\b/,/\blocated\b/,/\blocation\b/],
      r: ["Toronto, Ontario, Canada. Canadian citizen — no visa or sponsorship needed. Remote works great; I've worked in distributed teams for years. Open to hybrid for the right Toronto-area role.",
          "Based in Toronto, Canadian citizen. Remote-first is comfortable. Have worked with clients across North America and some APAC. No relocation complications."]},
    { m: [/\bcontact\b/,/\bemail\b/,/\blinkedin\b/,/\bgithub\b/,/\breach\b/,/\bconnect\b/,/\bget in touch\b/],
      r: [`Email: ${EMAIL}. LinkedIn: linkedin.com/in/siddharthasiripragada. GitHub: github.com/siddarthasiripragada. Or just say 'book a meeting' and I'll pull up the calendar.`]},
    { m: [/\bhow.*are you\b/,/\bhow.*doing\b/,/\bwhat.*up\b/,/\bwhat's new\b/],
      r: ["Doing well. Probably thinking about a Spark optimization problem in the background, as usual. What can I help with?",
          "Good, thanks for asking. Ready to talk data and ML — what's on your mind?",
          "Excellent. Deep in thought about clustering keys, as always. What do you need?"]},
    { m: [/\bthanks\b/,/\bthank you\b/,/\bthx\b/,/\bappreciate\b/,/\bawesome\b/,/\bgreat.*answer\b/,/\bperfect\b/],
      r: ["Anytime! Anything else you're curious about, or ready to book a call?",
          "Happy to help. More questions, or shall I show you how to book time with Sid?",
          "Of course. Ask me anything else — or say 'book a meeting' to connect directly."]},
    { m: [/\bbye\b/,/\bgoodbye\b/,/\bsee you\b/,/\btake care\b/,/\blater\b/,/\bsigning off\b/],
      r: ["Take care! Come back anytime, or reach out at " + EMAIL,
          "Cheers! The portfolio is at siddarthasiripragada.github.io if you want to explore further."]},
    { m: [/\bhow.*work\b/,/\bhow.*built\b/,/\bno api\b/,/\bfree\b.*\bchat\b/,/\bcost\b.*\bchat\b/],
      r: ["Pure JavaScript, runs entirely in your browser. Zero API calls, zero backend, zero cost. Pattern matching against a curated knowledge base — the responses are pre-written by Sid, not generated live. Think of it as a smart FAQ with personality.",
          "Everything runs in your browser only. No server, no API key, no cost. Fast, private, and works even offline. The streaming effect is simulated; the answers are real — written by Sid."]},
  ];

  const FALLBACKS = [
    "Not quite in my knowledge base — I'm best on RAG, ML systems, Snowflake, Databricks, Spark, LLMs, and data architecture. Or say 'book a meeting' to talk to Sid directly.",
    "That one's outside my scope. Try asking about my stack, a specific technology, or a project. Or type 'book a meeting' if you'd rather just talk.",
    "Drawing a blank on that one. Ask me something specific — Kafka, Python, Data Vault, MLFlow, fine-tuning, hot takes — and I'll give you a real answer.",
    "Hmm, not picking that up. Ask me about RAG, LLMs, data architecture, or the future of engineering. Or just say 'book a call'.",
  ];

  function matchIntent(q) {
    const ql = q.toLowerCase().trim();
    const localRagTriggers = ['local rag','rag chat','open rag','full rag','browser ai','portfolio rag','local chatbot','run rag','open local rag chat'];
    for (const t of localRagTriggers) if (ql.includes(t)) return 'OPEN_LOCAL_RAG';
    const bookTriggers = ['book','meeting','call','appointment','schedule','calendly','consult','project review','quick chat','talk to sid','get time','hire'];
    for (const t of bookTriggers) if (ql.includes(t)) return 'SHOW_BOOKING';
    for (const intent of INTENTS) {
      for (const p of intent.m) {
        if (p.test(ql)) {
          const rs = intent.r;
          return rs[Math.floor(Math.random() * rs.length)];
        }
      }
    }
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }

  // ════════════════════════════════════════════
  //  RENDER HELPERS
  // ════════════════════════════════════════════
  const msgs = () => document.getElementById('sid-msgs');
  function scrollBottom() {
    const m = msgs();
    requestAnimationFrame(() => { m.scrollTop = m.scrollHeight; });
  }

  function addBubble(role, text) {
    const m = msgs();
    const row = document.createElement('div'); row.className = 'sid-row ' + role;
    const b = document.createElement('div'); b.className = 'sid-bbl ' + role;
    if (role === 'a') b.innerHTML = text; else b.textContent = text;
    row.appendChild(b); m.appendChild(row); scrollBottom();
    return b;
  }

  function showTyping() {
    const m = msgs();
    const w = document.createElement('div'); w.className = 'sid-typing'; w.id = 'sid-ty';
    w.innerHTML = '<span class="sid-typing-label">Sid is typing</span><div class="sid-d"></div><div class="sid-d"></div><div class="sid-d"></div>';
    m.appendChild(w); scrollBottom();
  }
  function hideTyping() { const e = document.getElementById('sid-ty'); if (e) e.remove(); }

  function stream(text, done) {
    const m = msgs();
    const row = document.createElement('div'); row.className = 'sid-row a';
    const b = document.createElement('div'); b.className = 'sid-bbl a';
    b.innerHTML = '<span class="sid-cur"></span>';
    row.appendChild(b); m.appendChild(row); scrollBottom();
    let i = 0;
    const iv = setInterval(() => {
      i += Math.floor(Math.random() * 5) + 2;
      if (i >= text.length) {
        clearInterval(iv);
        b.innerHTML = text;
        if (done) done();
      } else {
        b.innerHTML = text.slice(0, i) + '<span class="sid-cur"></span>';
      }
      scrollBottom();
    }, 14);
  }

  function showBooking() {
    const m = msgs();
    const c = document.createElement('div'); c.className = 'sid-book-card';
    c.innerHTML = `
      <div class="sid-book-hdr">
        <strong>📅 Book time with Siddhartha</strong>
        <p>Pick the format that suits — all bookings via Calendly.</p>
      </div>
      <div class="sid-book-opts">
        <a class="sid-book-btn" href="${CAL.q15}" target="_blank" rel="noopener">
          <div class="sid-book-btn-l"><span class="sid-book-btn-t">Quick Chat</span><span class="sid-book-btn-s">Casual intro or a quick question</span></div>
          <span class="sid-book-badge">15 min</span>
        </a>
        <a class="sid-book-btn" href="${CAL.i30}" target="_blank" rel="noopener">
          <div class="sid-book-btn-l"><span class="sid-book-btn-t">1-1 Intro Call</span><span class="sid-book-btn-s">Opportunities or collaboration</span></div>
          <span class="sid-book-badge">30 min</span>
        </a>
        <a class="sid-book-btn" href="${CAL.c45}" target="_blank" rel="noopener">
          <div class="sid-book-btn-l"><span class="sid-book-btn-t">Consulting Enquiry</span><span class="sid-book-btn-s">Scope a data or ML project</span></div>
          <span class="sid-book-badge">45 min</span>
        </a>
        <a class="sid-book-btn" href="${CAL.r60}" target="_blank" rel="noopener">
          <div class="sid-book-btn-l"><span class="sid-book-btn-t">Project Review</span><span class="sid-book-btn-s">Deep dive into your system or architecture</span></div>
          <span class="sid-book-badge">60 min</span>
        </a>
      </div>
      <div class="sid-book-foot">Or email: <a href="mailto:${EMAIL}">${EMAIL}</a></div>
    `;
    m.appendChild(c); scrollBottom();
  }


  function showLocalRagCard() {
    const m = msgs();
    const c = document.createElement('div'); c.className = 'sid-book-card';
    c.innerHTML = `
      <div class="sid-book-hdr">
        <strong>🧠 Open the full Local RAG Chat</strong>
        <p>This launches the real browser-side RAG demo: local embeddings, vector retrieval, and generation running in your browser without a backend or API key.</p>
      </div>
      <div class="sid-book-opts">
        <a class="sid-book-btn" href="local-rag-chat.html" target="_blank" rel="noopener">
          <div class="sid-book-btn-l"><span class="sid-book-btn-t">Launch Local RAG Chat</span><span class="sid-book-btn-s">Build a local index and ask about Sid's portfolio</span></div>
          <span class="sid-book-badge">Open →</span>
        </a>
      </div>
      <div class="sid-book-foot">Best on desktop Chrome/Edge. First load downloads model files.</div>
    `;
    m.appendChild(c); scrollBottom();
  }

  function lock(v) {
    busy = v;
    document.getElementById('sid-send').disabled = v;
    document.querySelectorAll('.sid-qr').forEach(b => b.disabled = v);
    ta.disabled = v;
  }

  function send(prefill) {
    if (busy) return;
    const text = (prefill || ta.value).trim();
    if (!text) return;
    ta.value = ''; ta.style.height = 'auto';
    addBubble('u', text);
    lock(true);
    showTyping();
    const delay = 380 + Math.random() * 480;
    setTimeout(() => {
      hideTyping();
      const answer = matchIntent(text);
      if (answer === 'SHOW_BOOKING') {
        stream('Sure! Here\'s how to get time with me:', () => {
          setTimeout(() => { showBooking(); lock(false); }, 220);
        });
      } else if (answer === 'OPEN_LOCAL_RAG') {
        stream('Absolutely — the full local RAG demo is separate from this lightweight widget so the portfolio stays fast:', () => {
          setTimeout(() => { showLocalRagCard(); lock(false); }, 220);
        });
      } else {
        stream(answer, () => { lock(false); });
      }
    }, delay);
  }

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) {
      // Don't auto-close — just a quality-of-life choice
    }
  });

  // Keyboard: Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

})();
