/* ═══════════════════════════════════════════
   frontend/js/common.js
   Loaded on EVERY page.
   Handles: nav active state, scroll, hamburger,
   ticker, reveal, WhatsApp, modal, API fetch,
   contact form, toast.
   ═══════════════════════════════════════════ */

const API_BASE = window.API_BASE || '/api';

/* ══ NAV: mark active link based on current page ══ */
(function markActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a[data-page], .mob-menu a[data-page]').forEach(a => {
    const pg = a.dataset.page;
    if (!pg) return;
    const match = (pg === 'home' && (path === '/' || path === '/index.html'))
      || (pg !== 'home' && path.includes(pg));
    if (match) a.classList.add('active');
  });
})();

/* ══ NAV SCROLL ══ */
const _nav = document.getElementById('main-nav');
if (_nav) {
  window.addEventListener('scroll', () => {
    _nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ══ HAMBURGER ══ */
function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mob-menu');
  if (!btn || !menu) return;
  if (btn.dataset.bound) return;
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)'  : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)': '';
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}
initHamburger();
document.addEventListener('DOMContentLoaded', initHamburger);
/* Retry shortly after load in case nav was injected late */
setTimeout(initHamburger, 300);

/* ══ SCROLL REVEAL ══ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

/* ══ TICKER CLONE ══ */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.ticker-track');
  if (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }
});

/* ══ ESCAPE closes modal ══ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal && closeModal();
});

/* ══ API FETCH HELPER ══ */
async function apiFetch(endpoint) {
  try {
    const res = await fetch(API_BASE + endpoint);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.warn('[API]', endpoint, err.message);
    return null;
  }
}

/* ══ LOAD SITE SETTINGS (logo, colors, contact, socials) ══ */
async function loadSiteSettings() {
  const data = await apiFetch('/content/settings');
  if (!data) return;

  /* Logo */
  if (data.logo_url) {
    document.querySelectorAll('.logo-img').forEach(img => { img.src = data.logo_url; img.style.display = 'block'; });
    document.querySelectorAll('.logo-gem').forEach(g => g.style.display = 'none');
  }

  /* Contact details */
  if (data.phone) {
    document.querySelectorAll('[data-phone]').forEach(el => {
      el.textContent = data.phone;
      if (el.tagName === 'A') el.href = 'tel:' + data.phone;
    });
  }
  if (data.email) {
    document.querySelectorAll('[data-email]').forEach(el => {
      el.textContent = data.email;
      if (el.tagName === 'A') el.href = 'mailto:' + data.email;
    });
  }
  if (data.address)  document.querySelectorAll('[data-address]').forEach(el => el.textContent = data.address);
  if (data.hours)    document.querySelectorAll('[data-hours]').forEach(el => el.textContent = data.hours);

  /* WhatsApp */
  if (data.whatsapp) {
    const waUrl = 'https://wa.me/' + data.whatsapp.replace(/\D/g,'') + '?text=' + encodeURIComponent(data.whatsapp_msg || 'Hello Amoghah!');
    document.querySelectorAll('.wa, [data-whatsapp-link]').forEach(a => a.href = waUrl);
    document.querySelectorAll('[data-whatsapp]').forEach(el => el.textContent = data.whatsapp);
  }

  /* Social links */
  const socials = { linkedin:'f-s-linkedin', instagram:'f-s-instagram', twitter:'f-s-twitter', youtube:'f-s-youtube', facebook:'f-s-facebook' };
  Object.entries(socials).forEach(([key, cls]) => {
    if (data['social_' + key]) document.querySelectorAll('.' + cls).forEach(a => { a.href = data['social_' + key]; });
  });

  /* Toggle WhatsApp button */
  if (data.show_whatsapp === '0') document.querySelectorAll('.wa').forEach(el => el.style.display = 'none');
  if (data.show_ticker   === '0') document.querySelectorAll('.ticker-wrap').forEach(el => el.style.display = 'none');

  /* Brand colors */
  if (data.color_primary) document.documentElement.style.setProperty('--teal',   data.color_primary);
  if (data.color_light)   document.documentElement.style.setProperty('--teal-l', data.color_light);
  if (data.color_sky)     document.documentElement.style.setProperty('--sky',    data.color_sky);

  /* Favicon */
  if (data.favicon_url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = data.favicon_url;
  }
}

/* ══ MODAL (order / apply) ══ */
let _modalTitle = '';
function openModal(title, price) {
  _modalTitle = title;
  const wrap = document.getElementById('buyModal');
  if (!wrap) return;
  const mTitle = document.getElementById('m-title');
  const mPrice = document.getElementById('m-price');
  if (mTitle) mTitle.textContent = title;
  if (mPrice) { mPrice.textContent = price || ''; mPrice.style.display = price ? 'block' : 'none'; }
  wrap.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const wrap = document.getElementById('buyModal');
  if (wrap) wrap.classList.remove('open');
  document.body.style.overflow = '';
  const ok = document.getElementById('m-ok');
  if (ok) ok.style.display = 'none';
  ['m-name','m-company','m-email','m-phone','m-budget','m-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const btn = document.querySelector('.m-submit');
  if (btn) { btn.textContent = 'Submit Enquiry'; btn.disabled = false; btn.style.background = ''; }
}
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('buyModal');
  if (wrap) wrap.addEventListener('click', e => { if (e.target === wrap) closeModal(); });
});

/* ══ MODAL SUBMIT ══ */
async function submitModal(btn) {
  const name  = document.getElementById('m-name')?.value.trim();
  const email = document.getElementById('m-email')?.value.trim();
  const phone = document.getElementById('m-phone')?.value.trim();
  const budget= document.getElementById('m-budget')?.value;
  const notes = document.getElementById('m-notes')?.value.trim();
  const company=document.getElementById('m-company')?.value.trim();

  if (!name)  return showFieldErr('m-name',  'Name is required');
  if (!phone) return showFieldErr('m-phone', 'Phone is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
              return showFieldErr('m-email', 'Valid email required');

  const orig = btn.innerHTML;
  btn.innerHTML = '⏳ Submitting...'; btn.disabled = true;
  try {
    const res = await fetch(API_BASE + '/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, company, email, phone, budget, message: notes, service: _modalTitle, type: 'order' }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      btn.textContent = '✅ Submitted!'; btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
      const ok = document.getElementById('m-ok'); if (ok) ok.style.display = 'block';
      setTimeout(closeModal, 3500);
    } else throw new Error(data.message);
  } catch (err) {
    btn.innerHTML = orig; btn.disabled = false;
    alert('Something went wrong. Please WhatsApp us directly.');
  }
}

/* ══ CONTACT FORM ══ */
async function submitContact(btn) {
  const name    = document.getElementById('c-name')?.value.trim();
  const phone   = document.getElementById('c-phone')?.value.trim();
  const email   = document.getElementById('c-email')?.value.trim();
  const service = document.getElementById('c-service')?.value;
  const budget  = document.getElementById('c-budget')?.value;
  const msg     = document.getElementById('c-msg')?.value.trim();

  if (!name)  return showFieldErr('c-name',  'Please enter your name');
  if (!phone) return showFieldErr('c-phone', 'Please enter your phone');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
              return showFieldErr('c-email', 'Please enter a valid email');
  if (!msg)   return showFieldErr('c-msg',   'Please write your message');

  const orig = btn.innerHTML;
  btn.innerHTML = '⏳ Sending...'; btn.disabled = true;
  try {
    const res = await fetch(API_BASE + '/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, service, budget, message: msg }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      btn.textContent = '✅ Sent!'; btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
      const ok = document.getElementById('contactOk'); if (ok) ok.style.display = 'block';
      ['c-name','c-phone','c-email','c-service','c-budget','c-msg'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; if (ok) ok.style.display = 'none'; }, 5000);
    } else throw new Error(data.message);
  } catch (err) {
    btn.innerHTML = '❌ Failed — Try Again'; btn.style.background = '#EF4444';
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; }, 3000);
  }
}

/* ══ FIELD ERROR ══ */
function showFieldErr(id, msg) {
  const el = document.getElementById(id); if (!el) return;
  el.style.borderColor = '#EF4444'; el.focus();
  let err = el.parentElement.querySelector('.ferr');
  if (!err) { err = document.createElement('div'); err.className = 'ferr'; err.style.cssText = 'font-size:11px;color:#EF4444;margin-top:3px'; el.parentElement.appendChild(err); }
  err.textContent = msg;
  el.addEventListener('input', () => { el.style.borderColor = ''; if (err) err.remove(); }, { once: true });
}

/* ══ FAQ TOGGLE ══ */
function toggleFAQ(el) { el.classList.toggle('open'); }

/* ══ INIT ON EVERY PAGE ══ */
document.addEventListener('DOMContentLoaded', loadSiteSettings);
