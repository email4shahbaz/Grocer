document.addEventListener("DOMContentLoaded", async () => {
    const desktopContainer = document.querySelector('.BestsellProductsSection');
    const mobileContainer = document.querySelector('.BestsellProductsSectionMV');


    const categoryButtons = document.querySelectorAll('input[type="radio"]');
    const labels = document.querySelectorAll('label[role="button"]');

    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


    // Function to fetch and render products
    async function fetchAndRenderProducts(category, retries = 3) {
        try {
            const response = await fetch(`/Assets/json_files/${category}_product.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const productsData = await response.json();
            renderProducts(productsData, category);
        } catch (error) {
            console.error(`Error fetching ${category} products:`, error);

            if (retries > 0) {
                setTimeout(() => fetchAndRenderProducts(category, retries - 1), 1000); // Retry after 1 second
            } else {
                desktopContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
                mobileContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
            }
        }
    }

    // Render products
    function renderProducts(products, category) {
        desktopContainer.innerHTML = '';
        mobileContainer.innerHTML = '';

        products.forEach(product => {
            const productId = product.id;
            const productName = product.name;
            const productImage = product.image[0] || product.image;
            const productPrice = product.price;
            const discountedPrice = product.discountedPrice;
            const productUnit = product.unit;
            const productRating = product.rating;
            const discount = product.discount || 0;
            const sold = product.sold_quantity || 0;
            const total = product.total_quantity || 1;
            const soldPercentage = Math.min((sold / total) * 100, 100);

            // // Create desktop card
            // const desktopCard = document.createElement('div');
            // desktopCard.classList.add('mt-2');

            // desktopCard.innerHTML = `
            //     <div class="BestSellCard position-relative ProductsCard_Animations ProductCardImage mt-3">
            //         <div class="position-absolute BestSellCardOffTag">
            //             <h6>Save ${discount}%</h6>
            //         </div>
            //         <div class="BestSellCardImage">
            //             <a href="product-details.html?product-id=${productId}&category-file=${category}_product.json">
            //                 <img src="${productImage}" 
            //                      onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
            //                      alt="${productName}">
            //             </a>
            //         </div>
            //         <div class="card-body">
            //             <p class="BestSellCardName">${product.categoryName || 'Unknown'}</p>
            //             <div class="bestSellCardNameAndUnitHeadingMain">
            //                 <h1 class="h2 BestSellCardHeading">${productName}</h1>
            //                 <h4>(${productUnit})</h4>
            //             </div>
            //             <div class="row mt-2">
            //                 <div class="col d-flex">
            //                     <h1 class="BestSellCardPriceTag align-self-center">${productPrice}$</h1>
            //                 </div>
            //             </div>
            //             <div class="col">
            //                 <div class="progress BestSellCardProgressMain">
            //                     <div class="progress-bar BestSellCardProgress" role="progressbar" style="width: ${soldPercentage}%;"
            //                         aria-valuenow="${soldPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
            //                 </div>
            //                 <h6 class="progressstatus">Sold: ${sold}/${total}</h6>
            //             </div>
            //             <div class="col text-center align-self-center mt-2">
            //                 <button class="btn BestSellCardAddButton py-2 w-100"
            //                     data-id="${productId}"
            //                     data-name="${productName}"
            //                     data-price="${productPrice}"
            //                     data-image="${productImage}">
            //                     <i class="bi bi-cart"></i>&nbsp;Add
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            // `;

            // desktopContainer.appendChild(desktopCard);

            // Inside the renderProducts function:
            const desktopCard = document.createElement('div');

            desktopCard.innerHTML = `
                <div class="BestSellCard position-relative ProductsCard_Animations ProductCardImage">
                    <div class="position-absolute BestSellCardOffTag">
                        <h6>Save ${discount}%</h6>
                    </div>
                    <div class="BestSellCardImage">
                        <a href="product-details.html?product-id=${productId}&category-file=${category}_product.json">
                            <img src="${productImage}" 
                                onerror="this.src='/Assets/Images/ERROR/ErrorImage.webp'" 
                                alt="${productName}">
                        </a>
                    </div>
                    <div class="product-overlay-icons">
                        <button class="wishlist-icon ${wishlist.some(item => item.id === product.id) ? 'in-wishlist' : ''}" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${category}_product.json">
                            <i class="bi bi-heart"></i>
                        </button>
                        <button class="eye-icon" data-id="${product.id}" data-category="${category}_product.json">
                        <i class="bi bi-eye"></i>
                        </button>
                    </div>
                
                    <div class="card-body">
                        <p class="BestSellCardName">${product.categoryName || 'Unknown'}</p>
                        <div class="bestSellCardNameAndUnitHeadingMain">
                            <h1 class="h2 BestSellCardHeading">${productName}</h1>
                            <h4>${productUnit}</h4>
                        </div>
                        <div class="d-flex align-items-center rating">
                            <div class="stars">
                                <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                <img src="Assets/Images/Icons/rating-star-checked.png" alt="star-checked" />
                                <img src="Assets/Images/Icons/rating-star-unchecked.png" alt="star-unchecked" />
                            </div>
                            <span class="NoOfstars">(${productRating})</span>
                        </div>
                        <div class="row mt-2">
                            <div class="col d-flex">
                                <h1 class="BestSellCardPriceTag align-self-center">$${discountedPrice}</h1>
                                <del class="BestSellCard-oldPrice">$${productPrice}</del>
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress BestSellCardProgressMain">
                                <div class="progress-bar BestSellCardProgress" role="progressbar" style="width: ${soldPercentage}%;"
                                    aria-valuenow="${soldPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h6 class="progressstatus">Sold: ${sold}/${total}</h6>
                        </div>
                        <div class="col text-center align-self-center mt-2">
                            <button class="btn BestSellCardAddButton py-2 w-100"
                                data-id="${productId}"
                                data-name="${productName}"
                                data-price="${productPrice}"
                                data-image="${productImage}">
                                <i class="bi bi-cart"></i>&nbsp;Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `;

            desktopContainer.appendChild(desktopCard);
            const mobileCard = desktopCard.cloneNode(true);
            mobileContainer.appendChild(mobileCard);
        });
    }

    function updateActiveButton(activeButton) {
        labels.forEach(label => label.classList.remove('Active_category'));
        activeButton.classList.add('Active_category');
    }

    categoryButtons.forEach(button => {
        button.addEventListener('change', () => {
            const selectedLabel = document.querySelector(`label[for="${button.id}"]`);
            updateActiveButton(selectedLabel);
            fetchAndRenderProducts(button.value);
        });
    });

    const defaultCategory = 'popular'; // Default category
    const defaultLabel = document.querySelector(`label[for="popular"]`);
    updateActiveButton(defaultLabel);
    fetchAndRenderProducts(defaultCategory);

});























