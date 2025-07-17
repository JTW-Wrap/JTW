document.addEventListener("DOMContentLoaded", () => {
  const locationButton = document.getElementById("locationButton");
  const dropdown = locationButton.parentElement;

  const locationList = document.createElement("div");
  locationList.className = "location-list hidden";
  locationList.id = "locationList";

  const locations = [
    {
      name: { en: "Tokyo", jp: "東京" },
      url: "https://www.google.com/maps/place/JTW%E7%94%A3%E6%A5%AD%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE/@35.8174911,139.7608699,17z"
    },
    {
      name: { en: "Osaka", jp: "大阪" },
      url: "https://www.google.com/maps/place/Osaka"
    }
  ];

  let currentLang = localStorage.getItem("language") || "en";

  function buildLocationList(lang) {
    locationList.innerHTML = "";
    locations.forEach(loc => {
      const link = document.createElement("a");
      link.href = loc.url;
      link.target = "_blank";
      link.textContent = loc.name[lang] || loc.name.en;
      locationList.appendChild(link);
    });
  }

  buildLocationList(currentLang);
  dropdown.appendChild(locationList);

  locationButton.addEventListener("click", (e) => {
    e.stopPropagation();
    locationList.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    locationList.classList.add("hidden");
  });

  const langEn = document.getElementById("lang-en");
  const langJp = document.getElementById("lang-jp");

  const translatableElements = document.querySelectorAll("[data-en][data-jp]");

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);

    translatableElements.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    buildLocationList(lang);

    langEn.classList.toggle("active", lang === "en");
    langJp.classList.toggle("active", lang === "jp");
  }

  langEn.addEventListener("click", () => setLanguage("en"));
  langJp.addEventListener("click", () => setLanguage("jp"));

  setLanguage(currentLang);
});

document.body.style.visibility = "visible";
