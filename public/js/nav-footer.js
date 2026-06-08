/* ═══════════════════════════════════════════
   frontend/js/nav-footer.js
   Injects the shared navigation and footer HTML
   into every page. Call after <body> opens.
   The root path prefix is set per-page via
   window.ROOT (e.g. '' for root, '../' for /services/)
   ═══════════════════════════════════════════ */

(function injectNavFooter() {
  const R = window.ROOT || '';   /* path prefix to root */

  /* ══ NAV HTML ══ */
  const navHTML = `
<nav id="main-nav">
  <div class="logo">
    <a href="${R}index.html">
      <img class="logo-img" src="${R}images/logo.png" alt="Amoghah Technosys" style="display:none">
      <div class="logo-gem">AT</div>
      <span class="logo-text">AMOGHAH<em>TECH</em></span>
    </a>
  </div>

  <ul class="nav-links">
    <li><a href="${R}index.html"     data-page="home">Home</a></li>
    <li><a href="${R}about.html"     data-page="about">About</a></li>
    <li class="has-drop">
      <a href="${R}services.html"    data-page="services">Services ▾</a>
      <div class="dropdown">
        <a href="${R}services/web-development.html"><i class="ti ti-world"></i>Web Development</a>
        <a href="${R}services/software-development.html"><i class="ti ti-code"></i>Software Development</a>
        <a href="${R}services/mobile-app-development.html"><i class="ti ti-device-mobile"></i>Mobile Apps</a>
        <a href="${R}services/cloud-services.html"><i class="ti ti-cloud"></i>Cloud &amp; Digital</a>
        <a href="${R}services/ai-automation.html"><i class="ti ti-robot"></i>AI &amp; Automation</a>
        <a href="${R}services/graphics-branding.html"><i class="ti ti-palette"></i>Graphics &amp; Branding</a>
      </div>
    </li>
    <li><a href="${R}portfolio.html" data-page="portfolio">Portfolio</a></li>
    <li><a href="${R}blog.html"      data-page="blog">Blog</a></li>
    <li><a href="${R}careers.html"   data-page="careers">Careers</a></li>
    <li><a href="${R}contact.html"   data-page="contact" class="nav-cta"><i class="ti ti-send"></i>Contact Us</a></li>
  </ul>

  <div class="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </div>
</nav>

<div class="mob-menu">
  <a href="${R}index.html"     data-page="home"><i class="ti ti-home"></i> Home</a>
  <a href="${R}about.html"     data-page="about"><i class="ti ti-users"></i> About Us</a>
  <div class="mob-sec">Services</div>
  <a href="${R}services/web-development.html"><i class="ti ti-world"></i> Web Development</a>
  <a href="${R}services/software-development.html"><i class="ti ti-code"></i> Software Development</a>
  <a href="${R}services/mobile-app-development.html"><i class="ti ti-device-mobile"></i> Mobile Apps</a>
  <a href="${R}services/cloud-services.html"><i class="ti ti-cloud"></i> Cloud &amp; Digital</a>
  <a href="${R}services/ai-automation.html"><i class="ti ti-robot"></i> AI &amp; Automation</a>
  <a href="${R}services/graphics-branding.html"><i class="ti ti-palette"></i> Graphics &amp; Branding</a>
  <div class="mob-sec">More</div>
  <a href="${R}portfolio.html" data-page="portfolio"><i class="ti ti-grid-dots"></i> Portfolio</a>
  <a href="${R}blog.html"      data-page="blog"><i class="ti ti-article"></i> Blog</a>
  <a href="${R}careers.html"   data-page="careers"><i class="ti ti-star"></i> Careers</a>
  <a href="${R}contact.html"   data-page="contact"><i class="ti ti-phone"></i> Contact Us</a>
</div>`;

  /* ══ FOOTER HTML ══ */
  const footerHTML = `
<footer>
  <div class="fg-grid">
    <div class="fb">
      <a href="${R}index.html" class="logo" style="text-decoration:none">
        <img class="logo-img" src="${R}images/logo.png" alt="Amoghah Technosys" style="display:none">
        <div class="logo-gem">AT</div>
        <span class="logo-text">AMOGHAH<em>TECH</em></span>
      </a>
      <p>Empowering businesses through technology — from metro cities to district enterprises across Bharat. Serving 200+ clients in 18+ states.</p>
      <div class="f-socials">
        <a href="#" class="f-s f-s-linkedin" aria-label="LinkedIn"><i class="ti ti-brand-linkedin"></i></a>
        <a href="#" class="f-s f-s-instagram" aria-label="Instagram"><i class="ti ti-brand-instagram"></i></a>
        <a href="#" class="f-s f-s-facebook" aria-label="Facebook"><i class="ti ti-brand-facebook"></i></a>
        <a href="#" class="f-s f-s-twitter" aria-label="Twitter/X"><i class="ti ti-brand-x"></i></a>
        <a href="#" class="f-s f-s-youtube" aria-label="YouTube"><i class="ti ti-brand-youtube"></i></a>
      </div>
    </div>
    <div class="fc">
      <h5>Company</h5>
      <a href="${R}index.html">Home</a>
      <a href="${R}about.html">About Us</a>
      <a href="${R}portfolio.html">Portfolio</a>
      <a href="${R}blog.html">Blog</a>
      <a href="${R}careers.html">Careers</a>
      <a href="${R}contact.html">Contact</a>
    </div>
    <div class="fc">
      <h5>Services</h5>
      <a href="${R}services/web-development.html">Web Development</a>
      <a href="${R}services/software-development.html">Software Dev</a>
      <a href="${R}services/mobile-app-development.html">Mobile Apps</a>
      <a href="${R}services/cloud-services.html">Cloud &amp; Digital</a>
      <a href="${R}services/ai-automation.html">AI &amp; Automation</a>
      <a href="${R}services/graphics-branding.html">Branding</a>
    </div>
    <div class="fc">
      <h5>Solutions</h5>
      <a href="${R}services/software-development.html">ERP Software</a>
      <a href="${R}services/software-development.html">SaaS Platforms</a>
      <a href="${R}services/software-development.html">CRM Solutions</a>
      <a href="${R}services/software-development.html">LMS Platforms</a>
      <a href="${R}services/cloud-services.html">WhatsApp API</a>
      <a href="${R}services/cloud-services.html">SMS Gateway</a>
    </div>
    <div class="fc">
      <h5>Contact</h5>
      <a href="tel:+919876543210" data-phone>+91-XXXXXXXXXX</a>
      <a href="mailto:info@amoghahtech.com" data-email>info@amoghahtech.com</a>
      <a href="${R}contact.html">Get a Quote</a>
      <a href="https://amoghahtech.com" target="_blank">amoghahtech.com</a>
    </div>
  </div>
  <div class="f-bottom">
    <p>© 2026 <span>Amoghah Technosys Private Limited</span>. All rights reserved.</p>
    <p>Designed with <span>♥</span> for Bharat 🇮🇳</p>
  </div>
</footer>

<!-- WhatsApp Float -->
<a href="https://wa.me/919876543210" class="wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-whatsapp-link>
  <i class="ti ti-brand-whatsapp"></i>
</a>

<!-- Order / Enquiry Modal -->
<div class="modal-wrap" id="buyModal">
  <div class="modal">
    <button class="mc" onclick="closeModal()" aria-label="Close">✕</button>
    <h3 id="m-title">Enquiry</h3>
    <p class="m-sub">Fill in your details and we'll contact you within 24 hours.</p>
    <div class="modal-price" id="m-price" style="display:none"></div>
    <div class="fg-row modal-row">
      <div class="fg"><label>Your Name *</label><input type="text" id="m-name" placeholder="Rahul Sharma" autocomplete="name"></div>
      <div class="fg"><label>Company</label><input type="text" id="m-company" placeholder="Acme Pvt Ltd" autocomplete="organization"></div>
    </div>
    <div class="fg"><label>Email *</label><input type="email" id="m-email" placeholder="rahul@company.com" autocomplete="email"></div>
    <div class="fg"><label>Phone / WhatsApp *</label><input type="tel" id="m-phone" placeholder="+91 98765 43210" autocomplete="tel"></div>
    <div class="fg">
      <label>Budget Range</label>
      <select id="m-budget">
        <option value="">Select budget...</option>
        <option>Under ₹10,000</option>
        <option>₹10,000 – ₹30,000</option>
        <option>₹30,000 – ₹1,00,000</option>
        <option>₹1,00,000 – ₹5,00,000</option>
        <option>Above ₹5,00,000</option>
        <option>Not Decided Yet</option>
      </select>
    </div>
    <div class="fg"><label>Notes / Requirements</label><textarea id="m-notes" placeholder="Tell us briefly what you need..."></textarea></div>
    <div class="m-div"></div>
    <button class="m-submit" onclick="submitModal(this)"><i class="ti ti-send"></i> Submit Enquiry</button>
    <div class="m-note">🔒 Your information is confidential and never shared.</div>
    <div class="m-ok" id="m-ok">✅ Received! We'll contact you within 24 hours.</div>
  </div>
</div>`;

  /* ══ INJECT ══ */
  const body = document.body;

  /* Nav — prepend before everything */
  const navDiv = document.createElement('div');
  navDiv.innerHTML = navHTML;
  body.prepend(navDiv);

  /* Footer — append at end */
  const footDiv = document.createElement('div');
  footDiv.innerHTML = footerHTML;
  body.appendChild(footDiv);

  /* FAQ style */
  const faqStyle = document.createElement('style');
  faqStyle.textContent = `
    .faq-item{border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px;overflow:hidden;cursor:pointer;transition:border-color .2s}
    .faq-item:hover{border-color:var(--teal-l)}
    .faq-q{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font-size:15px;font-weight:600;color:var(--ink2);gap:12px}
    .faq-q i{flex-shrink:0;color:var(--teal);transition:transform .25s;font-size:17px}
    .faq-a{display:none;padding:0 20px 16px;font-size:14px;color:var(--muted);line-height:1.75;border-top:1px solid var(--border)}
    .faq-item.open .faq-a{display:block}
    .faq-item.open .faq-q i{transform:rotate(45deg)}
  `;
  document.head.appendChild(faqStyle);
})();
