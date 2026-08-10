/* ==========================================================================
   TGVIS — Careers Page JavaScript
   ==========================================================================
   Handles the job application form — validation and a WhatsApp handoff to
   the school office. The static site does not pretend to store applications
   until the school connects an approved application service.
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

    /*
     * No careers inbox has been verified for this imported project. Prepare
     * the application details in WhatsApp so the office receives a real,
     * usable enquiry instead of a misleading local "success" message.
     */
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const text = [
        'Hello TGVIS School Office,',
        'I would like to apply for a position at the school.',
        `Name: ${name.value.trim()}`,
        `Phone: ${phone.value.trim()}`,
        `Email: ${email.value.trim()}`,
        `Position: ${position.value}`,
        `Qualification: ${qual.value.trim()}`,
        `Experience: ${document.getElementById('jExp')?.value.trim() || 'Not provided'}`,
        `Message: ${document.getElementById('jMsg')?.value.trim() || 'Not provided'}`
      ].join('\n');

      window.open(`https://wa.me/918935901010?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="ri-whatsapp-line"></i> WhatsApp Opened';
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
