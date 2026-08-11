/* ==========================================================================
   TGVIS — Academic Calendar JavaScript
   ==========================================================================
   
   Handles interactive features on the Academic Calendar page:
   
   1. MONTH FILTER — Click a month tab to show only that month's events.
      Clicking "All" shows all months. Uses smooth fade animation.
   
   2. AUTO-HIGHLIGHT — On page load, automatically scrolls to the current
      month and highlights the matching tab (if not showing "All").
   
   3. SMOOTH SCROLL — After filtering, page smoothly scrolls to the first
      visible month block so the user sees results immediately.
   
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     DOM REFERENCES
     -------------------------------------------------------------------------- */

  // All month tab buttons (Apr, May, Jun, ... , Mar, and "All")
  const monthTabs = document.querySelectorAll('.month-tab');

  // All month blocks in the calendar timeline
  const monthBlocks = document.querySelectorAll('.calendar-month');


  /* --------------------------------------------------------------------------
     MONTH FILTER — Show/hide month blocks based on tab click
     --------------------------------------------------------------------------
     When a user clicks a month tab:
       1. Remove 'active' from all tabs
       2. Add 'active' to the clicked tab
       3. Show only the matching month block(s)
       4. Scroll to the first visible month
     -------------------------------------------------------------------------- */

  monthTabs.forEach(tab => {
    tab.addEventListener('click', () => {

      // Step 1: Remove active class from all tabs
      monthTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });

      // Step 2: Activate the clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      // Step 3: Get the selected month value (e.g., "apr", "may", or "all")
      const selectedMonth = tab.getAttribute('data-month');

      // Step 4: Show/hide month blocks with animation
      monthBlocks.forEach(block => {
        const blockMonth = block.getAttribute('data-month');

        if (selectedMonth === 'all' || blockMonth === selectedMonth) {
          // Show this month block
          block.classList.remove('hidden');
          block.style.opacity = '0';
          block.style.transform = 'translateY(10px)';

          // Animate in after a tiny delay (for smooth transition feel)
          requestAnimationFrame(() => {
            block.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
          });
        } else {
          // Hide this month block
          block.classList.add('hidden');
        }
      });

      // Step 5: Scroll to the first visible month block
      setTimeout(() => {
        const firstVisible = document.querySelector('.calendar-month:not(.hidden)');
        if (firstVisible) {
          firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    });
  });


  /* --------------------------------------------------------------------------
     AUTO-HIGHLIGHT CURRENT MONTH — On page load
     --------------------------------------------------------------------------
     Finds the current month and highlights its tab with a subtle ring.
     Does NOT filter automatically — keeps "All" selected by default so
     parents can see the full calendar.
     -------------------------------------------------------------------------- */

  const now = new Date();
  const currentMonthIndex = now.getMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec

  // Map month index to the data-month values used in our tabs
  const monthMap = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];

  const currentMonthKey = monthMap[currentMonthIndex];

  // Add a visual indicator to the current month tab
  monthTabs.forEach(tab => {
    if (tab.getAttribute('data-month') === currentMonthKey) {
      // Add a subtle ring around the current month tab
      tab.style.boxShadow = 'inset 0 0 0 2px var(--color-secondary, #D4A843)';
      tab.title = 'Current month';
    }
  });

  // Also highlight the current month block in the timeline
  monthBlocks.forEach(block => {
    if (block.getAttribute('data-month') === currentMonthKey) {
      block.style.boxShadow = '0 0 0 2px var(--color-secondary, #D4A843)';
    }
  });

});
