document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector("tbody"); // Target cart table body
    const subtotalElement = document.getElementById("subtotal"); // For subtotal
    const shippingElement = document.getElementById("shipping"); // For shipping
    const totalElement = document.getElementById("total"); // For total
    const proceedToCheckoutButton = document.querySelector(".proceed_checkOut_btn");
    const cartBadge = document.querySelector(".cart_heading .wishlist_badge"); // Navbar cart badge counter
    const cartTotalElement = document.querySelector(".mycartCustomHeading2"); // Total in navbar dropdown
    const cartDropdownContent = document.querySelector(".cart_dropdownCustom .w-75"); // Dropdown cart content
    const SHIPPING_COST = 100.0; // Static shipping cost

    // Helper: Save cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Helper: Update Navbar Cart UI
    function updateNavbarCartUI() {
        const totalItems = cart.length;// cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Update cart badge counter
        cartBadge.textContent = totalItems;

        // Update dropdown total
        cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;

        // Update dropdown content
        if (cart.length === 0) {
            cartDropdownContent.innerHTML = `
                <div>
                    <h1 class="text-center">Cart is Empty</h1>
                    <div class="mt-3 mb-3 d-flex justify-content-between align-items-center gap-3">
                        <a href="/cart.html" class="customDropdownCartButton1">My Cart</a>
                        <a href="/billing.html" class="customDropdownCartButton2">Checkout</a>
                    </div>
                </div>
            `;
        } else {
            const itemsHTML = cart
                .map(
                    (item) => `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;" />
                            <span>${item.name} x${item.quantity}</span>
                        </div>
                        <div>
                            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                    </div>
                `
                )
                .join("");

            cartDropdownContent.innerHTML = `
                <div>
                    ${itemsHTML}
                    <div class="d-flex justify-content-between align-content-center mt-3">
                        <h1 class="customCartDropdownHeading">Total:</h1>
                        <h1 class="customCartDropdownHeading">$${totalAmount.toFixed(2)}</h1>
                    </div>
                    <div class="mt-3 mb-3 d-flex justify-content-between align-items-center gap-3">
                        <a href="/cart.html" class="customDropdownCartButton1">My Cart</a>
                        <a href="/billing.html" class="customDropdownCartButton2">Checkout</a>
                    </div>
                </div>
            `;
        }
    }

    // Helper: Render the cart table and totals
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear the cart table
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Your cart is empty.</td>
                </tr>
            `;
            subtotalElement.innerText = "$0.00";
            totalElement.innerText = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const row = `
                <tr>
                    <td>
                        <div class="product_img_name_cart">
                            <div class="ProductImage_cart">
                                <img src="${item.image}" class="product_image_cart" alt="${item.name}" loading="lazy">
                            </div>
                            <div>
                                <h1 class="product_name_cart">${item.name}</h1>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <h1 class="price_bar_cart">$${item.price.toFixed(2)}</h1>
                        </div>
                    </td>
                    <td>
                        <div class="counter_cart">
                            <button class="incrementbtn_cart" data-index="${index}" data-action="decrement">
                                <i class="bi bi-dash"></i>
                            </button>
                            <h2 style="font-size: 17px; padding: 5px">${item.quantity}</h2>
                            <button class="incrementbtn_cart" data-index="${index}" data-action="increment">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="priceXCrossBtnDivCart">
                            <h1 class="price_bar_cart">$${itemSubtotal.toFixed(2)}</h1>
                            <div class="cart_cross_div">
                                <span class="cross_button_cart" data-index="${index}" data-action="remove">
                                    <i class="bi bi-x"></i>
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
            `;

            cartItemsContainer.innerHTML += row;
        });

        // Update totals
        const total = subtotal + SHIPPING_COST;
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        shippingElement.innerText = `$${SHIPPING_COST.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;

        // Update Navbar Cart UI
        updateNavbarCartUI();
    }

    // Update Cart Logic
    function updateCart(action, index) {
        if (action === "increment") {
            cart[index].quantity += 1; // Increment the quantity
        } else if (action === "decrement") {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Decrement the quantity
            } else {
                alert("Minimum quantity is 1. Cannot decrement further.");
            }
        } else if (action === "remove") {
            cart.splice(index, 1); // Remove the product from the cart
            alert("Product removed from the cart.");
        }

        saveCart(); // Save the updated cart
        renderCart(); // Re-render the cart
    }

    // Add event listeners for increment, decrement, and remove
    cartItemsContainer.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        const crossButton = e.target.closest(".cross_button_cart");
        if (!button && !crossButton) return;

        const index = button
            ? parseInt(button.dataset.index, 10)
            : parseInt(crossButton.dataset.index, 10);
        const action = button ? button.dataset.action : "remove";

        if (index !== undefined && action) {
            updateCart(action, index); // Call updateCart with action and index
        }
    });




    // Proceed to Checkout
proceedToCheckoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    const total = parseFloat(totalElement.innerText.replace("$", "").trim());

    if (cart.length === 0) {
        alert("Your cart is empty. Add items to proceed to checkout.");
        return;
    }

    if (isNaN(total) || total <= 0) {
        alert("Error calculating total. Please try again.");
        return;
    }

    // Store the cart, subtotal, shipping, and total in localStorage for use on the billing page
    const checkoutData = {
        cart,
        subtotal: parseFloat(subtotalElement.innerText.replace("$", "").trim()),
        shipping: SHIPPING_COST,
        total,
    };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Redirect to the billing page
    window.location.href = "billing.html";
});







    
    // Initial Render
    renderCart();
});


