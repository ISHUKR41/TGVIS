/* ==========================================================================
   TGVIS — Clubs & Societies Page JavaScript
   ==========================================================================
   
   Interactive functionality for the clubs directory page:
   1. Category-based filtering of club cards
   2. Smooth entrance animations on scroll
   
   DEPENDENCIES: global.js, animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. CLUB CATEGORY FILTER
     ========================================================================
     Filter buttons at the top let visitors view clubs by category
     (e.g., Academic, Cultural, Sports, Technology, All).
     Uses data attributes on cards to match against the filter value.
     ======================================================================== */

  const filterButtons = document.querySelectorAll('.club-filters .filter-btn');
  const clubCards = document.querySelectorAll('.club-card');

  if (filterButtons.length > 0 && clubCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cards with smooth animation
        clubCards.forEach((card, index) => {
          const cardCategory = card.getAttribute('data-category');
          const shouldShow = (filterValue === 'all' || cardCategory === filterValue);

          if (shouldShow) {
            card.style.display = '';
            // Stagger the reveal for a cascading effect
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, index * 60);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95) translateY(10px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });

    // Set CSS transitions on all cards for smooth filtering
    clubCards.forEach(card => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
  }

}); // END DOMContentLoaded
