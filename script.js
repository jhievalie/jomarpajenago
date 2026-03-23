/* =========================
   ROUTE CONFIG
========================= */

const routes = {
  "/home": "#home",
  "/about": "#about",
  "/services": "#services",
  "/projects": "#projects",
  "/experience": "#experience",
  "/contact": "#contact"
};

const sectionRoutes = {
  home: "/home",
  about: "/about",
  services: "/services",
  projects: "/projects",
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
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0
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


/* =========================
   MODAL - PROJECTS
========================= */

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const overlay = document.getElementById("modalOverlay");

// OPEN (attach this to your project card later)
function openModal() {
  modal.classList.add("active");
}

// CLOSE
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("active");
});



/* =========================
   IMAGE SLIDER LOGIC
========================= */

// const img1 = document.getElementById("img1");
// const img2 = document.getElementById("img2");

// img1.addEventListener("click", () => handleClick(img1, img2));
// img2.addEventListener("click", () => handleClick(img2, img1));

// function handleClick(clicked, other) {

//   if (clicked.classList.contains("right")) {
//     clicked.classList.remove("right");
//     clicked.classList.add("center");

//     other.classList.remove("center");
//     other.classList.add("left");
//   }

//   else if (clicked.classList.contains("left")) {
//     clicked.classList.remove("left");
//     clicked.classList.add("center");

//     other.classList.remove("center");
//     other.classList.add("right");
//   }
// }


/* =========================
   MULTI IMAGE SLIDER
========================= */

const images = Array.from(document.querySelectorAll(".stack-img"));
let current = 0;
let autoSlide;

/* UPDATE SLIDER STATE */
function updateSlider() {
  const total = images.length;

  images.forEach((img, index) => {
    img.classList.remove("center", "left", "right");

    if (index === current) {
      img.classList.add("center");
    }
    else if (index === (current + 1) % total) {
      img.classList.add("right");
    }
    else if (index === (current - 1 + total) % total) {
      img.classList.add("left");
    }
  });
}

/* NEXT SLIDE */
function nextSlide() {
  current = (current + 1) % images.length;
  updateSlider();
}

/* AUTO SLIDE CONTROL */
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

/* CLICK HANDLER (single, clean) */
images.forEach((img, index) => {
  img.addEventListener("click", () => {

    const total = images.length;

    // pause auto
    stopAutoSlide();

    if (index === (current + 1) % total) {
      current = (current + 1) % total;
    }
    else if (index === (current - 1 + total) % total) {
      current = (current - 1 + total) % total;
    }

    updateSlider();

    // resume auto
    startAutoSlide();
  });
});

/* INIT */
updateSlider();
startAutoSlide();