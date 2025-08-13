// Reveal on scroll using IntersectionObserver
(function () {
  if (typeof window === 'undefined') return;
  var elements = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  elements.forEach(function (el, idx) {
    el.style.transitionDelay = (idx % 6) * 60 + 'ms';
    observer.observe(el);
  });

  // Subtle parallax for hero image
  var heroImg = document.querySelector('header.masthead img');
  if (heroImg) {
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = Math.min(40, window.scrollY / 20);
      if (Math.abs(y - lastY) < 0.5) return;
      lastY = y;
      heroImg.style.transform = 'translateY(' + y + 'px)';
    }, { passive: true });
  }
})();


