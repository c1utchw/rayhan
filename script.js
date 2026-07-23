// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers without native lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe slide-up elements
document.addEventListener('DOMContentLoaded', () => {
  const slideUpElements = document.querySelectorAll('.slide-up');
  slideUpElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});

// Preload critical resources on user interaction
let hasInteracted = false;
const preloadOnInteraction = () => {
  if (hasInteracted) return;
  hasInteracted = true;
  
  // Preload WhatsApp icon if needed
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'images/whatsapp.png';
    document.head.appendChild(link);
  }
};

['mouseover', 'touchstart', 'scroll'].forEach(event => {
  window.addEventListener(event, preloadOnInteraction, { once: true, passive: true });
});
