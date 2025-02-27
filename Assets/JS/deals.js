document.addEventListener("DOMContentLoaded", async () => {
    const dealsContainer = document.getElementById("deals-container");

    // Fetch the JSON data for the deals
    const response = await fetch("/Assets/json_files/deals_of_the_day.json");
    const deals = await response.json();
    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Function to update and display the countdown timer
    function updateTimer() {
        const now = new Date().getTime();
        const distance = new Date().getTime() + 24 * 60 * 60 * 1000 - now; // 24 hours timer

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the timer values (days, hours, minutes, seconds) in their respective elements
        document.getElementById("days").textContent = days < 10 ? `0${days}` : days;
        document.getElementById("hours").textContent = hours < 10 ? `0${hours}` : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;

        // If the timer reaches zero, display "Expired"
        if (distance <= 0) {
            clearInterval(timerInterval);  // Stop the timer interval
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
        }
    }

    // Set an interval to update the timer every second
    const timerInterval = setInterval(updateTimer, 1000); // Update the timer every second

    // Initial call to display the timer immediately
    updateTimer();

    // Loop through the deals and render each one
    deals.forEach(deal => {
        const dealCard = document.createElement("div");
        dealCard.classList.add("deal-card");

        // Create the star rating using Font Awesome icons
        const stars = new Array(5).fill('<i class="fa fa-star"></i>').slice(0, deal.rating).join(''); // Generate stars based on rating
        const emptyStars = new Array(5 - deal.rating).fill('<i class="fa fa-star-o"></i>').join(''); // Empty stars

        dealCard.innerHTML = `
            <img src="${deal.product_image}" alt="${deal.product_name}">
            <div class="product-overlay-icons">
                <button class="wishlist-icon ${wishlist.some(item => item.id === deal.id) ? 'in-wishlist' : ''}" data-id="${deal.id}" data-name="${deal.product_name}" data-price="${deal.discounted_price}" data-image="${deal.product_image}" data-category="${deal.categoryName}.json">
                    <i class="bi bi-heart"></i>
                </button>
                <button class="eye-icon" data-id="${deal.id}" data-category="${deal.categoryName}.json">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
            <div class="details">
                <h3>${deal.product_name}</h3>
                <div class="star-rating">${stars}${emptyStars}</div>
                <p class="vendor"> ${deal.vendor}</p>
             <div class="d-flex ">
              <p class="price ">$${deal.discounted_price}</p>
                <p class="original-price ">$${deal.original_price}</p> </div>
               
            </div>
            <div class="discount-badge">Save ${deal.discount_percentage}%</div>
            <button class="btn addbutton py-2" 
                    data-id="${deal.id}" 
                    data-name="${deal.product_name}" 
                    data-price="${deal.discounted_price}" 
                    data-image="${deal.product_image}" 
                    data-quantity="1">
                    <i class="bi bi-cart"></i>&nbsp;Add
            </button>
        `;

        dealsContainer.appendChild(dealCard);
    });
});
