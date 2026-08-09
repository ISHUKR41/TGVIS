/* TGVIS — Academics Page JS | Curriculum tabs and scroll animations */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const items = document.querySelectorAll('.feature-card, .curriculum-card, .program-card');
    if (items.length) {
      gsap.from(items, { opacity: 0, y: 50, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: items[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
  }
});
