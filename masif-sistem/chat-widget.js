/**
 * masif. klinik — AI Danışman Chat Widget
 * Design: animated-ai-chat style × masif-sistem palette
 */
;(function () {
  'use strict'

  const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
  const API_BASE = IS_LOCAL ? 'http://localhost:3000' : '';

  // ─────────────────────────────────────────
  // CSS
  // ─────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    #msk-root * {
      box-sizing: border-box; margin: 0; padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Trigger ── */
    #msk-trigger {
      position: fixed;
      bottom: 32px; right: 32px;
      z-index: 9999;
      width: 64px; height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0369a1, #0ea5e9, #38bdf8);
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
      box-shadow: 0 0 0 0 rgba(14,165,233,0.4), 0 8px 32px rgba(14,165,233,0.35);
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
      animation: msk-ring 3s ease-in-out infinite;
    }
    @keyframes msk-ring {
      0%, 100% { box-shadow: 0 0 0 0 rgba(14,165,233,0.4), 0 8px 32px rgba(14,165,233,0.3); }
      50%       { box-shadow: 0 0 0 10px rgba(14,165,233,0), 0 8px 32px rgba(14,165,233,0.5); }
    }
    #msk-trigger:hover {
      transform: scale(1.1);
      box-shadow: 0 0 0 0 rgba(14,165,233,0), 0 12px 40px rgba(14,165,233,0.55);
    }
    #msk-trigger.msk-open { animation: none; box-shadow: 0 8px 32px rgba(14,165,233,0.2); }

    #msk-trigger .msk-badge {
      position: absolute; top: 0; right: 0;
      width: 16px; height: 16px;
      background: #22c55e;
      border-radius: 50%;
      border: 2.5px solid #04080f;
    }
    #msk-trigger .msk-badge::after {
      content: '';
      position: absolute; inset: -3px;
      border-radius: 50%;
      background: rgba(34,197,94,0.3);
      animation: msk-ping 2s cubic-bezier(0,0,0.2,1) infinite;
    }
    @keyframes msk-ping {
      0%      { transform: scale(1); opacity: 0.8; }
      75%,100% { transform: scale(2.2); opacity: 0; }
    }

    /* ── Panel ── */
    #msk-panel {
      position: fixed;
      bottom: 112px; right: 32px;
      z-index: 9998;
      width: 460px;
      max-height: min(680px, calc(100dvh - 140px));
      background: rgba(4, 12, 26, 0.92);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 24px;
      display: flex; flex-direction: column;
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(14,165,233,0.06),
        0 32px 80px rgba(0,0,0,0.7),
        0 8px 32px rgba(14,165,233,0.08);
      transform: scale(0.9) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition:
        transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
        opacity 0.22s ease;
      transform-origin: bottom right;
    }
    #msk-panel.msk-open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* ambient orbs inside panel */
    #msk-panel::before, #msk-panel::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(60px);
      z-index: 0;
    }
    #msk-panel::before {
      width: 280px; height: 280px;
      background: radial-gradient(circle, rgba(14,165,233,0.12), transparent);
      top: -80px; right: -60px;
    }
    #msk-panel::after {
      width: 240px; height: 240px;
      background: radial-gradient(circle, rgba(99,102,241,0.08), transparent);
      bottom: -60px; left: -40px;
    }

    @media (max-width: 520px) {
      #msk-panel { width: calc(100vw - 20px); right: 10px; bottom: 100px; border-radius: 20px; }
      #msk-trigger { bottom: 20px; right: 20px; width: 58px; height: 58px; }
    }

    /* ── Header ── */
    .msk-header {
      position: relative; z-index: 1;
      padding: 18px 20px 16px;
      background: linear-gradient(180deg, rgba(14,165,233,0.06) 0%, transparent 100%);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
    }
    .msk-header-avatar {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #0369a1, #0ea5e9);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px;
      box-shadow: 0 4px 16px rgba(14,165,233,0.3);
      flex-shrink: 0;
    }
    .msk-header-info { flex: 1; min-width: 0; }
    .msk-brand {
      font-size: 1rem; font-weight: 600;
      color: #f0f9ff;
      letter-spacing: -0.02em;
    }
    .msk-brand em { color: #38bdf8; font-style: normal; }
    .msk-status {
      display: flex; align-items: center; gap: 5px;
      font-size: 0.68rem; font-weight: 500;
      color: #22c55e;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .msk-status-dot {
      width: 6px; height: 6px;
      background: #22c55e; border-radius: 50%;
      animation: msk-pulse 2s ease-in-out infinite;
    }
    @keyframes msk-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

    .msk-header-actions { display: flex; gap: 6px; }
    .msk-icon-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.45);
      width: 30px; height: 30px;
      border-radius: 8px;
      cursor: pointer; font-size: 13px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .msk-icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

    /* ── Messages ── */
    .msk-msgs {
      flex: 1;
      overflow-y: auto;
      padding: 20px 18px 12px;
      display: flex; flex-direction: column; gap: 12px;
      position: relative; z-index: 1;
      scrollbar-width: thin;
      scrollbar-color: rgba(14,165,233,0.15) transparent;
    }
    .msk-msgs::-webkit-scrollbar { width: 3px; }
    .msk-msgs::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.2); border-radius: 3px; }

    /* Bubbles */
    .msk-msg { display: flex; gap: 10px; animation: msk-in 0.28s cubic-bezier(0.34,1.3,0.64,1); }
    .msk-bot-msg  { align-self: flex-start; max-width: 90%; }
    .msk-user-msg { align-self: flex-end; flex-direction: row-reverse; max-width: 78%; }

    @keyframes msk-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .msk-av {
      width: 28px; height: 28px;
      background: linear-gradient(135deg, #0369a1, #0ea5e9);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px;
      flex-shrink: 0; margin-top: 2px;
      box-shadow: 0 2px 8px rgba(14,165,233,0.25);
    }

    .msk-bubble {
      padding: 11px 14px;
      border-radius: 14px;
      font-size: 0.855rem;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .msk-bot-msg  .msk-bubble {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-top-left-radius: 4px;
      color: #cbd5e1;
    }
    .msk-user-msg .msk-bubble {
      background: linear-gradient(135deg, #075985, #0369a1);
      border: 1px solid rgba(14,165,233,0.2);
      border-top-right-radius: 4px;
      color: #e0f2fe;
    }

    /* Quick reply buttons */
    .msk-btns {
      display: flex; flex-wrap: wrap; gap: 7px;
      padding: 4px 0 6px 38px;
      animation: msk-in 0.3s ease;
    }
    .msk-qbtn {
      background: rgba(14,165,233,0.07);
      border: 1px solid rgba(14,165,233,0.22);
      color: #7dd3fc;
      padding: 6px 13px;
      border-radius: 20px;
      font-size: 0.78rem; font-weight: 500;
      cursor: pointer;
      transition: all 0.18s;
      white-space: normal; line-height: 1.4; text-align: left;
      position: relative; overflow: hidden;
    }
    .msk-qbtn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(56,189,248,0.1));
      opacity: 0;
      transition: opacity 0.18s;
    }
    .msk-qbtn:hover { border-color: #0ea5e9; color: #fff; transform: translateY(-1px); }
    .msk-qbtn:hover::before { opacity: 1; }
    .msk-qbtn:active { transform: scale(0.97); }
    .msk-qbtn:disabled { opacity: 0.3; cursor: default; transform: none; }

    /* Typing */
    .msk-typing { display: flex; align-items: center; gap: 10px; animation: msk-in 0.2s ease; }
    .msk-dots {
      display: flex; gap: 4px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      padding: 10px 14px;
      border-radius: 14px; border-top-left-radius: 4px;
    }
    .msk-dots span {
      width: 6px; height: 6px;
      background: #38bdf8; border-radius: 50%;
      opacity: 0.5;
      animation: msk-bounce 1.2s ease-in-out infinite;
    }
    .msk-dots span:nth-child(2) { animation-delay: 0.2s; }
    .msk-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes msk-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    /* Lead form */
    .msk-lead-wrap { padding: 4px 0 4px 38px; animation: msk-in 0.3s ease; }
    .msk-lead {
      background: linear-gradient(135deg, rgba(14,165,233,0.06), rgba(99,102,241,0.04));
      border: 1px solid rgba(14,165,233,0.2);
      border-radius: 14px; padding: 16px;
      display: flex; flex-direction: column; gap: 9px;
      max-width: 340px;
    }
    .msk-lead-hd {
      font-size: 0.7rem; font-weight: 600;
      color: #38bdf8;
      letter-spacing: 1.5px; text-transform: uppercase;
    }
    .msk-lead-sub { font-size: 0.78rem; color: #64748b; line-height: 1.45; }
    .msk-lead input {
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 9px;
      padding: 9px 12px;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      font-size: 0.82rem;
      outline: none;
      transition: border-color 0.15s;
    }
    .msk-lead input:focus { border-color: rgba(14,165,233,0.45); }
    .msk-lead input::placeholder { color: #334155; }
    .msk-lead-go {
      background: linear-gradient(135deg, #0369a1, #0ea5e9);
      border: none; color: #fff;
      padding: 10px; border-radius: 9px;
      font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
      cursor: pointer; transition: opacity 0.15s, transform 0.15s;
      box-shadow: 0 4px 16px rgba(14,165,233,0.25);
    }
    .msk-lead-go:hover { opacity: 0.88; transform: translateY(-1px); }
    .msk-lead-go:disabled { opacity: 0.35; cursor: default; transform: none; }

    /* ── Input area ── */
    .msk-input-area {
      position: relative; z-index: 1;
      padding: 14px 16px 16px;
      border-top: 1px solid rgba(255,255,255,0.05);
      background: rgba(0,0,0,0.2);
      flex-shrink: 0;
    }
    .msk-input-wrap {
      display: flex; align-items: flex-end; gap: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 10px 10px 10px 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .msk-input-wrap:focus-within {
      border-color: rgba(14,165,233,0.3);
      box-shadow: 0 0 0 3px rgba(14,165,233,0.06);
    }
    .msk-input {
      flex: 1;
      background: transparent;
      border: none; outline: none;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      resize: none; max-height: 120px; line-height: 1.6;
    }
    .msk-input::placeholder { color: #334155; }
    .msk-send {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0369a1, #0ea5e9);
      border: none; color: #fff;
      font-size: 14px;
      cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.15s, transform 0.15s;
      box-shadow: 0 2px 10px rgba(14,165,233,0.3);
    }
    .msk-send:hover:not(:disabled) { opacity: 0.88; transform: scale(1.06); }
    .msk-send:disabled { opacity: 0.3; cursor: default; transform: none; }

    .msk-hint {
      text-align: center;
      font-size: 0.65rem;
      color: #1e3a5f;
      margin-top: 9px;
      letter-spacing: 0.5px;
    }
  `

  // ─────────────────────────────────────────
  // HTML
  // ─────────────────────────────────────────
  const HTML = `
    <button id="msk-trigger" aria-label="masif. klinik AI Danışman">
      💬
      <span class="msk-badge"></span>
    </button>

    <div id="msk-panel" role="dialog" aria-modal="true" aria-label="masif. klinik AI Danışman">
      <div class="msk-header">
        <div class="msk-header-avatar">🏥</div>
        <div class="msk-header-info">
          <div class="msk-brand">masif<em>.</em> klinik</div>
          <div class="msk-status"><span class="msk-status-dot"></span>AI Danışman Aktif</div>
        </div>
        <div class="msk-header-actions">
          <button class="msk-icon-btn" id="msk-reset-btn" title="Yeni sohbet" aria-label="Yeni sohbet">↺</button>
          <button class="msk-icon-btn" id="msk-close-btn" title="Kapat" aria-label="Kapat">✕</button>
        </div>
      </div>

      <div class="msk-msgs" id="msk-msgs"></div>

      <div class="msk-input-area">
        <div class="msk-input-wrap">
          <textarea
            class="msk-input" id="msk-input"
            placeholder="Mesaj yazın…" rows="1"
            aria-label="Mesaj"
          ></textarea>
          <button class="msk-send" id="msk-send" aria-label="Gönder" title="Gönder">➤</button>
        </div>
        <p class="msk-hint">masif. klinik · Klinik Dijital Çözümleri</p>
      </div>
    </div>
  `

  // ─────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────
  function init () {
    const style = document.createElement('style')
    style.textContent = CSS
    document.head.appendChild(style)

    const root = document.createElement('div')
    root.id = 'msk-root'
    root.innerHTML = HTML
    document.body.appendChild(root)

    bindEvents()
    startConvo()
  }

  // ─────────────────────────────────────────
  // State
  // ─────────────────────────────────────────
  let history = [], isLoading = false, isOpen = false, profession = ''

  // ─────────────────────────────────────────
  // Events
  // ─────────────────────────────────────────
  function bindEvents () {
    document.getElementById('msk-trigger').addEventListener('click', toggle)
    document.getElementById('msk-close-btn').addEventListener('click', close)
    document.getElementById('msk-reset-btn').addEventListener('click', () => {
      document.getElementById('msk-msgs').innerHTML = ''
      startConvo()
    })
    document.getElementById('msk-send').addEventListener('click', () => send())

    const inp = document.getElementById('msk-input')
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
    })
    inp.addEventListener('input', () => {
      inp.style.height = 'auto'
      inp.style.height = Math.min(inp.scrollHeight, 120) + 'px'
    })
  }

  function toggle() { isOpen ? close() : open() }

  function open () {
    isOpen = true
    document.getElementById('msk-panel').classList.add('msk-open')
    document.getElementById('msk-trigger').classList.add('msk-open')
    document.getElementById('msk-trigger').innerHTML = '✕<span class="msk-badge"></span>'
    bottom()
  }
  function close () {
    isOpen = false
    document.getElementById('msk-panel').classList.remove('msk-open')
    document.getElementById('msk-trigger').classList.remove('msk-open')
    document.getElementById('msk-trigger').innerHTML = '💬<span class="msk-badge"></span>'
  }

  // ─────────────────────────────────────────
  // Chat logic
  // ─────────────────────────────────────────
  function startConvo () {
    history = []; profession = ''
    callAPI('Merhaba, sohbeti başlat.')
  }

  async function send (txt) {
    const el = document.getElementById('msk-input')
    const msg = (txt ?? el.value).trim()
    if (!msg || isLoading) return
    if (!txt) { el.value = ''; el.style.height = '' }

    addUser(msg)
    history.push({ role: 'user', content: msg })
    disableBtns()
    await callAPI()
  }

  async function callAPI (inject) {
    isLoading = true
    document.getElementById('msk-send').disabled = true
    if (inject) history.push({ role: 'user', content: inject })

    const typing = addTyping()
    try {
      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      typing.remove()

      history.push({ role: 'assistant', content: JSON.stringify(data) })
      detectProfession()
      addBot(data.text || '...')

      if (data.collectLead) {
        addLeadForm(data.leadReason || 'Ücretsiz Danışmanlık')
      } else if (data.buttons?.length) {
        addBtns(data.buttons)
      }
    } catch (e) {
      typing.remove()
      addBot('Bağlantı hatası oluştu, lütfen tekrar deneyin.')
      console.error('[msk-widget]', e)
    } finally {
      isLoading = false
      document.getElementById('msk-send').disabled = false
    }
  }

  // ─────────────────────────────────────────
  // DOM builders
  // ─────────────────────────────────────────
  function addBot (text) {
    const el = d('div', 'msk-msg msk-bot-msg')
    el.innerHTML = `<div class="msk-av">🤖</div><div class="msk-bubble">${esc(text)}</div>`
    msgs().appendChild(el); bottom()
  }

  function addUser (text) {
    const el = d('div', 'msk-msg msk-user-msg')
    el.innerHTML = `<div class="msk-bubble">${esc(text)}</div>`
    msgs().appendChild(el); bottom()
  }

  function addTyping () {
    const el = d('div', 'msk-typing msk-bot-msg')
    el.innerHTML = `<div class="msk-av">🤖</div><div class="msk-dots"><span></span><span></span><span></span></div>`
    msgs().appendChild(el); bottom(); return el
  }

  function addBtns (list) {
    const row = d('div', 'msk-btns')
    list.forEach(label => {
      const btn = d('button', 'msk-qbtn')
      btn.textContent = label
      btn.onclick = () => { disableBtns(); send(label) }
      row.appendChild(btn)
    })
    msgs().appendChild(row); bottom()
  }

  function addLeadForm (reason) {
    const wrap = d('div', 'msk-lead-wrap')
    wrap.innerHTML = `
      <div class="msk-lead" id="msk-lf">
        <div class="msk-lead-hd">📋 İletişim</div>
        <div class="msk-lead-sub">${esc(reason)} — bilgilerinizi bırakın, 24 saat içinde ulaşalım.</div>
        <input id="msk-ln" type="text"  placeholder="Ad Soyad" autocomplete="name" />
        <input id="msk-le" type="email" placeholder="E-posta *" autocomplete="email" />
        <input id="msk-lp" type="tel"   placeholder="Telefon (opsiyonel)" autocomplete="tel" />
        <button class="msk-lead-go" onclick="window.__mskLead('${eA(reason)}')">Gönder →</button>
      </div>`
    msgs().appendChild(wrap); bottom()
  }

  window.__mskLead = async function (reason) {
    const name  = v('msk-ln'), email = v('msk-le'), phone = v('msk-lp')
    if (!email) { alert('E-posta adresi zorunludur.'); return }
    const btn = document.querySelector('#msk-lf .msk-lead-go')
    btn.disabled = true; btn.textContent = '...'
    try {
      const r = await fetch(API_BASE + '/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, profession, reason, conversation: history })
      })
      if (!r.ok) throw new Error()
      document.getElementById('msk-lf')?.closest('.msk-lead-wrap')?.remove()
      addBot(`Teşekkürler${name ? ', ' + name : ''}! 24 saat içinde ${email} adresinize ulaşacağız. 🎯`)
      addBtns(['Başka Konu', 'Yeniden Başla'])
    } catch {
      btn.disabled = false; btn.textContent = 'Gönder →'
      addBot('Bir hata oluştu, tekrar deneyin.')
    }
  }

  function disableBtns () { document.querySelectorAll('.msk-qbtn').forEach(b => b.disabled = true) }

  function detectProfession () {
    const last = [...history].reverse().find(m => m.role === 'user')
    if (!last) return
    ['Diş Hekimi','Doktor','Diyetisyen','Fizyoterapist','Psikolog','Hastane Yöneticisi','Hemşire','Podolog']
      .forEach(m => { if (last.content.includes(m)) profession = m })
  }

  // ─────────────────────────────────────────
  // Utils
  // ─────────────────────────────────────────
  function msgs () { return document.getElementById('msk-msgs') }
  function bottom () { requestAnimationFrame(() => { const m = msgs(); if (m) m.scrollTop = m.scrollHeight }) }
  function d (tag, cls) { const el = document.createElement(tag); el.className = cls; return el }
  function v (id) { return document.getElementById(id)?.value.trim() || '' }
  function esc (s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/\n/g,'<br>')
  }
  function eA (s) { return String(s).replace(/'/g,"&#39;").replace(/"/g,'&quot;') }

  // Boot
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
})()
