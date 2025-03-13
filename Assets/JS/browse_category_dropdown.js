let categories=[];

document.addEventListener("HeaderFooterScriptsLoaded", ()=> {
    if(categories.length === 0){
        loadCategories(); // Load categories when the page loads
    }
});

// Function to load categories dynamically
async function loadCategories() {
    try {
        const response = await fetch("Assets/json_files/Browse_navbar_categories.json"); // Load categories list
        if (!response.ok) throw new Error("Failed to load categories.");

        const cats = await response.json();
        categories = cats;
        populateCategories();
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Function to populate category dropdown
function populateCategories() {
    const dropdownContainer = document.getElementById("categoryDropdown");
    const categoryGrid = dropdownContainer.querySelector(".category-grid");
    
    categoryGrid.innerHTML = ""; // Clear existing categories

    categories.forEach(category => {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-item");

        categoryItem.innerHTML = `
            <img src="${category.icon}" alt="${category.name}">
            <span>${category.name}</span>
        `;

        categoryItem.addEventListener("click", () => {
            openCategory(category.file);
        });

        categoryGrid.appendChild(categoryItem);
    });

    const moreItem = document.createElement("div");
    moreItem.classList.add("category-item");
    moreItem.innerHTML = `
        <a href="/category.html">
            <span style="color: #53B175;">+ Show more...</span>
        </a>`;
    categoryGrid.appendChild( moreItem );
}

// Function to toggle the category dropdown menu
function toggleDropdown() {
    var dropdown = document.getElementById("categoryDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Function to open a category dynamically
function openCategory(categoryFile) {
    window.location.href = `category-product.html?category-file=${encodeURIComponent(categoryFile)}`;
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    var dropdown = document.getElementById("categoryDropdown");
    var button = document.querySelector(".Explore_all_categories_Btn");

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = "none";
    }
});
