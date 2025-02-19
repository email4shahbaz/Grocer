document.addEventListener("DOMContentLoaded", async () => {
    const saleProductsContainer = document.querySelector('.last_filter_card');

    try {
        // Fetch all products from the API
        const productsResponse = await fetch('/Assets/json_files/category_Sub.json'); // Ensure the JSON file path is correct
        if (!productsResponse.ok) {
            throw new Error(`HTTP error! Status: ${productsResponse.status}`);
        }

        const productsData = await productsResponse.json();
        console.log("Fetched Products Data:", productsData); // Log the entire JSON data

        const products = productsData.products.slice(0, 5); // Get only the first five products
        console.log("Filtered Products:", products);

        // Check if products exist
        if (!products || products.length === 0) {
            saleProductsContainer.innerHTML = "<p>No sale products available at the moment. Please check back later.</p>";
            return;
        }

        // Render products dynamically
        products.forEach(product => {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image && product.image[0] 
                ? `Assets/Images/Products/${product.image[0]}` 
                : 'Assets/Images/ERROR/ErrorImage.webp'; // Use fallback image if product image is unavailable
            const productPrice = product.price;
            const discountedPrice = product.discount > 0 ? (productPrice - (productPrice * product.discount / 100)).toFixed(2) : productPrice.toFixed(2); // Calculate discounted price
            const originalPrice = product.discount > 0 ? productPrice.toFixed(2) : null; // Original price if there's a discount
            const productRating = 4; // Placeholder for product rating (as the ratings array is empty)

            // Create product card
            const productCard = document.createElement('div');
            productCard.classList.add('mt-2');
            productCard.innerHTML = `
                <div class="mt-3 card_search ProductsCard_Animations ProductCardImage mt-3">
                    <div class="card_searchimg p-3">
                        <a href="/Product-details.html?product=${productId}" wire:navigate>
                            <img src="${productImage}"
                                 onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                 class="w-100" alt="${productName}">
                        </a>
                    </div>
                    <div class="productcardContent p-3">
                        <h1 class="h2 searchcard_heading">${productName}</h1>
                        <div class="row mt-2">
                            <div class="col d-flex">
                                <h1 class="searchcardpricetag align-self-center">
                                    ${discountedPrice}$
                                </h1>
                                ${originalPrice ? `<h3 class="searchcardcrosspricetag align-self-center">&nbsp;&nbsp;<del>${originalPrice}$</del></h3>` : ''}
                            </div>
                            <div class="col text-center align-self-center">
                            </div>
                        </div>
                        <div class="d-flex justify-between items-center gap-1 RatingStars">
                            ${renderStars(productRating)}
                        </div>
                    </div>
                </div>
            `;

            // Append product card to the container
            saleProductsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching product data:", error);
        saleProductsContainer.innerHTML = "<p>Failed to load sale products. Please try again later.</p>";
    }
});

// Helper function to render star ratings
function renderStars(rating) {
    const maxStars = 5; // Total stars to display
    let starsHTML = '';

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<i class="bi bi-star-fill" style="color: gold; font-size: 1.2rem;"></i>';
        } else {
            starsHTML += '<i class="bi bi-star" style="color: lightgray; font-size: 1.2rem;"></i>';
        }
    }

    return starsHTML;
}
