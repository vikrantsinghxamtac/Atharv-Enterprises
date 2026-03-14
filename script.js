(function () {
  'use strict';

  // Header scroll effect
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var top = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('is-scrolled', top > 50);
      lastScroll = top;
    });
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Animate stats on scroll
  var stats = document.querySelectorAll('.stat-num[data-target]');
  function animateStats() {
    stats.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80 && !el.dataset.done) {
        el.dataset.done = '1';
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1200;
        var start = performance.now();
        function step(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          progress = 1 - Math.pow(1 - progress, 2); // easeOutQuad
          el.textContent = Math.round(progress * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      }
    });
  }
  window.addEventListener('scroll', animateStats);
  window.addEventListener('load', animateStats);

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
