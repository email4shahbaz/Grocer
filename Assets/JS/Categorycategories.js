document.addEventListener("DOMContentLoaded", async () => {
    const categoryContainer = document.querySelector('.CategoryPageShopByCategoryMain');

    try {
        // Fetch categories from the local JSON file
        const categoryResponse = await fetch('Assets/json_files/category_product.json');
        if (!categoryResponse.ok) {
            throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }

        const categories = await categoryResponse.json();
        console.log(categories);

        // Check if categories exist
        if (categories.length === 0) {
            categoryContainer.innerHTML = "<p>No categories available at the moment. Please check back later.</p>";
            return;
        }

        // Use a map to track rendered categories and avoid duplicates by `id` and `name`
        const renderedCategories = new Set();

        // Render categories dynamically
        categories.forEach(category => {
            const categoryId = category.id;
            const categoryName = category.name;
            const categoryImage = category.image;
            const categoryFile = category.file;
            const totalItems = category.products ? category.products.length : 0;

            // Skip duplicates based on a combination of ID and name
            const uniqueKey = `${categoryId}-${categoryName}`;
            if (renderedCategories.has(uniqueKey)) {
                return;
            }
            renderedCategories.add(uniqueKey);

            // Create category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('CategoryPageCategoryCard');
            categoryCard.innerHTML = `
                <div class="text-center">
                    <div class="departmentcardImageDiv">
                        <a href="/category-product.html?category-file=${encodeURIComponent(categoryFile)}" wire:navigate>
                           <img src="${categoryImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                class="CategoryCardImage" alt="${categoryName}">
                        </a>
                    </div>
                    <h1 class="department_card_heading">${categoryName}</h1>
                    <p class="department_card_description">(${totalItems} Items)</p>
                </div>
            `;

            // Append category card to the container
            categoryContainer.appendChild(categoryCard);
        });
    } catch (error) {
        console.error("Error fetching category data:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }
   

});
function updatePrice() {
    let minPrice = document.getElementById("minPrice");
    let maxPrice = document.getElementById("maxPrice");
    let sliderTrack = document.getElementById("sliderTrack");
    let priceDisplay = document.getElementById("priceDisplay");
    
    let minVal = parseInt(minPrice.value);
    let maxVal = parseInt(maxPrice.value);
    
    if (minVal > maxVal) {
        let temp = minVal;
        minVal = maxVal;
        maxVal = temp;
    }
    
    priceDisplay.textContent = `${minVal} - ${maxVal}`;
    
    let minPercent = ((minVal - 50) / (1500 - 50)) * 100;
    let maxPercent = ((maxVal - 50) / (1500 - 50)) * 100;
    
    sliderTrack.style.left = minPercent + "%";
    sliderTrack.style.right = (maxPercent - minPercent) + "%";
}

const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
    });
});