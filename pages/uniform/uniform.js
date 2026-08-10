/* ==========================================================================
   TGVIS — Uniform page interactions
   ==========================================================================
   Keeps the page lightweight while adding a useful visual cue for the
   current season. The written uniform rules remain the source of truth.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const seasonLabel = document.querySelector('[data-uniform-season]');
  if (!seasonLabel) return;

  const month = new Date().getMonth() + 1;
  seasonLabel.textContent = month >= 4 && month <= 10
    ? 'Summer uniform guidance'
    : 'Winter uniform guidance';
});