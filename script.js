/* ============================================================
   script.js — Bhargav.tech Portfolio
   ============================================================ */

/* ── CURSOR ── */
var cursorDot  = document.getElementById('cursor-dot');
var cursorRing = document.getElementById('cursor-ring');
var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });
  (function animRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .project-card, .skill-cell, .contact-link').forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-hover'); });
  });
}

/* ── PROGRESS BAR ── */
var pb = document.getElementById('progress-bar');
window.addEventListener('scroll', function() {
  pb.style.width = ((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) + '%';
});

/* ── NAV SHRINK ── */
var nav = document.getElementById('mainNav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HAMBURGER ── */
function toggleMenu() {
  var m = document.getElementById('mobileMenu');
  var h = document.getElementById('hamburger');
  m.classList.toggle('open');
  h.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── SCROLL REVEAL ── */
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .stagger, .project-card, .skill-cell, .timeline-item, .edu-card').forEach(function(el) {
  obs.observe(el);
});

/* ── ACTIVE NAV ── */
var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
['about', 'skills', 'projects', 'experience', 'contact'].forEach(function(id) {
  var s = document.getElementById(id);
  if (!s) return;
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        navLinks.forEach(function(a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) a.style.color = 'var(--accent)';
        });
      }
    });
  }, { threshold: 0.3 }).observe(s);
});