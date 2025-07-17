// switch.js

window.addEventListener('load', () => {
    const maintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
    const redirectedOnce = localStorage.getItem('redirectedOnce') === 'true';
    const currentPage = window.location.pathname.split('/').pop();
  
    if (maintenanceMode) {
      // Eğer bakım aktifse ama şu an maintenance sayfasında değilsek oraya yönlendir
      if (currentPage !== 'repari-page.html') {
        window.location.replace('repari-page.html');
      } else {
        // Bakım sayfasındaysak yönlendirme sıfırlansın ki sonra yönlenebilsin
        localStorage.removeItem('redirectedOnce');
      }
    } else {
      // Bakım modu kapalıysa ve hâlâ repair sayfasındaysak sadece 1 kez main'e yönlendir
      if (currentPage === 'repari-page.html' && !redirectedOnce) {
        localStorage.setItem('redirectedOnce', 'true');
        alert("✅ Maintenance is over. Redirecting to main page...");
        window.location.replace('main.html');
      }
      // Eğer bakım kapalıysa ve başka sayfalardaysak, yönlendirme geçmişini temizle
      else if (currentPage !== 'repari-page.html') {
        localStorage.removeItem('redirectedOnce');
      }
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-visible");
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll(".section-title, .image-card").forEach(el => {
      observer.observe(el);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll(".scroll-animate").forEach(el => {
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
      }
    });
  }, {
    threshold: 0.3
  });

  // fullscreen-image-section da dahil et
  document.querySelectorAll(".section-title, .image-card, .fullscreen-image-section").forEach(el => {
    observer.observe(el);
  });
});
  
 