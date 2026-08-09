/* ==========================================================================
   TGVIS — Homepage JavaScript (Page-Specific)
   ==========================================================================
   
   This JavaScript file contains functionality ONLY used on the homepage.
   It initializes page-specific features:
   
   1. Testimonials Swiper Slider — autoplay carousel for reviews
   2. tsParticles — subtle particle effect in the hero section
   3. Hero Stats Counter — animated number counting in hero section
   
   DEPENDENCIES:
   - Swiper.js (loaded via CDN in index.html)
   - tsParticles (loaded via CDN in index.html)
   - Global scripts (global.js, animations.js, utils.js)
   
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. TESTIMONIALS SWIPER SLIDER
     ========================================================================
     Initializes the Swiper.js carousel for parent/student testimonials.
     Features:
     - Autoplay with 5-second interval
     - Touch-friendly swipe navigation
     - Custom navigation buttons (prev/next arrows)
     - Pagination dots
     - Responsive breakpoints (1 slide on mobile, 2 on tablet, 3 on desktop)
     ======================================================================== */

  /**
   * initTestimonialSlider - Creates the Swiper instance for the
   * testimonials section. Only runs if Swiper is loaded and the
   * slider element exists in the DOM.
   */
  function initTestimonialSlider() {
    // Check if Swiper library is available (loaded from CDN)
    if (typeof Swiper === 'undefined') {
      console.warn('TGVIS Home: Swiper not loaded — testimonials slider disabled.');
      return;
    }

    // Check if the slider element exists on this page
    const sliderElement = document.querySelector('.testimonials__slider');
    if (!sliderElement) return;

    // Initialize the Swiper slider with our configuration
    const testimonialSwiper = new Swiper('.testimonials__slider', {
      // Number of slides visible at once (desktop)
      slidesPerView: 1,

      // Gap between slides
      spaceBetween: 24,

      // Enable continuous loop (last slide connects back to first)
      loop: true,

      // Autoplay settings — slides advance automatically
      autoplay: {
        delay: 5000,                    // 5 seconds between slides
        disableOnInteraction: false,    // Keep autoplaying after user swipes
        pauseOnMouseEnter: true         // Pause when user hovers over slider
      },

      // Animation speed (milliseconds for slide transition)
      speed: 600,

      // Pagination dots at the bottom of the slider
      pagination: {
        el: '.swiper-pagination',
        clickable: true,    // Users can click dots to jump to specific slides
        dynamicBullets: false
      },

      // Custom navigation buttons (arrows)
      navigation: {
        nextEl: '.testimonials__nav-btn--next',
        prevEl: '.testimonials__nav-btn--prev'
      },

      // Responsive breakpoints — adjust slidesPerView based on screen width
      breakpoints: {
        // When viewport width is >= 640px (tablet)
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // When viewport width is >= 768px (large tablet)
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        // When viewport width is >= 1024px (desktop)
        1024: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        // When viewport width is >= 1280px (large desktop)
        1280: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      },

      // Grab cursor — shows a "grab" hand cursor when hovering
      grabCursor: true
    });
  }

  // Initialize the testimonial slider
  initTestimonialSlider();


  /* ========================================================================
     2. tsParticles — Hero Section Particle Effect
     ========================================================================
     Creates a subtle floating particle animation in the hero section
     background. The particles are semi-transparent dots that float gently,
     adding a premium "alive" feel without being distracting.
     
     We use tsParticles (modern, maintained) instead of particles.js
     (old, unmaintained) for better performance and mobile support.
     ======================================================================== */

  /**
   * initHeroParticles - Initializes the tsParticles engine on the
   * hero section's particle container.
   */
  function initHeroParticles() {
    // Check if tsParticles is loaded
    if (typeof tsParticles === 'undefined') {
      // tsParticles not loaded — this is fine, particles are decorative
      console.info('TGVIS Home: tsParticles not loaded — hero particles skipped.');
      return;
    }

    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;

    // Skip particles on mobile devices for better performance
    if (window.innerWidth < 768) {
      console.info('TGVIS Home: Particles disabled on mobile for performance.');
      return;
    }

    // Initialize tsParticles with a subtle, lightweight configuration
    tsParticles.load('heroParticles', {
      // Don't show tsParticles branding
      fullScreen: { enable: false },

      // Particle appearance
      particles: {
        number: {
          value: 30,                // Number of particles (low for performance)
          density: {
            enable: true,
            area: 800               // Distribution density area
          }
        },
        color: {
          value: ['#D4A843', '#10B981', '#FFFFFF'] // Gold, green, white particles
        },
        opacity: {
          value: { min: 0.1, max: 0.3 }, // Very subtle — not distracting
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.05,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 4 },     // Small dots
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 0.5,                     // Very slow, gentle movement
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' }    // Particles exit and re-enter
        },
        // Connect nearby particles with thin lines (optional, adds elegance)
        links: {
          enable: true,
          distance: 150,
          color: '#D4A843',
          opacity: 0.05,                  // Very subtle connecting lines
          width: 1
        }
      },

      // Interactive behavior (desktop only)
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab'               // Particles connect to cursor on hover
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.15
            }
          }
        }
      },

      // Performance settings
      detectRetina: true,                // High-DPI display support
      fpsLimit: 30                       // Cap at 30fps to save battery/CPU
    });
  }

  // Initialize hero particles
  initHeroParticles();


  /* ========================================================================
     3. HERO TEXT ANIMATION
     ========================================================================
     Additional GSAP animation for the hero badge and scroll indicator.
     The main hero title animation is handled by animations.js.
     ======================================================================== */

  /**
   * initHeroAnimations - Sets up additional hero-specific animations
   * using GSAP for elements not covered by the general animation system.
   */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Animate the scroll indicator with a continuous bounce
    const scrollIndicator = document.querySelector('.hero__scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,          // Infinite repetition
        yoyo: true            // Bounce back and forth
      });
    }

    // Animate the hero badge with a subtle entrance
    const heroBadge = document.querySelector('.hero__badge');
    if (heroBadge) {
      gsap.from(heroBadge, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)'
      });
    }
  }

  // Initialize hero animations
  initHeroAnimations();


  /* ========================================================================
     4. SMOOTH ENTRANCE FOR SECTIONS
     ========================================================================
     Adds a subtle parallax-like effect to section backgrounds as the
     user scrolls through the page.
     ======================================================================== */

  /**
   * initSectionEffects - Adds scroll-based effects to homepage sections.
   */
  function initSectionEffects() {
    // Keep scrolling on the homepage native and predictable. The lightweight
    // reveal observer in animations.js already handles entrance motion.
    return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Fade-in the welcome section image with a slight zoom
    const welcomeImage = document.querySelector('.welcome__image');
    if (welcomeImage) {
      gsap.from(welcomeImage, {
        scale: 1.1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.welcome',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Animate the experience badge with a bounce-in
    const experienceBadge = document.querySelector('.welcome__experience-badge');
    if (experienceBadge) {
      gsap.from(experienceBadge, {
        scale: 0,
        rotation: -20,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.welcome__image-wrapper',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  // Initialize section effects
  initSectionEffects();

}); // END DOMContentLoaded
