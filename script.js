(function () {
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    backToTop.classList.toggle('visible', atBottom);
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

(function () {
  var toggle = document.getElementById('menuToggle');
  var closeBtn = document.getElementById('mobileNavClose');
  var backdrop = document.getElementById('mobileNavBackdrop');
  var nav = document.getElementById('mobileNav');

  function openNav() {
    nav.classList.add('open');
    backdrop.classList.add('open');
  }
  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('open');
  }

  toggle.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  backdrop.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
})();

(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');
  var count = document.getElementById('lightboxCount');
  // every zoomable photo on the page, in page order, forms one sequence
  var images = Array.prototype.slice.call(document.querySelectorAll('img.zoomable'));
  var current = 0;
  var multiple = images.length > 1;

  prevBtn.hidden = nextBtn.hidden = !multiple;
  lightbox.classList.toggle('has-nav', multiple);

  function show(i) {
    current = (i + images.length) % images.length;
    var img = images[current];
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    count.textContent = multiple ? (current + 1) + ' / ' + images.length : '';
  }

  function openLightbox(i) {
    show(i);
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  images.forEach(function (img, i) {
    img.addEventListener('click', function () {
      openLightbox(i);
    });
  });

  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });
  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (multiple && e.key === 'ArrowLeft') show(current - 1);
    else if (multiple && e.key === 'ArrowRight') show(current + 1);
  });

  // swipe left/right on touch screens
  var startX = null;
  lightbox.addEventListener('touchstart', function (e) {
    startX = e.touches.length === 1 ? e.touches[0].clientX : null;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (startX === null || !multiple) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
    startX = null;
  });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.product-card .thumb').forEach(function (thumb, n) {
    var slides = thumb.querySelectorAll('img.slide');
    if (slides.length < 2) return;
    var i = 0;
    // stagger cards so they don't all change at once
    setTimeout(function () {
      setInterval(function () {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 4000);
    }, n * 900);
  });
})();
