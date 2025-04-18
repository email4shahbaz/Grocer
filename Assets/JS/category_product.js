document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFile = urlParams.get('category-file');

    if (categoryFile!=null && document.getElementById('product-list') !== null) {
       
   
        try {
            const response = await fetch(`Assets/json_files/${categoryFile}`);
            if (!response.ok) throw new Error(`Failed to load category products.`);

            const products = await response.json();
            const categoryName = products[0]?.categoryName || 'Category';

            document.getElementById('category-title').innerText = categoryName;
            document.getElementById('category-breadcrumb').innerText = categoryName;

            renderProducts(products, categoryFile);

        } catch (error) {
            //console.error("Error loading products:", error);
            if(document.getElementById("product-list")!==null){
                document.getElementById("product-list").innerHTML = "<p>Failed to load products. Please try again later.</p>";
            }
        }
    }
});


function renderProducts(products, categoryFile) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
        const discountPercent = hasDiscount
            ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
            : 0;

        const discountBadgeHTML = hasDiscount
            ? `<div class="discount-badge">Save ${discountPercent}%</div>`
            : "";

        const productCard = `
            <div class="col-sm-6 col-md-6 col-lg-4 mb-4 GridsTargetContent">
                <div class="ProductsCardSearchANDCategory position-relative">
                    ${discountBadgeHTML}
                    <div class="CategoryMainCardImage">
                        <a href="product-details.html?product-id=${product.id}&category-file=${encodeURIComponent(categoryFile)}">
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
            </div>
        `;

        productList.innerHTML += productCard;
    });
}
