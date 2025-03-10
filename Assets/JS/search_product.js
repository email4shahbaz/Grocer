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
	// searchInput.parentNode.appendChild(searchSuggestionsContainer);

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

	// Handle search input
	// searchInput.addEventListener("input", (e) => {
	// 	const query = e.target.value.trim();
	// 	if (query.length > 0) {
	// 		const filteredProducts = filterProducts(query);
	// 		//renderSuggestions(filteredProducts);
	// 		searchSuggestionsContainer.style.display = "block";
	// 	} else {
	// 		searchSuggestionsContainer.style.display = "none";
	// 	}
	// });

	// // Hide suggestions on clicking outside
	// document.addEventListener("click", (e) => {
	// 	if (
	// 		!searchInput.contains(e.target) &&
	// 		!searchSuggestionsContainer.contains(e.target)
	// 	) {
	// 		searchSuggestionsContainer.style.display = "none";
	// 	}
	// });

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