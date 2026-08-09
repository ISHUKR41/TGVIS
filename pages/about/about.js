/* ==========================================================================
   TGVIS — About Us Page JavaScript
   ==========================================================================
   Page-specific JavaScript for the About page.
   Handles timeline animation and any interactive elements.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- TIMELINE DOT ANIMATION ----
     Animates the timeline dots with a pulse effect when they scroll
     into view, drawing the user's attention to each milestone. */

  function initTimelineDots() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const dots = document.querySelectorAll('.timeline__dot');

    dots.forEach((dot, index) => {
      // Each dot gets a subtle scale-in animation
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: dot,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  initTimelineDots();

  /* ---- VMV CARDS COUNTER ----
     Adds a subtle entrance animation to the Vision/Mission/Values cards */

  function initVMVCards() {
    if (typeof gsap === 'undefined') return;

    const vmvCards = document.querySelectorAll('.vmv-card');

    vmvCards.forEach((card, index) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  initVMVCards();

}); // END DOMContentLoaded
