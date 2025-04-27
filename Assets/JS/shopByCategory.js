async function loadCategories() {
    try {
        const response = await fetch("Assets/json_files/hotdealscategories.json"); // Load categories list
        if (!response.ok) throw new Error("Failed to load categories.");
        const cats = await response.json();
        return cats;

    } catch (error) {
        console.error("Error loading categories:", error);
        return [];
    }
}

async function populateCategories() {
    const categoriesList = await loadCategories();

    const categoriesContainer = document.querySelector(".categories-container");
    const categoriesWrapper = categoriesContainer.querySelector(".categories");
    
    categoriesWrapper.innerHTML = ""; // Clear existing categories

    categoriesList.forEach(category => {

        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-card");
        
        categoryItem.innerHTML = `
            <figure>
                <img src=${category.image} alt=${category.name}>
            </figure>
            <h3>${category.name}</h3>
            <p>View More</p>
        `;

        categoryItem.addEventListener("click", () => {
            openCategory(category.file);
        });

        categoriesWrapper.appendChild(categoryItem);
    });
}

populateCategories();

function openCategory(categoryFile) {
    window.location.href = `category-product.html?category-file=${encodeURIComponent(categoryFile)}`;
}