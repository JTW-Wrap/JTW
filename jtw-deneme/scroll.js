// Tüm .section öğelerini seç
const sections = document.querySelectorAll('.section');

// Footer ve overlay elementlerini al
const footer = document.querySelector('.site-footer');
const overlay = document.getElementById('footer-overlay');

// Her .section görünür oldukça "visible" sınıfı eklenir (animasyon tetiklenir)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // Yukarı çıkarken efekt silinir
    }
  });
}, { threshold: 0.25 }); // %25 görünürse çalışır

// Tüm bölümleri gözlemle
sections.forEach(section => observer.observe(section));

// Sayfanın en altına ulaşıldığında footer gösterilir
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop >= docHeight - 80) {
    showFooter(true);
  } else {
    showFooter(false);
  }
});

// Footer göster/gizle fonksiyonu
function showFooter(show) {
  footer.classList.toggle('visible', show);
  overlay.classList.toggle('active', show);
}
