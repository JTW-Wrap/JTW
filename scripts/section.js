document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.category-btn');
  const contents = document.querySelectorAll('.category-content');
  const extraSection = document.querySelector('.extra-section');

  // Butonlarla kategori geçişi
  function setActiveCategory(targetId, clickedBtn) {
    buttons.forEach(btn => {
      const isActive = btn === clickedBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.tabIndex = isActive ? 0 : -1;
    });

    contents.forEach(content => {
      if (content.id === targetId) {
        content.classList.add('active');
        content.removeAttribute('hidden');

        // Animasyon tetikleme için
        const imageCard = content.querySelector('.image-card');
        const textColumn = content.querySelector('.text-column');
        if (imageCard && textColumn) {
          imageCard.classList.remove('image-animate');
          textColumn.classList.remove('text-animate');
          void imageCard.offsetWidth; // reflow
          imageCard.classList.add('image-animate');
          textColumn.classList.add('text-animate');
        }
      } else {
        content.classList.remove('active');
        content.setAttribute('hidden', '');
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      setActiveCategory(targetId, btn);
    });

    // Klavye ile gezinme (isteğe bağlı)
    btn.addEventListener('keydown', e => {
      let idx = Array.from(buttons).indexOf(e.target);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        buttons[(idx + 1) % buttons.length].focus();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        buttons[(idx - 1 + buttons.length) % buttons.length].focus();
      }
    });
  });

  // Sayfa açıldığında ilk kategoriyi aktif yap
  if (buttons.length > 0) {
    buttons[0].click();
  }

  // Scroll animasyonları için IntersectionObserver
  const scrollAnimTargets = [...contents, extraSection].filter(Boolean);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  scrollAnimTargets.forEach(section => {
    observer.observe(section);
  });
});
