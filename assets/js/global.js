/* ==========================================================================
   TGVIS — Global JavaScript (Core Functionality)
   ==========================================================================
   
   This is the MAIN JavaScript file loaded on EVERY page of the website.
   It initializes core functionality that is shared across all pages:
   
   1. Preloader — hides the loading screen once the page is ready
   2. Navbar — sticky behavior, scroll transparency, mobile menu
   3. Dark Mode — toggle with localStorage persistence
   4. Smooth Scroll — initializes Lenis for buttery-smooth scrolling
   5. Back-to-Top — shows/hides the floating scroll button
   6. Active Nav Link — highlights the current page in navigation
   7. Page Transitions — smooth fade between pages
   
   DEPENDENCIES: This file requires Lenis.js (loaded via CDN in HTML).
   
   ========================================================================== */


/* --------------------------------------------------------------------------
   WAIT FOR DOM TO BE FULLY LOADED
   --------------------------------------------------------------------------
   We wrap everything in DOMContentLoaded to ensure the HTML is parsed
   before we try to access elements. This prevents "element not found" errors.
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. PRELOADER
     ========================================================================
     The preloader covers the entire screen while assets (images, fonts, etc.)
     are loading. Once everything is ready, we fade it out smoothly.
     This prevents users from seeing a "flash of unstyled content" (FOUC).
     ======================================================================== */

  const preloader = document.querySelector('.preloader');

  /**
   * hidePreloader - Adds the 'loaded' class to fade out the preloader,
   * then removes it from the DOM after the CSS transition completes.
   */
  function hidePreloader() {
    if (preloader) {
      // Add the 'loaded' class which triggers the CSS fade-out animation
      preloader.classList.add('loaded');

      // After the animation finishes (600ms), remove the element completely
      // This prevents it from blocking clicks on elements behind it
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
  }

  /*
   * Do not wait for optional CDN libraries or every image before showing the
   * page. A third-party request should never leave visitors behind a dark
   * loading layer. The document is already parsed here, so a short delay is
   * enough to keep the branded hand-off without blocking the first view.
   */
  setTimeout(hidePreloader, 180);

  // Safety net for unusual browser or stylesheet timing problems.
  setTimeout(hidePreloader, 2000);


  /* ========================================================================
     2. NAVBAR (Sticky Glassmorphism Navigation)
     ========================================================================
     The navbar starts transparent on the hero section, then becomes a
     solid glassmorphism bar as the user scrolls down. This creates a
     modern, immersive header experience.
     
     Behavior:
     - 0px scroll: Transparent background
     - 80px+ scroll: Solid glass background with shadow
     - Mobile: Hamburger menu with slide-out panel
     ======================================================================== */

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__menu');
  const overlay = document.querySelector('.navbar__overlay');
  const navLinks = document.querySelectorAll('.navbar__link');
  const navItems = document.querySelectorAll('.navbar__item');

  /**
   * handleNavbarScroll - Adds/removes the 'scrolled' class based on
   * the current scroll position. When scrolled, the navbar becomes
   * a solid glassmorphism bar for better readability.
   */
  function handleNavbarScroll() {
    if (!navbar) return;

    // The threshold (80px) roughly matches the navbar height
    // After scrolling past this, the hero section is no longer visible
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Run once on page load in case the page loads in a scrolled position
  handleNavbarScroll();


  /* ---- MOBILE MENU TOGGLE ----
     Opens and closes the mobile slide-out navigation panel.
     Also manages the dark overlay behind the menu. */

  /**
   * toggleMobileMenu - Opens or closes the mobile navigation menu.
   * Manages the hamburger icon animation (lines → X), menu slide,
   * overlay visibility, and body scroll lock.
   */
  function toggleMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    const isOpen = hamburger.classList.contains('active');

    // Toggle the active state on all related elements
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    if (overlay) {
      overlay.classList.toggle('active');
    }

    // Lock body scroll when menu is open to prevent background scrolling
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  /**
   * closeMobileMenu - Forcefully closes the mobile menu.
   * Used when clicking overlay, clicking a nav link, or pressing Escape.
   */
  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');

    if (overlay) {
      overlay.classList.remove('active');
    }

    // Unlock body scrolling
    document.body.style.overflow = '';
  }

  // Hamburger click event
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking the dark overlay
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking any navigation link (page is changing)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Only close on mobile — desktop hover menus should stay open
      if (window.innerWidth <= 1024) {
        closeMobileMenu();
      }
    });
  });

  // Close menu on Escape key press (keyboard accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });


  /* ---- DROPDOWN MENUS (Mobile) ----
     On mobile, dropdown menus are toggled by clicking (not hovering).
     Each dropdown accordion-style — clicking one closes the others. */

  navItems.forEach(item => {
    const dropdownToggle = item.querySelector('.navbar__link--dropdown');

    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        // Only use click-to-toggle on mobile (desktop uses CSS hover)
        if (window.innerWidth <= 1024) {
          e.preventDefault(); // Prevent the link from navigating

          // Close all OTHER dropdowns first (accordion behavior)
          navItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
            }
          });

          // Toggle THIS dropdown
          item.classList.toggle('open');
        }
      });
    }
  });


  /* ========================================================================
     3. DARK MODE TOGGLE
     ========================================================================
     Allows users to switch between light and dark color schemes.
     The preference is saved in localStorage so it persists across
     page loads and browser sessions.
     
     How it works:
     1. Check localStorage for a saved theme preference
     2. If found, apply it immediately (before page renders)
     3. On toggle, update the data-theme attribute and save to localStorage
     ======================================================================== */

   const themeToggles = document.querySelectorAll('.navbar__theme-toggle');
  const htmlElement = document.documentElement;

  /**
   * getPreferredTheme - Determines the initial theme based on:
   * 1. User's saved preference in localStorage (highest priority)
   * 2. System preference via prefers-color-scheme media query
   * 3. Defaults to 'light' if neither is set
   * 
   * @returns {string} 'light' or 'dark'
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('tgvis-theme');
    if (savedTheme) return savedTheme;

    // Check if the user's OS/browser prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * applyTheme - Sets the theme on the HTML element and updates the
   * toggle button icon (sun ↔ moon).
   * 
   * @param {string} theme - Either 'light' or 'dark'
   */
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);

    // Update the toggle button icon
     themeToggles.forEach(toggle => {
       const icon = toggle.querySelector('i');
       if (icon) {
        // Sun icon for dark mode (click to switch to light)
        // Moon icon for light mode (click to switch to dark)
        icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
      }
       toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
     });
  }

  // Apply the theme immediately on page load
  applyTheme(getPreferredTheme());

  // Toggle theme when the button is clicked
   if (themeToggles.length) {
     themeToggles.forEach(toggle => toggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      applyTheme(newTheme);
      localStorage.setItem('tgvis-theme', newTheme);
     }));
  }

  // Listen for system theme changes (if user changes OS dark mode setting)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if the user hasn't manually set a preference
    if (!localStorage.getItem('tgvis-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  /* ========================================================================
     4. SMOOTH SCROLL (Lenis)
     ========================================================================
     Lenis provides buttery-smooth scrolling that feels natural and premium.
     It replaces the browser's default jerky scrolling with a smooth,
     physics-based scroll experience.
     
     NOTE: Lenis is loaded via CDN in the HTML file. If it fails to load,
     the browser's native smooth scrolling (set in CSS) takes over.
     ======================================================================== */

  /**
   * initLenis - Initializes the Lenis smooth scroll library.
   * CRITICAL: Properly syncs with GSAP ScrollTrigger to prevent lag.
   * Without this sync, Lenis and ScrollTrigger fight each other,
   * causing the "laggy scrolling" issue.
   * 
   * FIX: We use a retry mechanism — if GSAP isn't ready yet when global.js
   * first runs (due to CDN load timing with defer), we retry after a short
   * delay to ensure proper sync is established before starting Lenis.
   */
  function initLenis() {
    /*
     * Native browser scrolling is intentionally used here. The previous
     * Lenis + GSAP setup could create two requestAnimationFrame loops when
     * the CDN scripts arrived in a different order, which made long pages
     * feel heavy. CSS scroll-behavior and the small anchor helper below keep
     * navigation smooth without taking control of the browser's scroll.
     */
    window.lenisInstance = null;
  }

  // Initialize Lenis smooth scrolling
  initLenis();


  /* ========================================================================
     5. BACK-TO-TOP BUTTON
     ========================================================================
     A floating button in the bottom-right corner that appears after
     scrolling down 500px. Clicking it smoothly scrolls to the top.
     ======================================================================== */

  const backToTop = document.querySelector('.back-to-top');

  /**
   * handleBackToTop - Shows or hides the back-to-top button based on
   * how far the user has scrolled down the page.
   */
  function handleBackToTop() {
    if (!backToTop) return;

    // Show the button after scrolling 500px down
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /*
   * Coalesce scroll UI updates into one animation-frame callback. This keeps
   * the navbar and back-to-top button responsive without doing layout work
   * for every raw wheel/touch event.
   */
  let scrollUpdatePending = false;
  function scheduleScrollUpdate() {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    requestAnimationFrame(() => {
      scrollUpdatePending = false;
      handleNavbarScroll();
      handleBackToTop();
    });
  }
  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });

  // Scroll to top when the button is clicked
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      // Use Lenis if available, otherwise use native scrollTo
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }


  /* ========================================================================
     6. ACTIVE NAVIGATION LINK HIGHLIGHTING
     ========================================================================
     Automatically highlights the current page's navigation link by
     comparing the page URL to each nav link's href attribute.
     This gives users a clear indicator of where they are on the site.
     ======================================================================== */

  /**
   * highlightActiveNavLink - Scans all navbar links and adds the 'active'
   * class to the one that matches the current page URL.
   */
  function highlightActiveNavLink() {
     const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');

       if (!linkPath || linkPath.startsWith('#') || linkPath === 'javascript:void(0)') return;

       const resolvedPath = new URL(linkPath, window.location.href).pathname;

      // Check if the current page URL matches or starts with this link's path
      // This handles both exact matches and nested pages
       if (currentPath === resolvedPath ||
           (resolvedPath !== '/' && currentPath.startsWith(resolvedPath.replace(/\/index\.html$/, '/')))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Run on page load
  highlightActiveNavLink();


  /* ========================================================================
     7. SMOOTH ANCHOR SCROLLING
     ========================================================================
     When users click internal links (e.g., href="#about"), this scrolls
     smoothly to the target section instead of jumping instantly.
     ======================================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Skip empty hashes or "#" only
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate position accounting for the fixed navbar height
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navHeight - 20;

        // Use Lenis if available, otherwise native scroll
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(targetPosition, { duration: 1.2 });
        } else {
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  /*
   * Newsletter forms are intentionally local until the school connects an
   * email service. Showing an inline confirmation is more honest and more
   * accessible than pretending a subscription was sent to a backend.
   */
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.parentElement.querySelector('[data-newsletter-status]');
      if (status) status.textContent = 'Thanks — updates will be shared once the school newsletter is live.';
      form.reset();
    });
  });


  /* ========================================================================
     8. PAGE TRANSITION EFFECT
     ========================================================================
     When users click internal links to other pages, a smooth green curtain
     animation covers the screen before the new page loads. This creates
     a polished, app-like navigation experience.
     ======================================================================== */

  const pageTransition = document.querySelector('.page-transition');

  /**
   * handlePageTransition - Intercepts clicks on internal links and plays
   * a page transition animation before navigating.
   * 
   * @param {Event} e - The click event on an anchor tag
   */
  function handlePageTransition(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    // Skip external links, anchor links, and special links
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('http') || 
        href.startsWith('mailto') || 
        href.startsWith('tel') ||
        link.getAttribute('target') === '_blank') {
      return;
    }

    e.preventDefault();

    // Trigger the transition animation
    if (pageTransition) {
      pageTransition.classList.add('active');

      // Navigate to the new page after the animation reaches midpoint
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    } else {
      // If no transition element exists, navigate immediately
      window.location.href = href;
    }
  }

  // Attach transition to all internal navigation links
  document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([target="_blank"])').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', handlePageTransition);
    }
  });


  /* ========================================================================
     9. ACCORDION FUNCTIONALITY
     ========================================================================
     Generic accordion (expandable/collapsible sections) used in FAQ,
     admissions, and other pages. Clicking a header expands its content
     and collapses any previously open items.
     ======================================================================== */

  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const content = item.querySelector('.accordion__content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close ALL accordion items first (only one can be open at a time)
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion__content');
          if (otherContent) {
            otherContent.style.maxHeight = null;
          }
        });

        // If the clicked item wasn't already open, open it
        if (!isActive) {
          item.classList.add('active');
          // Set maxHeight to the content's natural scroll height for smooth animation
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });


  /* ========================================================================
     10. TAB NAVIGATION
     ========================================================================
     Generic tab component used in academics, timetable, and other pages.
     Clicking a tab button shows its associated content panel and hides
     all other panels.
     ======================================================================== */

  const tabContainers = document.querySelectorAll('.tabs');

  tabContainers.forEach(tabContainer => {
    const tabButtons = tabContainer.querySelectorAll('.tabs__btn');
    const tabPanels = tabContainer.querySelectorAll('.tabs__panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the target panel ID from the button's data-tab attribute
        const targetId = button.getAttribute('data-tab');
        const targetPanel = tabContainer.querySelector(`#${targetId}`);

        if (!targetPanel) return;

        // Deactivate all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Activate the clicked button and its panel
        button.classList.add('active');
        targetPanel.classList.add('active');
      });
    });
  });


  /* ========================================================================
     11. CURRENT YEAR (Copyright)
     ========================================================================
     Automatically updates the copyright year in the footer so it's
     always current without manual updates.
     ======================================================================== */

  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();

  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

}); // END DOMContentLoaded
