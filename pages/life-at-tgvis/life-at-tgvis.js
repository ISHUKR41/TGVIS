/* ==========================================================================
   TGVIS — Life at TGVIS | Page-Specific JavaScript
   ==========================================================================

   Handles all animations and interactions on the Life at TGVIS page:
   1. Value pills stagger entrance animation (GSAP)
   2. Tuition highlight card slide-in animation
   3. Feature card 3D tilt effect on mouse move (desktop only)

   DEPENDENCIES: GSAP + ScrollTrigger (loaded via CDN), animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. VALUE PILLS STAGGER ANIMATION ──────────────────────────────────
     Each pill badge (Respect, Excellence, etc.) animates in one after
     another when the section scrolls into view. */
  function initValuePills() {
    if (typeof gsap === 'undefined') return;

    const pills = document.querySelectorAll('.value-pill');
    if (!pills.length) return;

    gsap.set(pills, { opacity: 0, y: 24, scale: 0.9 });

    gsap.to(pills, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.55,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.values-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ── 2. TUITION HIGHLIGHT SLIDE-IN ─────────────────────────────────────
     The integrated tuition card slides in from the left on scroll. */
  function initTuitionCard() {
    if (typeof gsap === 'undefined') return;

    const card = document.querySelector('.tuition-highlight');
    if (!card) return;

    gsap.from(card, {
      opacity: 0, x: -50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ── 3. FEATURE CARD TILT EFFECT ────────────────────────────────────────
     Cards gently tilt to follow the cursor on desktop for a premium feel.
     Skipped on touch devices to avoid awkward interactions. */
  function initCardTilt() {
    /* Only on desktop — touch devices should not have this */
    if ('ontouchstart' in window) return;

    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
        card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  /* Initialize all page animations */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  setTimeout(() => {
    initValuePills();
    initTuitionCard();
    initCardTilt();
  }, 100);

});
