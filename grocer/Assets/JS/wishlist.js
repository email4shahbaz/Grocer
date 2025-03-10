// Function to update the wishlist counter
function updateWishlistCounter() {
    // Get the wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // Get all elements with the class 'wishlist_badge_counter'
    const wishlistCounters = document.querySelectorAll(".wishlist_badge_counter");

    // Update the text content of each wishlist counter element with the length of the wishlist
    wishlistCounters.forEach((counter) => {
        counter.textContent = wishlist.length;
    });
}

// Function to render the wishlist (for wishlist page)
function renderWishlist(wishlist) {
    const wishlistContainer = document.querySelector(".wishlist_table tbody");
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = wishlist.length
        ? wishlist.map(renderWishlistItem).join("")
        : `<tr><td colspan="3">Your wishlist is empty.</td></tr>`;
}

// Function to render individual wishlist item (for wishlist page)
function renderWishlistItem(product) {
    return `
        <tr>
            <td>
                <div class="product_img_name">
                    <div class="ProductImageBoxWishlist">
                        <img src="${product.image}" class="product_image" alt="${product.name}" />
                    </div>
                    <div>
                        <h1 class="product_name">${product.name}</h1>
                    </div>
                </div>
            </td>
            <td>
                <h1 class="price_bar">$${product.price}</h1>
            </td>
            <td>
                <div class="stock_status_box">
                    <span class="instock_badge">In Stock</span>
                   <button class="add_to_cart_button add_to_cart_badge" id="add-to-cart-btn" class="cart_buttonproduct" data-product-id="${product.id}" data-category-file="${product.categoryFile}">
                        Add to Cart
                    </button>
                    <span class="cross_button_wishlist" data-product-id="${product.id}" data-category-file="${product.categoryFile}">
                        <i class="bi bi-x"></i>
                    </span>
                </div>
            </td>
        </tr>
    `;
}

// Add event listeners for "Add to Cart" and "Remove from Wishlist" actions
document.body.addEventListener("click", async (event) => {
    const addToCartButton = event.target.closest(".add_to_cart_button");
    const removeWishlistButton = event.target.closest(".cross_button_wishlist");

    if (addToCartButton) {
        await handleAddToCart(addToCartButton);
    }

    if (removeWishlistButton) {
        handleRemoveFromWishlist(removeWishlistButton);
    }
});

// Handle adding a product to the cart
async function handleAddToCart(button) {
    const productId = button.dataset.productId;
    const categoryFile = button.dataset.categoryFile;

    try {
        const response = await fetch(`Assets/json_files/${categoryFile}`);
        if (!response.ok) throw new Error("Failed to fetch category products.");

        const products = await response.json();
        const product = products.find((item) => item.id === productId);

        if (!product) {
            alert("Product not found.");
            return;
        }

        // Add product to cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if product already exists
        } else {
            product.quantity = 1; // Set initial quantity
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to your cart.`);

        // Remove product from wishlist after adding to cart
        handleRemoveFromWishlist(button);
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}

// Handle removing a product from the wishlist
function handleRemoveFromWishlist(button) {
    const productId = button.dataset.productId;
    const categoryFile = button.dataset.categoryFile;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(
        (item) => !(item.id === productId && item.categoryFile === categoryFile)
    );

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist(wishlist);  // Update the wishlist display
    updateWishlistCounter();   // Update the global wishlist counter
    alert("Product removed from your wishlist.");
}

// Initialize wishlist counter on page load
document.addEventListener("DOMContentLoaded", () => {
    updateWishlistCounter(); // Ensure wishlist counter is updated when the page loads

    // Initialize the wishlist items on the wishlist page
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    renderWishlist(wishlist);
});

// Listen for heart button click on featured.js and add/remove from wishlist
document.body.addEventListener('click', (event) => {
    if (event.target.closest('.wishlist-icon')) {
        const button = event.target.closest('.wishlist-icon');
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        const productImage = button.dataset.image;
        const categoryFile = button.dataset.category;

        // Create product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            categoryFile: categoryFile
        };

        // Update wishlist in localStorage
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const existingProduct = wishlist.find(item => item.id === productId);
        
        if (existingProduct) {
            wishlist = wishlist.filter(item => item.id !== productId); // Remove if already in wishlist
        } else {
            wishlist.push(product); // Add to wishlist if not already there
        }

        // Save updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // Update UI (wishlist counter and heart icon)
        updateWishlistCounter();
        renderWishlistIcons();
    }
});

// Update the heart icon for wishlist items based on localStorage
function renderWishlistIcons() {
    document.querySelectorAll('.wishlist-icon').forEach(button => {
        const productId = button.dataset.id;
        const isInWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isProductInWishlist = isInWishlist.some(item => item.id === productId);
        button.classList.toggle('in-wishlist', isProductInWishlist);
    });
}
