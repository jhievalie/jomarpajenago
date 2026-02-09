/* =========================
   MOBILE NAV
========================= */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeNav = document.getElementById("closeNav");

hamburger?.addEventListener("click", () => {
  mobileNav.classList.add("active");
});

closeNav?.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});

document.querySelectorAll(".mobile-links a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});


/* =========================
   SECTION REVEAL (HOME / ABOUT / SERVICES / CONTACT)
========================= */
const animatedSections = document.querySelectorAll(".section-animate");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.25 }
);

animatedSections.forEach(section => sectionObserver.observe(section));


/* =========================
   TIMELINE REVEAL (EXPERIENCE)
========================= */
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        timelineObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);

timelineItems.forEach(item => timelineObserver.observe(item));


/* =========================
   CUSTOM NAVIGATION (NO HASH)
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // stop default anchor behavior

    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (!targetEl) return;

    // Smooth scroll
    targetEl.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // 🔥 Remove hash immediately
    history.replaceState(null, "", window.location.pathname);

    // Force reveal for mobile edge cases (Experience section)
    setTimeout(() => {
      if (targetId === "#experience") {
        targetEl.classList.add("visible");
        document
          .querySelectorAll("#experience .timeline-item")
          .forEach(item => item.classList.add("is-visible"));
      }
    }, 300);
  });
});
