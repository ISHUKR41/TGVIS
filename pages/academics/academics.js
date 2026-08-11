/* ==========================================================================
   TGVIS — Academics Page JavaScript
   ==========================================================================

   Handles:
   1. GSAP scroll animations for academic level cards
   2. Animated entrance for the academic philosophy section
   3. Facility cards stagger animation

   DEPENDENCIES: GSAP + ScrollTrigger (CDN), animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Academic Level Cards — stagger entrance ── */
  const levelCards = document.querySelectorAll('.feature-card');

  if (levelCards.length && typeof ScrollTrigger !== 'undefined') {
    levelCards.forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        duration: 0.65,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /* ── Philosophy intro text — fade-in on scroll ── */
  const philosophy = document.querySelector('.section-header .lead, .lead');
  if (philosophy && typeof ScrollTrigger !== 'undefined') {
    gsap.from(philosophy, {
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: philosophy,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  }

});
