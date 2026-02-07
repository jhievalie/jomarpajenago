const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeNav = document.getElementById("closeNav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.add("active");
});

closeNav.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});

document.querySelectorAll(".mobile-links a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});


// For Home, About, Services, Experience section entrance
const animatedSections = document.querySelectorAll('.section-animate');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.25 }
);

animatedSections.forEach(section => sectionObserver.observe(section));



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
  { threshold: 0.15 }
);

timelineItems.forEach(item => timelineObserver.observe(item));



function refreshObservers() {
  animatedSections.forEach(section => {
    sectionObserver.unobserve(section);
    sectionObserver.observe(section);
  });

  timelineItems.forEach(item => {
    if (!item.classList.contains("is-visible")) {
      timelineObserver.unobserve(item);
      timelineObserver.observe(item);
    }
  });
}


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    // Delay allows mobile browser to finish scrolling
    setTimeout(refreshObservers, 400);
  });
});


let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refreshObservers, 300);
});
