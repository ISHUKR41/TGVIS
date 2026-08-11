/*
 * TGVIS — Extracurricular page interactions
 * ------------------------------------------
 * The page is intentionally usable without JavaScript. This small enhancement
 * adds a clear keyboard and screen-reader state to activity cards while
 * respecting visitors who prefer reduced motion.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.setAttribute('data-activity-index', String(index + 1));
    card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
    card.addEventListener('focusin', () => card.classList.add('is-hovered'));
    card.addEventListener('focusout', () => card.classList.remove('is-hovered'));
  });
});