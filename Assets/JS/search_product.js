let dropdownCats=[];
let productsContainer;

document.addEventListener("HeaderFooterScriptsLoaded", () => {
	productsContainer = document.getElementById("product-grid");

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

	
	

	// Render the selected product on the search page
	
	const query = new URLSearchParams(window.location.search).get("query");

	if (query && productsContainer) {
		fetch("/Assets/json_files/all_products.json")
			.then((response) => response.json())
			.then((data) => {
				const products = data.filter((item) => item.name.toLowerCase().includes(query.toLocaleLowerCase()));

				if (products) {
					renderSearchProducts(products);
				} else {
					productsContainer.innerHTML = `<p>Product not found.</p>`;
				}
			})
			.catch((error) => console.error("Error loading product:", error));
	}

	if(dropdownCats==0){
		getCategories();
	}
	
});



// Function to render a product
function renderSearchProducts(products) {
    if (!productsContainer) return;

    productsContainer.innerHTML = products.length
        ? products.map(renderSearchProductItem).join("")
        : `<p>Product not found.</p>`;


}

function renderSearchProductItem(product) {
	const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
	const discountPercent = hasDiscount
		? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
		: 0;

	const discountBadgeHTML = hasDiscount
		? `<div class="discount-badge">Save ${discountPercent}%</div>`
		: "";
  return ` <div class="col-sm-3 col-md-3 col-lg-3 mb-3 GridsTargetContent">
                <div class="ProductsCardSearchANDCategory position-relative">
                    ${discountBadgeHTML}
                    <div class="CategoryMainCardImage">
                        <a href="product-details.html?product-id=${product.id}&category-file=${product.categoryName.toLowerCase()}.json">
                            <img src="${product.image}" class="card_main_image p-2" alt="${product.name}">
                        </a>
                    </div>
                    <div class="card-body">
                        <h1 class="h2 searchcard_heading">${product.name}</h1>
                        <h1 class="searchpricetag">
                            ${hasDiscount ? `<span class="searchpricetag">${product.discountedPrice}$</span> <span class="text-muted text-decoration-line-through">${product.price}$</span>` : `${product.price}$`}
                            <button class="searchaddbutton"
                                data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.discountedPrice}"
                                data-image="${product.image}">
                                <img src="/Assets/Images/SmallIcons/Bag.png" alt="">
                            </button>
                        </h1>
                    </div>
                    <div class="d-flex justify-between items-center gap-1 RatingStars">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star unChecked"></span>
                        <div class="col text-center align-self-center"></div>
                    </div>
                </div>
            </div>`;
	//  return `
	// 	  <div class="position-relative ProductsCard_Animations ProductCardImage FeaturedProductsCard">
	// 		  <div class="productcardImage text-center">
	// 			  <!-- Discount Badge -->
	// 			  ${discountPercentage ? `<span class="discount-badge">Save ${discountPercentage}%</span>` : ''}

	// 			  <a href="product-details.html?product-id=${product.id}&category-file=${product.categoryFile}">
	// 				  <img src="${product.image}" 
	// 					   onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'" 
	// 					   class="featuredProductImage" alt="${product.name}" loading="lazy">
	// 			  </a>
	// 				 <div class="product-overlay-icons">
	// 				  <button class="wishlist-icon" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${product.categoryFile}">
	// 					  <i class="bi bi-heart"></i>
	// 				  </button>
	// 				<button class="eye-icon" data-id="${product.id}" data-category="${product.categoryFile}">
	// 				  <i class="bi bi-eye"></i>
	// 				</button>
	// 			  </div>
	// 		  </div>
	// 		  <div class="card-body">
	// 			  <p class="BestSellCardName">${product.categoryName}</p>
	// 			  <div class="bestSellCardNameAndUnitHeadingMain">
	// 				  <h1 class="h2 BestSellCardHeading">${product.name}</h1>
	// 				  <h4>${product.unit}</h4>
	// 			  </div>

	// 			  <div class="d-flex align-items-center rating">
	// 				  <div class="stars">
	// 					  <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
	// 					  <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
	// 					  <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
	// 					  <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
	// 					  <img src="Assets/Images/Icons/rating-star-unchecked.png" alt="star-unchecked" />
	// 				  </div>
	// 				  <span class="NoOfstars">(${product.rating})</span>
	// 			  </div>
	// 			  <p class="offer">Limited time offer</p>
	// 			  <div class="PriceDivFeaturedProduct mt-2">
	// 				  <div class="d-flex">
	// 					  <h1 class="pricetag align-self-center">${product.price}$</h1>
	// 					  ${product.discountedPrice ? `<h1 class="crosspricetag text-decoration-line-through align-self-center mx-2">${product.discountedPrice}$</h1>` : ''}
	// 				  </div>
	// 				  <div class="text-end align-self-center">
	// 					  <button class="btn addbutton py-2" 
	// 							  data-id="${product.id}" 
	// 							  data-name="${product.name}" 
	// 							  data-price="${product.discountedPrice}" 
	// 							  data-image="${product.image}" 
	// 							  data-quantity="1">
	// 						  <i class="bi bi-cart"></i>&nbsp;Add
	// 					  </button>
	// 				  </div>
	// 			  </div>

				 
	// 		  </div>
	// 	  </div>
	//   `;
	 
}



