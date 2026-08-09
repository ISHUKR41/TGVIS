/* ==========================================================================
   TGVIS — Navbar Component (Dynamic JavaScript Injection)
   ==========================================================================
   
   This file dynamically generates and injects the COMPLETE navigation bar
   into every page of the TGVIS website. Instead of copy-pasting the navbar
   HTML into 26+ pages (which makes updates a nightmare), we maintain it
   in ONE place — right here.
   
   HOW IT WORKS:
   1. Detects the current page's folder depth to calculate relative paths
   2. Generates the full mega-menu navbar HTML with all dropdowns
   3. Injects it into the <nav id="navbar"> placeholder on the page
   4. Marks the current page's link as "active" automatically
   
   USAGE IN HTML:
   Just add this to any page:
   <nav class="navbar" id="navbar"></nav>
   <script src="[path]/navbar.js" defer></script>
   
   The script will fill the navbar with the complete navigation structure.
   
   DEPENDENCIES: None (vanilla JS). But works best with global.js for
   scroll effects, mobile menu, and theme toggle.
   
   ========================================================================== */


/**
 * getBasePath — Calculates the relative path prefix based on how deep
 * the current page is inside the folder structure.
 * 
 * Example:
 * - index.html (root)                    → ""
 * - pages/about/about.html (depth 2)     → "../../"
 * - pages/student-life/leadership/ (depth 3) → "../../../"
 * 
 * @returns {string} The relative path prefix (e.g., "../../")
 */
function getBasePath() {
  const path = window.location.pathname;

  /* Count how many directories deep we are from the site root.
     We look for the '/pages/' segment in the URL path to determine depth. */
  
  /* If we're at the root (index.html), no prefix needed */
  if (path.endsWith('/index.html') || path.endsWith('/') || path.split('/').filter(Boolean).length <= 1) {
    /* Check if there are nested folder segments */
    const segments = path.split('/').filter(Boolean);
    
    /* Simple heuristic: count folder depth by looking at path segments */
    /* For '/TGVIS/index.html' → root → '' */
    /* For '/TGVIS/pages/about/about.html' → depth 2 → '../../' */
    /* For '/TGVIS/pages/student-life/leadership/leadership.html' → depth 3 → '../../../' */
  }

  /* More robust: look for known folder patterns */
  if (path.includes('/pages/student-life/') || path.includes('/pages/login/')) {
    return '../../../';
  } else if (path.includes('/pages/')) {
    return '../../';
  }

  return '';
}


/**
 * buildNavbarHTML — Generates the complete navbar HTML string.
 * 
 * @param {string} base - The relative path prefix (from getBasePath())
 * @returns {string} Complete navbar HTML including overlay, logo, menu, dropdowns
 */
function buildNavbarHTML(base) {
  /* Calculate paths relative to page depth */
  const home = base + 'index.html';
  const p = base + 'pages/';  /* shorthand for pages directory */

  return `
    <!-- Dark overlay shown behind the mobile slide-out menu -->
    <div class="navbar__overlay" id="navOverlay"></div>

    <div class="navbar__container">
      
      <!-- ======== SCHOOL LOGO ======== -->
      <a href="${home}" class="navbar__logo" aria-label="TGVIS Home">
         <img src="${base}assets/images/logo/logo.png" alt="TGVIS school crest"
             class="navbar__logo-img" width="44" height="44" loading="eager">
        <div>
          <span class="navbar__logo-text">TGVIS</span>
          <span class="navbar__logo-subtitle">Bihta, Bihar</span>
        </div>
      </a>

      <!-- ======== NAVIGATION MENU ======== -->
      <ul class="navbar__menu" id="navMenu">

        <!-- ---- Home ---- -->
        <li class="navbar__item">
          <a href="${home}" class="navbar__link">Home</a>
        </li>

        <!-- ---- About Us (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            About <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}about/about.html" class="navbar__dropdown-link">
              <i class="ri-school-line"></i> About TGVIS
            </a>
            <a href="${p}director-message/director-message.html" class="navbar__dropdown-link">
              <i class="ri-user-voice-line"></i> Director's Message
            </a>
          </div>
        </li>

        <!-- ---- Admissions (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            Admissions <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}admissions/admissions.html" class="navbar__dropdown-link">
              <i class="ri-file-list-3-line"></i> Admission Process
            </a>
            <a href="${p}fees/fees.html" class="navbar__dropdown-link">
              <i class="ri-money-rupee-circle-line"></i> Fee Structure
            </a>
            <a href="${p}uniform/uniform.html" class="navbar__dropdown-link">
              <i class="ri-t-shirt-line"></i> Uniform
            </a>
          </div>
        </li>

        <!-- ---- Curriculum (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            Curriculum <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}academics/academics.html" class="navbar__dropdown-link">
              <i class="ri-book-open-line"></i> Academics
            </a>
            <a href="${p}sports/sports.html" class="navbar__dropdown-link">
              <i class="ri-trophy-line"></i> Sports
            </a>
            <a href="${p}extracurricular/extracurricular.html" class="navbar__dropdown-link">
              <i class="ri-palette-line"></i> Extracurricular
            </a>
            <a href="${p}outreach/outreach.html" class="navbar__dropdown-link">
              <i class="ri-hand-heart-line"></i> Outreach
            </a>
          </div>
        </li>

        <!-- ---- Student Life (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            Student Life <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}life-at-tgvis/life-at-tgvis.html" class="navbar__dropdown-link">
              <i class="ri-heart-pulse-line"></i> Life at TGVIS
            </a>
            <a href="${p}student-life/leadership/leadership.html" class="navbar__dropdown-link">
              <i class="ri-vip-crown-line"></i> Leadership
            </a>
            <a href="${p}student-life/daily-schedule/daily-schedule.html" class="navbar__dropdown-link">
              <i class="ri-time-line"></i> Daily Schedule
            </a>
            <a href="${p}student-life/clubs-societies/clubs-societies.html" class="navbar__dropdown-link">
              <i class="ri-team-line"></i> Clubs & Societies
            </a>
            <a href="${p}student-life/awards/awards.html" class="navbar__dropdown-link">
              <i class="ri-medal-line"></i> Awards & Recognition
            </a>
            <a href="${p}timetable/timetable.html" class="navbar__dropdown-link">
              <i class="ri-calendar-schedule-line"></i> Timetable
            </a>
          </div>
        </li>

        <!-- ---- More (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            More <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}events/events.html" class="navbar__dropdown-link">
              <i class="ri-calendar-event-line"></i> Events
            </a>
            <a href="${p}centres-of-excellence/centres-of-excellence.html" class="navbar__dropdown-link">
              <i class="ri-star-line"></i> Centres of Excellence
            </a>
            <a href="${p}latest-updates/latest-updates.html" class="navbar__dropdown-link">
              <i class="ri-newspaper-line"></i> Latest Updates
            </a>
            <a href="${p}community/community.html" class="navbar__dropdown-link">
              <i class="ri-community-line"></i> Community
            </a>
            <a href="${p}whatsapp-groups/whatsapp-groups.html" class="navbar__dropdown-link">
              <i class="ri-whatsapp-line"></i> Class WhatsApp Groups
            </a>
            <a href="${p}alumni/alumni.html" class="navbar__dropdown-link">
              <i class="ri-graduation-cap-line"></i> Alumni
            </a>
            <a href="${p}careers/careers.html" class="navbar__dropdown-link">
              <i class="ri-briefcase-line"></i> Careers
            </a>
            <a href="${p}contact/contact.html" class="navbar__dropdown-link">
              <i class="ri-phone-line"></i> Contact Us
            </a>
          </div>
        </li>

        <!-- ---- Login (Dropdown) ---- -->
        <li class="navbar__item">
          <a href="#" class="navbar__link navbar__link--dropdown">
            Login <i class="ri-arrow-down-s-line"></i>
          </a>
          <div class="navbar__dropdown">
            <a href="${p}login/login.html#student" class="navbar__dropdown-link">
              <i class="ri-user-line"></i> Student Login
            </a>
            <a href="${p}login/login.html#teacher" class="navbar__dropdown-link">
              <i class="ri-user-settings-line"></i> Teacher Login
            </a>
            <a href="${p}login/login.html#admin" class="navbar__dropdown-link">
              <i class="ri-admin-line"></i> Admin Login
            </a>
          </div>
        </li>

        <!-- ---- Mobile-Only Actions (inside slide menu) ---- -->
        <li class="navbar__mobile-actions">
          <button class="navbar__theme-toggle" id="themeToggleMobile" aria-label="Toggle dark mode">
            <i class="ri-moon-line"></i>
          </button>
          <a href="${p}admissions/admissions.html" class="btn btn--secondary btn--sm w-full text-center">
            Apply Now <i class="ri-arrow-right-line"></i>
          </a>
        </li>
      </ul>

      <!-- ======== RIGHT SIDE ACTIONS (Desktop Only) ======== -->
      <div class="navbar__actions desktop-only">
        <button class="navbar__theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
          <i class="ri-moon-line"></i>
        </button>
        <a href="${p}admissions/admissions.html" class="navbar__cta">
          Apply Now <i class="ri-arrow-right-line"></i>
        </a>
      </div>

      <!-- ======== HAMBURGER MENU (Mobile Only) ======== -->
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle navigation menu">
        <span class="navbar__hamburger-line"></span>
        <span class="navbar__hamburger-line"></span>
        <span class="navbar__hamburger-line"></span>
      </button>
    </div>
  `;
}


/**
 * buildFooterHTML — Generates the complete footer HTML string.
 * Includes: brand info, quick links, academics links, contact info,
 * newsletter form, social media links, and copyright bar.
 * 
 * @param {string} base - The relative path prefix
 * @returns {string} Complete footer HTML
 */
function buildFooterHTML(base) {
  const home = base + 'index.html';
  const p = base + 'pages/';
  const year = new Date().getFullYear();

  return `
    <div class="container">
      <div class="footer__grid">
        
        <!-- ---- Column 1: Brand ---- -->
        <div class="footer__brand">
          <div class="footer__logo">
            <img src="${base}assets/images/logo/logo.png" alt="TGVIS school crest"
                 class="footer__logo-img" width="52" height="52">
            <div class="footer__logo-text">
              The Green Valley<br>International School
            </div>
          </div>
          <p class="footer__description">
            Nurturing minds, building character, and inspiring excellence since our founding. 
            Located in the heart of Bihta, Patna, Bihar.
          </p>
          <div class="footer__social">
            <a href="https://www.facebook.com/people/The-Green-Valley-International-School-Bihta/100088041550841/" 
               class="footer__social-link" target="_blank" rel="noopener noreferrer" 
               aria-label="Facebook">
              <i class="ri-facebook-fill"></i>
            </a>
            <a href="${p}contact/contact.html" class="footer__social-link" aria-label="Contact school office">
              <i class="ri-mail-line"></i>
            </a>
            <a href="https://maps.app.goo.gl/94xhFw4nFaQEhpw77" 
               class="footer__social-link" target="_blank" rel="noopener noreferrer"
               aria-label="Google Maps">
              <i class="ri-map-pin-line"></i>
            </a>
          </div>
        </div>

        <!-- ---- Column 2: Quick Links ---- -->
        <div>
          <h4 class="footer__heading">Quick Links</h4>
          <ul class="footer__links">
            <li><a href="${home}" class="footer__link"><i class="ri-arrow-right-s-line"></i> Home</a></li>
            <li><a href="${p}about/about.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> About Us</a></li>
            <li><a href="${p}admissions/admissions.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Admissions</a></li>
            <li><a href="${p}fees/fees.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Fee Structure</a></li>
            <li><a href="${p}events/events.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Events</a></li>
            <li><a href="${p}careers/careers.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Careers</a></li>
            <li><a href="${p}contact/contact.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Contact Us</a></li>
          </ul>
        </div>

        <!-- ---- Column 3: Academics ---- -->
        <div>
          <h4 class="footer__heading">Academics</h4>
          <ul class="footer__links">
            <li><a href="${p}academics/academics.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Curriculum</a></li>
            <li><a href="${p}sports/sports.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Sports</a></li>
            <li><a href="${p}extracurricular/extracurricular.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Extracurricular</a></li>
            <li><a href="${p}life-at-tgvis/life-at-tgvis.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Student Life</a></li>
            <li><a href="${p}timetable/timetable.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Timetable</a></li>
            <li><a href="${p}centres-of-excellence/centres-of-excellence.html" class="footer__link"><i class="ri-arrow-right-s-line"></i> Centres of Excellence</a></li>
          </ul>
        </div>

        <!-- ---- Column 4: Contact Info ---- -->
        <div>
          <h4 class="footer__heading">Contact Us</h4>
          <div class="footer__contact-item">
            <div class="footer__contact-icon"><i class="ri-map-pin-2-fill"></i></div>
            <div class="footer__contact-text">
              Rameshwar Building, Bihta,<br>Patna, Bihar – 801103
            </div>
          </div>
          <div class="footer__contact-item">
            <div class="footer__contact-icon"><i class="ri-phone-fill"></i></div>
             <div class="footer__contact-text">
               <a href="tel:+918935901010" style="color:inherit;">+91 89359 01010</a>
            </div>
          </div>
          <div class="footer__contact-item">
            <div class="footer__contact-icon"><i class="ri-mail-fill"></i></div>
             <div class="footer__contact-text">
               <a href="${p}contact/contact.html#contactForm" style="color:inherit;">Send an enquiry online</a>
            </div>
          </div>

          <!-- Newsletter Signup -->
          <div class="footer__newsletter">
            <p style="font-size:var(--fs-sm);margin-bottom:var(--space-3);color:var(--color-gray-400);">
              Subscribe for updates:
            </p>
            <form class="footer__newsletter-form" data-newsletter-form>
              <input type="email" class="footer__newsletter-input" placeholder="Your email" required aria-label="Email for newsletter">
              <button type="submit" class="footer__newsletter-btn">
                <i class="ri-send-plane-fill"></i>
              </button>
            </form>
            <p class="footer__newsletter-status" data-newsletter-status aria-live="polite"></p>
          </div>
        </div>
      </div>

      <!-- ---- Copyright Bar ---- -->
      <div class="footer__bottom">
        <p>&copy; ${year} The Green Valley International School, Bihta. All Rights Reserved.</p>
        <div class="footer__bottom-links">
          <a href="${p}contact/contact.html#privacy" class="footer__bottom-link">Privacy & safeguarding</a>
          <a href="${p}contact/contact.html#terms" class="footer__bottom-link">Terms of use</a>
          <a href="${p}contact/contact.html" class="footer__bottom-link">Contact</a>
        </div>
      </div>
    </div>
  `;
}


/**
 * buildWhatsAppHTML — Generates the floating WhatsApp chat button.
 * This is a common feature on Indian school websites for instant inquiries.
 * 
 * @returns {string} WhatsApp button HTML
 */
function buildWhatsAppHTML() {
  return `
     <a href="https://wa.me/918935901010?text=Hello%20TGVIS%20School%20Office%2C%20I%20would%20like%20some%20information." target="_blank" rel="noopener noreferrer"
        class="whatsapp-btn" aria-label="Message the TGVIS school office on WhatsApp">
       <i class="ri-whatsapp-line"></i>
       <span class="whatsapp-btn__tooltip">Message us on WhatsApp</span>
    </a>
  `;
}


/* ==========================================================================
   INITIALIZATION — Inject components when the DOM is ready
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const base = getBasePath();

  /* ---- Inject Navbar ---- */
  const navbarEl = document.getElementById('navbar');
  if (navbarEl && navbarEl.innerHTML.trim() === '') {
    /* Only inject if the navbar is empty (placeholder mode) */
    navbarEl.innerHTML = buildNavbarHTML(base);
  }

  /* ---- Inject Footer ---- */
  const footerEl = document.querySelector('.footer');
  if (footerEl && footerEl.innerHTML.trim() === '') {
    /* Only inject if the footer is empty (placeholder mode) */
    footerEl.innerHTML = buildFooterHTML(base);
  }

  /* ---- Inject WhatsApp Button ---- */
  if (!document.querySelector('.whatsapp-btn')) {
    document.body.insertAdjacentHTML('beforeend', buildWhatsAppHTML());
  }
});
