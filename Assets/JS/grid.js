// Add after your DOMContentLoaded block
 const icons = {
        oneDefault: "/Assets/Images/SmallIcons/OneByOneGrid.png",
        oneActive: "/Assets/Images/SmallIcons/OneByOneGridActive.png",
        twoDefault: "/Assets/Images/SmallIcons/TwoByTwoGrid.png",
        twoActive: "/Assets/Images/SmallIcons/TwoByTwoGridActive.png",
        threeDefault: "/Assets/Images/SmallIcons/ThreeByThreeGrid.png",
        threeActive: "/Assets/Images/SmallIcons/ThreeByThreeGridActive.png"
    };

function setGridColumns(cols, icon) {
     resetIcons();

    // Remove all grid classes from product cards
    document.querySelectorAll('.GridsTargetContent .product-card-col').forEach(card => {

        if(card.classList.contains('col-12')) {card.classList.remove('col-12'); }
        if(card.classList.contains('col-6')) {card.classList.remove('col-6'); }
        if(card.classList.contains('col-4')) {card.classList.remove('col-4'); }

        if (cols === 1) {
             $(icon).find("img").attr("src", icons.oneActive);
            card.classList.add('col-12');
        } else if (cols === 2) {
            $(icon).find("img").attr("src", icons.twoActive);
            card.classList.add('col-6');
        } else { // 3 columns
            $(icon).find("img").attr("src", icons.threeActive);
            card.classList.add('col-4');
        }
    });
}

function resetIcons() {
    $(".OneByOneGrid img").attr("src", icons.oneDefault);
    $(".TwoByTwoGrid img").attr("src", icons.twoDefault);
    $(".ThreeByThreeGrid img").attr("src", icons.threeDefault);
}

//Attach event listeners to grid icons
document.addEventListener('DOMContentLoaded', () => {
    $(".OneByOneGrid").click(function () {
        setGridColumns(1, this);
    });

    $(".TwoByTwoGrid").click(function () {
        setGridColumns(2, this);
    });

    $(".ThreeByThreeGrid").click(function () {
        setGridColumns(3, this);
    });
});

//We have dispatched this custom event to notify when the grid is generated
// This is useful for any other scripts that need to know when the grid is ready
document.body.addEventListener("card-grid-generated", () => {
    $(".ThreeByThreeGrid").trigger("click"); // Set default to 3 columns
});

