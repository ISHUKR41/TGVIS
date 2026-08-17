/* ==========================================================================
   TGVIS — Teacher Login JavaScript
   ==========================================================================
   Handles teacher-specific login form interactions:
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
  const passwordInput = document.getElementById('teacherPassword');

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
  const form = document.getElementById('teacherLoginForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const teacherId = document.getElementById('teacherId');
      const teacherPassword = document.getElementById('teacherPassword');
      let isValid = true;

      // Clear previous error states
      [teacherId, teacherPassword].forEach(input => {
        if (input) {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }
      });

      // Validate employee ID
      if (!teacherId || !teacherId.value.trim()) {
        teacherId.style.borderColor = '#EF4444';
        teacherId.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
        isValid = false;
      }

      // Validate password
      if (!teacherPassword || !teacherPassword.value.trim()) {
        teacherPassword.style.borderColor = '#EF4444';
        teacherPassword.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
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
        alert('Teacher Portal: This is a demonstration login. A backend authentication system will be connected by the school IT team.');
      }, 1500);
    });
  }
});
