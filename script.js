// /* =========================
//    ROUTE CONFIG
// ========================= */

// const routes = {
//   "/home": "#home",
//   "/about": "#about",
//   "/services": "#services",
//   "/projects": "#projects",
//   "/experience": "#experience",
//   "/contact": "#contact"
// };

// const sectionRoutes = {
//   home: "/home",
//   about: "/about",
//   services: "/services",
//   projects: "/projects",
//   experience: "/experience",
//   contact: "/contact"
// };


// /* =========================
//    HANDLE REDIRECT FROM 404
// ========================= */

// const urlParams = new URLSearchParams(window.location.search);
// const redirectedPath = urlParams.get("path");

// if (redirectedPath) {
//   history.replaceState(null, "", redirectedPath);
// }


// /* =========================
//    FORCE /home AS DEFAULT
// ========================= */

// if (window.location.pathname === "/") {
//   history.replaceState({}, "", "/home");
// }


// /* =========================
//    NAVIGATION CLICK ROUTING
// ========================= */

// document.querySelectorAll('a[href^="/"]').forEach(link => {

//   link.addEventListener("click", e => {

//     e.preventDefault();

//     const path = link.getAttribute("href");
//     const section = document.querySelector(routes[path]);

//     if (!section) return;

//     history.pushState({}, "", path);

//     section.scrollIntoView({
//       behavior: "smooth"
//     });

//   });

// });


// /* =========================
//    OPEN CORRECT SECTION ON LOAD
// ========================= */

// window.addEventListener("load", () => {

//   const currentPath = window.location.pathname;
//   const section = document.querySelector(routes[currentPath]);

//   if (section) {
//     section.scrollIntoView({
//       behavior: "smooth"
//     });
//   }

// });


// /* =========================
//    UPDATE URL ON SCROLL
// ========================= */

// const routeObserver = new IntersectionObserver(
//   entries => {

//     entries.forEach(entry => {

//       if (!entry.isIntersecting) return;

//       const id = entry.target.id;
//       const newPath = sectionRoutes[id];

//       if (!newPath) return;

//       if (window.location.pathname !== newPath) {
//         history.replaceState({}, "", newPath);
//       }

//     });

//   },
//   {
//     rootMargin: "-40% 0px -55% 0px",
//     threshold: 0
//   }
// );


// /* observe only routed sections */

// Object.keys(sectionRoutes).forEach(id => {

//   const section = document.getElementById(id);

//   if (section) {
//     routeObserver.observe(section);
//   }

// });


/* =========================
   HASH ROUTING
   GITHUB PAGES SAFE
========================= */

const routes = {
  "#home": "#home",
  "#about": "#about",
  "#services": "#services",
  "#projects": "#projects",
  "#experience": "#experience",
  "#contact": "#contact"
};


/* =========================
   DEFAULT ROUTE
========================= */

if (!window.location.hash) {
  history.replaceState({}, "", "#home");
}


/* =========================
   NAVIGATION CLICK ROUTING
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    e.preventDefault();

    const hash = link.getAttribute("href");
    const section = document.querySelector(routes[hash]);

    if (!section) return;

    history.pushState({}, "", hash);

    section.scrollIntoView({
      behavior: "smooth"
    });

  });

});


/* =========================
   OPEN CORRECT SECTION ON LOAD
========================= */

window.addEventListener("load", () => {

  const hash = window.location.hash || "#home";
  const section = document.querySelector(routes[hash]);

  if (section) {

    setTimeout(() => {

      section.scrollIntoView({
        behavior: "smooth"
      });

    }, 100);

  }

});


/* =========================
   HANDLE BACK / FORWARD
========================= */

window.addEventListener("popstate", () => {

  const hash = window.location.hash || "#home";
  const section = document.querySelector(routes[hash]);

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

});


/* =========================
   UPDATE HASH ON SCROLL
========================= */

const routeObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      const newHash = `#${id}`;

      if (window.location.hash !== newHash) {
        history.replaceState({}, "", newHash);
      }

    });

  },
  {
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0
  }
);


/* observe only routed sections */

Object.keys(routes).forEach(hash => {

  const id = hash.substring(1);
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

// const images = Array.from(document.querySelectorAll(".stack-img"));
// let current = 0;
// let autoSlide;

// /* UPDATE SLIDER STATE */
// function updateSlider() {
//   const total = images.length;

//   images.forEach((img, index) => {
//     img.classList.remove("center", "left", "right");

//     if (index === current) {
//       img.classList.add("center");
//     }
//     else if (index === (current + 1) % total) {
//       img.classList.add("right");
//     }
//     else if (index === (current - 1 + total) % total) {
//       img.classList.add("left");
//     }
//   });
// }

// /* NEXT SLIDE */
// function nextSlide() {
//   current = (current + 1) % images.length;
//   updateSlider();
// }

// /* AUTO SLIDE CONTROL */
// function startAutoSlide() {
//   autoSlide = setInterval(nextSlide, 4000);
// }

// function stopAutoSlide() {
//   clearInterval(autoSlide);
// }

// /* CLICK HANDLER (single, clean) */
// images.forEach((img, index) => {
//   img.addEventListener("click", () => {

//     const total = images.length;

//     // pause auto
//     stopAutoSlide();

//     if (index === (current + 1) % total) {
//       current = (current + 1) % total;
//     }
//     else if (index === (current - 1 + total) % total) {
//       current = (current - 1 + total) % total;
//     }

//     updateSlider();

//     // resume auto
//     startAutoSlide();
//   });
// });

// /* INIT */
// updateSlider();
// startAutoSlide();

/* =========================
   MULTI IMAGE SLIDER
========================= */


/* =========================
   E-COMMERCE SLIDER
========================= */

const images = Array.from(
  document.querySelectorAll("#imageStack .stack-img")
);

let current = 0;
let autoSlide;


/* UPDATE E-COMMERCE SLIDER */

function updateSlider() {

  const total = images.length;

  images.forEach((img, index) => {

    img.classList.remove(
      "center",
      "left",
      "right"
    );

    if (index === current) {

      img.classList.add("center");

    }

    else if (
      index === (current + 1) % total
    ) {

      img.classList.add("right");

    }

    else if (
      index === (current - 1 + total) % total
    ) {

      img.classList.add("left");

    }

  });

}


/* NEXT E-COMMERCE SLIDE */

function nextSlide() {

  current =
    (current + 1) % images.length;

  updateSlider();

}


/* AUTO SLIDE */

function startAutoSlide() {

  autoSlide =
    setInterval(
      nextSlide,
      4000
    );

}


function stopAutoSlide() {

  clearInterval(autoSlide);

}


/* E-COMMERCE CLICK */

images.forEach((img, index) => {

  img.addEventListener("click", () => {

    const total = images.length;

    stopAutoSlide();


    if (
      index ===
      (current + 1) % total
    ) {

      current =
        (current + 1) % total;

    }

    else if (
      index ===
      (current - 1 + total) % total
    ) {

      current =
        (current - 1 + total) % total;

    }


    updateSlider();

    startAutoSlide();

  });

});


/* INIT E-COMMERCE */

if (images.length > 0) {

  updateSlider();

  startAutoSlide();

}



/* =========================
   SUPERSTORE MODAL
========================= */

const superstoreModal =
  document.getElementById("superstoreModal");

const closeSuperstoreModal =
  document.getElementById("closeSuperstoreModal");

const superstoreModalOverlay =
  document.getElementById("superstoreModalOverlay");


/* OPEN SUPERSTORE */

function openSuperstoreModal() {

  superstoreModal.classList.add("active");

  startSuperstoreAutoSlide();

}


/* CLOSE SUPERSTORE */

function closeSuperstore() {

  superstoreModal.classList.remove("active");

  stopSuperstoreAutoSlide();

}


closeSuperstoreModal.addEventListener(
  "click",
  closeSuperstore
);


superstoreModalOverlay.addEventListener(
  "click",
  closeSuperstore
);



/* =========================
   SUPERSTORE SLIDER
   SAME SLIDER SYSTEM
========================= */

const superstoreImages = Array.from(
  document.querySelectorAll(
    "#superstoreImageStack .stack-img"
  )
);

let superstoreCurrent = 0;
let superstoreAutoSlide;


/* UPDATE SUPERSTORE */

function updateSuperstoreSlider() {

  const total =
    superstoreImages.length;

  superstoreImages.forEach(
    (img, index) => {

      img.classList.remove(
        "center",
        "left",
        "right"
      );


      if (
        index === superstoreCurrent
      ) {

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

    }
  );

}


/* NEXT SUPERSTORE */

function nextSuperstoreSlide() {

  superstoreCurrent =
    (superstoreCurrent + 1) %
    superstoreImages.length;

  updateSuperstoreSlider();

}


/* START SUPERSTORE */

function startSuperstoreAutoSlide() {

  stopSuperstoreAutoSlide();

  superstoreAutoSlide =
    setInterval(
      nextSuperstoreSlide,
      4000
    );

}


/* STOP SUPERSTORE */

function stopSuperstoreAutoSlide() {

  clearInterval(
    superstoreAutoSlide
  );

}


/* SUPERSTORE CLICK */

superstoreImages.forEach(
  (img, index) => {

    img.addEventListener(
      "click",
      () => {

        const total =
          superstoreImages.length;

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

      }
    );

  }
);


/* INIT SUPERSTORE */

if (superstoreImages.length > 0) {

  updateSuperstoreSlider();
 
}


/* =========================
   HR ANALYTICS MODAL
========================= */

const hrModal =
  document.getElementById("hrModal");

const closeHRModal =
  document.getElementById("closeHRModal");

const hrModalOverlay =
  document.getElementById("hrModalOverlay");


/* OPEN HR MODAL */

function openHRModal() {

  hrModal.classList.add("active");

  startHRAutoSlide();

}


/* CLOSE HR MODAL */

function closeHR() {

  hrModal.classList.remove("active");

  stopHRAutoSlide();

}


closeHRModal.addEventListener(
  "click",
  closeHR
);


hrModalOverlay.addEventListener(
  "click",
  closeHR
);


/* =========================
   HR ANALYTICS SLIDER
========================= */

const hrImages = Array.from(
  document.querySelectorAll(
    "#hrImageStack .stack-img"
  )
);

let hrCurrent = 0;

let hrAutoSlide;


/* UPDATE HR SLIDER */

function updateHRSlider() {

  const total =
    hrImages.length;

  hrImages.forEach(
    (img, index) => {

      img.classList.remove(
        "center",
        "left",
        "right"
      );


      if (
        index === hrCurrent
      ) {

        img.classList.add("center");

      }

      else if (
        index ===
        (hrCurrent + 1) % total
      ) {

        img.classList.add("right");

      }

      else if (
        index ===
        (hrCurrent - 1 + total) % total
      ) {

        img.classList.add("left");

      }

    }
  );

}


/* NEXT HR SLIDE */

function nextHRSlide() {

  hrCurrent =
    (hrCurrent + 1) %
    hrImages.length;

  updateHRSlider();

}


/* START HR AUTO SLIDE */

function startHRAutoSlide() {

  stopHRAutoSlide();

  hrAutoSlide =
    setInterval(
      nextHRSlide,
      4000
    );

}


/* STOP HR AUTO SLIDE */

function stopHRAutoSlide() {

  clearInterval(
    hrAutoSlide
  );

}


/* HR CLICK */

hrImages.forEach(
  (img, index) => {

    img.addEventListener(
      "click",
      () => {

        const total =
          hrImages.length;

        stopHRAutoSlide();


        if (
          index ===
          (hrCurrent + 1) % total
        ) {

          hrCurrent =
            (hrCurrent + 1) % total;

        }

        else if (
          index ===
          (hrCurrent - 1 + total) % total
        ) {

          hrCurrent =
            (hrCurrent - 1 + total) % total;

        }


        updateHRSlider();

        startHRAutoSlide();

      }
    );

  }
);


/* INIT HR */

if (hrImages.length > 0) {

  updateHRSlider();

}
