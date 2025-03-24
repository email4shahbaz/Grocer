
let dealsOfTheDay;
document.addEventListener("DOMContentLoaded", async () => {
    async function loadDeals() {
        try {
            const response = await fetch("Assets/json_files/deals_of_the_day.json") // Fetch the JSON data for the deals
            if (!response.ok) throw new Error("Failed to load categories.");
            const dealsData = await response.json();
            dealsOfTheDay = dealsData;
            return dealsData;

        } catch (error) {
            console.error("Error loading categories:", error);
            return [];
        }
    }

    async function rednerDealsCards() {

        const deals = await loadDeals();

        const dealsContainer = document.querySelector(".deals-container");

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
                    <p class="vendor"> By <span>${deal.vendor}</span> </p>
                    <div class="PriceDivFeaturedProduct">
                    <div class="d-flex ">
                        <p class="price ">$${deal.discounted_price}</p>
                        <p class="original-price ">$${deal.original_price}</p> </div>
                        <button class="btn py-2" onclick="addDealToCart(event)" 
                            data-id="${deal.id}"
                            data-name="${deal.product_name}"
                            data-price="${deal.discounted_price}"
                            data-image="${deal.product_image}"
                            data-quantity="1">
                                <img src="/Assets/Images/Icons/add-to-cart.png" />
                            </button>
                        </div>
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
    }

    rednerDealsCards();

});

function addDealToCart(evt){
    if(dealsOfTheDay!=null){
        let deal=dealsOfTheDay.find(deal=>deal.id==evt.currentTarget.dataset.id);
        if(deal!=null && deal.products!=null){
            //let cart=JSON.parse(localStorage.getItem("cart")) || [];
            deal.products.forEach(product=>{
                let item=cart.find(item=>item.id==product.id);
                if(item!=null){
                    item.quantity+=1;
                }else{
                    item={
                        id:product.id,
                        name:product.product_name,
                        price:product.discounted_price,
                        image:product.product_image,
                        quantity:1,
                        isFree:product.isFree,
                    };
                    cart.push(item);
                }
            });
            localStorage.setItem("cart",JSON.stringify(cart));
            document.body.dispatchEvent(new CustomEvent("cart-updated"));
        }
    }
}
