// Fetch most reviewed products using the API
fetch(`https://grocer.softwaresystems.us/api/v1/products/most-reviewed`)
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.querySelector('#PD_alsoViewed_products');

        const products = data.products;

        products.forEach(product => {
            // Calculate discount if applicable
            let discount = product.discount_type === 'percent' ? `${product.discount}%` : `${product.discount}$`;
            let discountedPrice = product.price - (product.price * product.discount / 100);

            // Render each product card
            productsContainer.innerHTML += `
                <div class="">
                    <div class="">
                        <div class="FeaturedProductsCard position-relative">
                            <div class="position-absolute BestSellCardOffTag">
                                <h6>Save ${discount}</h6>
                            </div>
                            <div class="productcardImage text-center">
                                <a href="/Product-details.html" wire:navigate>
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
                                <livewire:components.rating-stars :rating="${product.rating[0]?.average || 0}" />
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
                                        <h1 class="pricetag align-self-center">${discountedPrice}$</h1>
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
                    </div>
                </div>`;
        });
    })
    .catch(error => console.error('Error fetching most reviewed products:', error));
