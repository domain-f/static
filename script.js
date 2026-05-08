// ── Nav Scroll Effect ─────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ───────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mmLinks = document.querySelectorAll('.mm-link');

navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mmLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Menu Tabs ─────────────────────────────────────────────
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ── Scroll Animations ─────────────────────────────────────
const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
animEls.forEach(el => observer.observe(el));

// ── Counter Animation ─────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 25);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ── Testimonial Slider ────────────────────────────────────
const track = document.getElementById('testiTrack');
const dotsContainer = document.getElementById('testiDots');
const cards = track ? track.querySelectorAll('.testi-card') : [];
let currentSlide = 0;
let slideTimer;

function getVisibleCount() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function buildDots() {
  if (!dotsContainer || cards.length === 0) return;
  dotsContainer.innerHTML = '';
  const count = Math.ceil(cards.length / getVisibleCount());
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  if (!track) return;
  const visible = getVisibleCount();
  const maxSlide = Math.ceil(cards.length / visible) - 1;
  currentSlide = Math.max(0, Math.min(index, maxSlide));

  const cardWidth = cards[0].offsetWidth + 24; // gap
  track.style.transform = `translateX(-${currentSlide * visible * cardWidth}px)`;

  document.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  const visible = getVisibleCount();
  const maxSlide = Math.ceil(cards.length / visible) - 1;
  goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 4000);
}

buildDots();
startSlider();
window.addEventListener('resize', () => { buildDots(); goToSlide(0); });

// ── Booking Form ──────────────────────────────────────────
const bookBtn = document.getElementById('bookBtn');
const bookingConfirm = document.getElementById('bookingConfirm');

if (bookBtn) {
  bookBtn.addEventListener('click', () => {
    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;

    if (!name || !phone || !date) {
      bookBtn.textContent = '⚠️ Please fill all fields';
      bookBtn.style.background = '#FF6D00';
      setTimeout(() => {
        bookBtn.textContent = 'Confirm Reservation 🔥';
        bookBtn.style.background = '';
      }, 2000);
      return;
    }

    bookBtn.textContent = 'Booking...';
    bookBtn.disabled = true;

    setTimeout(() => {
  window.location.href = "thankyou.html";
}, 1200);
  });
}

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Menu Card Hover Glow ──────────────────────────────────
document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,109,0,0.15), var(--surface) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── Set min date for booking to today ────────────────────
const bookDate = document.getElementById('bookDate');
if (bookDate) {
  const today = new Date().toISOString().split('T')[0];
  bookDate.setAttribute('min', today);
  bookDate.value = today;
}

// ── Page Load Animation ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
