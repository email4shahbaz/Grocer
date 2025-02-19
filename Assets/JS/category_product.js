document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFile = urlParams.get('category-file');

    if (!categoryFile) {
        document.getElementById('product-list').innerHTML = "<p>No products found.</p>";
        return;
    }

    try {
        const response = await fetch(`Assets/json_files/${categoryFile}`);
        if (!response.ok) throw new Error(`Failed to load category products.`);

        const products = await response.json();
        const categoryName = products[0]?.categoryName || 'Category';

        document.getElementById('category-title').innerText = categoryName;
        document.getElementById('category-breadcrumb').innerText = categoryName;

        renderProducts(products, categoryFile);

    } catch (error) {
        console.error("Error loading products:", error);
        document.getElementById("product-list").innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
});

function renderProducts(products, categoryFile) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productCard = `
            <div class="col-sm-6 col-md-6 col-lg-3 mb-4 GridsTargetContent ">
                <div class="ProductsCardSearchANDCategory">
                    <div class="CategoryMainCardImage">
                        <a href="product-details.html?product-id=${product.id}&category-file=${encodeURIComponent(
            categoryFile
        )}">
                            <img src="${product.image}" class="card_main_image p-2" alt="${product.name}">
                        </a>
                    </div>
                    <div class="card-body">
                        <h1 class="h2 searchcard_heading">${product.name}</h1>
                        <h1 class="searchpricetag">${product.price}$</h1>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}
