document.addEventListener("DOMContentLoaded", async () => {
    const latestProductsContainer = document.getElementById('latestProductsContainer');

    if (!latestProductsContainer) {
        console.error("Container with ID 'latestProductsContainer' not found.");
        return;
    }

    try {
        // Fetch latest products from the JSON file
        const response = await fetch('/Assets/json_files/latest_product.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const latestProducts = await response.json();

        // Validate the JSON structure
        if (!Array.isArray(latestProducts)) {
            throw new Error("Invalid JSON structure: expected an array of products.");
        }

        // Render each product dynamically
        latestProducts.forEach((product) => {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0]; // Fetch the first image from the array
            const productPrice = product.price.toFixed(2); // Ensure price is formatted to 2 decimal places
            const productUnit = product.unit ? `/${product.unit}` : ''; 
            const averageRating = product.rating || 0; // Default to 0 if rating is undefined

            // Calculate stars
            const filledStars = Math.floor(averageRating);
            const halfStar = averageRating - filledStars >= 0.5 ? 1 : 0;
            const emptyStars = 5 - filledStars - halfStar;

            // Create product card
            const productCard = document.createElement('div');
            productCard.classList.add('col-sm-6', 'col-md-6', 'col-lg-3', 'mb-4', 'GridsTargetContent');

            productCard.innerHTML = `
                <div class="ProductsCardSearchANDCategory ProductsCard_Animations ProductCardImage mt-3">
                    <div class="badge">${'Save 50%'}</div>
                    <div class="heart">
                        <i class="bi bi-heart"></i>
                    </div>
                    <div class="eye">
                        <a wire:navigate href="/Product-details.html?product=${productId}">
                            <i class="bi bi-eye"></i>
                        </a>
                    </div>
                    <div class="CategoryMainCardImage">
                        <a href="product-details.html?product-id=${productId}&category-file=latest_product.json" class="product-details-link" data-id="${productId}" data-category="latest_product.json">
                            <img src="${productImage}"
                                 onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
                                 class="card_main_image p-2"
                                 alt="${productName}">
                        </a>
                    </div>
                    <div class="card-body">
                        <h1 class="h2 searchcard_heading">${productName}</h1>
                        <div class="row d-flex">
                            <div class="col align-self-center">
                                <h1 class="searchpricetag align-self-center">$${productPrice}${productUnit}</h1>
                            </div>
                            <button class="searchaddbutton addbutton" 
                                        data-name="${productName}" 
                                        data-price="${productPrice}" 
                                        data-image="${productImage}" 
                                        data-quantity="1">
                                    <img src="/Assets/Images/SmallIcons/Bag.png" alt="Add to Cart">
                                </button>
                        </div>
                        <div class="d-flex justify-between items-center gap-1 RatingStars">
                            ${'<i class="bi bi-star-fill" style="color: gold; font-size: 1.2rem;"></i>'.repeat(filledStars)}
                            ${halfStar ? '<i class="bi bi-star-half" style="color: gold; font-size: 1.2rem;"></i>' : ''}
                            ${'<i class="bi bi-star" style="color: lightgray; font-size: 1.2rem;"></i>'.repeat(emptyStars)}
                        </div>
                    </div>
                </div>
            `;

            // Append the product card to the container
            latestProductsContainer.appendChild(productCard);
        });

        console.log("Products rendered successfully.");
    } catch (error) {
        console.error("Error fetching or rendering products:", error);
        latestProductsContainer.innerHTML = "<p>Failed to load latest products. Please try again later.</p>";
    }
});

