/* ==========================================================================
   TGVIS — Latest Updates Page JavaScript
   ==========================================================================
   Handles news filtering by category and pagination controls.
   DEPENDENCIES: global.js, animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* News Category Filter */
  const filterButtons = document.querySelectorAll('.news-filters .filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  if (filterButtons.length > 0 && newsCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter news cards with smooth animation
        newsCards.forEach((card, index) => {
          const cardCategory = card.getAttribute('data-category');
          const shouldShow = (filterValue === 'all' || cardCategory === filterValue);

          if (shouldShow) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 80);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });

    // Apply transition to all cards
    newsCards.forEach(card => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
  }

  /* Pagination — simple page switching */
  const paginationBtns = document.querySelectorAll('.news-pagination__btn');
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paginationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // In a real app this would load new content; for now it updates the UI
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

}); // END DOMContentLoaded
