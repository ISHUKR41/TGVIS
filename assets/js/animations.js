/* ==========================================================================
   TGVIS — Animations JavaScript (Scroll Reveals & GSAP)
   ==========================================================================
   
   This file handles all scroll-triggered animations across the website.
   It uses TWO animation systems:
   
   1. Intersection Observer (Native) — Lightweight scroll-reveal for simple
      fade-in/slide-in animations. No external library needed.
   
   2. GSAP + ScrollTrigger (External) — For complex, precise animations like
      hero text sequences, parallax effects, and staggered timelines.
   
   DEPENDENCIES:
   - GSAP (gsap.min.js) — loaded via CDN
   - GSAP ScrollTrigger plugin — loaded via CDN
   - CountUp.js — loaded via CDN (for animated number counters)
   
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. INTERSECTION OBSERVER — SCROLL REVEAL SYSTEM
     ========================================================================
     The Intersection Observer API watches elements as they enter/exit the
     viewport. When an element with the '.reveal' class scrolls into view,
     we add the '.revealed' class to trigger its CSS animation.
     
     This is MORE PERFORMANT than scroll event listeners because:
     - It runs asynchronously off the main thread
     - It only fires when elements cross the threshold (not every scroll tick)
     - It uses the browser's native observation system
     
     HOW TO USE:
     Add class="reveal" to any HTML element you want to animate on scroll.
     Optionally add direction (reveal--up, reveal--left, etc.) and
     stagger (stagger-1, stagger-2, etc.) classes.
     ======================================================================== */

  /**
   * initScrollReveal - Creates an IntersectionObserver that watches all
   * elements with the '.reveal' class and animates them when they enter
   * the viewport.
   */
  function initScrollReveal() {
    // Get all elements that should be animated on scroll
    const revealElements = document.querySelectorAll('.reveal');

    // If no elements to animate, exit early (performance optimization)
    if (revealElements.length === 0) return;

    /**
     * Observer Options:
     * - root: null → uses the browser viewport as the observation area
     * - rootMargin: '0px 0px -80px 0px' → triggers 80px before the element
     *   reaches the bottom of the viewport (makes animations feel earlier)
     * - threshold: 0.15 → triggers when 15% of the element is visible
     *   (not too early, not too late — a balanced trigger point)
     */
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    /**
     * revealCallback - Called by the observer when elements cross the
     * visibility threshold. Adds 'revealed' class to trigger CSS animation.
     * 
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     * @param {IntersectionObserver} observer - The observer instance
     */
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is now visible — trigger its animation
          entry.target.classList.add('revealed');

          // Stop observing this element (animation only plays once)
          observer.unobserve(entry.target);
        }
      });
    };

    // Create the observer with our options and callback
    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

    // Start observing all reveal elements
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // Initialize the scroll reveal system
  initScrollReveal();


  /* ========================================================================
     2. GSAP ANIMATIONS (Advanced Scroll Effects)
     ========================================================================
     GSAP (GreenSock Animation Platform) is used for complex animations
     that need precise timing, sequencing, and scroll-synchronized behavior.
     
     We use GSAP for:
     - Hero section text entrance sequences
     - Parallax background scrolling
     - Complex staggered card animations
     - Number counter animations
     ======================================================================== */

  /**
   * initGSAP - Initializes GSAP animations if the library is loaded.
   * Registers the ScrollTrigger plugin and sets up all GSAP-powered
   * animations across the site.
   */
  function initGSAP() {
    /*
     * Scroll-triggered GSAP timelines used to compete with native scrolling
     * and could create a second animation loop on long pages. Native
     * IntersectionObserver reveals below provide the same visual hierarchy
     * with much less work per frame.
     */
    return;

    // Check if GSAP is available (loaded from CDN)
    if (typeof gsap === 'undefined') {
      console.warn('TGVIS: GSAP not loaded — skipping advanced animations.');
      return;
    }

    // Register ScrollTrigger plugin (required for scroll-based animations)
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set default easing for all GSAP animations (smooth, natural movement)
    gsap.defaults({
      ease: 'power3.out',
      duration: 1
    });


    /* ---- HERO SECTION ANIMATIONS ----
       Complex entrance sequence for the homepage hero:
       1. Background fades in
       2. Main heading slides up word by word
       3. Subtitle fades in
       4. CTA buttons bounce in
       5. Floating decorative elements start animating */

    const heroSection = document.querySelector('.hero');

    if (heroSection) {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Animate the hero heading (each word separately for a "reveal" effect)
      const heroTitle = heroSection.querySelector('.hero__title');
      if (heroTitle) {
        // Split the heading text into individual word spans
        splitTextIntoWords(heroTitle);

        const words = heroTitle.querySelectorAll('.word');

        heroTimeline
          .from(words, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,  // Each word appears 80ms after the previous
            ease: 'back.out(1.7)'
          })
          .from('.hero__subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.6
          }, '-=0.3')  // Start 300ms before the previous animation ends
          .from('.hero__cta-group', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
          }, '-=0.2')
          .from('.hero__stats', {
            y: 20,
            opacity: 0,
            duration: 0.5
          }, '-=0.1');
      }
    }


    /* ---- PARALLAX EFFECTS ----
       Elements with the 'parallax' class and a data-speed attribute
       move at different speeds when scrolling, creating a depth effect.
       
       data-speed="0.5" → moves at half the scroll speed (background)
       data-speed="1.5" → moves at 1.5x scroll speed (foreground) */

    if (typeof ScrollTrigger !== 'undefined') {
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;

        gsap.to(element, {
          yPercent: speed * 30,  // How far the element moves
          ease: 'none',          // Linear movement (no easing for parallax)
          scrollTrigger: {
            trigger: element.closest('section') || element,
            start: 'top bottom',   // Animation starts when section enters viewport
            end: 'bottom top',     // Animation ends when section leaves viewport
            scrub: 1.5,            // Smoothly ties animation to scroll position
            invalidateOnRefresh: true  // Recalculate on window resize
          }
        });
      });


      /* ---- SECTION HEADING ANIMATIONS ----
         Section headers animate in with a scale + fade effect when they
         scroll into view. The decorative underline draws from left to right. */

      const sectionHeaders = document.querySelectorAll('.section-header');

      sectionHeaders.forEach(header => {
        const label = header.querySelector('.section-label');
        const title = header.querySelector('.section-title');
        const description = header.querySelector('.section-description');
        const divider = header.querySelector('.divider');

        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',   // Trigger when header is 80% from top of viewport
            end: 'bottom 60%',
            toggleActions: 'play none none none'  // Play once, don't reverse
          }
        });

        if (label) {
          headerTimeline.from(label, { y: 20, opacity: 0, duration: 0.5 });
        }
        if (title) {
          headerTimeline.from(title, { y: 30, opacity: 0, duration: 0.6 }, '-=0.2');
        }
        if (divider) {
          headerTimeline.from(divider, { scaleX: 0, duration: 0.5 }, '-=0.3');
        }
        if (description) {
          headerTimeline.from(description, { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');
        }
      });


      /* ---- STAGGERED CARD GRID ANIMATIONS ----
         Cards in a grid animate in one by one with a slight delay,
         creating a cascading "wave" effect. */

      const cardGrids = document.querySelectorAll('.grid-animated');

      cardGrids.forEach(grid => {
        const cards = grid.children;

        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,  // 100ms delay between each card
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });


      /* ---- TIMELINE / HISTORY ANIMATIONS ----
         Vertical timeline items alternate left/right and animate
         in from their respective sides. */

      const timelineItems = document.querySelectorAll('.timeline__item');

      timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -40 : 40; // Alternate left/right

        gsap.from(item, {
          x: direction,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    }
  }

  // Initialize GSAP animations
  initGSAP();


  /* ========================================================================
     3. NUMBER COUNTER ANIMATIONS
     ========================================================================
     Animated counters that count up from 0 to a target number when they
     scroll into view. Used for statistics like "500+ Students", 
     "25+ Years", etc.
     
     Uses CountUp.js if available, otherwise falls back to a simple
     custom implementation.
     
     HOW TO USE:
     <span class="counter" data-target="500" data-suffix="+">0</span>
     - data-target: The final number to count to
     - data-suffix: Optional text after the number (e.g., "+", "%")
     - data-prefix: Optional text before the number (e.g., "₹")
     - data-duration: Animation duration in seconds (default: 2)
     ======================================================================== */

  /**
   * initCounters - Sets up counter elements to animate when they
   * enter the viewport.
   */
  function initCounters() {
    const counterElements = document.querySelectorAll('.counter');

    if (counterElements.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target')) || 0;
          const suffix = element.getAttribute('data-suffix') || '';
          const prefix = element.getAttribute('data-prefix') || '';
          const duration = parseFloat(element.getAttribute('data-duration')) || 2;

          // Use CountUp.js if available (smoother, more options)
          if (typeof CountUp !== 'undefined') {
            const counter = new CountUp(element, target, {
              duration: duration,
              separator: ',',      // Add commas for thousands
              suffix: suffix,
              prefix: prefix,
              enableScrollSpy: false,
              useEasing: true
            });

            if (!counter.error) {
              counter.start();
            } else {
              // Fallback if CountUp has an error
              animateCounterFallback(element, target, suffix, prefix, duration);
            }
          } else {
            // Fallback animation without CountUp.js
            animateCounterFallback(element, target, suffix, prefix, duration);
          }

          // Stop observing after animation starts
          counterObserver.unobserve(element);
        }
      });
    }, {
      threshold: 0.5  // Trigger when 50% visible
    });

    // Observe all counter elements
    counterElements.forEach(el => counterObserver.observe(el));
  }

  /**
   * animateCounterFallback - A simple counter animation that doesn't
   * require any external library. Uses requestAnimationFrame for smooth
   * number updates.
   * 
   * @param {HTMLElement} element - The DOM element to update
   * @param {number} target - The final number to count to
   * @param {string} suffix - Text after the number
   * @param {string} prefix - Text before the number
   * @param {number} duration - Animation duration in seconds
   */
  function animateCounterFallback(element, target, suffix, prefix, duration) {
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic curve for natural deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(easedProgress * target);
      element.textContent = prefix + currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Initialize counters
  initCounters();


  /* ========================================================================
     4. TEXT SPLITTING UTILITY
     ========================================================================
     Splits text content into individual <span> elements for per-word
     or per-character GSAP animations. Used primarily in hero headings.
     ======================================================================== */

  /**
   * splitTextIntoWords - Takes an element's text content and wraps each
   * word in a <span class="word"> for individual animation.
   * 
   * Example: "Welcome to TGVIS" becomes:
   * <span class="word">Welcome</span>
   * <span class="word">to</span>
   * <span class="word">TGVIS</span>
   * 
   * @param {HTMLElement} element - The element whose text to split
   */
  function splitTextIntoWords(element) {
    if (!element) return;

    const text = element.textContent;
    const words = text.split(' ');

    // Clear the element and rebuild with individual word spans
    element.innerHTML = '';

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.display = 'inline-block'; // Required for transforms to work
      span.style.marginRight = '0.3em';    // Preserve word spacing

      element.appendChild(span);
    });
  }

  /**
   * splitTextIntoChars - Splits text into individual characters for
   * per-letter animations (used sparingly for headings).
   * 
   * @param {HTMLElement} element - The element whose text to split
   */
  function splitTextIntoChars(element) {
    if (!element) return;

    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
      span.style.display = 'inline-block';

      element.appendChild(span);
    });
  }

  // Expose text splitting functions globally for page-specific scripts
  window.TGVIS = window.TGVIS || {};
  window.TGVIS.splitTextIntoWords = splitTextIntoWords;
  window.TGVIS.splitTextIntoChars = splitTextIntoChars;


  /* ========================================================================
     5. IMAGE LAZY LOADING WITH BLUR EFFECT
     ========================================================================
     Images with the 'lazy' class load only when they're about to enter
     the viewport. They show a blurred placeholder first, then sharpen
     to the full image when loaded.
     
     HOW TO USE:
     <img class="lazy" data-src="actual-image.jpg" src="tiny-placeholder.jpg">
     ======================================================================== */

  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img.lazy');

    if (lazyImages.length === 0) return;

    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
      return;
    }

    // Fallback to Intersection Observer for older browsers
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.addEventListener('load', () => {
              img.classList.remove('lazy');
              img.classList.add('loaded');
            });
          }

          lazyObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px' // Load images 100px before they enter viewport
    });

    lazyImages.forEach(img => lazyObserver.observe(img));
  }

  // Initialize lazy loading
  initLazyImages();

}); // END DOMContentLoaded
