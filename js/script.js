// Span small-text
const titles = ["Data Analyst", "Data Entry Specialist", "Reporting Specialist", "Research Analyst", "Data Annotation"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenTitles = 1000;

function typeSubtitle() {
    const subtitleElement = document.getElementById("subtitle");
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        subtitleElement.innerHTML = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeSubtitle, pauseBetweenTitles); // Pause before deleting
            return;
        }
    } else {
        subtitleElement.innerHTML = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Move to the next title
        }
    }

    setTimeout(typeSubtitle, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeSubtitle(); // Start the typing effect when the page loads
});



// Mobile navigation functionality
function mobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle nav on burger click
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Hide burger when a nav link is clicked
    navLinks.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

// Smooth scrolling functionality with margin adjustment
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));

            if (targetSection) {
                // Apply temporary margin-top to create space for lift-up effect
                targetSection.style.transition = 'margin-top 0.5s ease-out, opacity 0.5s ease-out';
                targetSection.style.marginTop = '2rem';
                targetSection.style.opacity = '0';

                setTimeout(() => {
                    // Remove opacity to make it visible with the transition
                    targetSection.style.opacity = '1';
                    // Scroll into view smoothly
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 300); // Delay ensures margin applies before scrolling
            }
        });
    });
}

// Initialize the page content and functions
document.addEventListener('DOMContentLoaded', () => {
    mobileNav();
    smoothScroll();
});




// Select the nav links
// const navLinks = document.querySelectorAll('nav a'); 

// Smooth scroll to .about_me section
// navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();

        // Scroll to the .about_me section
//         document.querySelector(link.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// });


// Select the nav links, sections, and footer
const navLinks = document.querySelectorAll('.nav-links li a'); 
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Scroll to the corresponding section
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Function to check which section is in the viewport
function setActiveLink() {
    let currentSection = '';
    let footerTop = footer ? footer.offsetTop : null;
    let footerHeight = footer ? footer.offsetHeight : 0;

    // Loop through each section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset to your liking
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if the section is fully in the viewport or more than halfway visible
        if (window.scrollY >= sectionTop && window.scrollY <= sectionBottom) {
            currentSection = section.getAttribute('id');
        } else if (window.scrollY + window.innerHeight / 3.5 > sectionTop && window.scrollY + window.innerHeight / 2 < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    // Check if footer is in the viewport (for Contact link)
    if (footerTop && window.scrollY + window.innerHeight >= footerTop) {
        currentSection = 'contact'; // Set active section to 'contact' when footer is visible
    }

    // Loop through the nav links and update the active class
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active'); // Active class for the link
            link.style.color = 'var(--primary-color)'; // Set active color
        } else {
            link.classList.remove('active'); // Remove active class
            link.style.color = 'var(--text-color)'; // Set inactive color (use your text color)
        }
    });
}



// Select all section elements
// const sections = document.querySelectorAll('section');

// Get the Home section and exempt it from the transition
const homeSection = document.querySelector('#home'); // Assuming Home section has an ID of 'home'

// --- Fade in while scrolling ---
sections.forEach(sec => {
    if (sec !== homeSection) {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(50px)";
        sec.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"; // smoother
        sec.style.willChange = "opacity, transform"; // hint for performance
    }
});

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        if (sec === homeSection) return; // skip home

        const rect = sec.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is visible (clamped between 0 and 1)
        const visibleRatio = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.75), 0), 1);

        // Apply opacity and upward movement based on scroll
        sec.style.opacity = visibleRatio;
        sec.style.transform = `translateY(${50 * (1 - visibleRatio)}px)`;
    });
});
// --- end fade in while scrolling ---

// Listen to the scroll event to update the active link
window.addEventListener('scroll', setActiveLink);

// Initial call to set the active link based on the initial scroll position
setActiveLink();




function opentab(event, tabname) {
    // Select all tab links and contents
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    // Hide all tab contents and remove the active-tab class
    tabContents.forEach(content => content.classList.remove('active-tab'));

    // Remove active-link class from all tab links
    tabLinks.forEach(link => link.classList.remove('active-link'));

    // Add active-link class to the clicked tab link
    event.currentTarget.classList.add('active-link');

    // Show the selected tab content
    const activeTab = document.getElementById(tabname);
    if (activeTab) {
        activeTab.classList.add('active-tab');
    }
}


function toggleAboutMe() {
    const toggleButton = document.getElementById("toggle-aboutme");
    const tabContainer = document.querySelector(".tab-container");
    const aboutSection = document.getElementById("about");

    // Check the current text of the button and toggle it
    if (toggleButton.innerText === "See more") {
        toggleButton.innerText = "See less";

        // Make the tab container visible
        tabContainer.classList.remove("about-hidden");
    } else {
        toggleButton.innerText = "See more";

        // Hide the tab container
        tabContainer.classList.add("about-hidden");

        // Scroll to the top of the About section
        aboutSection.scrollIntoView({ behavior: "smooth" });
    }
}




function toggleServices() {
    const toggleButton = document.getElementById("toggle-services");
    const serviceItems = document.querySelectorAll(".service-item");
    const servicesSection = document.getElementById("services");

    // Check the current text of the button and toggle it
    if (toggleButton.innerText === "See more") {
        toggleButton.innerText = "See less";
        
        // Make all service items visible, except the first one
        serviceItems.forEach((item, index) => {
            if (index > 0) {
                item.classList.remove("service-hidden");
            }
        });
    } else {
        toggleButton.innerText = "See more";
        
        // Hide all service items, except the first one
        serviceItems.forEach((item, index) => {
            if (index > 0) {
                item.classList.add("service-hidden");
            }
        });

        // Scroll to the top of the Services section
        servicesSection.scrollIntoView({ behavior: "smooth" });
    }
}


function toggleProjects() {
    const toggleButton = document.getElementById("toggle-projects"); // Toggle button for projects
    const projectItems = document.querySelectorAll(".project-item"); // All project items
    const projectsSection = document.getElementById("projects"); // Projects section

    // Check the current text of the button and toggle it
    if (toggleButton.innerText === "See more") {
        toggleButton.innerText = "See less";
        
        // Make all project items visible, except the first one
        projectItems.forEach((item, index) => {
            if (index > 0) {
                item.classList.remove("projects-hidden");
            }
        });
    } else {
        toggleButton.innerText = "See more";
        
        // Hide all project items, except the first one
        projectItems.forEach((item, index) => {
            if (index > 0) {
                item.classList.add("projects-hidden");
            }
        });

        // Scroll to the top of the Projects section
        projectsSection.scrollIntoView({ behavior: "smooth" });
    }
}









// New message sent to GSheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbxM1cR7HGRGZVMIfpu1u8ctbB6oMxWXj6TzoCRJMkcI_eX0lfUd_kHSeJ3kzQ5dJ2fZ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 1000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error sending message. Please try again.";
            console.error('Error!', error.message);
        });
});

