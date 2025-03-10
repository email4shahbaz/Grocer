// Show Popup After Loading
const popupTimerInterval=null;


window.onload = function () {
    const popupContainer = document.getElementById('popupContainer');

    // Ensure the popupContainer exists
    if (popupContainer) {
        popupContainer.style.display = 'flex';
        const timerElement = document.getElementById('promotimer');
        startTimer(timerElement, new Date().getTime() + 24 * 60 * 60 * 1000);
    } else {
        console.error("Popup container not found. Ensure an element with ID 'popupContainer' exists in the HTML.");
    }
};

// Close Popup
function closePopup() {
    const popupContainer = document.getElementById('popupContainer');

    // Ensure the popupContainer exists
    if (popupContainer) {
        popupContainer.style.display = 'none';
        if(popupTimerInterval!=null){
            clearInterval(popupTimerInterval);
        }
    } else {
        console.error("Popup container not found. Ensure an element with ID 'popupContainer' exists in the HTML.");
    }
}



// Handle Subscription
function handleSubscribe() {
    const emailInput = document.querySelector('.email-input');
    const subscriptionMessage = document.getElementById('subscriptionMessage');

    // Ensure the email input and message elements exist
    if (!emailInput || !subscriptionMessage) {
        console.error("Required elements not found. Ensure the email input and subscription message elements exist in the HTML.");
        return;
    }

    // Check if the email input has a value
    if (emailInput.value.trim() === "") {
        subscriptionMessage.textContent = "Please enter a valid email address.";
        subscriptionMessage.style.color = "red";
        subscriptionMessage.style.display = "block";
    } else {
        subscriptionMessage.textContent = "Thank you for subscribing! Enjoy your 20% OFF.";
        subscriptionMessage.style.color = "green";
        subscriptionMessage.style.display = "block";

        // Optionally clear the email input after subscription
        emailInput.value = "";

        // Hide the message after 3 seconds
        setTimeout(() => {
            subscriptionMessage.style.display = "none";
        }, 3000);
    }
}

// Attach the subscription handler to the Subscribe button
//document.querySelector('.subscribe-btn').addEventListener('click', handleSubscribe);







function startTimer(element, endTime) {
    const popupTimerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(popupTimerInterval);
            element.innerHTML = "Expired";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Ensure each of these elements exists in the HTML
        const daysElem = element.querySelector('#days');
        const hoursElem = element.querySelector('#hours');
        const minutesElem = element.querySelector('#minutes');
        const secondsElem = element.querySelector('#seconds');
        const daysPluralElem = element.querySelector('#days_plural');

        // Update the timer elements individually
        if (daysElem) daysElem.textContent = days;
        if (hoursElem) hoursElem.textContent = hours;
        if (minutesElem) minutesElem.textContent = minutes;
        if (secondsElem) secondsElem.textContent = seconds;

        // Handle plural form for days
        if (daysPluralElem) {
            daysPluralElem.textContent = days !== 1 ? "s" : "";
        }
    }, 1000);
}
