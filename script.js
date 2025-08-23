// Animated counters for awards/certifications
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const isPercent = counter.textContent.includes('%');
    let count = isPercent ? 0 : 0;
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      let progress = Math.min(elapsed / duration, 1);
      let value = Math.floor(progress * target);
      if (isPercent) {
        counter.textContent = value + '%';
      } else {
        counter.textContent = value;
      }
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = isPercent ? target + '%' : target;
      }
    }
    requestAnimationFrame(update);
  });
}
window.addEventListener('DOMContentLoaded', animateCounters);
// Timeline animation on scroll
function animateTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const trigger = window.innerHeight * 0.92;
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.classList.add('visible');
    } else {
      item.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', animateTimeline);
window.addEventListener('DOMContentLoaded', animateTimeline);
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) navMenu.classList.remove('open');
  });
}

// Scroll progress
const progress = document.getElementById('scroll-progress');
document.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (progress) progress.style.width = scrolled + '%';
}, { passive: true });

// Animate hero name
const heroName = document.getElementById('hero-name');
if (heroName) heroName.classList.add('animate-name');

// Counter animation
const counters = document.querySelectorAll('.counter');
if ('IntersectionObserver' in window && counters.length) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +String(el.getAttribute('data-target') || '0');
      const isPercent = el.textContent.includes('%');
      let current = 0;
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        current = Math.round(target * p);
        el.textContent = current + (isPercent ? '%' : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.25 });

  counters.forEach(c => obs.observe(c));
}

// Contact form validation + EmailJS
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default first

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let ok = true;
    if (!name.value.trim()) { setError(name, 'Please enter your name'); ok = false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { setError(email, 'Please enter a valid email'); ok = false; }
    if (!message.value.trim()) { setError(message, 'Please enter a message'); ok = false; }

    if (!ok) return; // stop if validation fails

    // ✅ EmailJS submission
    emailjs.sendForm("service-sumiran", "template_scq1ita", form)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      }, (err) => {
        alert("❌ Failed to send message. " + JSON.stringify(err));
      });
  });

  // Live validation
  ['input', 'blur'].forEach(evt => form.addEventListener(evt, (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.matches('#name') && el.value.trim()) clearError(el);
    if (el.matches('#email') && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) clearError(el);
    if (el.matches('#message') && el.value.trim()) clearError(el);
  }));
}

function setError(input, msg){
  const field = input.closest('.field');
  if (!field) return;
  const error = field.querySelector('.error');
  if (error) error.textContent = msg;
  input.setAttribute('aria-invalid', 'true');
}
function clearError(input){
  const field = input.closest('.field');
  if (!field) return;
  const error = field.querySelector('.error');
  if (error) error.textContent = '';
  input.removeAttribute('aria-invalid');
}

// Skill pills toggle
document.addEventListener('DOMContentLoaded', function() {
  var pillList = document.querySelector('.pill-list');
  if (!pillList) return;
  pillList.addEventListener('click', function(e) {
    var pill = e.target.closest('.skill-pill');
    if (!pill) return;
    var content = pill.querySelector('.skill-content');
    if (!pill.classList.contains('show-logo')) {
      pill.classList.add('show-logo');
      content.innerHTML = pill.getAttribute('data-logo');
    } else {
      pill.classList.remove('show-logo');
      content.innerHTML = pill.getAttribute('data-text');
    }
  });
});
