/* ==========================================================================
   TGVIS — Awards & Recognition Page JavaScript
   ==========================================================================
   
   Handles:
   1. Year filter for achievements timeline
   2. Staggered card entrance animations
   3. Counter animation for achievement stats
   
   DEPENDENCIES: global.js, animations.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. YEAR FILTER TABS
     ======================================================================== */

  const yearTabs = document.querySelectorAll('.year-tab');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (yearTabs.length > 0 && timelineItems.length > 0) {
    yearTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const year = tab.getAttribute('data-year');

        // Update active tab
        yearTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter timeline items
        timelineItems.forEach(item => {
          const itemYear = item.getAttribute('data-year');
          if (year === 'all' || itemYear === year) {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });

    // Add transition to all timeline items
    timelineItems.forEach(item => {
      item.style.transition = 'opacity 0.3s ease';
    });
  }

  /* ========================================================================
     2. ACHIEVEMENT STATS COUNTER
     ========================================================================
     Animates the numbers in the stats bar when they scroll into view.
     ======================================================================== */

  const statNumbers = document.querySelectorAll('.award-stat__number[data-target]');

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.ceil(target / 60);
          const duration = 1500;
          const interval = duration / (target / step);

          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            entry.target.textContent = current + suffix;
          }, interval);

          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

}); // END DOMContentLoaded
