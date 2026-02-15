// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FAQ toggle
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Modal functionality for collage cards
const modal = document.getElementById('infoModal');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.collage-card, .founder-card').forEach(card => {
  card.addEventListener('click', () => {
    const info = card.getAttribute('data-info');
    modalText.textContent = info;
    modal.classList.add('show');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
  }
});
// Stories Carousel
(function() {
  const track = document.querySelector('.stories-track');
  const slides = document.querySelectorAll('.story-slide');
  const dots = document.querySelectorAll('.stories-dot');
  const prevBtn = document.querySelector('.stories-prev');
  const nextBtn = document.querySelector('.stories-next');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index))));

  // Touch/swipe support with improved mobile handling
  let startX = 0, deltaX = 0, isDragging = false, startTime = 0;
  
  track.addEventListener('touchstart', e => { 
    startX = e.touches[0].clientX; 
    startTime = Date.now();
    isDragging = true; 
  }, { passive: true });
  
  track.addEventListener('touchmove', e => { 
    if (isDragging) {
      deltaX = e.touches[0].clientX - startX;
    }
  }, { passive: true });
  
  track.addEventListener('touchend', () => {
    const swipeTime = Date.now() - startTime;
    const swipeSpeed = Math.abs(deltaX) / swipeTime;
    
    // Swipe detection: either 50px minimum or fast swipe (velocity-based)
    if (Math.abs(deltaX) > 50 || swipeSpeed > 0.5) { 
      deltaX < 0 ? goTo(current + 1) : goTo(current - 1); 
    }
    deltaX = 0; 
    isDragging = false;
  });
  
  // Mouse drag support for desktop
  let mouseStartX = 0, isMouseDragging = false;
  
  track.addEventListener('mousedown', e => {
    mouseStartX = e.clientX;
    isMouseDragging = true;
    track.style.cursor = 'grabbing';
  });
  
  track.addEventListener('mousemove', e => {
    if (!isMouseDragging) return;
    const mouseDelta = e.clientX - mouseStartX;
    if (Math.abs(mouseDelta) > 5) {
      e.preventDefault();
    }
  });
  
  track.addEventListener('mouseup', e => {
    if (!isMouseDragging) return;
    const mouseDelta = e.clientX - mouseStartX;
    if (Math.abs(mouseDelta) > 50) {
      mouseDelta < 0 ? goTo(current + 1) : goTo(current - 1);
    }
    isMouseDragging = false;
    track.style.cursor = 'grab';
  });
  
  track.addEventListener('mouseleave', () => {
    if (isMouseDragging) {
      isMouseDragging = false;
      track.style.cursor = 'grab';
    }
  });
})();

