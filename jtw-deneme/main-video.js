  const progressColor = "#c80909";

let currentIndex = 0;
let currentLang = localStorage.getItem("language") || "en";

const videoElement = document.getElementById("main-video");
const videoLink = document.getElementById("video-link");
const indicatorsContainer = document.getElementById("video-indicators");
const videoItems = [...document.querySelectorAll("#video-data .video-item")];
const mainImageSection = document.querySelector(".main-image");

let animationFrameId = null;
let progressAnimating = false;
let timer = null;
let indicatorElements = [];

function createIndicators() {
  indicatorsContainer.innerHTML = "";
  videoItems.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "video-indicator";
    indicator.dataset.index = index;

    const ring = document.createElement("div");
    ring.className = "progress-ring";
    indicator.appendChild(ring);

    indicator.addEventListener("click", () => {
      currentIndex = index;
      loadVideo(currentIndex);
      resetTimer();
    });

    indicatorsContainer.appendChild(indicator);
  });

  indicatorElements = [...document.querySelectorAll(".video-indicator")];
}

function updateIndicators() {
  indicatorElements.forEach((ind, idx) => {
    const ring = ind.querySelector(".progress-ring");
    if (idx === currentIndex) {
      ind.classList.add("active");
      ring.dataset.active = "true";
      ring.style.background = `conic-gradient(${progressColor} 0deg, transparent 0deg)`;
    } else {
      ind.classList.remove("active");
      ring.dataset.active = "false";
      ring.style.background = "none";
    }
  });
}

function animateProgress(duration) {
  cancelAnimationFrame(animationFrameId);
  progressAnimating = true;

  const ring = indicatorElements[currentIndex]?.querySelector(".progress-ring");
  if (!ring || ring.dataset.active !== "true") return;

  let start = null;
  function step(timestamp) {
    if (!progressAnimating) return;
    if (!start) start = timestamp;

    const progress = Math.min((timestamp - start) / duration, 1);
    const angle = progress * 360;
    ring.style.background = `conic-gradient(${progressColor} ${angle}deg, transparent 0deg)`;

    if (progress < 1 && ring.dataset.active === "true") {
      animationFrameId = requestAnimationFrame(step);
    }
  }

  animationFrameId = requestAnimationFrame(step);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);

  // Sayfadaki tüm çevirilebilir öğeleri güncelle
  const allTranslatable = document.querySelectorAll("[data-en][data-jp][data-cn]");
  allTranslatable.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Buton aktiflik durumları için örnek
  document.getElementById("lang-en")?.classList.toggle("active", lang === "en");
  document.getElementById("lang-jp")?.classList.toggle("active", lang === "jp");
  document.getElementById("lang-cn")?.classList.toggle("active", lang === "cn");
}

function loadVideo(index) {
  const videoItem = videoItems[index];
  videoElement.pause();
  progressAnimating = false;
  cancelAnimationFrame(animationFrameId);

  const src = videoItem.dataset.src;
  const link = videoItem.dataset.link || "#";

  videoElement.innerHTML = "";
  const source = document.createElement("source");
  source.src = src;
  source.type = src.endsWith(".mov") ? "video/quicktime" : "video/mp4";
  videoElement.appendChild(source);

  videoElement.load();

  videoLink.href = link;

  // Önceki detayları kaldır
  const oldDetail = document.querySelector(".main-image .details-container");
  if (oldDetail) oldDetail.remove();

  // Yeni detay klonla ve ekle
  const newDetail = videoItem.querySelector(".details-container");
  if (newDetail) {
    const cloned = newDetail.cloneNode(true);
    mainImageSection.appendChild(cloned);

    // Yeni detay içindeki çevirilebilir metinleri güncelle
    const translatableElems = cloned.querySelectorAll("[data-en][data-jp][data-cn]");
    translatableElems.forEach(el => {
      el.textContent = el.getAttribute(`data-${currentLang}`);
    });
  }

  videoElement.onloadeddata = () => {
    videoElement.play().catch(e => console.log("Video play error:", e));
  };

  updateIndicators();
  animateProgress(10000);
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videoItems.length;
  loadVideo(currentIndex);
}

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    nextVideo();
    resetTimer();
  }, 10000);
}

window.addEventListener("DOMContentLoaded", () => {
  createIndicators();
  loadVideo(currentIndex);
  resetTimer();

  // Dili seçmek için butonları bağla
  document.getElementById("lang-en")?.addEventListener("click", () => setLanguage("en"));
  document.getElementById("lang-jp")?.addEventListener("click", () => setLanguage("jp"));
  document.getElementById("lang-cn")?.addEventListener("click", () => setLanguage("cn"));

  // İlk dil ayarı
  setLanguage(currentLang);
});
