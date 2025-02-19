document.addEventListener("DOMContentLoaded", async () => {
    const categoryContainer = document.querySelector('.homecategoryProductsMain');
    const mobileViewContainer = document.querySelector('.MobileViewCategoriesCardOneMainDiv'); 

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
            const categoryImage = category.image;
            const products = category.products || []; // Get the products array or fallback to empty array

            // Calculate the number of items in the category
            const productCount = products.length;

            // Select a background class cyclically
            const bgClass = bgClasses[index % bgClasses.length];

            // Create a category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('mt-sm-5', 'mt-md-5', 'mt-lg-0');

            categoryCard.innerHTML = `
                <a href="category-product.html?category-id=${categoryId}&category-file=${category.file}" class="category-card ">
                    <div class="CategoryCard ${bgClass} text-center border-0">
                        <div class="ImageDiv">
                            <img src="${categoryImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                class="CategoryCardImage" alt="${categoryName}">
                        </div>
                        <div class="card-body">
                            <h1 class="h2 card_heading">${categoryName}</h1>
                            <p class="card-text card_descri">${productCount} items</p>
                        </div>
                    </div>
                </a>
            `;

            // Append the category card to both containers
            categoryContainer.appendChild(categoryCard);
            mobileViewContainer.appendChild(categoryCard.cloneNode(true)); 
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
        mobileViewContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }
});
