// Scroll reveal for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Sticky stacking cards — as you scroll past each card,
// it scales down and fades slightly so the next card appears to slide over it
(function() {
  const wrappers = document.querySelectorAll('.story-card-wrapper');
  if (!wrappers.length) return;

  function updateCards() {
    wrappers.forEach((wrapper, i) => {
      const card = wrapper.querySelector('.story-card');
      const rect = wrapper.getBoundingClientRect();
      const navHeight = 80;
      const viewH = window.innerHeight;

      // How far past the sticky point the wrapper has scrolled
      const scrollPast = navHeight - rect.top;
      const wrapperH = wrapper.offsetHeight;

      if (scrollPast > 0 && scrollPast < wrapperH) {
        // Progress 0 → 1 as this card scrolls away
        const progress = Math.min(scrollPast / (wrapperH * 0.6), 1);
        const scale = 1 - (progress * 0.05);
        const opacity = 1 - (progress * 0.4);
        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity;
      } else if (scrollPast <= 0) {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      }
    });
  }

  window.addEventListener('scroll', updateCards, { passive: true });
  updateCards();
})();

// FAQ toggle
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Modal functionality
const modal = document.getElementById('infoModal');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.modal-close');

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
    modal.classList.remove('show');
  }
});
