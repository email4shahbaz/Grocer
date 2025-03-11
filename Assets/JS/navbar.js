
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        hamburger.classList.toggle("open");
    });
});






// TOP BAR NAVBAR


document.addEventListener("DOMContentLoaded", function () {
    const messages = [
        { text: "Free Shipping on Orders Over $50", icon: "bi-truck" },
        { text: "24/7 Customer Support Available", icon: "bi-headset" },
        { text: "Easy Returns & Refunds Guaranteed", icon: "bi-arrow-repeat" },
        { text: "Secure Payments with Multiple Options", icon: "bi-credit-card" }
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    
    const animatedCont = document.getElementsByClassName("animated-icon-text")[0];
    const animatedText = document.getElementById("animatedText");
    const animatedIcon = document.getElementById("animatedIcon");

    function typeEffect() {
       
        const currentMessage = messages[messageIndex].text;
        animatedText.innerHTML = currentMessage;
        //animatedCont.style.transformOrigin = 'bottom';
        animatedCont.style.opacity = 1;


        setTimeout(()=>{
           // animatedCont.style.transformOrigin = 'top';
           animatedCont.style.opacity = 0;
            messageIndex = (messageIndex + 1) % messages.length; // Next message
            animatedIcon.className = `bi ${messages[messageIndex].icon}`; // Change icon
            setTimeout(()=>{
                typeEffect()
            }, 750)
        },3000); // Typing speed
       
        // if (!isErasing) {
        //     if (charIndex < currentMessage.length) {
        //         animatedText.innerHTML += currentMessage.charAt(charIndex);
        //         charIndex++;
        //         setTimeout(typeEffect, 100); // Typing speed
        //     } else {
        //         setTimeout(() => {
        //             isErasing = true;
        //             typeEffect();
        //         }, 2000); // Pause before erasing
        //     }
        // } else {
        //     if (charIndex > 0) {
        //         animatedText.innerHTML = currentMessage.substring(0, charIndex - 1);
        //         charIndex--;
        //         setTimeout(typeEffect, 50); // Erasing speed
        //     } else {
        //         isErasing = false;
        //         messageIndex = (messageIndex + 1) % messages.length; // Next message
        //         animatedIcon.className = `bi ${messages[messageIndex].icon}`; // Change icon
        //         setTimeout(typeEffect, 500);
        //     }
        // }
    }

    typeEffect(); // Start the animation
});


const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarNav = document.getElementById("sidebarNav");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const closeSidebar = document.getElementById("closeSidebar");

// Open sidebar
sidebarToggle.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarNav.classList.add("open");
    sidebarOverlay.classList.add("active");
});

// Close sidebar
closeSidebar.addEventListener("click", function () {
    sidebarNav.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    closeSidebar.classList.add("rotate");
    setTimeout(() => {
        closeSidebar.classList.remove("rotate");
    }, 500); // Sync with animation duration
});

// Close sidebar when clicking on overlay
sidebarOverlay.addEventListener("click", function () {
    sidebarNav.classList.remove("open");
    sidebarOverlay.classList.remove("active");
});