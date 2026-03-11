// Handle redirected paths from 404.html
const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get("path");

if (path) {
  history.replaceState(null, "", path);
}

const routes = {
  "/home": "#home",
  "/about": "#about",
  "/services": "#services",
  "/experience": "#experience",
  "/contact": "#contact"
};

/* =========================
   FORCE /home AS DEFAULT
========================= */

if (window.location.pathname === "/") {
  history.replaceState({}, "", "/home");
}

document.querySelectorAll('a[href^="/"]').forEach(link => {

  link.addEventListener("click", e => {

    e.preventDefault();

    const path = link.getAttribute("href");
    const section = document.querySelector(routes[path]);

    if (!section) return;

    history.pushState({}, "", path);

    section.scrollIntoView({
      behavior: "smooth"
    });

  });

});

// Open correct section on refresh
window.addEventListener("load", () => {

  const currentPath = window.location.pathname;
  const section = document.querySelector(routes[currentPath]);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }

});

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
// document.querySelectorAll('a[href^="#"]').forEach(link => {
//   link.addEventListener("click", e => {
    // e.preventDefault();

    // const targetId = link.getAttribute("href");
    // const targetEl = document.querySelector(targetId);

    // if (!targetEl) return;

    // Smooth scroll
    // targetEl.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start"
    // });

    // 🔥 Remove hash immediately
    // history.replaceState(null, "", window.location.pathname);

    // Force reveal for mobile edge cases (Experience section)
//     setTimeout(() => {
//       if (targetId === "#experience") {
//         targetEl.classList.add("visible");
//         document
//           .querySelectorAll("#experience .timeline-item")
//           .forEach(item => item.classList.add("is-visible"));
//       }
//     }, 300);
//   });
// });





