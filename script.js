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
   SECTION REVEAL OBSERVER
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
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  }
);

animatedSections.forEach(section =>
  sectionObserver.observe(section)
);


/* =========================
   TIMELINE OBSERVER
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
  {
    threshold: 0.1,
    rootMargin: "0px 0px -20% 0px"
  }
);

timelineItems.forEach(item =>
  timelineObserver.observe(item)
);


/* =========================
   FORCE RECHECK (KEY FIX)
========================= */
function forceObserverRefresh() {
  // SECTION RECHECK
  animatedSections.forEach(section => {
    sectionObserver.unobserve(section);
    sectionObserver.observe(section);
  });

  // TIMELINE RECHECK
  timelineItems.forEach(item => {
    if (!item.classList.contains("is-visible")) {
      timelineObserver.unobserve(item);
      timelineObserver.observe(item);
    }
  });
}


/* =========================
   FIX ANCHOR NAV ON MOBILE
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    // Let browser finish anchor jump
    requestAnimationFrame(() => {
      setTimeout(forceObserverRefresh, 300);
    });
  });
});


/* =========================
   RESIZE SAFETY (ROTATION)
========================= */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(forceObserverRefresh, 300);
});
