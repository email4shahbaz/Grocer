document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector('.homelastRender2'); // Select the container where the products will be rendered

    try {
        // Fetch most viewed products from the API
        const response = await fetch('Assets/json_files/explore_categories.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const mostViewedProducts = await response.json();
        console.log(mostViewedProducts);

        // Clear the container before adding new content
        container.innerHTML = '';

        // Slice the array to get only the first three products
        const topThreeProducts = mostViewedProducts.products.slice(0, 3);

        // Render each of the top three most-viewed products
        for (const product of topThreeProducts) {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const originalPrice = product.original_price || productPrice; // Assuming the API might provide original price
            const discount = product.discount || 9; // Default discount if not provided
            const productUnit = product.unit;

            // Create product card HTML
            const productCard = `
                <div class="lastHomeCardMainDiv mt-3">
                    <div class="homeLastCardTag">
                        <h6>Save ${discount}%</h6>
                    </div>
                    <div class="card_img p-1">
                        <a href="/Product-details.html" wire:navigate>
                            <img src="https://grocer.softwaresystems.us/storage/app/public/product/${productImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" class="" alt="${productName}" loading="lazy">
                        </a>
                    </div>
                    <div class="lastHomeCardContentMain p-3">
                        <div class="homelastCardNameAndUnitMain">
                            <h1 class="h2 lastcard_heading">${productName}</h1>
                            <h4>(${productUnit})</h4>
                        </div>
                        <livewire:components.rating-stars :rating="${product.rating}" /> <!-- Use the actual rating -->
                        <div class="homelastCardPriceAndCartBtn mt-2">
                            <div class="d-flex">
                                <h1 class="LastCardPriceTag align-self-center">${productPrice}$</h1>
                                <h3 class="LastCardCrossPriceTag align-self-center">
                                    &nbsp;&nbsp;<del>${originalPrice}$</del>
                                </h3>
                            </div>
                            <div class="text-center align-self-center">
                                <button class="LastCardAddButton" 
                                    data-id="${productId}"
                                    data-name="${productName}"
                                    data-price="${product.discountedPrice}"
                                    data-image="${productImage}"
                                    wire:click.prevent="addToCart('${productId}', '${productName}', '${productImage}', '${productPrice}', @json(product.variations), '${productUnit}')">
                                    <i class="bi bi-cart"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the product card to the container
            container.innerHTML += productCard;
        }
    } catch (error) {
        console.error("Error fetching most viewed products:", error);
        container.innerHTML = "<p>Failed to load most-viewed products. Please try again later.</p>";
    }
});
