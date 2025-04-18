document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector('.row.mt-3');
    const paginationContainer = document.querySelector('.pagination-container');
    let currentPage = 1;
    const productsPerPage = 6;

    if (!productGrid) {
        console.error("Product grid element not found. Check the selector '.row.mt-3'.");
        return;
    }

    try {
        const response = await fetch('/Assets/json_files/all_products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        const totalPages = Math.ceil(products.length / productsPerPage);

        // Render products for the current page
        function renderPage(page) {
            productGrid.innerHTML = '';
            console.log(`Rendering page: ${page}`);

            const startIndex = (page - 1) * productsPerPage;
            const endIndex = Math.min(startIndex + productsPerPage, products.length);
            const currentProducts = products.slice(startIndex, endIndex);

            currentProducts.forEach(product => {
                const productId = product.id;
                const productName = product.name;
                const productImage = product.image[0];
                const productPrice = product.price;
                const productRating = 4; // Default rating for now

                const productCard = document.createElement('div');
                productCard.classList.add('col-sm-6', 'col-md-6', 'col-lg-4', 'mb-4', 'GridsTargetContent');
                productCard.innerHTML = `
                    <div class="ProductsCardSearchANDCategory ProductsCard_Animations ProductCardImage mt-3">
                        <div class="heart">
                            <i class="bi bi-heart"></i>
                        </div>
                        <div class="eye">
                           <a href="product-details.html?product-id=${productId}&category-file=all_products.json" class="product-details-link" data-id="${productId}" data-category="all_products.json">
                                <i class="bi bi-eye"></i>
                            </a>
                        </div>
                        <div class="CategoryMainCardImage">
                          <a href="product-details.html?product-id=${productId}&category-file=all_products.json" class="product-details-link" data-id="${productId}" data-category="all_products.json">
                                <img src="${productImage}"
                                     onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                     class="card_main_image p-2" alt="${productName}">
                            </a>
                        </div>
                        <div class="card-body">
                            <h1 class="h2 searchcard_heading">${productName}</h1>
                            <div class="row d-flex">
                                <div class="col align-self-center">
                                    <h1 class="searchpricetag align-self-center">${productPrice}$</h1>
                                </div>
                                <div class="col text-center align-self-center">
                                    <button class="searchaddbutton"
                                        data-id="${productId}"
                                        data-name="${productName}"
                                        data-price="${product.discountedPrice}"
                                        data-image="${productImage}"
                                    >

                                        <img src="/Assets/Images/SmallIcons/Bag.png" alt="">
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex justify-between items-center gap-1 RatingStars">
                            ${renderStars(productRating)}
                        </div>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });

            console.log(`Products rendered: ${currentProducts.length}`);
        }

        // Initialize pagination
        function setupPagination() {
            const pagination = document.querySelector('.pagination');
            pagination.addEventListener('click', (event) => {
                const target = event.target;
                if (target.tagName === 'A') {
                    event.preventDefault();
                    const page = target.textContent.trim();
                    if (page === 'Previous' && currentPage > 1) {
                        currentPage--;
                    } else if (page === 'Next' && currentPage < totalPages) {
                        currentPage++;
                    } else if (!isNaN(page)) {
                        currentPage = parseInt(page, 10);
                    }
                    renderPage(currentPage);
                }
            });
        }

        renderPage(currentPage);
        setupPagination();
    } catch (error) {
        console.error("Error fetching product data:", error);
        productGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
});

// Stub function for renderStars
function renderStars(rating) {
    const maxStars = 5; // Total stars to display
    let starsHTML = '';

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<i class="bi bi-star-fill" style="color: gold; font-size: 1.2rem;"></i>';
        } else {
            starsHTML += '<i class="bi bi-star" style="color: lightgray; font-size: 1.2rem;"></i>';
        }
    }

    return starsHTML;
}
