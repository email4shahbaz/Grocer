$(document).ready(function () {
    const gridClasses = "col-12 col-lg-4 col-lg-6 col-md-6 col-sm-6";

    // Icon paths
    const icons = {
        oneDefault: "/Assets/Images/SmallIcons/OneByOneGrid.png",
        oneActive: "/Assets/Images/SmallIcons/OneByOneGridActive.png",
        twoDefault: "/Assets/Images/SmallIcons/TwoByTwoGrid.png",
        twoActive: "/Assets/Images/SmallIcons/TwoByTwoGridActive.png",
        threeDefault: "/Assets/Images/SmallIcons/ThreeByThreeGrid.png",
        threeActive: "/Assets/Images/SmallIcons/ThreeByThreeGridActive.png"
    };

    function resetIcons() {
        $(".OneByOneGrid img").attr("src", icons.oneDefault);
        $(".TwoByTwoGrid img").attr("src", icons.twoDefault);
        $(".ThreeByThreeGrid img").attr("src", icons.threeDefault);
    }

    $(".OneByOneGrid").click(function () {
        $(".GridsTargetContent").removeClass(gridClasses).addClass("col-12");
        resetIcons();
        $(this).find("img").attr("src", icons.oneActive);
    });

    $(".TwoByTwoGrid").click(function () {
        $(".GridsTargetContent").removeClass(gridClasses).addClass("col-lg-6 col-md-6");
        resetIcons();
        $(this).find("img").attr("src", icons.twoActive);
    });

    $(".ThreeByThreeGrid").click(function () {
        $(".GridsTargetContent").removeClass(gridClasses).addClass("col-lg-4 col-md-6");
        resetIcons();
        $(this).find("img").attr("src", icons.threeActive);
    });
});

