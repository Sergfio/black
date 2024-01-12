// Import ScrollMagic
const ScrollMagic = require('scrollmagic');
const indicators = require('scrollmagi')
// import ScrollMagic from "scrollmagic";
// import "scrollmagic/scrollmagic/uncompressed/ScrollMagic.min.js";
// import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.min.js";


// Initialize ScrollMagic
const controller = new ScrollMagic.Controller();

// Create a scene for each section
const homeScene = new ScrollMagic.Scene({
    triggerElement: "#home",
    triggerHook: 0.8,
    duration: "100%"
})
    .setClassToggle("#home", "active")
    .addTo(controller);

const aboutScene = new ScrollMagic.Scene({
    triggerElement: "#about",
    triggerHook: 0.8,
    duration: "100%"
})
    .setClassToggle("#about", "active")
    .addTo(controller);

const projectsScene = new ScrollMagic.Scene({
    triggerElement: "#projects",
    triggerHook: 0.8,
    duration: "100%"
})
    .setClassToggle("#education", "active")
    .addTo(controller);



    const educationScene = new ScrollMagic.Scene({
        triggerElement: ".education",
        triggerHook: 0.8,
        duration: "100%"
    })
    .setClassToggle('#education', "active")
    .addTo(controller);

const contactScene = new ScrollMagic.Scene({
    triggerElement: "#contact",
    triggerHook: 0.8,
    duration: "100%"
})
    .setClassToggle("#contact", "active")
    .addTo(controller);

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
    // Update the navigation links
    const scrollPosition = window.scrollY;
    const homeTop = document.getElementById("#homeTop").offsetTop;
    const aboutTop = document.getElementById("#aboutTop").offsetTop;
    const projectsTop = document.getElementById("#projectsTop").offsetTop;
    const contactTop = document.getElementById("#contactTop").offsetTop;
    const LoginTop = document.getElementById("#login-btn").offsetTop;
    const RegisterTop = document.getElementById("#register-btn").offsetTop;

    if (scrollPosition < homeTop)
    {
        document.querySelector(".nav-links a[href='#home']").classList.add("active");
        document.querySelector(".nav-links a[href='#about']").classList.remove("active");
        document.querySelector(".nav-links a[href='#projects']").classList.remove("active");
        document.querySelector(".nav-links a[href='#contact']").classList.remove("active");
    } else if (scrollPosition < aboutTop)
    {
        document.querySelector(".nav-links a[href='#home']").classList.remove("active");
        document.querySelector(".nav-links a[href='#about']").classList.add("active");
        document.querySelector(".nav-links a[href='#projects']").classList.remove("active");
        document.querySelector(".nav-links a[href='#contact']").classList.remove("active");
    } else if (scrollPosition < projectsTop)
    {
        document.querySelector(".nav-links a[href='#home']").classList.remove("active");
        document.querySelector(".nav-links a[href='#about']").classList.remove("active");
        document.querySelector(".nav-links a[href='#projects']").classList.add("active");
        document.querySelector(".nav-links a[href='#contact']").classList.remove("active");
    } else if (scrollPosition < contactTop)
    {
        document.querySelector(".nav-links a[href='#home']").classList.remove("active");
        document.querySelector(".nav-links a[href='#about']").classList.remove("active");
        document.querySelector(".nav-links a[href='#projects']").classList.remove("active");
        document.querySelector(".nav-links a[href='#contact']").classList.add("active");
    } else
    {
        document.querySelector(".nav-links a[href='#home']").classList.remove("active");
        document.querySelector(".nav-links a[href='#about']").classList.remove("active");
        document.querySelector(".nav-links a[href='#projects']").classList.remove("active");
        document.querySelector(".nav-links a[href='#contact']").classList.add("active");
    }
});