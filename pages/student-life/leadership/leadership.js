/* ==========================================================================
   TGVIS — Leadership Page JavaScript
   ==========================================================================
   
   Handles interactive functionality for the Student Leadership page:
   1. Scroll reveal animations for leader cards and council members
   2. Dynamic council member filtering by position
   3. Smooth entrance animations using IntersectionObserver
   
   DEPENDENCIES: global.js, animations.js (loaded before this file)
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. COUNCIL MEMBER FILTER
     ========================================================================
     Allows visitors to filter council members by their position
     (e.g., show only Prefects, Sports Captain, etc.)
     ======================================================================== */

  const filterButtons = document.querySelectorAll('.filter-btn');
  const councilCards = document.querySelectorAll('.council-card');

  if (filterButtons.length > 0 && councilCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the filter value from the button's data attribute
        const filterValue = button.getAttribute('data-filter');

        // Update active button styling
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show or hide council cards based on the filter
        councilCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || cardCategory === filterValue) {
            // Show the card with a smooth fade-in animation
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            // Trigger reflow before adding animation (forces browser to register change)
            void card.offsetWidth;

            // Animate in
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            // Hide the card with a fade-out
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';

            // Remove from layout after fade-out completes
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }


  /* ========================================================================
     2. STAGGERED CARD ENTRANCE ANIMATION
     ========================================================================
     Adds a staggered fade-in effect to leadership cards when they
     first scroll into view. Each card animates slightly after the previous
     one, creating a cascading wave effect.
     ======================================================================== */

  const leaderCards = document.querySelectorAll('.leader-card');

  if (leaderCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Delay each card by 150ms more than the previous one
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);

          // Stop observing once animated (animation only plays once)
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Set initial hidden state and start observing
    leaderCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(card);
    });
  }

}); // END DOMContentLoaded
