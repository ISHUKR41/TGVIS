/* ==========================================================================
   TGVIS — Student Login JavaScript
   ==========================================================================
   Handles login form validation, password visibility toggle, and
   clear portal-access feedback. This is a frontend-only implementation —
   real authentication needs a school-approved backend service.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PASSWORD VISIBILITY TOGGLE ----
     Clicking the eye icon toggles between password and text input types */
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';

      // Update the eye icon
      const icon = passwordToggle.querySelector('i');
      icon.className = isPassword ? 'ri-eye-line' : 'ri-eye-off-line';
    });
  }

  /* ---- FORM VALIDATION & SUBMISSION ----
     Validates Student ID and Password fields before "logging in" */
  const loginForm = document.querySelector('.login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

       const identityInput = loginForm.querySelector('input[type="text"]');
       const password = loginForm.querySelector('input[type="password"], input[type="text"][id*="Password"]');
      let isValid = true;

      // Validate Student ID
       if (!identityInput || !identityInput.value.trim()) {
         if (identityInput && window.TGVIS) TGVIS.showFieldError(identityInput, 'Please enter your ID or username');
        isValid = false;
      }

      // Validate Password
       if (!password || !password.value.trim()) {
         if (password && window.TGVIS) TGVIS.showFieldError(password, 'Please enter your password');
        isValid = false;
       } else if (password.value.length < 6) {
         if (window.TGVIS) TGVIS.showFieldError(password, 'Password must be at least 6 characters');
        isValid = false;
      }

      if (isValid) {
         const role = (loginForm.id.replace('LoginForm', '') || 'School').replace(/([A-Z])/g, ' $1').trim();
         const button = loginForm.querySelector('button[type="submit"]');
         const status = document.createElement('p');
         status.setAttribute('role', 'status');
         status.style.cssText = 'margin-top:16px;text-align:center;color:var(--text-secondary);font-size:var(--fs-sm);';
         status.textContent = `${role} portal access is managed by the school office. Call +91 89359 01010 for credentials.`;
         loginForm.appendChild(status);
         if (button) {
           const original = button.innerHTML;
           button.innerHTML = '<i class="ri-information-line"></i> Contact School Office';
           button.disabled = true;
           setTimeout(() => {
             button.innerHTML = original;
             button.disabled = false;
             status.remove();
           }, 4000);
         }
      }
    });
  }

}); // END DOMContentLoaded
