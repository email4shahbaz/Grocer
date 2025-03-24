//const newLocal = ".cart-drawer-overlay";
document.addEventListener("HeaderFooterScriptsLoaded", () => {
    // let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // // Functions for Web View
    // function updateWebCartBadge() {
    //     const webCartBadge = document.getElementById("cartBadge");
    //     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    //     if (webCartBadge) webCartBadge.textContent = totalItems;
    // }

    // function renderWebCartItems() {
    //     const cartDrawerBody = document.querySelector("#cartDrawer .cart-drawer-body");
    //     const cartDrawerFooter = document.querySelector("#cartDrawer .cart-drawer-footer");
    //     const cartTotalElement = document.querySelector(".mycartCustomHeading2");

    //    // cartDrawerBody.innerHTML = "";
    //     if (cart.length === 0) {
    //        // cartDrawerBody.innerHTML = `<p class="text-center mt-3">Your cart is empty.</p>`;
    //         if (cartDrawerFooter) cartDrawerFooter.innerHTML = "";
    //         return;
    //     }

    //     let totalPrice = 0;
    //     cart.forEach((item) => {
    //         totalPrice += item.price * item.quantity;
    //         const cartItem = `
    //             <div class="cart-item d-flex justify-content-between align-items-center mb-3">
    //                 <div class="d-flex align-items-center">
    //                     <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
    //                     <span>${item.name} </span>
    //                 </div>
    //                 <div class="d-flex align-items-center ">
    //                     <button class="btn btn-sm quantity-button decrement">
    //                         <i class="bi bi-dash-square" data-name="${item.name}"></i>
    //                     </button>
    //                     <span class="">${item.quantity}</span>
    //                     <button class="btn btn-sm quantity-button increment mx-2">
    //                         <i class="bi bi-plus-square" data-name="${item.name}"></i>
    //                     </button>
    //                     <strong style="margin-left: 15px">$${(item.price * item.quantity).toFixed(2)}</strong>
    //                     <div class="btn btn remove-cart-item"><i class="bi bi-trash"  data-name="${item.name}"></i></div>
    //                 </div>
    //             </div>
    //         `;
    //         cartDrawerBody.insertAdjacentHTML("beforeend", cartItem);
    //     });

    //     if (cartDrawerFooter) {
    //         cartDrawerFooter.innerHTML = `
    //             <div class="d-flex justify-content-between align-items-center mb-3">
    //                 <span class="fw-bold">Total:</span>
    //                 <span class="fw-bold">$${totalPrice.toFixed(2)}</span>
    //             </div>
    //             <div class="d-flex justify-content-between">
    //                 <a href="/cart.html" class="btn btn-primary">My Cart</a>
    //                 <a href="/billing.html" class="drawercart-checkout btn btn-success">Checkout</a>
    //             </div>
    //         `;
    //     }

    //     document.querySelectorAll("#cartDrawer .remove-cart-item").forEach((button) => {
    //         button.addEventListener("click", (e) => {
    //             const productName = e.target.getAttribute("data-name");
    //             alert(productName);
    //             cart = cart.filter((item) => item.name !== productName);
    //             localStorage.setItem("cart", JSON.stringify(cart));
    //             renderWebCartItems();
    //             updateWebCartBadge();
    //             updateMobileCartBadge(); // Synchronize with mobile badge
    //             triggerCartUpdateEvent();
    //         });
    //     });

    //     if (cartTotalElement) cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    // }

    // // Functions for Mobile View
    // function updateMobileCartBadge() {
    //     const mobileCartBadge = document.getElementById("mobileCartBadge");
    //     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    //     if (mobileCartBadge) mobileCartBadge.textContent = totalItems;
    // }

   

    // function renderMobileCartItems() {
    //     const cartBody = document.querySelector("#mobileCartDrawer .cart-drawer-body");
    //     const cartFooter = document.querySelector("#mobileCartDrawer .cart-drawer-footer");

    //     //cartBody.innerHTML = "";
    //     if (cart.length === 0) {
    //        // cartBody.innerHTML = "<p>Your cart is empty.</p>";
    //         if (cartFooter) cartFooter.innerHTML = "";
    //         return;
    //     }

    //     let totalPrice = 0;
    //     cart.forEach((item) => {
    //         totalPrice += item.price * item.quantity;
    //         const cartItem = `
    //             <div class="cart-item d-flex justify-content-between align-items-center mb-3">
    //                 <div class="d-flex align-items-center">
    //                     <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
    //                     <span>${item.name}</span>
    //                 </div>
    //                 <div class="d-flex align-items-center">
    //                     <button class="btn btn-sm quantity-button decrement">
    //                         <i class="bi bi-dash-square" data-name="${item.name}"></i>
    //                     </button>
    //                 <span class="mx-2">${item.quantity}</span>
    //                     <button class="btn btn-sm quantity-button increment" data-name="${item.name}">
    //                         <span class="arrow up"></span>
    //                     </button>
    //                     <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    //                     <button class="btn btn-sm quantity-button increment mx-2">
    //                         <i class="bi bi-plus-square" data-name="${item.name}"></i>
    //                     </button>
    //                     <div class="btn btn remove-cart-item"><i class="bi bi-trash"  data-name="${item.name}"></i></div>
    //                 </div>
    //             </div>
    //         `;
    //         cartBody.insertAdjacentHTML("beforeend", cartItem);
    //     });

    //     if (cartFooter) {
    //         cartFooter.innerHTML = `
    //             <div class="d-flex justify-content-between align-items-center mb-3">
    //                 <span>Total:</span>
    //                 <strong>$${totalPrice.toFixed(2)}</strong>
    //             </div>
    //             <div class="d-flex justify-content-between">
    //                 <a href="/cart.html" class="btn btn-primary">View Cart</a>
    //                 <a href="/billing.html" class="drawercart-checkout btn btn-success">Checkout</a>
    //             </div>
    //         `;
    //     }

    //     document.querySelectorAll("#mobileCartDrawer .remove-cart-item").forEach((button) => {
    //         button.addEventListener("click", (e) => {
    //             const productName = e.target.getAttribute("data-name");
    //             cart = cart.filter((item) => item.name !== productName);
    //             localStorage.setItem("cart", JSON.stringify(cart));
    //             renderMobileCartItems();
    //             updateMobileCartBadge();
    //             updateWebCartBadge(); // Synchronize with web badge
    //             triggerCartUpdateEvent();
    //         });
    //     });
    // }

    // // Trigger a custom event when the cart is updated
    // function triggerCartUpdateEvent() {
    //     const cartUpdatedEvent = new CustomEvent("cart-updated");
    //     document.body.dispatchEvent(cartUpdatedEvent);
    // }

    
    // // Add to Cart Functionality
    // document.body.addEventListener("click", (e) => {
    //     if (
    //         e.target.classList.contains("searchaddbutton") ||
    //         e.target.classList.contains("BestSellCardAddButton") ||
    //         e.target.classList.contains("LastCardAddButton") ||
    //         e.target.classList.contains("addbutton")
            
    //     ) {
    //         const button = e.target;

    //         // Get product details from data attributes
    //         const product = {
    //             name: button.dataset.name || "Unnamed Product",
    //             price: parseFloat(button.dataset.price) || 0,
    //             image: button.dataset.image || "default-image.png",
    //             quantity: parseInt(button.dataset.quantity, 10) || 1,
    //         };

    //         // Check if product is already in the cart, update quantity if it is
    //         const existingProduct = cart.find((item) => item.name === product.name);
    //         if (existingProduct) {
    //             existingProduct.quantity += product.quantity;
    //         } else {
    //             cart.push(product);
    //         }


    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         updateWebCartBadge();
    //         renderWebCartItems();
    //         updateMobileCartBadge();
    //         renderMobileCartItems();
    //         updateMobileCartBadge(); // Synchronize with mobile badge

    //         // Open the appropriate drawer and overlay
    //         const isMobile = window.innerWidth <= 768;
    //         if (isMobile) {
    //             document.getElementById("mobileCartDrawer").classList.add("open");
    //             document.querySelector(newLocal).style.display = "block";
    //         } else {
    //             document.getElementById("cartDrawer").classList.add("open");
    //             document.querySelector(".cart-drawer-overlay").style.display = "block";
    //         }

    //         // alert(`${product.name} has been added to the cart!`);
    //          // Play sound when adding a product to the cart
    //          const sound = new Audio("Sound/button-28.mp3"); // Replace with the actual path
    //          sound.play();
             
    //         triggerCartUpdateEvent();
    //     }
    // });




   


    // document.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("drawercart-checkout")) {
    //         e.preventDefault();
    
    //         // Calculate subtotal and total
    //         const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    //         const shipping = 100; // Static shipping cost (consistent with cart.js)
    //         const total = subtotal + shipping;
    
    //         // Check if the cart is empty
    //         if (cart.length === 0) {
    //             alert("Your cart is empty. Add items to proceed to checkout.");
    //             return;
    //         }
    
    //         // Ensure total is valid
    //         if (isNaN(total) || total <= 0) {
    //             alert("Error calculating total. Please try again.");
    //             return;
    //         }
    
    //         // Save full checkout data to match the cart page behavior
    //         const checkoutData = {
    //             cart,       // Array of items in the cart
    //             subtotal,   // Subtotal cost
    //             shipping,   // Shipping cost
    //             total,      // Total cost
    //         };
    
    //         // Save the checkout data in localStorage
    //         localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    
    //         // Redirect to the billing page
    //         window.location.href = "/billing.html";
    //     }
    // });
    

    // document.body.addEventListener("click", (e) => {
    //     // Decrease quantity
    //     if (e.target.classList.contains("bi-dash-square")) {
    //         const productName = e.target.getAttribute("data-name");
    //         const product = cart.find((item) => item.name === productName);
    //         if (product && product.quantity > 1) {
    //             product.quantity--;
    //             localStorage.setItem("cart", JSON.stringify(cart));
    //             renderWebCartItems();
    //             renderMobileCartItems();
    //             updateWebCartBadge();
    //             updateMobileCartBadge();
    //             triggerCartUpdateEvent();
    //         }
    //     }
    
    //     // Increase quantity
    //     if (e.target.classList.contains("bi-plus-square")) {
    //         const productName = e.target.getAttribute("data-name");
    //         const product = cart.find((item) => item.name === productName);
    //         if (product) {
    //             product.quantity++;
    //             localStorage.setItem("cart", JSON.stringify(cart));
    //             renderWebCartItems();
    //             renderMobileCartItems();
    //             updateWebCartBadge();
    //             updateMobileCartBadge();
    //             triggerCartUpdateEvent();
    //         }
    //     }
    
    //     // Other code for removing item from cart...
     });
    



//    // Drawer open/close functionality for both views
// const webCartDrawer = document.getElementById("cartDrawer");
// const mobileCartDrawer = document.getElementById("mobileCartDrawer");
// const cartOverlay = document.querySelector(".cart-drawer-overlay");

// // Close Drawer Logic
// function closeDrawer() {
//     if (webCartDrawer) webCartDrawer.classList.remove("open");
//     if (mobileCartDrawer) mobileCartDrawer.classList.remove("open");
//     cartOverlay.style.display = "none";
// }

// Web Cart Drawer



//     // Initialize both views
//     updateWebCartBadge();
//     renderWebCartItems();
//  //   updateMobileCartBadge();
//   //  renderMobileCartItems();
// });























            


// Animated Drawer Cart


    // document.addEventListener("DOMContentLoaded", () => {
    //     const cartDrawer = document.getElementById("cartDrawer");
    //     const cartDrawerOverlay = document.querySelector(".cart-drawer-overlay");
    //     const openCartDrawer = document.getElementById("openCartDrawer");
    //     const closeCartDrawer = document.getElementById("cartDrawerClose");
    
    //     // Open drawer
    //     if (openCartDrawer) {
    //         openCartDrawer.addEventListener("click", (e) => {
    //             e.preventDefault();
    //             cartDrawer.classList.add("open");
    //             cartDrawerOverlay.classList.add("active");
    //         });
    //     }

        
    
    //     // Close drawer
    //     if (closeCartDrawer) {
    //         closeCartDrawer.addEventListener("click", () => {
    //             cartDrawer.classList.remove("open");
    //             cartDrawerOverlay.classList.remove("active");
    //         });
    //     }
    
    //     // Close drawer on overlay click
    //     if (cartDrawerOverlay) {
    //         cartDrawerOverlay.addEventListener("click", () => {
    //             cartDrawer.classList.remove("open");
    //             cartDrawerOverlay.classList.remove("active");
    //         });
    //     }
    // });

    

// Animated Closer Button 

    // document.addEventListener("DOMContentLoaded", () => {
    //     const cartDrawer = document.getElementById("cartDrawer");
    //     const cartDrawerOverlay = document.querySelector(".cart-drawer-overlay");
    //     const openCartDrawer = document.getElementById("openCartDrawer");
    //     const closeCartDrawer = document.getElementById("cartDrawerClose");
    
    //     // Open drawer
    //     if (openCartDrawer) {
    //         openCartDrawer.addEventListener("click", (e) => {
    //             e.preventDefault();
    //             cartDrawer.classList.add("open");
    //             cartDrawerOverlay.classList.add("active");
    //         });
    //     }
    
    //     // Close drawer with animated button
    //     if (closeCartDrawer) {
    //         closeCartDrawer.addEventListener("click", () => {
    //             closeCartDrawer.classList.add("rotate"); // Add rotation class
    //             setTimeout(() => {
    //                 closeCartDrawer.classList.remove("rotate"); // Remove rotation after animation
    //                 cartDrawer.classList.remove("open");
    //                 cartDrawerOverlay.classList.remove("active");
    //             }, 400); // Match the duration of the rotation animation
    //         });
    //     }
    
    //     // Close drawer on overlay click
    //     if (cartDrawerOverlay) {
    //         cartDrawerOverlay.addEventListener("click", () => {
    //             cartDrawer.classList.remove("open");
    //             cartDrawerOverlay.classList.remove("active");
    //         });
    //     }
    // });
    





    // Mobile Animation Drawer Cart


    document.addEventListener("DOMContentLoaded", () => {
        const mobileCartDrawer = document.getElementById("mobileCartDrawer");
        const mobileCartOverlay = document.querySelector(".cart-drawer-overlay");
        const openMobileCartDrawer = document.getElementById("openMobileCartDrawer");
        const closeMobileCartDrawer = document.getElementById("mobileCartDrawerClose");
    
        // Open Drawer
        // openMobileCartDrawer.addEventListener("click", () => {
        //     mobileCartDrawer.classList.add("open");
        //     mobileCartOverlay.classList.add("active");
        // });
    
        // Close Drawer
        // const closeDrawer = () => {
        //     mobileCartDrawer.classList.remove("open");
        //     mobileCartOverlay.classList.remove("active");
        // };
    
        // closeMobileCartDrawer.addEventListener("click", closeDrawer);
        // mobileCartOverlay.addEventListener("click", closeDrawer);
    });
    


