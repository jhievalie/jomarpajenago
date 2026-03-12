/* =========================
   ROUTE CONFIG
========================= */

const routes = {
  "/home": "#home",
  "/about": "#about",
  "/services": "#services",
  "/experience": "#experience",
  "/contact": "#contact"
};

const sectionRoutes = {
  home: "/home",
  about: "/about",
  services: "/services",
  experience: "/experience",
  contact: "/contact"
};


/* =========================
   HANDLE REDIRECT FROM 404
========================= */

const urlParams = new URLSearchParams(window.location.search);
const redirectedPath = urlParams.get("path");

if (redirectedPath) {
  history.replaceState(null, "", redirectedPath);
}


/* =========================
   FORCE /home AS DEFAULT
========================= */

if (window.location.pathname === "/") {
  history.replaceState({}, "", "/home");
}


/* =========================
   NAVIGATION CLICK ROUTING
========================= */

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


/* =========================
   OPEN CORRECT SECTION ON LOAD
========================= */

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
   UPDATE URL ON SCROLL
========================= */

const routeObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      const newPath = sectionRoutes[id];

      if (!newPath) return;

      if (window.location.pathname !== newPath) {
        history.replaceState({}, "", newPath);
      }

    });

  },
  {
    threshold: 0.6
  }
);


/* observe only routed sections */

Object.keys(sectionRoutes).forEach(id => {

  const section = document.getElementById(id);

  if (section) {
    routeObserver.observe(section);
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
   SECTION REVEAL ANIMATION
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
   TIMELINE REVEAL
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
