/*
 * TGVIS — Outreach page interactions
 * ----------------------------------
 * The outreach page has no backend requirement. This enhancement keeps
 * program cards easy to scan and adds a polite reveal hook for browsers that
 * do not load the optional animation library.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('outreach-card--visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  cards.forEach(card => observer.observe(card));
});