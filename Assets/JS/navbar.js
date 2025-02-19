
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
    
    const animatedText = document.getElementById("animatedText");
    const animatedIcon = document.getElementById("animatedIcon");

    function typeEffect() {
        const currentMessage = messages[messageIndex].text;
        
        if (!isErasing) {
            if (charIndex < currentMessage.length) {
                animatedText.innerHTML += currentMessage.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100); // Typing speed
            } else {
                setTimeout(() => {
                    isErasing = true;
                    typeEffect();
                }, 2000); // Pause before erasing
            }
        } else {
            if (charIndex > 0) {
                animatedText.innerHTML = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEffect, 50); // Erasing speed
            } else {
                isErasing = false;
                messageIndex = (messageIndex + 1) % messages.length; // Next message
                animatedIcon.className = `bi ${messages[messageIndex].icon}`; // Change icon
                setTimeout(typeEffect, 500);
            }
        }
    }

    typeEffect(); // Start the animation
});
