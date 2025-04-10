const newLocal = ".cart-drawer-overlay";
let cart = null;
let webCartDrawer;
let mobileCartDrawer;
let cartOverlay;


document.addEventListener("DOMContentLoaded", ()=>{
     //Add check/uncheck functionality to the category checkboxes
     document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("click", function(e) {
            if (this.checked && this.getAttribute("data-checked") === "true" && this.getAttribute("data-canUncheck") !== "false") {
                this.checked = false;
                this.removeAttribute("data-checked");
            } else {
                document.querySelectorAll('input[type="radio"]').forEach(r => r.removeAttribute("data-checked"));
                this.setAttribute("data-checked", "true");
            }
        });
    });
})

 // Sync Cart on Updates
 document.body.addEventListener("cart-updated", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateWebCartBadge();
    renderWebCartItems();
    updateMobileCartBadge();
    renderMobileCartItems();

     // Open the appropriate drawer and overlay
     const isMobile = window.innerWidth <= 768;
     if (isMobile) {
         document.getElementById("mobileCartDrawer").classList.add("open");
         document.querySelector(newLocal).style.display = "block";
     } else {
         document.getElementById("cartDrawer").classList.add("open");
         document.querySelector(".cart-drawer-overlay").style.display = "block";
     }
});

document.addEventListener("HeaderFooterScriptsLoaded", () => {
    webCartDrawer = document.getElementById("cartDrawer");
    mobileCartDrawer = document.getElementById("mobileCartDrawer");
    cartOverlay = document.querySelector(".cart-drawer-overlay");

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    //updateCartBadge();
    updateWebCartBadge();
    updateMobileCartBadge();
    renderWebCartItems();
    renderMobileCartItems();


    const openWebCartDrawer = document.getElementById("openCartDrawer");
    const closeWebCartDrawer = document.getElementById("cartDrawerClose");

    if (openWebCartDrawer) {
        openWebCartDrawer.addEventListener("click", () => {
            if (webCartDrawer) webCartDrawer.classList.add("open");
            cartOverlay.style.display = "block"; // Show overlay when web drawer opens
        });
    }

    if (closeWebCartDrawer) {
        closeWebCartDrawer.addEventListener("click", closeDrawer); // Close web drawer and overlay
    }

    // Mobile Cart Drawer
    const openMobileCartDrawer = document.getElementById("openMobileCartDrawer");
    const closeMobileCartDrawer = document.getElementById("mobileCartDrawerClose");

    if (openMobileCartDrawer) {
        openMobileCartDrawer.addEventListener("click", () => {
            if (mobileCartDrawer) mobileCartDrawer.classList.add("open");
            cartOverlay.style.display = "block"; // Show overlay when mobile drawer opens
        });
    }

    if (closeMobileCartDrawer) {
        closeMobileCartDrawer.addEventListener("click", closeDrawer); // Close mobile drawer and overlay
    }

    // Close overlay when clicked
    if(cartOverlay!=null) cartOverlay.addEventListener("click", closeDrawer);

   

    const searchInput = window.screen.width > 992 ? document.querySelector(".search_inp") : document.querySelector(".search_inp_mobile");

	// const searchSuggestionsContainer = document.createElement("div");
	// searchSuggestionsContainer.classList.add("search-suggestions");
	// searchSuggestionsContainer.style.display = "none";
	// searchSuggestionsContainer.style.position = "absolute";
    // searchSuggestionsContainer.style.top = "40px";
	// searchSuggestionsContainer.style.background = "#fff";
	// searchSuggestionsContainer.style.border = "1px solid #ddd";
	// searchSuggestionsContainer.style.zIndex = "1000";
	// searchSuggestionsContainer.style.width = "100%";
	// searchSuggestionsContainer.style.maxHeight = "200px";
	// searchSuggestionsContainer.style.overflowY = "auto";
	// searchSuggestionsContainer.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
	//searchInput.parentNode.appendChild(searchSuggestionsContainer);

	getCategories();
	// Load products from JSON files
	let allProducts = [];
	const jsonFiles = [
		"/Assets/json_files/all_products.json",
		//"/Assets/json_files/latest_product.json",
		//"/Assets/json_files/featured_product.json",
	];

	// Fetch JSON data and merge all products into a single array
	Promise.all(
		jsonFiles.map((file) => fetch(file).then((response) => response.json()))
	)
		.then((data) => {
			allProducts = data.flat(); // Merge all JSON arrays into one
		})
		.catch((error) => console.error("Error loading products:", error));

	// Filter products based on query
	function filterProducts(query) {
		return allProducts.filter((product) =>
			product.name.toLowerCase().includes(query.toLowerCase())
		);
	}

	

	// Handle search input
	searchInput.addEventListener("input", (e) => {
		const query = e.target.value.trim();
		if (query.length > 0) {
			//const filteredProducts = filterProducts(query);
			//renderSuggestions(filteredProducts);
			//searchSuggestionsContainer.style.display = "block";
		} else {
			//searchSuggestionsContainer.style.display = "none";
		}
	});

	// Hide suggestions on clicking outside
	document.addEventListener("click", (e) => {
		// if (
		// 	!searchInput.contains(e.target) &&
		// 	!searchSuggestionsContainer.contains(e.target)
		// ) {
		// 	searchSuggestionsContainer.style.display = "none";
		// }
	});

	// Render the selected product on the search page
	const productContainer = document.getElementById("product-grid");
	const productId = new URLSearchParams(window.location.search).get("id");

	if (productId && productContainer) {
		fetch("/Assets/json_files/all_products.json")
			.then((response) => response.json())
			.then((data) => {
				const product = data.find((item) => item.id === productId);

				if (product) {
					renderProduct(product);
				} else {
					productContainer.innerHTML = `<p>Product not found.</p>`;
				}
			})
			.catch((error) => console.error("Error loading product:", error));
	}
});

async function getCategories() {
    try {
        const response = await fetch(
            "Assets/json_files/Browse_navbar_categories.json"
        ); // Load categories list
        if (!response.ok) throw new Error("Failed to load categories.");

        const categories = await response.json();
        populateCategoryDropdown(categories);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Function to populate category dropdown
function populateCategoryDropdown(categories) {
    let categoryDropdown = window.screen.width > 992 ? document.getElementById("search_select_category") : document.getElementById("search_select_category_mobile");
    categoryDropdown.innerHTML = ""; // Clear existing categories
    const firstOption = document.createElement("option");
    firstOption.value = "All Categories";
    firstOption.innerHTML = "All Categories";
    categoryDropdown.appendChild(firstOption);
    categories.forEach((category) => {
        const categoryItem = document.createElement("option");
        categoryItem.value = category.name;
        categoryItem.innerHTML = category.name;
        categoryDropdown.appendChild(categoryItem);
    });
}


// Functions for Web View
function updateWebCartBadge() {
    const webCartBadge = document.getElementById("cartBadge");
    const totalItems = cart.length;// .reduce((sum, item) => sum + item.quantity, 0);
    if (webCartBadge) webCartBadge.textContent = totalItems;
}

function renderWebCartItems() {
    const cartDrawerBody = document.querySelector("#cartDrawer .cart-drawer-body");
    const cartDrawerFooter = document.querySelector("#cartDrawer .cart-drawer-footer");
    const cartTotalElement = document.querySelector(".mycartCustomHeading2");

    cartDrawerBody.innerHTML = "";
    if (cart.length === 0) {
        cartDrawerBody.innerHTML = `<p class="text-center mt-3">Your cart is empty.</p>`;
        if (cartDrawerFooter) cartDrawerFooter.innerHTML = "";
        return;
    }

    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.name} </span>
                </div>
                <div class="d-flex align-items-center ">
                    <button class="btn btn-sm quantity-button decrement" style="display: ${item.isFree==true ? 'none': 'block'};">
                        <i class="bi bi-dash-square" data-name="${item.name}"></i>
                    </button>
                    <span class="">${item.quantity}</span>
                    <button class="btn btn-sm quantity-button increment mx-2" style="display: ${item.isFree==true ? 'none': 'block'};">
                        <i class="bi bi-plus-square" data-name="${item.name}"></i>
                    </button>
                    <strong style="margin-left: 15px">$${(item.price * item.quantity).toFixed(2)}</strong>
                    <div class="btn btn remove-cart-item"><i class="bi bi-trash"  data-name="${item.name}"></i></div>
                </div>
            </div>
        `;
        cartDrawerBody.insertAdjacentHTML("beforeend", cartItem);
    });

    if (cartDrawerFooter) {
        cartDrawerFooter.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="fw-bold">Total:</span>
                <span class="fw-bold">$${totalPrice.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between">
                <a href="/cart.html" class="btn btn-primary">My Cart</a>
                <a href="/billing.html" class="drawercart-checkout btn btn-success">Checkout</a>
            </div>
        `;
    }

    document.querySelectorAll("#cartDrawer .remove-cart-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-name");
            //alert(productName);
            cart = cart.filter((item) => item.name !== productName);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderWebCartItems();
            updateWebCartBadge();
            updateMobileCartBadge(); // Synchronize with mobile badge
            triggerCartUpdateEvent();
        });
    });

    if (cartTotalElement) cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Functions for Mobile View
function updateMobileCartBadge() {
    const mobileCartBadge = document.getElementById("mobileCartBadge");
    const totalItems = cart.length;// cart.reduce((sum, item) => sum + item.quantity, 0);
    if (mobileCartBadge) mobileCartBadge.textContent = totalItems;
}



function renderMobileCartItems() {
    const cartBody = document.querySelector("#mobileCartDrawer .cart-drawer-body");
    const cartFooter = document.querySelector("#mobileCartDrawer .cart-drawer-footer");

    cartBody.innerHTML = "";
    if (cart.length === 0) {
        cartBody.innerHTML = "<p>Your cart is empty.</p>";
        if (cartFooter) cartFooter.innerHTML = "";
        return;
    }

    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${item.name}</span>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm quantity-button decrement">
                        <i class="bi bi-dash-square" data-name="${item.name}"></i>
                    </button>
                <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm quantity-button increment" data-name="${item.name}">
                        <span class="arrow up"></span>
                    </button>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button class="btn btn-sm quantity-button increment mx-2">
                        <i class="bi bi-plus-square" data-name="${item.name}"></i>
                    </button>
                    <div class="btn btn remove-cart-item"><i class="bi bi-trash"  data-name="${item.name}"></i></div>
                </div>
            </div>
        `;
        cartBody.insertAdjacentHTML("beforeend", cartItem);
    });

    if (cartFooter) {
        cartFooter.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span>Total:</span>
                <strong>$${totalPrice.toFixed(2)}</strong>
            </div>
            <div class="d-flex justify-content-between">
                <a href="/cart.html" class="btn btn-primary">View Cart</a>
                <a href="/billing.html" class="drawercart-checkout btn btn-success">Checkout</a>
            </div>
        `;
    }

    document.querySelectorAll("#mobileCartDrawer .remove-cart-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-name");
            cart = cart.filter((item) => item.name !== productName);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderMobileCartItems();
            updateMobileCartBadge();
            updateWebCartBadge(); // Synchronize with web badge
            triggerCartUpdateEvent();
        });
    });
}

// Trigger a custom event when the cart is updated
function triggerCartUpdateEvent() {
    const cartUpdatedEvent = new CustomEvent("cart-updated");
    document.body.dispatchEvent(cartUpdatedEvent);
}


 // Close Drawer Logic
 function closeDrawer() {
    if (webCartDrawer) webCartDrawer.classList.remove("open");
    if (mobileCartDrawer) mobileCartDrawer.classList.remove("open");
    cartOverlay.style.display = "none";
}




// Function to render a product
function renderProduct(product) {
    productContainer.innerHTML = `
        <div class="col-md-3 col-lg-3">
            <div class="product-card">
                <div class="product-card-header">
                    
                    <img src="${product.image[0]}" alt="${
        product.name
    }" class="product-image">
                 
                </div>
                <div class="product-card-body">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(
                                                2
                                            )}</p>
                 
                    <p class="product-unit">${product.unit || ""}</p>
                    <p class="product-discount">Discount: ${
                                                product.discount || 0
                                            }%</p>
                    <p class="product-description">${
                                                product.description || ""
                                            }</p>
                </div>
            </div>
        </div>
    `;
}
// Render suggestions
function renderSuggestions(suggestions) {
    searchSuggestionsContainer.innerHTML = ""; // Clear previous suggestions

    if (suggestions.length === 0) {
        searchSuggestionsContainer.innerHTML = `<p style="padding: 8px; color: #888;">No products found</p>`;
        return;
    }

    suggestions.forEach((product) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.style.display = "flex";
        suggestionItem.style.alignItems = "center";
        suggestionItem.style.padding = "10px";
        suggestionItem.style.cursor = "pointer";
        suggestionItem.style.borderBottom = "1px solid #ddd";

        suggestionItem.innerHTML = `
            <img src="${product.image[0]}" alt="${
            product.name
        }" style="width: 40px; height: 40px; margin-right: 10px; border-radius: 4px;">
            <div>
                <span style="font-weight: bold; color: #333;">${
                                        product.name
                                    }</span><br>
                <span style="font-size: 0.9rem; color: #555;">$${product.price.toFixed(
                                        2
                                    )}</span>
            </div>
        `;

        suggestionItem.addEventListener("click", () => {
            redirectToSearchedProductPage(product);
        });

        searchSuggestionsContainer.appendChild(suggestionItem);
    });
}

// Redirect to the searched product page with query parameter
function redirectToSearchedProductPage(product) {
    // const url = new URL(window.location.origin + "/search.html");
    // url.searchParams.set("id", product.id);
    // window.location.href = url;
    const url = new URL(window.location.origin + "/product-details.html");
    url.searchParams.set("product-id", product.id);
    url.searchParams.set("category-file", product.categoryName+".json");
    window.location.href = url;
}

 // Add to Cart Functionality
 document.body.addEventListener("click", (e) => {
    const match = e.target.closest('.searchaddbutton, .BestSellCardAddButton, .LastCardAddButton, .addbutton');

    if (
      match
        
        
    ) {
        const button = match;

        // Get product details from data attributes
        const product = {
            name: button.dataset.name || "Unnamed Product",
            price: parseFloat(button.dataset.price) || 0,
            image: button.dataset.image || "default-image.png",
            quantity: parseInt(button.dataset.quantity, 10) || 1,
        };

        // Check if product is already in the cart, update quantity if it is
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }


        localStorage.setItem("cart", JSON.stringify(cart));
        updateWebCartBadge();
        renderWebCartItems();
        updateMobileCartBadge();
        renderMobileCartItems();
        updateMobileCartBadge(); // Synchronize with mobile badge

       

        // alert(`${product.name} has been added to the cart!`);
         // Play sound when adding a product to the cart
         const sound = new Audio("Sound/button-28.mp3"); // Replace with the actual path
         sound.play();
         
        triggerCartUpdateEvent();
    }
});







document.addEventListener("click", (e) => {
    if (e.target.classList.contains("drawercart-checkout")) {
        e.preventDefault();

        // Calculate subtotal and total
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 100; // Static shipping cost (consistent with cart.js)
        const total = subtotal + shipping;

        // Check if the cart is empty
        if (cart.length === 0) {
            alert("Your cart is empty. Add items to proceed to checkout.");
            return;
        }

        // Ensure total is valid
        if (isNaN(total) || total <= 0) {
            alert("Error calculating total. Please try again.");
            return;
        }

        // Save full checkout data to match the cart page behavior
        const checkoutData = {
            cart,       // Array of items in the cart
            subtotal,   // Subtotal cost
            shipping,   // Shipping cost
            total,      // Total cost
        };

        // Save the checkout data in localStorage
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

        // Redirect to the billing page
        window.location.href = "/billing.html";
    }
});


document.body.addEventListener("click", (e) => {
    // Decrease quantity
    if (e.target.classList.contains("bi-dash-square")) {
        const productName = e.target.getAttribute("data-name");
        const product = cart.find((item) => item.name === productName);
        if (product && product.quantity > 1) {
            product.quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderWebCartItems();
            renderMobileCartItems();
            updateWebCartBadge();
            updateMobileCartBadge();
            triggerCartUpdateEvent();
        }
    }

    // Increase quantity
    if (e.target.classList.contains("bi-plus-square")) {
        const productName = e.target.getAttribute("data-name");
        const product = cart.find((item) => item.name === productName);
        if (product) {
            product.quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderWebCartItems();
            renderMobileCartItems();
            updateWebCartBadge();
            updateMobileCartBadge();
            triggerCartUpdateEvent();
        }
    }

    // Other code for removing item from cart...
});


// // Sync Cart on Updates
// document.body.addEventListener("cart-updated", () => {
//     updateWebCartBadge();
//     renderWebCartItems();
//     updateMobileCartBadge();
//     renderMobileCartItems();
// });






