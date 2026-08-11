/*
  TGVIS Tuition Programme — page behaviour.
  The page is intentionally light: shared navigation, preloader, and reveal
  animations do the heavy lifting while this file provides a clear CTA state.
*/

document.addEventListener('DOMContentLoaded', () => {
  const tuitionCta = document.querySelector('.tuition-details__actions .btn--primary');
  if (!tuitionCta) return;

  tuitionCta.addEventListener('click', () => {
    tuitionCta.classList.add('is-activated');
    window.setTimeout(() => tuitionCta.classList.remove('is-activated'), 700);
  });
});