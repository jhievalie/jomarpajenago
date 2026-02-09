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
  {
    threshold: 0.2
  }
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
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -20% 0px"
  }
);

timelineItems.forEach(item => timelineObserver.observe(item));


/* =========================
   MOBILE FIX: FORCE CHECK AFTER ANCHOR JUMP
========================= */
function forceTimelineVisibility() {
  const viewportHeight = window.innerHeight;

  timelineItems.forEach(item => {
    if (item.classList.contains("is-visible")) return;

    const rect = item.getBoundingClientRect();

    if (rect.top < viewportHeight * 0.85) {
      item.classList.add("is-visible");
      timelineObserver.unobserve(item);
    }
  });
}


/* =========================
   RUN FIX AFTER NAVIGATION
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(forceTimelineVisibility, 350);
  });
});


/* =========================
   RUN ON LOAD (MOBILE SAFETY NET)
========================= */
window.addEventListener("load", () => {
  setTimeout(forceTimelineVisibility, 400);
});


/* =========================
   RUN ON RESIZE (URL BAR COLLAPSE)
========================= */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(forceTimelineVisibility, 250);
});
