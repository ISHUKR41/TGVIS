/* ==========================================================================
   TGVIS — Alumni Page JavaScript
   ==========================================================================
   Handles:
   1. Alumni registration form submission with a WhatsApp handoff
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
      if (year && (!year.value || year.value < 1950 || year.value > 2035)) {
        year.classList.add('form-input--error');
        valid = false;
      }
      if (phone && !phone.value.trim()) {
        phone.classList.add('form-input--error');
        valid = false;
      }

      if (!valid) return;

       /*
        * This static site has no connected alumni database yet. Share the
        * registration request with the school office rather than claiming
        * that personal details were stored successfully.
        */
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
         const text = [
           'Hello TGVIS School Office,',
           'I would like to register with the TGVIS alumni community.',
           `Name: ${name.value.trim()}`,
           `Passing year: ${year.value}`,
           `Phone: ${phone.value.trim()}`,
           `Email: ${document.getElementById('aEmail')?.value.trim() || 'Not provided'}`,
           `Occupation: ${document.getElementById('aOccupation')?.value.trim() || 'Not provided'}`,
           `City: ${document.getElementById('aCity')?.value.trim() || 'Not provided'}`,
           `Mentoring interest: ${document.getElementById('aMentor')?.checked ? 'Yes' : 'No'}`,
           `Memory: ${document.getElementById('aMemory')?.value.trim() || 'Not provided'}`
         ].join('\n');

         window.open(`https://wa.me/918935901010?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
        const original = btn.innerHTML;
         btn.innerHTML = '<i class="ri-whatsapp-line"></i> WhatsApp Opened';
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
