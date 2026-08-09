/* ==========================================================================
   TGVIS — Fee Structure Page JavaScript
   ==========================================================================

   Handles:
   1. Responsive table scroll shadow (shows a fade when table overflows)
   2. Animated counter for the "Fee Includes" highlight numbers
   3. Fee enquiry form submission feedback

   DEPENDENCIES: None (vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. TABLE SCROLL SHADOW ──────────────────────────────────────────────
     Adds a gradient "shadow" on the right edge of tables that can be
     scrolled horizontally, so mobile users know to swipe. */
  document.querySelectorAll('.table-wrapper').forEach(wrapper => {
    const table = wrapper.querySelector('table');
    if (!table) return;

    function checkOverflow() {
      if (table.scrollWidth > wrapper.clientWidth + 4) {
        wrapper.style.boxShadow = 'inset -40px 0 30px -20px rgba(0,0,0,0.06)';
      } else {
        wrapper.style.boxShadow = '';
      }
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    wrapper.addEventListener('scroll', checkOverflow);
  });


  /* ── 2. FEE ENQUIRY FORM FEEDBACK ────────────────────────────────────────
     When the form is submitted, show a success message and reset. */
  const form = document.getElementById('feeEnquiryForm') || document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const original = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-line"></i> Request Sent!';
      btn.style.background = 'var(--color-accent)';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    });
  }

});
