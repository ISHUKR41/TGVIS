/* ==========================================================================
   TGVIS — Latest Updates Page JavaScript
   ==========================================================================
   Handles update filtering by category.
   DEPENDENCIES: global.js, animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /*
   * The page markup uses the "updates" naming convention. Keeping the
   * selectors aligned here prevents a silent no-op when a filter is clicked.
   */
  const filterButtons = document.querySelectorAll('.updates-filter__btn');
  const newsCards = document.querySelectorAll('.update-card');

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
          const shouldShow = (filterValue === 'All' || cardCategory === filterValue);

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

}); // END DOMContentLoaded
