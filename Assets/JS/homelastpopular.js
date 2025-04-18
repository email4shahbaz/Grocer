document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector('.homelastRender2'); // Select the container where the products will be rendered
       try {
        // Fetch most viewed products from the API
        const response = await fetch('/Assets/json_files/popular_product.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const mostViewedProducts = await response.json();

        // Clear the container before adding new content
        container.innerHTML = '';

        // Slice the array to get only the first three products
        const topThreeProducts = mostViewedProducts.slice(0, 3);

        // Render each of the top three most-viewed products
        topThreeProducts.forEach(product => {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0];
            const productPrice = product.price;
            const originalPrice = product.original_price || productPrice; // Assuming the API might provide original price
            const discount = product.discount || 0; // Default discount if not provided
            const productUnit = product.unit;
            const productDescription = product.description || "No description available.";
            const productRating = product.rating || 0;

            // Create a product card dynamically
            const productCard = document.createElement('div');
            productCard.className = "lastHomeCardMainDiv mt-3  ProductsCard_Animations ProductCardImage";
            productCard.innerHTML = `
                <div class="homeLastCardTag">
                    <h6>Save ${discount}%</h6>
                </div>
                <div class="card_img p-1">
                    <a href="product-details.html?product-id=${productId}&category-file=popular_product.json" class="product-details-link" data-id="${productId}" data-category="popular_product.json">
                        <img src="${productImage}" 
                             onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
                             alt="${productName}">
                    </a>
                </div>
                <div class="lastHomeCardContentMain p-3">
                    <div class="homelastCardNameAndUnitMain">
                        <h1 class="h2 lastcard_heading">${productName}</h1>
                        <h4>(${productUnit})</h4>
                    </div>
                    <livewire:components.rating-stars :rating="${productRating}" />
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
                                data-image="${productImage}"
                                data-price="${product.discountedPrice}"
                                data-quantity="1">
                                <i class="bi bi-cart"></i>&nbsp;Add
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Append the product card to the container
            container.appendChild(productCard);
        });

        // Add event listeners to dynamically open the product details page
        container.addEventListener('click', (event) => {
            const link = event.target.closest('.product-details-link');
            if (link) {
                event.preventDefault();
                const productId = link.getAttribute('data-id');
                const categoryFile = link.getAttribute('data-category');

                // Navigate dynamically to the product details page
                window.location.href = `product-details.html?product-id=${productId}&category-file=${categoryFile}`;
            }
        });

    } catch (error) {
        console.error("Error fetching most viewed products:", error);
        container.innerHTML = "<p>Failed to load most-viewed products. Please try again later.</p>";
    }
});
