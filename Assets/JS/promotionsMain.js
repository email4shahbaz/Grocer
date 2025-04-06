document.addEventListener('DOMContentLoaded', () => { 
    const promotionsDiv = document.querySelector('.PromotionsDivProducts');

    // Fetch data from JSON file
    fetch('/Assets/json_files/promotion_products.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((products) => {
            console.log('Fetched products:', products); // Debugging log
            renderProducts(products);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

    function renderProducts(products) {
        // Clear existing content
        promotionsDiv.innerHTML = '';
    
        products.forEach((product) => {
            const { id, name, image, price, discount, rating } = product;
    
            // Calculate discounted price
            const discountedPrice = price - price * (discount / 100);
    
            // Build image URL dynamically
            let imageUrl;
            if (Array.isArray(image)) {
                // Handle case where image is an array
                imageUrl = image.length > 0 ? `/Assets/Images/Products/${image[0]}` : '/Assets/Images/ERROR/ErrorImage.webp';
            } else if (typeof image === 'string') {
                // Handle case where image is a string
                imageUrl = image || '/Assets/Images/ERROR/ErrorImage.webp';
            } else {
                imageUrl = '/Assets/Images/ERROR/ErrorImage.webp'; // Default image if no valid image source
            }
    
            // Get product rating or fallback to 0
            const productRating = rating || 0;
    
            // Create product card HTML
            const productHTML = `
                <div class="ProtomotionsProducts GridsTargetContent">
                    <div class="ProductsCardSearchANDCategory ProductsCard_Animations ProductCardImage mt-3">
                        <div class="heart">
                            <i class="bi bi-heart"></i>
                        </div>
                        <div class="eye">
                            <a href="/product-details.html?product-id=${id}&category-file=promotion_products.json">
                                <i class="bi bi-eye"></i>
                            </a>
                        </div>
                        <div class="CategoryMainCardImage">
                            <a href="/product-details.html?product-id=${id}&category-file=promotion_products.json">
                                <img src="${imageUrl}" 
                                     onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
                                     class="card_main_image p-2" 
                                     alt="${name}">
                            </a>
                        </div>
                        <div class="card-body">
                            <h1 class="h2 searchcard_heading">${name}</h1>
                            <div class="row d-flex">
                                <div class="col align-self-center">
                                    <h1 class="searchpricetag align-self-center">${discountedPrice.toFixed(2)}$</h1>
                                    <p class="original-price"><del>${price.toFixed(2)}$</del></p>
                                </div>
                                <div class="col text-center align-self-center">
                                    <button class="searchaddbutton" 
                                            data-id="${id}"
                                            data-name="${name}" 
                                            data-price="${discountedPrice}" 
                                            data-image="${imageUrl}" 
                                            data-quantity="1">
                                        <img  src="/Assets/Images/SmallIcons/Bag.png" alt="">
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex justify-between items-center gap-1 RatingStars">
                                ${renderRatingStars(productRating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            // Append the product card to the container
            promotionsDiv.innerHTML += productHTML;
        });
    }

    // Helper function to render star ratings
    function renderRatingStars(rating) {
        let starsHTML = '';
        const roundedRating = Math.round(rating);

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                starsHTML += '<span class="fa fa-star checked"></span>';
            } else {
                starsHTML += '<span class="fa fa-star unChecked"></span>';
            }
        }
        return starsHTML;
    }
});
