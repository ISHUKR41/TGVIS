/* TGVIS — Fees Page JS | Handles fee table interactions and scroll animations */
document.addEventListener('DOMContentLoaded', () => {
  /* Animate fee cards on scroll */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const cards = document.querySelectorAll('.fee-card, .pricing-card, .feature-card');
    if (cards.length) {
      gsap.from(cards, { opacity: 0, y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
  }
});
