/*
 * TGVIS — Class WhatsApp Group Requests
 * -------------------------------------
 * The school has not supplied public invite URLs, so this page must not
 * invent or expose fake group links. Each card instead opens WhatsApp with
 * the exact class name pre-filled, allowing the office to share the current
 * approved invite link privately with an enrolled parent or student.
 */
document.addEventListener('DOMContentLoaded', () => {
  const officeNumber = '918935901010';
  const cards = document.querySelectorAll('.wa-card');

  cards.forEach(card => {
    const className = card.querySelector('.wa-card__class')?.textContent.trim();
    const button = card.querySelector('.wa-card__btn');
    if (!className || !button) return;

    const message = [
      'Hello TGVIS School Office,',
      `I am a parent/student of ${className}.`,
      `Please share the approved ${className} WhatsApp group link.`
    ].join('\n');

    button.href = `https://wa.me/${officeNumber}?text=${encodeURIComponent(message)}`;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.innerHTML = '<i class="ri-whatsapp-line"></i> Request Group Link';
    button.setAttribute('aria-label', `Request the ${className} WhatsApp group link`);
  });
});