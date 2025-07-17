
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".car-wash-row");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  rows.forEach((row) => observer.observe(row));
});
  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("advantage-block");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("visible");
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  });

  
    document.addEventListener("DOMContentLoaded", () => {
      const repairSection = document.querySelector(".repair-highlight");
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            repairSection.classList.add("animate-visible");
          }
        });
      }, { threshold: 0.3 });
    
      observer.observe(repairSection);
    });
    