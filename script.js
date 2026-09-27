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

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  document.querySelectorAll('img.zoomable').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();
