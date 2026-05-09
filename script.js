// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mmLinks = document.querySelectorAll('.mm-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
}

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
}

mmLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== MENU TABS =====
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');

    const panel = document.getElementById(`tab-${tab.dataset.tab}`);

    if (panel) {
      panel.classList.add('active');
    }
  });
});

// ===== COUNTER =====
const counters = document.querySelectorAll('.stat-num');

const runCounter = () => {

  counters.forEach(counter => {

    const target = +counter.dataset.target;
    let count = 0;

    const speed = target / 100;

    const updateCount = () => {

      count += speed;

      if (count < target) {

        counter.innerText = Math.floor(count);

        requestAnimationFrame(updateCount);

      } else {

        counter.innerText = target;
      }
    };

    updateCount();
  });
};

runCounter();

// ===== TESTIMONIAL SLIDER =====
const testiTrack = document.getElementById('testiTrack');
const testiCards = document.querySelectorAll('.testi-card');
const testiDots = document.getElementById('testiDots');

let currentSlide = 0;

if (testiCards.length > 0 && testiDots) {

  testiCards.forEach((_, index) => {

    const dot = document.createElement('div');

    dot.classList.add('testi-dot');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
    });

    testiDots.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testi-dot');

  function updateSlider() {

    const width = testiCards[0].offsetWidth + 24;

    testiTrack.style.transform = `translateX(-${currentSlide * width}px)`;

    dots.forEach(dot => dot.classList.remove('active'));

    dots[currentSlide].classList.add('active');
  }

  setInterval(() => {

    currentSlide++;

    if (currentSlide >= testiCards.length) {
      currentSlide = 0;
    }

    updateSlider();

  }, 4000);
}

// ===== SCROLL ANIMATION =====
const animatedItems = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }

  });

}, {
  threshold: 0.2
});

animatedItems.forEach(item => {
  observer.observe(item);
});

// ===== BOOKING FORM =====
const bookBtn = document.getElementById('bookBtn');

if (bookBtn) {

  bookBtn.addEventListener('click', async () => {

    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;
    const guests = document.getElementById('bookGuests').value;

    // Validation
    if (!name || !phone || !date) {

      alert('Please fill all fields');

      return;
    }

    try {

      bookBtn.textContent = 'Booking...';
      bookBtn.disabled = true;

      // ===== API CALL =====
      const response = await fetch('http://35.176.246.29:5000/api/book', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name,
          phone,
          date,
          guests
        })

      });

      const data = await response.json();

      console.log(data);

      if (data.success) {

        const bookingConfirm = document.getElementById('bookingConfirm');

        bookingConfirm.style.display = 'block';

        bookingConfirm.innerText = 'Successfully booked 🔥';

        setTimeout(() => {
          window.location.href = 'thankyou.html';
        }, 1500);

      } else {

        alert(data.message || 'Booking failed');

        bookBtn.disabled = false;
        bookBtn.textContent = 'Confirm Reservation 🔥';
      }

    } catch (error) {

      console.error(error);

      alert('Cannot connect backend server');

      bookBtn.disabled = false;
      bookBtn.textContent = 'Confirm Reservation 🔥';
    }

  });

}
