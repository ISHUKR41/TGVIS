/* ==========================================================================
   TGVIS — Alumni Page JavaScript
   ==========================================================================
   Handles:
   1. Alumni registration form submission with feedback
   2. Smooth scroll to registration form from hero CTA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Alumni form submission ── */
  const form = document.getElementById('alumniForm');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name  = document.getElementById('aName');
      const year  = document.getElementById('aYear');
      const phone = document.getElementById('aPhone');
      let valid = true;

      [name, year, phone].forEach(el => el && el.classList.remove('form-input--error'));

      if (name && !name.value.trim()) {
        name.classList.add('form-input--error');
        valid = false;
      }
      if (year && (!year.value || year.value < 2005 || year.value > 2025)) {
        year.classList.add('form-input--error');
        valid = false;
      }
      if (phone && !phone.value.trim()) {
        phone.classList.add('form-input--error');
        valid = false;
      }

      if (!valid) return;

      /* Show success state */
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-double-line"></i> Registered Successfully!';
        btn.style.background = 'var(--color-accent)';
        btn.disabled = true;

        setTimeout(() => {
          form.reset();
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

});
