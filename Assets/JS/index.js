function includeHTML(file, elementTag) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const container = document.querySelector(elementTag);
            if (!container) return;

            // Create a temporary container to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Move content to the target container
            container.outerHTML = tempDiv.innerHTML;

              // Extract and execute scripts
            executeScripts(tempDiv);
            if(elementTag == 'header'){
                document.dispatchEvent(new Event("HeaderFooterScriptsLoaded"));
            }
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}


function executeScripts(container) {
    container.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
            // External script
            newScript.src = oldScript.src;
            newScript.defer = true;
            //newScript.async = true;
        } else {
            // Inline script
            newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
        oldScript.remove(); // Remove the old script

       
    });
}

function initializeCategorySwiper(){
    const categorySwiper = new Swiper('.categories-swiper', 
        {
            loop: true,
            slidesPerView: 7,
            spaceBetween: 30,
            
            navigation: {
                nextEl: '.CategoryBtnRight',
                prevEl: '.CategoryBtnLeft',
            },
        }
    );
}

document.addEventListener("DOMContentLoaded", async () => {
    includeHTML("header.html", "header");
    includeHTML("footer.html", "footer");

    const categoryContainer = document.querySelector('.categories-swiper-wrapper');

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
            const categoryDescription = category.description;
            const categoryImage = category.image;
            const products = category.products || []; // Get the products array or fallback to empty array

            // Calculate the number of items in the category
            const productCount = products.length;

            // Select a background class cyclically
            const bgClass = bgClasses[index % bgClasses.length];

            // Create a category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('swiper-slide');
            //categoryCard.classList.add('swiper-slide mt-sm-5', 'mt-md-5', 'mt-lg-0');

            categoryCard.innerHTML = `
                <a href="category-product.html?category-id=${categoryId}&category-file=${category.file}">
                    <div class="CategoryCard ${bgClass} text-center border-0">
                        <div class="ImageDiv">
                            <img src="${categoryImage}"
                                onerror="this.src='Assets/Images/ERROR/ErrorImage.webp'"
                                class="CategoryCardImage" alt="${categoryName}">
                        </div>
                        <div class="card-body">
                            <h1 class="h2 card_heading">${categoryName}</h1>
                            <span class="card-text count">${productCount} items</span>
                            <p class="card-text card_descri">${categoryDescription}</p>
                        </div>
                    </div>
                </a>
            `;

            // Append the category card to both containers
            categoryContainer.appendChild(categoryCard);
            //swiper.appendSlide(categoryCard);
        });

        initializeCategorySwiper(); // Initialize Swiper after adding all categories


    } catch (error) {
        console.error("Error fetching categories:", error);
        categoryContainer.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }

});

// document.getElementById("remember-checkbox").addEventListener("change", function () {
//     document.querySelector(".login-options").style.backgroundColor = this.checked ? "#ffffff" : "#000000";
// });


function logout(){
    localStorage.removeItem('email');
    location.reload();
}