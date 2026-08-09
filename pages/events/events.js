/* TGVIS — Events Page JS | Filters and scroll animations for event cards */
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Category filter buttons (if present) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn, [data-filter]');
  const eventCards = document.querySelectorAll('.event-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter || btn.textContent.trim().toLowerCase();
      eventCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---- GSAP stagger animation ---- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const cards = document.querySelectorAll('.event-card');
    if (cards.length) {
      gsap.from(cards, { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
  }
});
