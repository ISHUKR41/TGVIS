/* ==========================================================================
   TGVIS — Contact Us | Page-Specific JavaScript
   ==========================================================================
   
   Handles interactions for the Contact page:
   1. Contact form validation with real-time feedback
   2. Form submission handling (with success message)
   3. Contact cards entrance animations
   
   DEPENDENCIES: GSAP + ScrollTrigger
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. CONTACT FORM VALIDATION
     ========================================================================
     Real-time validation that shows errors as the user fills the form.
     Validates: name (required), email (format), phone (Indian format),
     subject (required), message (min 10 chars).
     ======================================================================== */

  const form = document.getElementById('contactForm');

  if (form) {
    /* Get all required inputs */
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    /**
     * validateEmail — Checks if the email has a valid format.
     * @param {string} email - The email string to validate
     * @returns {boolean} True if the email format is valid
     */
    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }

    /**
     * showError — Adds an error message below an input field.
     * Creates a small red text element if one doesn't exist.
     * @param {HTMLElement} input - The input element
     * @param {string} message - The error message text
     */
    function showError(input, message) {
      /* Remove existing error first */
      clearError(input);

      input.style.borderColor = '#EF4444';
      const errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.style.cssText = 'color:#EF4444;font-size:0.75rem;margin-top:4px;display:block;';
      errorEl.textContent = message;
      input.parentNode.appendChild(errorEl);
    }

    /**
     * clearError — Removes the error message from an input field.
     * @param {HTMLElement} input - The input element to clear
     */
    function clearError(input) {
      input.style.borderColor = '';
      const existing = input.parentNode.querySelector('.form-error');
      if (existing) existing.remove();
    }

    /* ---- Real-time validation on blur (when user leaves a field) ---- */
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length < 2) {
          showError(nameInput, 'Please enter your full name');
        } else {
          clearError(nameInput);
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email address');
        } else {
          clearError(emailInput);
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim().length < 10) {
          showError(messageInput, 'Message must be at least 10 characters');
        } else {
          clearError(messageInput);
        }
      });
    }

    /* ---- Form submission handler ---- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      /* Validate all fields */
      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      }
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Valid email is required');
        isValid = false;
      }
      if (!subjectInput.value) {
        showError(subjectInput, 'Please select a subject');
        isValid = false;
      }
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        /* Show success message */
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
        btn.style.background = '#22C55E';
        btn.disabled = true;

        /* Reset after 3 seconds */
        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }


  /* ========================================================================
     2. CONTACT CARDS ENTRANCE ANIMATION
     ========================================================================
     Staggered entrance for contact info cards using GSAP ScrollTrigger.
     ======================================================================== */

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.contact-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
  }
});
