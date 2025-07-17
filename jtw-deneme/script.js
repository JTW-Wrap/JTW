document.addEventListener('DOMContentLoaded', () => {
  // 🎯 DOM Elements
  const menuIcon = document.getElementById('menu-icon');
  const sideMenu = document.getElementById('side-menu');
  const navbar = document.getElementById('navbar');
  const langEn = document.getElementById('lang-en');
  const langJp = document.getElementById('lang-jp');
  const firstImage = document.querySelector('.image-wrapper.first img');
  const fullscreenContainer = document.querySelector('.fullscreen-image-section .media-container');
  const fullscreenVideo = fullscreenContainer?.querySelector('video.background-video');
  const sections = document.querySelectorAll('.content-wrapper');
  const mediaContainers = document.querySelectorAll('.media-container');

  // ⚠️ Temel Kontrol
  if (!menuIcon || !sideMenu || !navbar) {
    console.warn('Menü veya navbar eksik.');
    return;
  }

  // 🧱 Menü Overlay
  const overlay = Object.assign(document.createElement('div'), {
    id: 'menu-overlay',
    role: 'presentation',
    style: `
      position:fixed;
      top:0;
      left:0;
      width:100vw;
      height:100vh;
      background-color:rgba(0,0,0,0.5);
      backdrop-filter:blur(4px);
      z-index:10000;
      display:none;
      opacity:0;
      transition:opacity 0.3s ease;
    `
  });
  document.body.appendChild(overlay);

  function openMenu() {
    sideMenu.classList.add('show');
    overlay.style.display = 'block';
    requestAnimationFrame(() => (overlay.style.opacity = '1'));
    document.body.style.overflow = 'hidden';
    menuIcon.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
    sideMenu.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])')?.focus();
  }

  function closeMenu() {
    sideMenu.classList.remove('show');
    overlay.style.opacity = '0';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuIcon.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
    menuIcon.focus();
    setTimeout(() => (overlay.style.display = 'none'), 300); // animasyon sonrası kapat
  }

  function toggleMenu() {
    sideMenu.classList.contains('show') ? closeMenu() : openMenu();
  }

  // Menü olayları
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('show')) closeMenu();
  });
  document.addEventListener('click', (e) => {
    if (
      sideMenu.classList.contains('show') &&
      !sideMenu.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // 🌐 Dil Seçimi
  function setLanguage(lang) {
    if (!langEn || !langJp) return;
    if (lang === 'en') {
      langEn.classList.add('active');
      langJp.classList.remove('active');
    } else {
      langJp.classList.add('active');
      langEn.classList.remove('active');
    }
  }
  langEn?.addEventListener('click', () => setLanguage('en'));
  langJp?.addEventListener('click', () => setLanguage('jp'));

  // 🔘 Scroll Davranışı
  let lastScrollY = window.scrollY;
  function handleScroll() {
    const currentY = window.scrollY;
    const windowH = window.innerHeight;

    // Navbar scroll dav.
    if (currentY > lastScrollY && currentY > 100) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
    navbar.classList.toggle('scrolled', currentY > 50);
    lastScrollY = currentY;

    // Görsel efekti (ilk görsel varsa)
    if (firstImage) {
      const opacity = Math.max(0.5, Math.min(1, 1 - currentY / (windowH * 0.5)));
      const scale = Math.min(1.2, 1 + currentY / (windowH * 2));
      Object.assign(firstImage.style, { opacity, transform: `scale(${scale})` });
    }

    // Siyah perde efekti
    const overlayOpacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.75));
    blackOverlay.style.backgroundColor = `rgba(0,0,0,${overlayOpacity})`;
  }

  function throttle(cb, delay = 100) {
    let last = 0;
    return () => {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        cb();
      }
    };
  }

  window.addEventListener('scroll', throttle(handleScroll, 100));

  // ✨ Fade-In Animasyon
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      e.target.classList.toggle('visible', e.isIntersecting);
    });
  }, { threshold: 0.2 });

  sections.forEach((el) => fadeObserver.observe(el));

  // 🕶️ Siyah Arkaplan
  const blackOverlay = Object.assign(document.createElement('div'), {
    id: 'black-overlay',
    style: `
      position:fixed;
      top:0;
      left:0;
      width:100vw;
      height:100vh;
      background-color:rgba(0,0,0,1);
      pointer-events:none;
      transition:background-color 0.5s ease;
      z-index:9999;
    `
  });
  document.body.appendChild(blackOverlay);

  // 🎥 Video Hover Efekti
  mediaContainers.forEach(container => {
    const video = container.querySelector('video.background-video');
    if (!video) return;
    container.addEventListener('mouseenter', () => video.play().catch(() => {}));
    container.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  if (fullscreenVideo) {
    fullscreenContainer.addEventListener('mouseenter', () => fullscreenVideo.play().catch(() => {}));
    fullscreenContainer.addEventListener('mouseleave', () => {
      fullscreenVideo.pause();
      fullscreenVideo.currentTime = 0;
    });
  }
});
// Navbar scroll kontrolü ve gizleme/gösterme
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Navbar'a scrolla bağlı arka plan ekle/kaldır
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Aşağı scroll'da navbar gizle, yukarı scroll'da göster
  if (currentScroll > lastScrollY && currentScroll > 100) {
    navbar.classList.add('hide');
  } else {
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScroll;

  // Scroll ile fade-in animasyonu kontrolü
  document.querySelectorAll('.scroll-fade').forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
});
