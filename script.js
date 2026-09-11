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
  mobileNav?.classList.add("active");
});

closeNav?.addEventListener("click", () => {
  mobileNav?.classList.remove("active");
});

document.querySelectorAll(".mobile-links a").forEach(link => {

  link.addEventListener("click", () => {
    mobileNav?.classList.remove("active");
  });

});


/* =========================
   SECTION REVEAL ANIMATION
========================= */

const animatedSections =
  document.querySelectorAll(".section-animate");

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

animatedSections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================
   TIMELINE REVEAL
========================= */

const timelineItems =
  document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");

        timelineObserver.unobserve(entry.target);

      }

    });

  },
  { threshold: 0.15 }
);

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});


/* =========================
   PROJECT MODALS
========================= */


/* =========================
   E-COMMERCE MODAL
========================= */

const ecommerceModal =
  document.getElementById("projectModal");

const ecommerceClose =
  document.getElementById("closeModal");

const ecommerceOverlay =
  document.getElementById("modalOverlay");


/* OPEN E-COMMERCE */

function openModal() {

  ecommerceModal?.classList.add("active");

  document.body.classList.add("modal-open");

}


/* CLOSE E-COMMERCE */

function closeEcommerceModal() {

  ecommerceModal?.classList.remove("active");

  document.body.classList.remove("modal-open");

}


ecommerceClose?.addEventListener(
  "click",
  closeEcommerceModal
);

ecommerceOverlay?.addEventListener(
  "click",
  closeEcommerceModal
);


/* =========================
   SUPERSTORE MODAL
========================= */

const superstoreModal =
  document.getElementById("superstoreModal");

const superstoreClose =
  document.getElementById("closeSuperstoreModal");

const superstoreOverlay =
  document.getElementById("superstoreModalOverlay");


/* OPEN SUPERSTORE */

function openSuperstoreModal() {

  superstoreModal?.classList.add("active");

  document.body.classList.add("modal-open");

}


/* CLOSE SUPERSTORE */

function closeSuperstoreModal() {

  superstoreModal?.classList.remove("active");

  document.body.classList.remove("modal-open");

}


superstoreClose?.addEventListener(
  "click",
  closeSuperstoreModal
);

superstoreOverlay?.addEventListener(
  "click",
  closeSuperstoreModal
);


/* =========================
   CLOSE MODALS WITH ESCAPE
========================= */

document.addEventListener("keydown", e => {

  if (e.key !== "Escape") return;

  closeEcommerceModal();
  closeSuperstoreModal();

});


/* =========================
   E-COMMERCE IMAGE SLIDER
========================= */

const ecommerceImages =
  Array.from(
    document.querySelectorAll(
      "#imageStack .stack-img"
    )
  );

let ecommerceCurrent = 0;
let ecommerceAutoSlide = null;


/* UPDATE E-COMMERCE SLIDER */

function updateEcommerceSlider() {

  const total = ecommerceImages.length;

  if (!total) return;

  ecommerceImages.forEach((img, index) => {

    img.classList.remove(
      "center",
      "left",
      "right"
    );

    if (index === ecommerceCurrent) {

      img.classList.add("center");

    }

    else if (
      index ===
      (ecommerceCurrent + 1) % total
    ) {

      img.classList.add("right");

    }

    else if (
      index ===
      (ecommerceCurrent - 1 + total) % total
    ) {

      img.classList.add("left");

    }

  });

}


/* NEXT E-COMMERCE IMAGE */

function nextEcommerceSlide() {

  if (ecommerceImages.length <= 1) return;

  ecommerceCurrent =
    (ecommerceCurrent + 1) %
    ecommerceImages.length;

  updateEcommerceSlider();

}


/* START E-COMMERCE AUTO SLIDE */

function startEcommerceAutoSlide() {

  if (ecommerceImages.length <= 1) return;

  stopEcommerceAutoSlide();

  ecommerceAutoSlide =
    setInterval(
      nextEcommerceSlide,
      4000
    );

}


/* STOP E-COMMERCE AUTO SLIDE */

function stopEcommerceAutoSlide() {

  if (ecommerceAutoSlide) {

    clearInterval(ecommerceAutoSlide);

    ecommerceAutoSlide = null;

  }

}


/* E-COMMERCE IMAGE CLICK */

ecommerceImages.forEach((img, index) => {

  img.addEventListener("click", () => {

    const total = ecommerceImages.length;

    if (total <= 1) return;

    stopEcommerceAutoSlide();

    if (
      index ===
      (ecommerceCurrent + 1) % total
    ) {

      ecommerceCurrent =
        (ecommerceCurrent + 1) % total;

    }

    else if (
      index ===
      (ecommerceCurrent - 1 + total) % total
    ) {

      ecommerceCurrent =
        (ecommerceCurrent - 1 + total) % total;

    }

    updateEcommerceSlider();

    startEcommerceAutoSlide();

  });

});


/* INIT E-COMMERCE SLIDER */

updateEcommerceSlider();
startEcommerceAutoSlide();


/* =========================
   SUPERSTORE IMAGE SLIDER
========================= */

const superstoreImages =
  Array.from(
    document.querySelectorAll(
      "#superstoreImageStack .stack-img"
    )
  );

let superstoreCurrent = 0;
let superstoreAutoSlide = null;


/* UPDATE SUPERSTORE SLIDER */

function updateSuperstoreSlider() {

  const total = superstoreImages.length;

  if (!total) return;

  superstoreImages.forEach((img, index) => {

    img.classList.remove(
      "center",
      "left",
      "right"
    );

    if (index === superstoreCurrent) {

      img.classList.add("center");

    }

    else if (
      index ===
      (superstoreCurrent + 1) % total
    ) {

      img.classList.add("right");

    }

    else if (
      index ===
      (superstoreCurrent - 1 + total) % total
    ) {

      img.classList.add("left");

    }

  });

}


/* NEXT SUPERSTORE IMAGE */

function nextSuperstoreSlide() {

  if (superstoreImages.length <= 1) return;

  superstoreCurrent =
    (superstoreCurrent + 1) %
    superstoreImages.length;

  updateSuperstoreSlider();

}


/* START SUPERSTORE AUTO SLIDE */

function startSuperstoreAutoSlide() {

  if (superstoreImages.length <= 1) return;

  stopSuperstoreAutoSlide();

  superstoreAutoSlide =
    setInterval(
      nextSuperstoreSlide,
      4000
    );

}


/* STOP SUPERSTORE AUTO SLIDE */

function stopSuperstoreAutoSlide() {

  if (superstoreAutoSlide) {

    clearInterval(superstoreAutoSlide);

    superstoreAutoSlide = null;

  }

}


/* SUPERSTORE IMAGE CLICK */

superstoreImages.forEach((img, index) => {

  img.addEventListener("click", () => {

    const total = superstoreImages.length;

    if (total <= 1) return;

    stopSuperstoreAutoSlide();

    if (
      index ===
      (superstoreCurrent + 1) % total
    ) {

      superstoreCurrent =
        (superstoreCurrent + 1) % total;

    }

    else if (
      index ===
      (superstoreCurrent - 1 + total) % total
    ) {

      superstoreCurrent =
        (superstoreCurrent - 1 + total) % total;

    }

    updateSuperstoreSlider();

    startSuperstoreAutoSlide();

  });

});


/* INIT SUPERSTORE SLIDER */

updateSuperstoreSlider();
startSuperstoreAutoSlide();
