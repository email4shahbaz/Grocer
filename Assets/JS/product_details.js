
    // let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // // Function to update the drawer cart UI
    // function updateDrawerCart() {
    //     const cartDrawerBody = document.querySelector("#cartDrawer .cart-drawer-body");
    //     const cartDrawerFooter = document.querySelector("#cartDrawer .cart-drawer-footer");
    //     const cartTotalElement = document.querySelector(".mycartCustomHeading2");

    //     if(cartTotalElement!=null){
    //         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    //         const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    //         //cartBadge.textContent = totalItems;
    //         cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    //         cartDrawerBody.innerHTML = ""; // Clear previous items

    //         if (cart.length === 0) {
    //             cartDrawerBody.innerHTML = `<p class="text-center mt-3">Your cart is empty.</p>`;
    //             cartDrawerFooter.innerHTML = ""; // No footer if cart is empty
    //         } 
    //         else {
    //             let totalPrice = 0;

    //             cart.forEach((item) => {
    //                 totalPrice += item.price * item.quantity;

    //                 // Create a cart item element
    //                 const cartItem = `
    //                     <div class="cart-item d-flex justify-content-between align-items-center mb-3">
    //                     <div class="d-flex align-items-center">
    //                         <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
    //                         <span>${item.name} </span>
    //                     </div>
    //                     <div class="d-flex align-items-center">
    //                 <button class="btn btn-sm quantity-button decrement" data-name="${item.name}">
    //                     <span  class="arrow down"></span>
    //                 </button>
    //             <span class="">${item.quantity}</span>
    //                 <button class="btn btn-sm quantity-button increment" data-name="${item.name}">
    //                     <span class="arrow up"></span>
    //                 </button>
    //                 <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    //                 <button class="btn btn-danger-green btn-sm remove-cart-item" data-name="${item.name}">X</button>
    //             </div>
    //                 </div>
    //             `;
    //             cartDrawerBody.insertAdjacentHTML("beforeend", cartItem);
    //         });
            

    //         // Update footer with total price and action buttons
    //         cartDrawerFooter.innerHTML = `
    //             <div class="d-flex justify-content-between align-items-center mb-3">
    //                 <span class="fw-bold">Total:</span>
    //                 <span class="fw-bold">$${totalPrice.toFixed(2)}</span>
    //             </div>
    //             <div class="d-flex justify-content-between">
    //                 <a href="/cart.html" class="btn btn-primary">My Cart</a>
    //                 <a href="/billing.html" class="btn btn-success">Checkout</a>
    //             </div>
    //         `;
    //     }

    //     // Add event listeners for remove buttons
    //     document.querySelectorAll(".remove-cart-item").forEach((button) => {
    //         button.addEventListener("click", (e) => {
    //             const productName = e.target.getAttribute("data-name");
    //             cart = cart.filter((item) => item.name !== productName);
    //             localStorage.setItem("cart", JSON.stringify(cart));
    //             updateDrawerCart(); // Re-render the cart drawer
    //         });
    //     });
    //     }
    // }

    

    // function addToCart(product) {
    //     const existingProduct = cart.find((item) => item.name === product.name);

    //     if (existingProduct) {
    //         existingProduct.quantity += product.quantity;
    //     } else {
    //         cart.push(product);
    //     }

    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     updateDrawerCart();

    //     // Automatically open the cart drawer
    //     cartDrawer.classList.add("open");
    //     cartDrawerOverlay.style.display = "block";
    // }




    // Fetch product details
    function getProductDetails() {
        const productName = document.querySelector("#product-name").innerText;
        const productPrice = parseFloat(document.querySelector("#product-price").innerText.replace("$", ""));
        const productImage = document.querySelector("#product-image").src;
        const productQuantity = parseInt(document.getElementById("counting").innerText, 10);

        return {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: productQuantity,
        };
    }

    





document.addEventListener("DOMContentLoaded", async () => {
   

//     // Open and close drawer functionality
//     const cartDrawer = document.getElementById("cartDrawer");
//     const cartDrawerOverlay = document.querySelector(".cart-drawer-overlay");
//     const openCartDrawer = document.getElementById("openCartDrawer");
//     const closeCartDrawer = document.getElementById("cartDrawerClose");

//     if(openCartDrawer!=null){
//         openCartDrawer.addEventListener("click", (e) => {
//             e.preventDefault();
//             cartDrawer.classList.add("open");
//             cartDrawerOverlay.style.display = "block";
//         });
// }

//     // const closeDrawer = () => {
//     //     cartDrawer.classList.remove("open");
//     //     cartDrawerOverlay.style.display = "none";
//     // };

//     // closeCartDrawer.addEventListener("click", closeDrawer);
//     if(cartDrawerOverlay!=null){
//         cartDrawerOverlay.addEventListener("click", closeDrawer);
//     }

    //updateDrawerCart(); // Initialize the cart drawer on page load

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    //updateCartBadge(cartItems.length);


    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product-id");
    const categoryFile = urlParams.get("category-file");

    if (!productId || !categoryFile) {
        const productDetails = document.getElementById("product-details");
        if(productDetails!=null){
            documentDetails.innerHTML = "<p>Product details not found.</p>";
        }
        return;
    }

    try {
        const response = await fetch(`Assets/json_files/${categoryFile}`);
        if (!response.ok) throw new Error("Failed to load product details.");

        const products = await response.json();
        const product = products.find((p) => p.id === productId);

        if (!product) {
            document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
            return;
        }

        renderProductDetails(product);
        // setupQuantityControls();
        //setupFavoriteButton(product, categoryFile);
    } catch (error) {
        console.error("Error loading product details:", error);
        document.getElementById("product-details").innerHTML = "<p>Failed to load product details. Please try again later.</p>";
    }
});




function renderDiscountBadge(product) {
    // Select the badge placeholder
    const badgeElement = document.getElementById("product-badge");

    // Determine the badge content
    let badgeText = "";
    if (product.discountedPrice) {
        const discountPercentage = Math.round(
            ((product.price - product.discountedPrice) / product.price) * 100
        );
        badgeText = `${discountPercentage}% OFF`;
    } else if (product.stock <= 5) {
        badgeText = "Limited Stock!";
        badgeElement.style.backgroundColor = "#ff9800"; // Change color for limited stock
    }

    // If there's badge content, update and show the badge
    if (badgeText) {
        badgeElement.innerText = badgeText;
        badgeElement.style.display = "block";
    } else {
        badgeElement.style.display = "none"; // Hide the badge if no content
    }
}





function addFomoAndBadge(product) {
    

    // Add FOMO Message
   
    const fomoSection = document.createElement("div");
    fomoSection.className = "fomo-message";

    // Generate a unique FOMO message based on product properties
    const fomoMessages = [
        `Hurry! Only ${product.stock || 5} items left in stock. Order now!`,
        `${product.name} is trending! Don't miss out on this popular item.`,
        `Limited time offer on ${product.name}. Buy before the deal ends!`,
        `Best seller alert! ${product.name} is running out fast.`,
    ];
    const randomMessage = fomoMessages[Math.floor(Math.random() * fomoMessages.length)];

    fomoSection.innerHTML = `
        <i class="bi bi-exclamation-circle-fill"></i>
        ${randomMessage}
    `;

    // Add the FOMO message below the product description
    const fomoDiv = document.getElementById("fomo-div");


    fomoDiv.innerHTML=`
        <i class="bi bi-exclamation-circle-fill"></i>
        ${randomMessage}
    `;
}

// Modify the `renderProductDetails` function to include FOMO and Badge


function renderProductDetails(product) {
    document.getElementById("product-name").innerText = product.name || "Unknown Product";
    document.getElementById("product-price").innerText = `$${product.discountedPrice || product.price}`;
    document.getElementById("product-cut-price").innerText = product.discountedPrice
        ? `$${product.price}`
        : "";
    const discount = product.discountedPrice
        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
        : 0;
    document.getElementById("product-discount").innerText = discount > 0 ? `${discount}% off` : "No Discount";
    document.getElementById("product-description").innerText = product.detailedDescription || "No description available.";
    document.getElementById("product-image").src = product.image || "Assets/Images/Placeholder.png";
    document.getElementById("product-sku").innerText = product.sku || "N/A";
    const starsHtml = renderStars(product.rating || 0);
    document.getElementById("product-rating").innerHTML = starsHtml;
    const tags = product.tags ? product.tags.join(", ") : "No Tags";
    document.getElementById("product-tags").innerText = tags;
    document.getElementById("product-category").innerText = product.categoryName || "Unknown";
     // Render Nutrition Information
  if (product.nutrition) {
    document.getElementById("nutrition-info").innerHTML = `
        <ul>
            <li>Calories: ${product.nutrition.calories} kcal</li>
            <li>Protein: ${product.nutrition.protein}</li>
            <li>Fats: ${product.nutrition.fats}</li>
            <li>Carbohydrates: ${product.nutrition.carbohydrates}</li>
        </ul>`;
} else {
    document.getElementById("nutrition-info").innerText = "No nutrition information available.";
}

    //Render Add to Cart Button
    const addToCartButton = document.getElementById("btnAddToCart");
    if (addToCartButton) {
        addToCartButton.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <button id="add-to-cart-btn" class="cart_buttonproduct addbutton"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.discountedPrice}"
                        data-image="${product.image}"
                        data-quantity="1">
                            Add To Cart
                        <img src="/Assets/Images/SmallIcons/Bagwhite.webp" alt="Cart Icon">
                    </button>
                    <div class="wishlist-btn">
                        <button class="wishlist-icon" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${product.categoryName.toLowerCase()}_product.json">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                
                </div>`;
    }

    // Add Badge and FOMO elements
    addFomoAndBadge(product);
    // Render Discount Badge
    renderDiscountBadge(product);
}





// Helper function to render star ratings
function renderStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += `<span class="fa fa-star ${i < rating ? "checked" : "unChecked"}"></span>`;
    }
    return stars;
}




document.addEventListener("DOMContentLoaded", async function () {
   
  

    const incrementButton = document.getElementById("increment-btn");
    const decrementButton = document.getElementById("decrement-btn");
    const quantityDisplay = document.getElementById("counting");

    // Use Number instead of parseInt for accuracy
    let currentQuantity = Number(quantityDisplay.innerText);

    incrementButton.addEventListener("click", () => {
        currentQuantity += 1;
        quantityDisplay.innerText = currentQuantity;
        document.getElementById("add-to-cart-btn").dataset.quantity = currentQuantity;
    });

    decrementButton.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity -= 1;
            quantityDisplay.innerText = currentQuantity;
            document.getElementById("add-to-cart-btn").dataset.quantity = currentQuantity;
        }
    });


    
    

     const categoryContainer = document.querySelector('.homecategoryProductsMain');

    try {
        // Fetch the category data
        const response = await fetch('Assets/json_files/category_product.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categories = await response.json(); // Parse the JSON file

        // Background classes for styling
        const bgClasses = ['bg-pink', 'bg-light-green', 'bg-light-yellow', 'bg-light-blue', 'bg-light-orange', 'bg-light-lime'];

        
        // Loop through categories
        categories.forEach((category, index) => {
            const categoryId = category.id;
            const categoryName = category.name;
            const categoryDescription = category.description;
            const categoryImage = category.image;
            const products = category.products || []; // Get the products array or fallback to empty array

            // Calculate the number of items in the category
            const productCount = products.length;

            // Select a background class cyclically
            const bgClass = bgClasses[index % bgClasses.length];

            // Create a category card
            const categoryCard = document.createElement('div');
            
            //categoryCard.classList.add('swiper-slide mt-sm-5', 'mt-md-5', 'mt-lg-0');

            categoryCard.innerHTML = `
                <a href="category-product.html?category-id=${categoryId}&category-file=${category.file}">
                    <div class="CategoryCard ${bgClass} text-center border-0">
                        <div class="ImageDiv">
                            <img src="${categoryImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                class="CategoryCardImage" alt="${categoryName}">
                        </div>
                        <div class="card-body">
                            <h1 class="h2 card_heading">${categoryName}</h1>
                            <span class="card-text count">${productCount} items</span>
                            <p class="card-text card_descri">${categoryDescription}</p>
                        </div>
                    </div>
                </a>
            `;

            // Append the category card to both containers
            categoryContainer.appendChild(categoryCard);
            //swiper.appendSlide(categoryCard);
        });


    } catch (error) {
        console.error("Error fetching categories:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }


});



// function setupFavoriteButton(product, categoryFile) {
//     const favoriteButton = document.querySelector(".love_button");
//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//     // Check if product is already in the wishlist
//     const isFavorite = wishlist.some((item) => item.id === product.id && item.categoryFile === categoryFile);
//     if (isFavorite) {
//         favoriteButton.classList.add("active");
//     }

//     favoriteButton.addEventListener("click", () => {
//         wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//         const isFavorite = wishlist.some((item) => item.id === product.id && item.categoryFile === categoryFile);

//         if (isFavorite) {
//             wishlist = wishlist.filter((item) => !(item.id === product.id && item.categoryFile === categoryFile));
//             favoriteButton.classList.remove("active");
//             alert(`${product.name} removed from your wishlist.`);
//         } else {
//             wishlist.push({ ...product, categoryFile });
//             favoriteButton.classList.add("active");
//             alert(`${product.name} added to your wishlist.`);
//         }

//         localStorage.setItem("wishlist", JSON.stringify(wishlist));
        
//         // Update wishlist counter after modification
//         updateWishlistCounter(wishlist);
//     });
// }
