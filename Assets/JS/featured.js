

const initializeFeaturedSwiper = () => {
    const featuredSwiper = new Swiper('.featured-swiper', 
        {
            loop: true,
            slidesPerView: 5,
            spaceBetween: 30,
            
            navigation: {
                nextEl: '.FeaturedBtnRight',
                prevEl: '.FeaturedBtnLeft',
            },
        }
    );
}

document.addEventListener("DOMContentLoaded", async () => {
    const featuredContainer = document.querySelector('.featured-swiper-wrapper');
//    const mobileFeaturedContainer = document.querySelector('.MobileViewFeaturedCardMain');
    const categoryInputs = document.querySelectorAll('input[type="radio"].featured');
    const categoryLabels = document.querySelectorAll('.categoryLabel.featured');


     

    


    // Ensure labels and inputs are linked and clickable
    categoryInputs.forEach((input, index) => {
        const label = categoryLabels[index];
        if (label) {
            label.addEventListener('click', () => {
                input.checked = true;
                input.dispatchEvent(new Event('change'));
            });
        }
    });

    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Function to update the wishlist in localStorage
    function updateWishlist(product) {
        const existingProduct = wishlist.find(item => item.id === product.id);
        if (existingProduct) {
            // Remove product if it's already in the wishlist (toggle behavior)
            wishlist = wishlist.filter(item => item.id !== product.id);
        } else {
            wishlist.push(product);
        }

        // Save updated wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // Update UI
        updateWishlistCounter();
        renderWishlistIcons();
    }

    // Function to update the wishlist counter
    function updateWishlistCounter() {
        const wishlistCounters = document.querySelectorAll(".wishlist_badge_counter");
        wishlistCounters.forEach(counter => {
            counter.textContent = wishlist.length;
        });
    }

    // Function to toggle heart button state
    function renderWishlistIcons() {
        document.querySelectorAll('.wishlist-icon').forEach(button => {
            const productId = button.dataset.id;
            const isInWishlist = wishlist.some(item => item.id === productId);
            button.classList.toggle('in-wishlist', isInWishlist);
            button.innerHTML = isInWishlist
                ? '<i class="bi bi-heart-fill"></i>'
                : '<i class="bi bi-heart"></i>';
        });
    }

   


    // Function to fetch and render products
    async function fetchAndRenderFeaturedProducts(categoryFile, categoryName) {
        try {
            const response = await fetch(`/Assets/json_files/${categoryFile}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const products = await response.json();

            // Clear containers
            //featuredContainer.innerHTML = '';
            //mobileFeaturedContainer.innerHTML = '';

            // Determine the maximum calories value for scaling the progress bar
            const maxCalories = Math.max(...products.map(product => product.nutrition.calories));

            // Render products
            products.forEach(product => {
                // Calculate discount percentage if discountedPrice exists
                const discountPercentage = product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : null;
                const featuredCard = document.createElement('div');
                featuredCard.classList.add('swiper-slide');

                featuredCard.innerHTML = `
                    <div class="position-relative ProductsCard_Animations ProductCardImage FeaturedProductsCard mt-2">
                        <div class="productcardImage text-center">
                            <!-- Discount Badge -->
                            ${discountPercentage ? `<span class="discount-badge">Save ${discountPercentage}%</span>` : ''}

                            <a href="product-details.html?product-id=${product.id}&category-file=${categoryFile}">
                                <img src="${product.image}" 
                                     onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
                                     class="featuredProductImage" alt="${product.name}" loading="lazy">
                            </a>
                               <div class="product-overlay-icons">
                                <button class="wishlist-icon" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${categoryFile}">
                                    <i class="bi bi-heart"></i>
                                </button>
                              <button class="eye-icon" data-id="${product.id}" data-category="${categoryFile}">
                                <i class="bi bi-eye"></i>
                              </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="BestSellCardName">${product.categoryName}</p>
                            <div class="bestSellCardNameAndUnitHeadingMain">
                                <h1 class="h2 BestSellCardHeading">${product.name}</h1>
                                <h4>${product.unit}</h4>
                            </div>

                            <div class="d-flex align-items-center rating">
                                <div class="stars">
                                    <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                    <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                    <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                    <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                    <img src="Assets/Images/Icons/rating-star-unchecked.png" alt="star-unchecked" />
                                </div>
                                <span class="NoOfstars">(${product.rating})</span>
                            </div>
                            <p class="offer">Limited time offer</p>
                            <div class="PriceDivFeaturedProduct mt-2">
                                <div class="d-flex">
                                    <h1 class="pricetag align-self-center">${product.discountedPrice}$</h1>
                                    ${product.price ? `<h1 class="crosspricetag text-decoration-line-through align-self-center mx-2"> ${product.price}$</h1>` : ''}
                                </div>
                                <div class="text-end align-self-center">
                                    <button class="btn addbutton py-2" 
                                            data-id="${product.id}" 
                                            data-name="${product.name}" 
                                            data-price="${product.discountedPrice}" 
                                            data-image="${product.image}" 
                                            data-quantity="1">
                                        <i class="bi bi-cart"></i>&nbsp;Add
                                    </button>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                `;

                // Append to the desktop featured container
                featuredContainer.appendChild(featuredCard);

                // Clone for mobile view and append
               // const mobileFeaturedCard = featuredCard.cloneNode(true);
               // mobileFeaturedContainer.appendChild(mobileFeaturedCard);
            });

            // Initialize Swiper after rendering products
            initializeFeaturedSwiper();
            //featuredSwiper.update();

            // Render wishlist states
            renderWishlistIcons();
        } catch (error) {
            console.error("Error fetching products:", error);
            featuredContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
            //mobileFeaturedContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        }
    }

    fetchAndRenderFeaturedProducts('featured_product.json', 'All');

    // Event listener for the eye button click (Quick View)
    // Event listener for the eye button click (Quick View)
    document.addEventListener('click', async (e) => {
        if (e.target.closest('.eye-icon')) {
            const button = e.target.closest('.eye-icon');
            const productId = button.getAttribute("data-id");
            const categoryFile = button.getAttribute("data-category");
    
            try {
                const response = await fetch(`/Assets/json_files/${categoryFile}`);
                const products = await response.json();
                const product = products.find(p => p.id == productId);
    
                if (product) {
                    renderQuickViewModal(product);
                } else {
                    console.error("Product not found!");
                }
            } catch (error) {
                console.error("Failed to load product data:", error);
            }
        }
    });
    
    // Function to render quick view modal
    function renderQuickViewModal(product) {
        // Populate modal with product details
        document.getElementById('product-name').innerText = product.name || "Unknown Product";
        document.getElementById('product-price').innerText = `$${product.discountedPrice || product.price}`;
        document.getElementById('product-description').innerText = product.detailedDescription || "No description available.";
        document.getElementById('product-sku').innerText = product.sku || "N/A";
        document.getElementById('product-category').innerText = product.categoryName || "Unknown";
        document.getElementById('product-tags').innerText = product.tags ? product.tags.join(", ") : "No Tags";
        document.getElementById('product-image').src = product.image[0] || "Assets/Images/Placeholder.png";
    
        // Handle discount badge
        const discountBadge = document.getElementById('discount-badge');
        if (product.discountedPrice && product.discountedPrice < product.price) {
            const discountPercentage = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
            discountBadge.innerText = `${discountPercentage}% OFF`;
            discountBadge.classList.add("badge-danger");
        } else {
            discountBadge.innerText = ""; // No discount
            discountBadge.classList.remove("badge-danger");
        }
    
        // Handle FOMO messages (Handle multiple dynamic messages)
        const fomoMessages = generateFomoMessages(product);
    
        const fomoMessageContainer = document.getElementById('fomo-message');
        if (fomoMessages.length > 0) {
            fomoMessageContainer.innerHTML = fomoMessages.join('<br>');
        } else {
            fomoMessageContainer.innerText = ""; // No FOMO message
        }

        const btnAdd = document.getElementById('popup-btn-add');
        if(btnAdd!=null){
            btnAdd.innerHTML = ` <button id="addbutton" class="btn btn-success addbutton py-2" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-price="${product.discountedPrice}" 
                            data-image="${product.image}" 
                            data-quantity="1">
                            Add to Cart</button>`;
        }

    
        // Show the modal using Bootstrap modal method
        $('#quick-view-modal').modal('show');
    }
    
    // Generate FOMO Messages
    function generateFomoMessages(product) {
        const fomoMessages = [];
    
        // FOMO conditions
        if (product.stock <= 5) {
            fomoMessages.push(`Hurry! Only ${product.stock || 5} items left in stock. Order now!`);
        }
    
        if (product.isPopular) {
            fomoMessages.push(`${product.name} is trending! Don't miss out on this popular item.`);
        }
    
        if (product.isTimeLimitedOffer) {
            fomoMessages.push(`Limited time offer on ${product.name}. Buy before the deal ends!`);
        }
    
        if (product.stock <= 3) {
            fomoMessages.push(`Best seller alert! ${product.name} is running out fast.`);
        }
    
        // Return the list of FOMO messages
        return fomoMessages;
    }
    
 
    
    function getProductDetailsFromModal() {
        return {
            name: document.getElementById('product-name').innerText,
            price: parseFloat(document.getElementById('product-price').innerText.replace("$", "")),
            image: document.getElementById('product-image').src,
            quantity: 1
        };
    }
    
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.name === product.name);
    
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    // Close button functionality
    $(document).on('click', '[data-dismiss="modal"]', function () {
        $('#quick-view-modal').modal('hide');
    });
    
    
    // Add event listeners to category inputs
    categoryInputs.forEach((input, index) => {
        input.addEventListener('change', async () => {
            const selectedCategory = categoryLabels[index].textContent.trim();

            // Update active state for labels
            categoryLabels.forEach(label => label.classList.remove('Active_category'));

            // Determine the file to fetch based on the selected category
            let categoryFile;
            switch (selectedCategory) {
                case 'Fruits':
                    categoryFile = 'fruits.json';
                    break;
                case 'Vegitables':
                    categoryFile = 'vegetables.json';
                    break;
                case 'Dairy':
                    categoryFile = 'dairy.json';
                    break;
                case 'Beverages':
                    categoryFile = 'beverages.json';
                    break;
                default:
                    categoryFile = 'featured_product.json'; // Default to "All"
            }

            // Fetch and render products for the selected category
            await fetchAndRenderFeaturedProducts(categoryFile, selectedCategory);
            categoryLabels[index].classList.add('Active_category');

        });
    });

    // Set default category to "All" and render products
    const defaultInput = categoryInputs[0];
    if (defaultInput) {
        defaultInput.checked = true;
        categoryLabels[0].classList.add('Active_category');
        //await fetchAndRenderFeaturedProducts('featured_product.json', 'All');
    }

    // Initialize wishlist counter on page load
    updateWishlistCounter();
});
