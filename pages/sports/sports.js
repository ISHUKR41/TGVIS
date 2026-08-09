/* ==========================================================================
   TGVIS — Sports Page JavaScript
   ==========================================================================
   Stats counter animation for sports achievements.
   DEPENDENCIES: global.js, animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* Sports Stats Counter */
  const statNumbers = document.querySelectorAll('.sports-stat__number[data-target]');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 50));
          const counter = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(counter); }
            entry.target.textContent = current + suffix;
          }, 30);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));
  }
});
