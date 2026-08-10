/* ==========================================================================
   TGVIS — Admissions | Page-Specific JavaScript
   ==========================================================================
   
   Handles the admission process page interactions:
   1. Step cards hover animation
   2. Enquiry form validation
   3. Class selection dynamic logic
   
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Enquiry Form Submission ---- */
  const form = document.getElementById('admissionForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const get = id => form.querySelector(id)?.value.trim() || 'Not provided';
      const enquiry = [
        'Hello TGVIS Admissions Office,',
        `Student: ${get('#studentName')}`,
        `Parent/Guardian: ${get('#parentName')}`,
        `Phone: ${get('#admPhone')}`,
        `Email: ${get('#admEmail')}`,
        `Class: ${get('#admClass')}`,
        `Date of birth: ${get('#admDob')}`,
        `Message: ${get('#admMessage')}`
      ].join('\n');
      window.open(`https://wa.me/918935901010?text=${encodeURIComponent(enquiry)}`, '_blank', 'noopener,noreferrer');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        const status = document.createElement('p');
        status.setAttribute('role', 'status');
        status.className = 'form-status';
        status.textContent = 'Your enquiry is ready. WhatsApp will open so you can send it to the school office.';
        btn.after(status);
        btn.innerHTML = '<i class="ri-whatsapp-line"></i> WhatsApp Opened';
        btn.style.background = '#22C55E';
        setTimeout(() => {
          form.reset();
          status.remove();
          btn.innerHTML = original;
          btn.style.background = '';
        }, 3500);
      }
    });
  }

  /* ---- GSAP scroll animations for process steps ---- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Animate step cards */
    const steps = document.querySelectorAll('.step-card, .process-step');
    if (steps.length > 0) {
      gsap.from(steps, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: steps[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
  }
});
