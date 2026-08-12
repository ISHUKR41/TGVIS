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

    /*
     * This static site has no mail server connected yet. WhatsApp is the
     * school's supplied contact channel, so prepare a clear, pre-filled
     * enquiry there instead of pretending that a server stored the form.
     */
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const subject = form.querySelector('#subject').value;
      const message = form.querySelector('#message').value.trim();
      const text = [
        'Hello TGVIS School Office,',
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Message: ${message}`
      ].join('\n');
      /*
       * The school has confirmed WhatsApp as the quickest enquiry handoff.
       * The email address is also shown on the page for visitors who prefer
       * a written enquiry, while this static site remains backend-free.
       */
      const whatsappWindow = window.open(`https://wa.me/918935901010?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      const status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      status.textContent = whatsappWindow
        ? 'WhatsApp opened with your message. Please tap Send to contact the school office.'
        : 'Your browser blocked the WhatsApp window. Please call +91 89359 01010 or email tgvisbihta@gmail.com.';
      btn.after(status);
      btn.innerHTML = '<i class="ri-whatsapp-line"></i> WhatsApp Opened';
      btn.style.background = 'var(--color-accent)';
      setTimeout(() => {
        form.reset();
        status.remove();
        btn.innerHTML = '<i class="ri-whatsapp-line"></i> Continue in WhatsApp';
        btn.style.background = '';
        if (textarea) counter.textContent = '0 / 500 characters';
      }, 3500);
    }
  });

  /* ── Convenient reference for the counter if it was created ── */
  const counter = form.querySelector('#message')
    ? form.querySelector('#message').nextElementSibling
    : null;

});
