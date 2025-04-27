document.addEventListener('DOMContentLoaded', () => {
    const promotionsSideProducts = document.querySelector('.promotions_side_products');

    // Fetch data from the JSON file
    fetch('/Assets/json_files/promotion_sub.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const products = data.slice(0, 4); // Get only the first 4 products
            renderPopularProducts(products);
        })
        .catch((error) => {
            console.error('Error fetching popular products:', error);
        });

    function renderPopularProducts(products) {
        // Clear existing content
        promotionsSideProducts.innerHTML = '';

        products.forEach((product) => {
            const { id, name, image, price, discountedPrice, rating } = product;

            // Calculate discounted price
            const finalPrice = discountedPrice || price;
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
                <div class="card mt-3 shadow-sm border rounded p-3 ProductsCard_Animations ProductCardImage mt-3">
                    <div class="row g-0 align-items-center">
                        <div class="col-4">
                           
                             <a href="/product-details.html?product-id=${id}&category-file=promotion_sub.json">
                                <img src="${imageUrl}" 
                                     onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
                                     class="card_main_image p-2" 
                                     alt="${name}">
                            </a>
                           
                        </div>
                        <div class="col-8">
                            <div class="card-body p-0 ps-3">
                                <h5 class="card-title mb-1">${name}</h5>
                                <div class="d-flex align-items-center mb-2">
                                    <h6 class="text-success mb-0">$${finalPrice.toFixed(2)}</h6>
                                    <small class="text-muted ms-2"><del>$${price.toFixed(2)}</del></small>
                                </div>
                                <div class="d-flex">
                                    ${renderRatingStars(productRating)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the product card to the promotions side products div
            promotionsSideProducts.innerHTML += productHTML;
        });
    }

    // Helper function to render star ratings
    function renderRatingStars(rating) {
        let starsHTML = '';
        const roundedRating = Math.round(rating);

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                starsHTML += '<span class="fa fa-star text-warning"></span>';
            } else {
                starsHTML += '<span class="fa fa-star text-muted"></span>';
            }
        }
        return starsHTML;
    }
});
