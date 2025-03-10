// document.addEventListener("DOMContentLoaded", () => {
//     const searchInput = document.getElementById("mobile_search_input");
//     const searchSuggestionsContainer = document.getElementById("mobile_search_suggestions");

//     let allProducts = [];
//     const jsonFiles = [
//         "/Assets/json_files/all_products.json",
//         "/Assets/json_files/latest_product.json",
//         "/Assets/json_files/featured_product.json",
//     ];

//     Promise.all(jsonFiles.map((file) => fetch(file).then((response) => response.json())))
//         .then((data) => {
//             allProducts = data.flat();
//         })
//         .catch((error) => console.error("Error loading products:", error));

//     function filterProducts(query) {
//         return allProducts.filter((product) =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//         );
//     }

    
//     searchInput.addEventListener("input", (e) => {
//         const query = e.target.value.trim();
//         if (query.length > 0) {
//             const filteredProducts = filterProducts(query);
//             renderSuggestions(filteredProducts);
//             searchSuggestionsContainer.style.display = "block";
//         } else {
//             searchSuggestionsContainer.style.display = "none";
//         }
//     });

//     document.addEventListener("click", (e) => {
//         if (!searchInput.contains(e.target) && !searchSuggestionsContainer.contains(e.target)) {
//             searchSuggestionsContainer.style.display = "none";
//         }
//     });




// // Render suggestions
// function renderSuggestions(suggestions) {
//     searchSuggestionsContainer.innerHTML = ""; // Clear previous suggestions

//     if (suggestions.length === 0) {
//         searchSuggestionsContainer.innerHTML = `<p style="padding: 8px; color: #888;">No products found</p>`;
//         return;
//     }

//     suggestions.forEach((product) => {
//         const suggestionItem = document.createElement("div");
//         suggestionItem.classList.add("suggestion-item");
//         suggestionItem.style.display = "flex";
//         suggestionItem.style.alignItems = "center";
//         suggestionItem.style.padding = "10px";
//         suggestionItem.style.cursor = "pointer";
//         suggestionItem.style.borderBottom = "1px solid #ddd";

//         suggestionItem.innerHTML = `
//             <img src="${product.image[0]}" alt="${product.name}" style="width: 40px; height: 40px; margin-right: 10px; border-radius: 4px;">
//             <div>
//                 <span style="font-weight: bold; color: #333;">${product.name}</span><br>
//                 <span style="font-size: 0.9rem; color: #555;">$${product.price.toFixed(2)}</span>
//             </div>
//         `;

//         suggestionItem.addEventListener("click", () => {
//             redirectToSearchedProductPage(product);
//         });

//         searchSuggestionsContainer.appendChild(suggestionItem);
//     });
// }

// // Redirect to the searched product page with query parameter
// function redirectToSearchedProductPage(product) {
//     const url = new URL(window.location.origin + "/search.html");
//     url.searchParams.set("id", product.id);
//     window.location.href = url;
// }

// // Handle search input
// searchInput.addEventListener("input", (e) => {
//     const query = e.target.value.trim();
//     if (query.length > 0) {
//         const filteredProducts = filterProducts(query);
//         renderSuggestions(filteredProducts);
//         searchSuggestionsContainer.style.display = "block";
//     } else {
//         searchSuggestionsContainer.style.display = "none";
//     }
// });

// // Hide suggestions on clicking outside
// document.addEventListener("click", (e) => {
//     if (!searchInput.contains(e.target) && !searchSuggestionsContainer.contains(e.target)) {
//         searchSuggestionsContainer.style.display = "none";
//     }
// });

// // Render the selected product on the search page
// const productContainer = document.getElementById("product-grid");
// const productId = new URLSearchParams(window.location.search).get("id");

// if (productId && productContainer) {
//     fetch("/Assets/json_files/all_products.json")
//         .then((response) => response.json())
//         .then((data) => {
//             const product = data.find((item) => item.id === productId);

//             if (product) {
//                 renderProduct(product);
//             } else {
//                 productContainer.innerHTML = `<p>Product not found.</p>`;
//             }
//         })
//         .catch((error) => console.error("Error loading product:", error));
// }

// // Function to render a product
// function renderProduct(product) {
//     productContainer.innerHTML = `
//         <div class="col-md-3 col-lg-3">
//             <div class="product-card">
//                 <div class="product-card-header">
                    
//                     <img src="${product.image[0]}" alt="${product.name}" class="product-image">
                 
//                 </div>
//                 <div class="product-card-body">
//                     <h3 class="product-name">${product.name}</h3>
//                     <p class="product-price">$${product.price.toFixed(2)}</p>
                 
//                     <p class="product-unit">${product.unit || ""}</p>
//                     <p class="product-discount">Discount: ${product.discount || 0}%</p>
//                     <p class="product-description">${product.description || ""}</p>
//                 </div>
//             </div>
//         </div>
//     `;
// }
    
// });
