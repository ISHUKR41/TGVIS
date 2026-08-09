/* ==========================================================================
   TGVIS — Life at TGVIS | Page-Specific JavaScript
   ==========================================================================
   
   Handles interactions and animations unique to the "Life at TGVIS" page.
   
   FEATURES:
   1. Value Pills Stagger Animation — pills appear one by one on scroll
   2. Tuition Highlight Entrance — slides in from the left on scroll
   3. Facility Cards Counter — animated number counting for stats (if present)
   
   DEPENDENCIES: 
   - GSAP + ScrollTrigger (loaded via CDN)
   - animations.js (provides base reveal animations)
   
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. VALUE PILLS STAGGER ANIMATION
     ========================================================================
     When the values section scrolls into view, each pill badge appears
     one after another with a slight delay (stagger effect).
     This creates a cascading entrance that draws attention to each value.
     ======================================================================== */

  /**
   * initValuePillsAnimation — Sets up GSAP ScrollTrigger animation
   * for the value pill badges. Each pill fades in and slides up
   * with a 0.1-second stagger between them.
   */
  function initValuePillsAnimation() {
    /* Check if GSAP and ScrollTrigger are available */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('TGVIS Life: GSAP not loaded — value pills animation skipped.');
      return;
    }

    /* Register ScrollTrigger plugin */
    gsap.registerPlugin(ScrollTrigger);

    /* Select all value pill elements */
    const pills = document.querySelectorAll('.value-pill');

    if (pills.length > 0) {
      /* Set initial state — invisible and slightly below position */
      gsap.set(pills, {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      /* Animate pills into view when the values grid enters the viewport */
      gsap.to(pills, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,           /* 120ms delay between each pill */
        ease: 'back.out(1.7)',   /* Slight overshoot for playful feel */
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',      /* Start when top of grid is 80% down viewport */
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
    }
  }


  /* ========================================================================
     2. TUITION HIGHLIGHT ENTRANCE
     ========================================================================
     The tuition program highlight card slides in from the left side
     when it enters the viewport. This draws attention to this unique
     feature of TGVIS.
     ======================================================================== */

  /**
   * initTuitionAnimation — Animates the tuition highlight card
   * with a slide-in-from-left entrance effect.
   */
  function initTuitionAnimation() {
    if (typeof gsap === 'undefined') return;

    const tuitionCard = document.querySelector('.tuition-highlight');

    if (tuitionCard) {
      gsap.from(tuitionCard, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tuitionCard,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }


  /* ========================================================================
     3. FEATURE CARD HOVER TILT EFFECT
     ========================================================================
     Adds a subtle 3D tilt effect to feature cards when the user moves
     their mouse over them. The card tilts slightly in the direction of
     the cursor, creating a premium interactive feel.
     ======================================================================== */

  /**
   * initCardTiltEffect — Attaches mousemove listeners to feature cards
   * to create a 3D perspective tilt based on cursor position.
   */
  function initCardTiltEffect() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
      /* On mouse move, calculate tilt angle based on cursor position */
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;    /* Cursor X relative to card */
        const y = e.clientY - rect.top;     /* Cursor Y relative to card */
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        /* Calculate rotation (max ±5 degrees) */
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      /* Reset tilt when mouse leaves the card */
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  /* ========================================================================
     INITIALIZE ALL PAGE ANIMATIONS
     ======================================================================== */

  /* Wait a small delay for GSAP to fully initialize */
  setTimeout(() => {
    initValuePillsAnimation();
    initTuitionAnimation();
    initCardTiltEffect();
  }, 100);

});
