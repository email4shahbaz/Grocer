document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarNav = document.getElementById("sidebarNav");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const closeSidebar = document.getElementById("closeSidebar");

    // Open sidebar
    sidebarToggle.addEventListener("click", function (e) {
        e.preventDefault();
        sidebarNav.classList.add("open");
        sidebarOverlay.classList.add("active");
    });

    // Close sidebar
    closeSidebar.addEventListener("click", function () {
        sidebarNav.classList.remove("open");
        sidebarOverlay.classList.remove("active");
        closeSidebar.classList.add("rotate");
        setTimeout(() => {
            closeSidebar.classList.remove("rotate");
        }, 500); // Sync with animation duration
    });

    // Close sidebar when clicking on overlay
    sidebarOverlay.addEventListener("click", function () {
        sidebarNav.classList.remove("open");
        sidebarOverlay.classList.remove("active");
    });
});
