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
   SECTION ANIMATION
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
   TIMELINE ANIMATION
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
    threshold: 0.15
  }
);

timelineItems.forEach(item => timelineObserver.observe(item));


/* =========================
   MOBILE ANCHOR FIX
   (THIS IS THE KEY PART)
========================= */
function forceRevealInView(containerSelector, itemSelector, activeClass) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;

  if (isInView) {
    container.classList.add("visible");

    document.querySelectorAll(itemSelector).forEach(item => {
      item.classList.add(activeClass);
    });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      // Force Experience reveal on mobile
      forceRevealInView(
        "#experience",
        "#experience .timeline-item",
        "is-visible"
      );
    }, 350);
  });
});


/* =========================
   SAFETY: RECHECK ON RESIZE
========================= */
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    forceRevealInView(
      "#experience",
      "#experience .timeline-item",
      "is-visible"
    );
  }, 300);
});


// Clean hash from URL after navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    if (targetId.length > 1) {
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();

        // Smooth scroll
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Remove hash from URL (important part)
        history.replaceState(null, "", window.location.pathname);
      }
    }
  });
});
