/* ===== script.js ===== */
 
// ── Custom Cursor ──────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
 
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});
 
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.background = 'var(--accent2)';
    trail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    trail.style.opacity = '0.5';
  });
});
 
// ── Nav Scroll Effect ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});
 
// ── Intersection Observer for Animations ──────────────────
const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
 
animEls.forEach(el => observer.observe(el));
 
// ── Skill Bar Animation ────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.dataset.width;
      setTimeout(() => {
        el.style.width = width + '%';
      }, 300);
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
 
skillBars.forEach(bar => barObserver.observe(bar));
 
// ── Counter Animation ──────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 30);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
 
counters.forEach(c => countObserver.observe(c));
 
// ── Terminal Typewriter ────────────────────────────────────
const terminalBody = document.getElementById('terminal-body');
 
const terminalLines = [
  { type: 'cmd',    text: 'systemctl start jenkins' },
  { type: 'output', text: 'Starting Jenkins CI Server...' },
  { type: 'cmd',    text: 'java -version' },
  { type: 'output', text: 'openjdk version "21.0.2" 2024 LTS' },
  { type: 'success',text: '✓ Jenkins is active (running)' },
  { type: 'cmd',    text: 'kubectl get pods -n production' },
  { type: 'output', text: 'NAME                  READY   STATUS    RESTARTS' },
  { type: 'output', text: 'app-7d4b9c6f8-xk2p9   1/1     Running   0' },
  { type: 'output', text: 'app-7d4b9c6f8-mn3q1   1/1     Running   0' },
  { type: 'success',text: '✓ All systems operational' },
  { type: 'cmd',    text: 'terraform apply -auto-approve' },
  { type: 'output', text: 'Apply complete! Resources: 12 added, 0 changed.' },
  { type: 'success',text: '✓ Infrastructure provisioned' },
];
 
let lineIndex = 0;
let charIndex = 0;
let currentLineEl = null;
let isTyping = false;
 
function addCursor() {
  const existing = terminalBody.querySelector('.t-cursor');
  if (existing) existing.remove();
  const cur = document.createElement('span');
  cur.className = 't-cursor';
  terminalBody.appendChild(cur);
}
 
function removeCursor() {
  const existing = terminalBody.querySelector('.t-cursor');
  if (existing) existing.remove();
}
 
function typeNextChar() {
  if (lineIndex >= terminalLines.length) {
    // Restart after pause
    setTimeout(() => {
      terminalBody.innerHTML = '';
      lineIndex = 0; charIndex = 0;
      startTerminal();
    }, 3000);
    return;
  }
 
  const line = terminalLines[lineIndex];
 
  if (charIndex === 0) {
    // Create new line element
    const lineEl = document.createElement('div');
    lineEl.className = 't-line';
 
    if (line.type === 'cmd') {
      lineEl.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd"></span>`;
    } else if (line.type === 'output') {
      lineEl.innerHTML = `<span class="t-output"></span>`;
    } else if (line.type === 'success') {
      lineEl.innerHTML = `<span class="t-output t-success"></span>`;
    }
    terminalBody.appendChild(lineEl);
    currentLineEl = lineEl.querySelector('.t-cmd, .t-output');
    addCursor();
  }
 
  if (charIndex < line.text.length) {
    currentLineEl.textContent += line.text[charIndex];
    charIndex++;
    terminalBody.scrollTop = terminalBody.scrollHeight;
    const speed = line.type === 'cmd' ? 55 : 18;
    setTimeout(typeNextChar, speed);
  } else {
    // Line done
    charIndex = 0;
    lineIndex++;
    const pause = line.type === 'cmd' ? 400 : 120;
    setTimeout(typeNextChar, pause);
  }
}
 
function startTerminal() {
  const terminalSection = document.getElementById('terminal-body');
  const termObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isTyping) {
      isTyping = true;
      typeNextChar();
      termObs.disconnect();
    }
  }, { threshold: 0.5 });
  termObs.observe(terminalSection);
}
 
startTerminal();
 
// ── Smooth Scroll for Nav Links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
 
// ── Parallax Grid on Hero ──────────────────────────────────
const heroGrid = document.querySelector('.hero-bg-grid');
window.addEventListener('scroll', () => {
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});
 
// ── Active Nav Link Highlight ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
 
sections.forEach(s => sectionObserver.observe(s));
 
