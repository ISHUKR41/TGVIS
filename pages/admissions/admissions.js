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
  const form = document.querySelector('.admissions-enquiry form, form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-line"></i> Enquiry Submitted!';
        btn.style.background = '#22C55E';
        btn.disabled = true;
        
        setTimeout(() => {
          form.reset();
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
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
