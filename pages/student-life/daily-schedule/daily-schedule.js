/* ==========================================================================
   TGVIS — Daily Schedule Page JavaScript
   ==========================================================================
   
   Handles interactive timetable switching by class level.
   Users can click tabs for different class groups (Nursery, Primary, etc.)
   to view the relevant daily schedule.
   
   DEPENDENCIES: global.js (tab functionality is already in global.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. PRINT SCHEDULE BUTTON
     ========================================================================
     Lets parents print the daily schedule directly from the browser.
     Opens the system print dialog with just the schedule visible.
     ======================================================================== */

  const printBtn = document.querySelector('.print-schedule-btn');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Add a temporary class to hide non-schedule elements during print
      document.body.classList.add('printing-schedule');
      window.print();

      // Remove the print class after a short delay
      setTimeout(() => {
        document.body.classList.remove('printing-schedule');
      }, 500);
    });
  }


  /* ========================================================================
     2. CURRENT DAY HIGHLIGHTING
     ========================================================================
     Automatically highlights the current day's column in the timetable
     so students can quickly see their schedule for today.
     ======================================================================== */

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  // Find all table header cells and highlight today's column
  const tableHeaders = document.querySelectorAll('.schedule-table th');

  tableHeaders.forEach((th, index) => {
    if (th.textContent.toLowerCase().trim() === today) {
      // Highlight the header
      th.classList.add('today-highlight');

      // Highlight all cells in the same column across all rows
      const allRows = document.querySelectorAll('.schedule-table tr');
      allRows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells[index]) {
          cells[index].classList.add('today-highlight');
        }
      });
    }
  });

}); // END DOMContentLoaded
