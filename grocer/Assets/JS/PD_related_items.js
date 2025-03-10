// Get the id from the URL
const urlParams = new URLSearchParams(window.location.search);
// return urlParams.get('id');

// Fetch related products using the API
fetch(`https://grocer.softwaresystems.us/api/v1/products/related-products/${urlParams.get('id')}`)
    .then(response => response.json())
    .then(data => {
        // Log the full response to understand its structure
        console.log('API response:', data);

        // If the response contains a 'data' field, access it; otherwise use the response as-is
        const products = Array.isArray(data) ? data : data.data;  // Adjust this based on actual API response

        // Check if products is an array
        if (Array.isArray(products)) {
            const productsContainer = document.getElementById('productsContainer');
            
            products.forEach(product => {
                // Calculate discount if applicable
                let discount = product.discount_type === 'percent' ? `${product.discount}%` : `${product.discount}$`;
                let discountedPrice = product.price - (product.price * product.discount / 100);

                // Render each product card
                productsContainer.innerHTML += `
 <div class="">
                    <div class="FeaturedProductsCard position-relative">
                        <div class="position-absolute BestSellCardOffTag">
                            <h6>
                                Save ${discount}
                            </h6>
                        </div>
                        <div class="productcardImage text-center">
                            <a href="/Product-details.html?id=${product.id}" wire:navigate>
                                <img src="https://grocer.softwaresystems.us/storage/app/public/product/${product.image[0]}"
                                    onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                    class="featuredProductImage" alt="${product.name}" loading="lazy">
                            </a>
                        </div>
                        <div class="card-body">
                            <p class="categoryname">Fruits</p>
                            <div class="nameAndUnitHeading">
                                <h1 class="h2 card_heading">${product.name}</h1>
                                <h4>(${product.unit})</h4>
                            </div>
                            <livewire:components.rating-stars :rating="$rating" />
                            <div class="col d-flex justify-content-start mt-2">
                                <div>
                                    <h1 class="productby1">By</h1>
                                </div>
                                <div>
                                    <h1 class="productby2">&nbsp;Grocer</h1>
                                </div>
                            </div>
                            <div class="PriceDivFeaturedProduct mt-2">
                                <div class="d-flex">
                                    <h1 class="pricetag align-self-center">${discountedPrice}$
                                    </h1>
                                </div>
                                <div class="text-end align-self-center">
                                    <a class="btn addbutton py-2"
                                        wire:click.prevent="addToCart('${product.id}', '${product.name}', '${product.image[0]}', '${discountedPrice}', [], '${product.unit}')">
                                        <i class="bi bi-cart"></i>&nbsp;Add
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                
                </div>`;
            });
        } else {
            console.error('Products is not an array:', products);
        }
    })
    .catch(error => console.error('Error fetching related products:', error));
