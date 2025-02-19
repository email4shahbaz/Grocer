document.addEventListener("DOMContentLoaded", () => {
    const logoCover = document.getElementById("logo-cover");
  
    // Delay to allow animation to play before hiding the logo cover
    setTimeout(() => {
      logoCover.classList.add("hidden");
  
      // Optional: Remove the cover from the DOM after the transition
      setTimeout(() => {
        logoCover.style.display = "none";
      }, 500); // Matches the CSS transition duration
    }, 2000); // Duration for the logo animation (adjust as needed)
  });
  