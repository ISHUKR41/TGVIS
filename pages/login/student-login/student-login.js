/* ==========================================================================
   TGVIS — Student Login JavaScript
   ==========================================================================
   Handles login form validation, password visibility toggle, and
   form submission feedback. This is a frontend-only implementation —
   no real authentication occurs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PASSWORD VISIBILITY TOGGLE ----
     Clicking the eye icon toggles between password and text input types */
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.getElementById('studentPassword');

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
  const loginForm = document.getElementById('studentLoginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentId = document.getElementById('studentId');
      const password = document.getElementById('studentPassword');
      let isValid = true;

      // Validate Student ID
      if (!studentId.value.trim()) {
        TGVIS.showFieldError(studentId.parentElement.querySelector('.form-input'), 'Please enter your Student ID');
        isValid = false;
      }

      // Validate Password
      if (!password.value.trim()) {
        TGVIS.showFieldError(password, 'Please enter your password');
        isValid = false;
      } else if (password.value.length < 6) {
        TGVIS.showFieldError(password, 'Password must be at least 6 characters');
        isValid = false;
      }

      if (isValid) {
        // Frontend-only: show success message
        // In production, this would send credentials to a backend API
        alert('Welcome to TGVIS Student Portal! (This is a demo — backend integration required for real authentication)');
      }
    });
  }

}); // END DOMContentLoaded
