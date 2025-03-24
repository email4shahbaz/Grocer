async function loadCategories() {
    try {
        const response = await fetch("Assets/json_files/featuredCategoriesList.json"); // Load categories list
        if (!response.ok) throw new Error("Failed to load categories.");
        const cats = await response.json();
        return cats;

    } catch (error) {
        console.error("Error loading categories:", error);
        return [];
    }
}

async function populateCategories() {

    const featuredCategories = await loadCategories();

    const categoriesContainer = document.querySelector(".featured_categories");
    const categoriesWrapper = categoriesContainer.querySelector(".featured-categories");

    featuredCategories.forEach(category => {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-card");

        categoryItem.innerHTML = `
            <div class="category-image">
                ${category.discount ? `<div class="badge orange">${category.discount}</div>` : ""}
                <img src=${category.image} alt=${category.name} loading="lazy" />
            </div>
            <div class="category-title">${category.name}</div>
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


