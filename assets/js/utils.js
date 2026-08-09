/* ==========================================================================
   TGVIS — Utility Functions (Helper Library)
   ==========================================================================
   
   This file contains reusable helper functions that are used across
   multiple pages and scripts. These are pure utility functions — they
   don't directly manipulate the DOM or depend on specific page elements.
   
   Contents:
   1. Performance Helpers — debounce, throttle
   2. DOM Helpers — query shortcuts, class toggles
   3. Form Validation — input validation utilities
   4. Date/Time Formatting — display-ready date strings
   5. String Utilities — truncate, capitalize, slugify
   6. Device Detection — mobile/tablet/desktop checks
   7. Storage Helpers — localStorage with fallback
   8. Scroll Utilities — scroll position, element visibility
   
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. PERFORMANCE HELPERS
   --------------------------------------------------------------------------
   Functions that prevent expensive operations from running too frequently.
   Essential for scroll and resize event handlers.
   -------------------------------------------------------------------------- */

/**
 * debounce - Delays execution until the user STOPS triggering the event.
 * Perfect for search inputs, resize handlers, and form validation.
 * 
 * HOW IT WORKS:
 * If the user types "school" rapidly, the function only runs ONCE 
 * after the last keystroke, instead of running for each letter.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait after last call (default: 250ms)
 * @param {boolean} immediate - If true, trigger on the FIRST call instead of last
 * @returns {Function} A debounced version of the function
 * 
 * USAGE:
 * const handleSearch = debounce(() => { searchAPI(input.value); }, 300);
 * searchInput.addEventListener('input', handleSearch);
 */
function debounce(func, wait = 250, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    // Clear the previous timer (resets the wait period)
    clearTimeout(timeout);

    // If immediate mode, execute on the first call
    const callNow = immediate && !timeout;

    // Set a new timer
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);

    // Execute immediately if needed
    if (callNow) func.apply(context, args);
  };
}


/**
 * throttle - Limits execution to AT MOST once per time interval.
 * Perfect for scroll and mousemove event handlers.
 * 
 * HOW IT WORKS:
 * If the user scrolls rapidly, the function runs at most once every
 * `limit` milliseconds, regardless of how many scroll events fire.
 * 
 * @param {Function} func - The function to throttle
 * @param {number} limit - Minimum milliseconds between executions (default: 100ms)
 * @returns {Function} A throttled version of the function
 * 
 * USAGE:
 * const handleScroll = throttle(() => { updateParallax(); }, 16); // ~60fps
 * window.addEventListener('scroll', handleScroll);
 */
function throttle(func, limit = 100) {
  let inThrottle;

  return function executedFunction(...args) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}


/* --------------------------------------------------------------------------
   2. DOM HELPERS
   --------------------------------------------------------------------------
   Shortcut functions for common DOM operations.
   -------------------------------------------------------------------------- */

/**
 * $ - Shorthand for document.querySelector (finds ONE element).
 * Similar to jQuery's $() but much lighter.
 * 
 * @param {string} selector - CSS selector string
 * @param {HTMLElement} parent - Optional parent element to search within
 * @returns {HTMLElement|null} The first matching element, or null
 * 
 * USAGE: const nav = $('.navbar');
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}


/**
 * $$ - Shorthand for document.querySelectorAll (finds ALL elements).
 * Returns a real Array instead of NodeList for easier manipulation.
 * 
 * @param {string} selector - CSS selector string
 * @param {HTMLElement} parent - Optional parent element to search within
 * @returns {Array<HTMLElement>} Array of matching elements
 * 
 * USAGE: const cards = $$('.card');
 * cards.forEach(card => { ... });
 */
function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}


/**
 * createElement - Creates a DOM element with optional attributes and children.
 * Makes dynamic element creation cleaner than raw DOM API.
 * 
 * @param {string} tag - HTML tag name (e.g., 'div', 'span', 'a')
 * @param {Object} attributes - Key-value pairs of attributes to set
 * @param {Array<HTMLElement|string>} children - Child elements or text content
 * @returns {HTMLElement} The created element
 * 
 * USAGE:
 * const card = createElement('div', { class: 'card', id: 'card-1' }, [
 *   createElement('h3', {}, ['Card Title']),
 *   createElement('p', {}, ['Card description text'])
 * ]);
 */
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  // Set all attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  // Append children (can be elements or text strings)
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
}


/* --------------------------------------------------------------------------
   3. FORM VALIDATION HELPERS
   --------------------------------------------------------------------------
   Reusable validation functions for form inputs.
   These return true/false and can display error messages.
   -------------------------------------------------------------------------- */

/**
 * validateEmail - Checks if a string is a valid email address.
 * Uses a practical regex that covers 99% of real-world emails.
 * 
 * @param {string} email - The email string to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}


/**
 * validatePhone - Checks if a string is a valid Indian phone number.
 * Accepts formats: 9876543210, +919876543210, 09876543210
 * 
 * @param {string} phone - The phone number string to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validatePhone(phone) {
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}


/**
 * validateRequired - Checks if a form field has a non-empty value.
 * 
 * @param {string} value - The input value to check
 * @returns {boolean} True if not empty, false otherwise
 */
function validateRequired(value) {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
}


/**
 * validateMinLength - Checks if a string meets a minimum length requirement.
 * 
 * @param {string} value - The string to check
 * @param {number} minLength - The minimum required length
 * @returns {boolean} True if long enough, false otherwise
 */
function validateMinLength(value, minLength) {
  return value.trim().length >= minLength;
}


/**
 * showFieldError - Displays an error message below a form input.
 * Adds visual error styling to the input field.
 * 
 * @param {HTMLElement} input - The input element with an error
 * @param {string} message - The error message to display
 */
function showFieldError(input, message) {
  // Remove any existing error message first
  clearFieldError(input);

  // Add error styling to the input
  input.classList.add('form-input--error');
  input.classList.remove('form-input--success');

  // Create and insert the error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;

  // Insert after the input (or its parent form-group)
  input.parentNode.appendChild(errorDiv);
}


/**
 * clearFieldError - Removes error styling and message from a form input.
 * 
 * @param {HTMLElement} input - The input element to clear errors from
 */
function clearFieldError(input) {
  input.classList.remove('form-input--error');

  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
}


/**
 * showFieldSuccess - Adds success styling to a validated form input.
 * 
 * @param {HTMLElement} input - The input element that passed validation
 */
function showFieldSuccess(input) {
  clearFieldError(input);
  input.classList.add('form-input--success');
}


/* --------------------------------------------------------------------------
   4. DATE/TIME FORMATTING
   --------------------------------------------------------------------------
   Functions to format dates and times for display in the Indian context.
   -------------------------------------------------------------------------- */

/**
 * formatDate - Converts a date to a human-readable Indian format.
 * 
 * @param {Date|string} date - Date object or date string
 * @param {string} format - Format type: 'short', 'long', 'relative'
 * @returns {string} Formatted date string
 * 
 * EXAMPLES:
 * formatDate(new Date(), 'short')    → "09 Aug 2025"
 * formatDate(new Date(), 'long')     → "9th August 2025"
 * formatDate(new Date(), 'relative') → "Today"
 */
function formatDate(date, format = 'short') {
  const d = new Date(date);

  if (isNaN(d.getTime())) return 'Invalid Date';

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  // Get ordinal suffix for day (1st, 2nd, 3rd, 4th, etc.)
  function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  switch (format) {
    case 'short':
      return `${String(day).padStart(2, '0')} ${monthsShort[month]} ${year}`;

    case 'long':
      return `${getOrdinal(day)} ${months[month]} ${year}`;

    case 'relative':
      return getRelativeTime(d);

    default:
      return `${day}/${month + 1}/${year}`;
  }
}


/**
 * getRelativeTime - Returns a human-friendly relative time string.
 * 
 * @param {Date} date - The date to compare against now
 * @returns {string} Relative time string (e.g., "2 days ago", "Just now")
 */
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;  // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;

  return formatDate(date, 'short');
}


/* --------------------------------------------------------------------------
   5. STRING UTILITIES
   --------------------------------------------------------------------------
   Common string manipulation functions.
   -------------------------------------------------------------------------- */

/**
 * truncateText - Shortens text to a maximum length and adds "..." at the end.
 * Ensures the truncation happens at a word boundary (doesn't cut words in half).
 * 
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum character count (default: 100)
 * @returns {string} Truncated text with ellipsis
 */
function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;

  // Find the last space before the maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}


/**
 * capitalize - Capitalizes the first letter of each word in a string.
 * 
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 * 
 * EXAMPLE: capitalize("hello world") → "Hello World"
 */
function capitalize(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}


/**
 * slugify - Converts a string into a URL-friendly slug.
 * Removes special characters, replaces spaces with hyphens, lowercases.
 * 
 * @param {string} str - The string to slugify
 * @returns {string} URL-friendly slug
 * 
 * EXAMPLE: slugify("About Our School!") → "about-our-school"
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
}


/* --------------------------------------------------------------------------
   6. DEVICE DETECTION
   --------------------------------------------------------------------------
   Functions to detect the user's device type and capabilities.
   -------------------------------------------------------------------------- */

/**
 * isMobile - Checks if the current device is a mobile phone.
 * Uses viewport width as the primary indicator.
 * 
 * @returns {boolean} True if mobile, false otherwise
 */
function isMobile() {
  return window.innerWidth < 768;
}


/**
 * isTablet - Checks if the current device is a tablet.
 * 
 * @returns {boolean} True if tablet, false otherwise
 */
function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}


/**
 * isDesktop - Checks if the current device is a desktop/laptop.
 * 
 * @returns {boolean} True if desktop, false otherwise
 */
function isDesktop() {
  return window.innerWidth >= 1024;
}


/**
 * isTouchDevice - Checks if the device supports touch input.
 * Useful for deciding whether to use hover effects or touch gestures.
 * 
 * @returns {boolean} True if touch-capable, false otherwise
 */
function isTouchDevice() {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}


/**
 * prefersReducedMotion - Checks if the user has enabled "Reduce motion"
 * in their system preferences. We should respect this for accessibility.
 * 
 * @returns {boolean} True if reduced motion is preferred
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


/* --------------------------------------------------------------------------
   7. STORAGE HELPERS
   --------------------------------------------------------------------------
   Safe localStorage wrappers with JSON parsing and error handling.
   localStorage can throw errors in private browsing mode or when storage
   is full, so we always need try-catch blocks.
   -------------------------------------------------------------------------- */

/**
 * storageSet - Safely stores a value in localStorage.
 * Automatically converts objects/arrays to JSON strings.
 * 
 * @param {string} key - The storage key
 * @param {*} value - The value to store (any type)
 * @returns {boolean} True if successful, false if failed
 */
function storageSet(key, value) {
  try {
    const serialized = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`TGVIS: Failed to save to localStorage (key: ${key})`, error);
    return false;
  }
}


/**
 * storageGet - Safely retrieves a value from localStorage.
 * Automatically parses JSON strings back to objects/arrays.
 * 
 * @param {string} key - The storage key to retrieve
 * @param {*} defaultValue - Fallback value if key doesn't exist
 * @returns {*} The stored value, or defaultValue if not found
 */
function storageGet(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;

    // Try to parse as JSON, fall back to raw string
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.warn(`TGVIS: Failed to read from localStorage (key: ${key})`, error);
    return defaultValue;
  }
}


/**
 * storageRemove - Safely removes a value from localStorage.
 * 
 * @param {string} key - The storage key to remove
 */
function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`TGVIS: Failed to remove from localStorage (key: ${key})`, error);
  }
}


/* --------------------------------------------------------------------------
   8. SCROLL UTILITIES
   --------------------------------------------------------------------------
   Functions related to scroll position and element visibility.
   -------------------------------------------------------------------------- */

/**
 * isElementInViewport - Checks if an element is currently visible
 * in the browser viewport.
 * 
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Extra pixels of buffer (default: 0)
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight + offset) &&
    rect.right <= (window.innerWidth + offset)
  );
}


/**
 * getScrollPercentage - Returns how far the user has scrolled as a percentage.
 * 
 * @returns {number} Scroll percentage (0 to 100)
 */
function getScrollPercentage() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
}


/* --------------------------------------------------------------------------
   EXPORT TO GLOBAL SCOPE
   --------------------------------------------------------------------------
   Make utility functions available globally so page-specific scripts
   can use them without importing.
   -------------------------------------------------------------------------- */

window.TGVIS = window.TGVIS || {};

// Attach all utilities to the global TGVIS namespace
Object.assign(window.TGVIS, {
  // Performance
  debounce,
  throttle,

  // DOM
  $,
  $$,
  createElement,

  // Validation
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  showFieldError,
  clearFieldError,
  showFieldSuccess,

  // Date/Time
  formatDate,
  getRelativeTime,

  // Strings
  truncateText,
  capitalize,
  slugify,

  // Device
  isMobile,
  isTablet,
  isDesktop,
  isTouchDevice,
  prefersReducedMotion,

  // Storage
  storageSet,
  storageGet,
  storageRemove,

  // Scroll
  isElementInViewport,
  getScrollPercentage
});
