/* ==========================================================================
   TGVIS — Contact Page JavaScript
   ==========================================================================

   Handles:
   1. Contact form validation and submission feedback
   2. Character counter for the message textarea
   3. Phone number input formatting

   DEPENDENCIES: utils.js (TGVIS.validateEmail, TGVIS.validatePhone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  if (!form) return;

  /* ── TEXTAREA CHARACTER COUNTER ──────────────────────────────────────────
     Shows "x / 500 characters" below the message textarea. */
  const textarea = form.querySelector('#message');
  if (textarea) {
    const counter = document.createElement('p');
    counter.style.cssText = 'font-size:var(--fs-xs);color:var(--text-tertiary);text-align:right;margin-top:4px;';
    counter.textContent = '0 / 500 characters';
    textarea.after(counter);

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / 500 characters`;
      counter.style.color = len > 480 ? 'var(--color-error)' : 'var(--text-tertiary)';
      if (len > 500) textarea.value = textarea.value.slice(0, 500);
    });
  }


  /* ── FORM SUBMISSION FEEDBACK ────────────────────────────────────────────
     Validates required fields and shows a success state on submit. */
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput  = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const msgInput   = form.querySelector('#message');
    let valid = true;

    /* Clear previous error highlights */
    [nameInput, emailInput, msgInput].forEach(el => {
      if (el) el.classList.remove('form-input--error');
    });

    /* Validate name */
    if (nameInput && !nameInput.value.trim()) {
      nameInput.classList.add('form-input--error');
      nameInput.focus();
      valid = false;
    }

    /* Validate email format */
    if (emailInput) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      if (!emailOk) {
        emailInput.classList.add('form-input--error');
        if (valid) emailInput.focus();
        valid = false;
      }
    }

    /* Validate message */
    if (msgInput && msgInput.value.trim().length < 10) {
      msgInput.classList.add('form-input--error');
      if (valid) msgInput.focus();
      valid = false;
    }

    if (!valid) return;

    /* Show success feedback on the submit button */
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
      btn.style.background = 'var(--color-accent)';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        if (textarea) counter.textContent = '0 / 500 characters';
      }, 3500);
    }
  });

  /* ── Convenient reference for the counter if it was created ── */
  const counter = form.querySelector('#message')
    ? form.querySelector('#message').nextElementSibling
    : null;

});
