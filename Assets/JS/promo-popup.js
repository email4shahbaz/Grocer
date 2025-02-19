// Show Popup After Loading
window.onload = function () {
    const popupContainer = document.getElementById('popupContainer');

    // Ensure the popupContainer exists
    if (popupContainer) {
        popupContainer.style.display = 'flex';
        startTimer(5 * 60 * 60); // Start a 5-hour timer in seconds
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
    } else {
        console.error("Popup container not found. Ensure an element with ID 'popupContainer' exists in the HTML.");
    }
}

// Start Timer
function startTimer(duration) {
    // Validate the duration
    if (isNaN(duration) || duration <= 0) {
        console.error("Invalid duration provided. Please pass a positive number.");
        return;
    }

    let timer = duration;
    const timerElement = document.getElementById('timer');

    // Ensure the timerElement exists
    if (!timerElement) {
        console.error("Timer element not found. Ensure an element with ID 'timer' exists in the HTML.");
        return;
    }

    // Function to update the timer display
    function updateTimerDisplay() {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        // Update the timer element
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Initialize the timer display
    updateTimerDisplay();

    // Start the interval
    const interval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(interval); // Stop the timer when it reaches 0
            timerElement.textContent = "00:00:00"; // Ensure it shows 00:00:00
            return;
        }

        timer--; // Decrease the timer
        updateTimerDisplay(); // Update the display
    }, 1000);
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
document.querySelector('.subscribe-btn').addEventListener('click', handleSubscribe);
