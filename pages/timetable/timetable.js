/* ==========================================================================
   TGVIS — Timetable page interactions
   ==========================================================================
   The timetable is intentionally static until the school connects a portal.
   This small enhancement adds a live "school day" status to the intro without
   changing the published schedule or pretending that a backend is connected.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const status = document.querySelector('[data-schedule-status]');
  if (!status) return;

  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const schoolOpen = isWeekday && minutes >= 450 && minutes <= 870;

  status.textContent = schoolOpen
    ? 'The school day is currently in progress.'
    : 'The published routine covers the regular school day.';
});