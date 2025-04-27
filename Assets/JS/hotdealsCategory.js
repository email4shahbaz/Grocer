document.addEventListener("DOMContentLoaded", async () => {
    const categoryContainer = document.getElementById('category-container');

    try {
        // Fetch categories from the local JSON file
        const response = await fetch('/Assets/json_files/hot_deals_category.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categories = await response.json();

        // Check if categories exist
        if (!categories || categories.length === 0) {
            categoryContainer.innerHTML = '<p>No categories available.</p>';
            return;
        }

        // Render categories dynamically
        categories.forEach(category => {
            const categoryId = category.id;
            const categoryName = category.name;
            const categoryImage = category.image; 
            const categoryFile = category.file || '';
          

            // Create category card
            const categoryCard = document.createElement('div');
            categoryCard.className = 'HotDealsCategoryCard';

            const categoryImageDiv = document.createElement('div');
            categoryImageDiv.className = 'category_item_image';

            const categoryLink = document.createElement('a');
            categoryLink.href = `/category-product.html?category-file=${encodeURIComponent(categoryFile)}`;
            categoryLink.setAttribute('wire:navigate', '');

            const categoryImageElement = document.createElement('img');
            categoryImageElement.src = categoryImage;
            categoryImageElement.onerror = function () {
                this.src = '/Assets/Images/ERROR/ErrorImage.webp';
            };
            categoryImageElement.className = 'hot_deals_categories_image';
            categoryImageElement.alt = categoryName;

            const categoryNameElement = document.createElement('h3');
            categoryNameElement.className = 'hot_deals_category_name';
            categoryNameElement.textContent = categoryName;

            const categoryDescription = document.createElement('p');
            categoryDescription.className = 'hot_deals_category_description';
          

            // Append elements to their respective parents
            categoryLink.appendChild(categoryImageElement);
            categoryImageDiv.appendChild(categoryLink);
            categoryCard.appendChild(categoryImageDiv);
            categoryCard.appendChild(categoryNameElement);
            categoryCard.appendChild(categoryDescription);

            // Append the card to the container
            categoryContainer.appendChild(categoryCard);
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        categoryContainer.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
    }
});
