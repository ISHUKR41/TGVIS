/* ==========================================================================
   TGVIS — Login Portal JavaScript
   ==========================================================================
   
   Handles all login page functionality:
   1. Tab switching between Student / Teacher / Admin forms
   2. Password visibility toggle
   3. Form submission handler (placeholder for backend integration)
   4. URL hash routing for deep-linking to specific roles
   
   USAGE:
   - Direct link to student login: login.html#student
   - Direct link to teacher login: login.html#teacher
   - Direct link to admin login:   login.html#admin
   
   ========================================================================== */


/**
 * switchTab — Switches between Student / Teacher / Admin login forms.
 * 
 * HOW IT WORKS:
 * 1. Removes 'active' class from ALL tab buttons and forms
 * 2. Adds 'active' class to the clicked tab button and its corresponding form
 * 3. The CSS handles the fade-in animation via the .login-form.active rule
 * 
 * @param {string} role — The role tab to activate ('student' | 'teacher' | 'admin')
 */
function switchTab(role) {
  /* Step 1: Deactivate all tabs and forms */
  document.querySelectorAll('.login-tabs__btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.login-form').forEach(function(form) {
    form.classList.remove('active');
  });

  /* Step 2: Activate the selected tab and its form */
  var selectedTab = document.querySelector('[data-role="' + role + '"]');
  var selectedForm = document.getElementById('form-' + role);

  if (selectedTab) selectedTab.classList.add('active');
  if (selectedForm) selectedForm.classList.add('active');
}


/**
 * togglePassword — Shows or hides the password field text.
 * 
 * HOW IT WORKS:
 * - If the input type is "password", changes it to "text" (shows password)
 * - If the input type is "text", changes it back to "password" (hides password)
 * - Also updates the eye icon to reflect the current state
 * 
 * @param {string} inputId — The ID of the password input field
 * @param {HTMLElement} btn — The toggle button element that was clicked
 */
function togglePassword(inputId, btn) {
  var input = document.getElementById(inputId);
  var icon = btn.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'ri-eye-line';
  } else {
    input.type = 'password';
    icon.className = 'ri-eye-off-line';
  }
}


/**
 * handleLogin — Handles form submission.
 * 
 * CURRENT STATE:
 * This is a placeholder that shows an alert message.
 * In production, this would POST credentials to a backend API
 * (e.g., Node.js, PHP, Firebase Auth) for authentication.
 * 
 * @param {Event} e — The form submit event
 * @param {string} role — The user's role ('student' | 'teacher' | 'admin')
 */
function handleLogin(e, role) {
  /* Prevent the default form submission (page reload) */
  e.preventDefault();

  /* Capitalize the role name for display */
  var roleName = role.charAt(0).toUpperCase() + role.slice(1);

  var form = document.getElementById('form-' + role);
  var button = form && form.querySelector('button[type="submit"]');
  if (!button) return;
  var original = button.innerHTML;
  button.innerHTML = '<i class="ri-information-line"></i> Portal access required';
  button.disabled = true;
  var note = form.querySelector('.login-status') || document.createElement('p');
  note.className = 'login-status';
  note.setAttribute('role', 'status');
  note.style.cssText = 'margin-top:16px;text-align:center;color:var(--text-secondary);font-size:var(--fs-sm);';
  note.textContent = roleName + ' portal access is managed by the school office. Call +91 89359 01010 for your credentials.';
  if (!note.parentElement) form.appendChild(note);
  setTimeout(function() {
    button.innerHTML = original;
    button.disabled = false;
  }, 3500);
}


/**
 * Auto-select tab from URL hash.
 * 
 * This allows deep-linking to specific login tabs:
 * - login.html#student  → Opens the Student login form
 * - login.html#teacher  → Opens the Teacher login form
 * - login.html#admin    → Opens the Admin login form
 * 
 * Called immediately when the page loads.
 */
(function initLoginTab() {
  var hash = window.location.hash.replace('#', '');
  var validRoles = ['student', 'teacher', 'admin'];

  if (validRoles.indexOf(hash) !== -1) {
    switchTab(hash);
  }
})();
