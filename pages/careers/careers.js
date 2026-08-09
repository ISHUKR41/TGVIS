/* ==========================================================================
   TGVIS — Careers Page JavaScript
   ==========================================================================
   Handles the job application form — validation and submit feedback.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('jobForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name     = document.getElementById('jName');
    const phone    = document.getElementById('jPhone');
    const email    = document.getElementById('jEmail');
    const position = document.getElementById('jPosition');
    const qual     = document.getElementById('jQual');
    let valid = true;

    /* Clear previous errors */
    [name, phone, email, position, qual].forEach(el => {
      if (el) el.classList.remove('form-input--error');
    });

    /* Validate each required field */
    if (name && !name.value.trim())          { name.classList.add('form-input--error');     valid = false; }
    if (phone && !phone.value.trim())        { phone.classList.add('form-input--error');    valid = false; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('form-input--error'); valid = false;
    }
    if (position && !position.value)         { position.classList.add('form-input--error'); valid = false; }
    if (qual && !qual.value.trim())          { qual.classList.add('form-input--error');     valid = false; }

    if (!valid) return;

    /* Show success message */
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-double-line"></i> Application Received!';
      btn.style.background = 'var(--color-accent)';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });

});
