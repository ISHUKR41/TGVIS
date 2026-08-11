/* ==========================================================================
   TGVIS — Director's Message Page JavaScript
   ==========================================================================
   
   This file handles page-specific animations and interactions for the
   Director's Message page. It adds special entrance effects to the
   director's message quote section and handles the read-more toggle.
   
   DEPENDENCIES:
   - GSAP + ScrollTrigger (loaded via CDN)
   - global.js (core site functionality)
   - animations.js (shared reveal animations)
   
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. QUOTE HIGHLIGHT ANIMATION
     ========================================================================
     When the director's quote section scrolls into view, each word of the
     quote fades in one after another, creating a typewriter-style effect
     that draws attention to the message. */

  const quoteElement = document.querySelector('.director-quote__text');
  
  if (quoteElement && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    /* Store the original text and split it into individual words */
    const originalText = quoteElement.textContent;
    const words = originalText.split(' ');

    /* Wrap each word in a span so GSAP can animate them separately */
    quoteElement.innerHTML = words.map(word => 
      `<span class="director-quote__word" style="display:inline-block;transform:translateY(10px);">${word}</span>`
    ).join(' ');

    /* Animate all word spans with a stagger effect when scrolled into view */
    const wordSpans = quoteElement.querySelectorAll('.director-quote__word');

    gsap.to(wordSpans, {
      y: 0,
      duration: 0.4,
      stagger: 0.03,          /* Each word appears 30ms after the previous one */
      ease: 'power2.out',
      scrollTrigger: {
        trigger: quoteElement,
        start: 'top 80%',     /* Start animation when quote is 80% from top */
        once: true             /* Only play the animation once */
      }
    });
  }


  /* ========================================================================
     2. SIGNATURE LINE DRAW ANIMATION
     ========================================================================
     If there is a signature SVG line, animate it as if the director is
     signing the letter. This uses GSAP's strokeDasharray trick. */

  const signatureLine = document.querySelector('.director-signature__line');
  
  if (signatureLine && typeof gsap !== 'undefined') {
    gsap.from(signatureLine, {
      width: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: signatureLine,
        start: 'top 90%',
        once: true
      }
    });
  }


  /* ========================================================================
     3. READ MORE / READ LESS TOGGLE
     ========================================================================
     If the director's message is very long, only the first portion is
     shown initially. A "Read More" button reveals the rest. */

  const readMoreBtn = document.querySelector('[data-read-more]');
  const hiddenContent = document.querySelector('[data-hidden-content]');
  
  if (readMoreBtn && hiddenContent) {
    /* Initially hide the extra content */
    hiddenContent.style.maxHeight = '0';
    hiddenContent.style.overflow = 'hidden';
    hiddenContent.style.transition = 'max-height 0.6s ease, opacity 0.4s ease';
    hiddenContent.style.opacity = '0';

    readMoreBtn.addEventListener('click', () => {
      const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        /* Collapse the hidden content */
        hiddenContent.style.maxHeight = '0';
        hiddenContent.style.opacity = '0';
        readMoreBtn.textContent = 'Read Full Message';
        readMoreBtn.setAttribute('aria-expanded', 'false');
      } else {
        /* Expand the hidden content — measure actual height first */
        hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
        hiddenContent.style.opacity = '1';
        readMoreBtn.textContent = 'Show Less';
        readMoreBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

});
