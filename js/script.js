const loader = document.getElementById('loader');
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const surpriseBtn = document.getElementById('surpriseBtn');
const loveLetter = document.getElementById('loveLetter');
const letterText = document.getElementById('letterText');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const floatingHearts = document.getElementById('floatingHearts');

const loveMessage = `My Love,\n\nThank you for every smile you've given me.\n\nThank you for every memory we've made.\n\nThank you for choosing me every single day.\n\nYou make my world brighter than I ever imagined possible.\n\nI hope this little website reminds you that no matter where life takes us...\n\nMy heart will always choose you.\n\nHappy Birthday, beautiful.\n\nI love you forever.\n\n❤️`;

function fadeInOnScroll() {
  const elements = document.querySelectorAll('.reason-card, .memory-card, .timeline-item, .song-card, .note-card, .section-intro');
  const viewport = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewport - 80) {
      el.classList.add('visible');
    }
  });
}

function initSectionAnimations() {
  const cards = document.querySelectorAll('.reason-card, .memory-card, .timeline-item, .song-card, .note-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 45}ms`;
  });
  fadeInOnScroll();
  window.addEventListener('scroll', fadeInOnScroll);
}

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
  }
});


function animateSurprise() {
  const letterLines = loveMessage.split('\n');
  letterText.textContent = '';
  loveLetter.classList.add('visible');
  letterLines.forEach((line, index) => {
    setTimeout(() => {
      letterText.textContent += line + '\n';
    }, index * 90);
  });
  showConfetti();
}

function showConfetti() {
  for (let i = 0; i < 24; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 90 + 5}%`;
    confetti.style.background = `hsl(${Math.random() * 320 + 20}, 80%, 65%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4200);
  }
}

surpriseBtn.addEventListener('click', () => {
  animateSurprise();
  surpriseBtn.disabled = true;
  surpriseBtn.textContent = 'Sending love...';
});

function createFloatingHearts() {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 70 + 10}%`;
    heart.style.width = `${10 + Math.random() * 18}px`;
    heart.style.height = heart.style.width;
    heart.style.opacity = `${0.5 + Math.random() * 0.4}`;
    heart.style.transform += ` rotate(${Math.random() * 360}deg)`;
    floatingHearts.appendChild(heart);
  }
}


function handleTouch(event) {
  const touch = event.touches[0];
  if (!touch) return;
  const sparkle = document.getElementById('touchSparkle');
  sparkle.style.left = `${touch.clientX - 30}px`;
  sparkle.style.top = `${touch.clientY - 30}px`;
  sparkle.style.opacity = '1';
  setTimeout(() => { sparkle.style.opacity = '0'; }, 400);
}

function glowScrollReveal() {
  const elements = document.querySelectorAll('.section-intro, .reason-card, .memory-card, .timeline-item, .song-card, .note-card');
  elements.forEach(el => el.classList.add('fade-in'));
}

window.addEventListener('load', () => {
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 800);
  }
  initSectionAnimations();
  createFloatingHearts();
  glowScrollReveal();
});

document.addEventListener('touchstart', handleTouch);
document.addEventListener('touchmove', handleTouch);

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') lightbox.classList.remove('open');
});

const sections = document.querySelectorAll('nav a[href^="#"]');
sections.forEach(link => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('open')) navbar.classList.remove('open');
  });
});
