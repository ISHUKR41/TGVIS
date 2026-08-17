/* ==========================================================================
   TGVIS — Admin Login JavaScript
   ==========================================================================
   Handles admin-specific login form interactions:
   1. Password visibility toggle
   2. Form validation with visual feedback
   3. Demo login message (since no backend exists yet)
   
   DEPENDENCIES: utils.js (for shared utility functions)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. PASSWORD VISIBILITY TOGGLE
     ======================================================================== */
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.getElementById('adminPassword');

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      const icon = passwordToggle.querySelector('i');
      if (icon) {
        icon.className = isPassword ? 'ri-eye-line' : 'ri-eye-off-line';
      }
    });
  }


  /* ========================================================================
     2. FORM VALIDATION & SUBMISSION
     ======================================================================== */
  const form = document.getElementById('adminLoginForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const adminId = document.getElementById('adminId');
      const adminPassword = document.getElementById('adminPassword');
      let isValid = true;

      // Clear previous error states
      [adminId, adminPassword].forEach(input => {
        if (input) {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }
      });

      // Validate admin ID
      if (!adminId || !adminId.value.trim()) {
        adminId.style.borderColor = '#e94560';
        adminId.style.boxShadow = '0 0 0 3px rgba(233, 69, 96, 0.15)';
        isValid = false;
      }

      // Validate password
      if (!adminPassword || !adminPassword.value.trim()) {
        adminPassword.style.borderColor = '#e94560';
        adminPassword.style.boxShadow = '0 0 0 3px rgba(233, 69, 96, 0.15)';
        isValid = false;
      }

      if (!isValid) return;

      // Show loading state on button
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite;"></i> Signing in...';
      submitBtn.disabled = true;

      // Simulate login attempt (no backend yet)
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Admin Portal: This is a demonstration login. A backend authentication system will be connected by the school IT team.');
      }, 1500);
    });
  }
});
