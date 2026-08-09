/* ==========================================================================
   TGVIS — Events Page JavaScript
   ==========================================================================

   Adds a category filter bar above the events grid so visitors can
   quickly show only Cultural, Sports, Academic, or National events.
   Works by reading the existing category tags on each card.

   DEPENDENCIES: None (vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const eventsGrid = document.querySelector('.events-grid');
  if (!eventsGrid) return;

  const cards = Array.from(eventsGrid.querySelectorAll('.event-card'));

  /* Collect all unique category names from the existing cards */
  const categories = ['All'];
  cards.forEach(card => {
    const tag = card.querySelector('.event-card__category');
    if (tag) {
      const name = tag.textContent.trim();
      if (!categories.includes(name)) categories.push(name);
    }
  });

  /* Only inject the filter bar if there are multiple categories */
  if (categories.length <= 2) return;

  /* Build the filter button bar */
  const bar = document.createElement('div');
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter events by category');
  bar.style.cssText = [
    'display:flex',
    'gap:var(--space-3)',
    'flex-wrap:wrap',
    'margin-bottom:var(--space-8)',
    'justify-content:center'
  ].join(';');

  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = cat;
    btn.dataset.filter = cat;

    const isActive = i === 0;
    applyBtnStyle(btn, isActive);

    btn.addEventListener('click', () => {
      /* Update button styles */
      bar.querySelectorAll('button').forEach(b => applyBtnStyle(b, false));
      applyBtnStyle(btn, true);

      /* Show / hide cards */
      cards.forEach(card => {
        if (cat === 'All') {
          card.style.display = '';
          return;
        }
        const tag = card.querySelector('.event-card__category');
        card.style.display = (tag && tag.textContent.trim() === cat) ? '' : 'none';
      });
    });

    bar.appendChild(btn);
  });

  /* Insert the filter bar just before the events grid */
  eventsGrid.parentNode.insertBefore(bar, eventsGrid);


  /* ── Helper: apply active/inactive button styles ── */
  function applyBtnStyle(btn, active) {
    btn.style.cssText = [
      'padding:var(--space-2) var(--space-5)',
      'border-radius:var(--radius-full)',
      'font-size:var(--fs-xs)',
      'font-weight:700',
      'letter-spacing:0.05em',
      'text-transform:uppercase',
      'cursor:pointer',
      'transition:all var(--transition-base)',
      active
        ? 'background:var(--color-primary);color:#fff;border:2px solid var(--color-primary)'
        : 'background:var(--bg-secondary);color:var(--text-secondary);border:2px solid var(--color-gray-200)'
    ].join(';');
  }

});
