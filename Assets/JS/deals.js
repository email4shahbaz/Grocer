document.addEventListener("DOMContentLoaded", async () => {
    const dealsContainer = document.getElementById("deals-container");
    if(dealsContainer === null) return;

    // Fetch the JSON data for the deals
    const response = await fetch("/Assets/json_files/deals_of_the_day.json");
    const deals = await response.json();
    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    

    // Loop through the deals and render each one
    deals.forEach(deal => {
        const dealCard = document.createElement("div");
        dealCard.classList.add("deal-card");

        // Create the star rating using Font Awesome icons
        const stars = new Array(5).fill('<i class="fa fa-star"></i>').slice(0, deal.rating).join(''); // Generate stars based on rating
        const emptyStars = new Array(5 - deal.rating).fill('<i class="fa fa-star-o"></i>').join(''); // Empty stars

        dealCard.innerHTML = `
             <a href="product-details.html?product-id=${deal.id}&category-file=${deal.categoryName}.json">
                <div class="product-image">
                    <img src="${deal.product_image}" alt="${deal.product_name}">
                    <div class="timer-holder">
                        <div class="timer-container deal-timer">
                            <div class="time-box_deal">
                                <span id="days">0</span> <span class="timer-day">Days</span>
                            </div>
                        
                            <div class="time-box_deal">
                                <span id="hours">23</span> <span class="timer-day">Hours</span>
                            </div>
                        
                            <div class="time-box_deal">
                                <span id="minutes">59</span> <span class="timer-day">Mins</span>
                            </div>
                        
                            <div class="time-box_deal">
                                <span id="seconds">46</span> 
                                <span class="timer-day">Secs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            
          
            <div class="details">
                <h3>${deal.product_name}</h3>
                <div class="star-rating">${stars}${emptyStars}</div>
                <p class="vendor"> ${deal.vendor}</p>
                <div class="PriceDivFeaturedProduct">
                <div class="d-flex ">
                    <p class="price ">$${deal.discounted_price}</p>
                    <p class="original-price ">$${deal.original_price}</p> </div>
                    <button class="btn addbutton py-2" 
                    data-id="${deal.id}" 
                    data-name="${deal.product_name}" 
                    data-price="${deal.discounted_price}" 
                    data-image="${deal.product_image}" 
                    data-quantity="1">
                    <i class="bi bi-cart"></i>&nbsp;Add
                     </button></div>
                </div>
            <div class="discount-badge">Save ${deal.discount_percentage}%</div>
        `;

        dealsContainer.appendChild(dealCard);
    });


    const dealTimers = document.querySelectorAll('.deal-timer');
    dealTimers.forEach(timer => {
        const endTime = new Date().getTime() + 1000 * 60 * 60 * 24 * Math.random();
        startTimer(timer, endTime);
    });
});
