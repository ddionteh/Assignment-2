document.addEventListener("DOMContentLoaded", function () {
  // Check if the user came from the login page
  const cameFromLoginPage = localStorage.getItem("cameFromLoginPage");

  if (cameFromLoginPage === "true") {
    // Check if the animation has already been played
    const animationPlayed = localStorage.getItem("animationPlayed");

    if (!animationPlayed) {
      // User came from login page and animation hasn't been played yet, play the animation
      playAnimation();

      // Set the flag to indicate that the animation has been played
      localStorage.setItem("animationPlayed", "true");
    }

    // Remove the flag to prevent animation from replaying on page refresh
    localStorage.removeItem("cameFromLoginPage");
  }
});

function playAnimation() {
  // Check if the user came from the login page
  const cameFromLoginPage = localStorage.getItem("cameFromLoginPage");

  if (cameFromLoginPage === "true") {
    // Display the Lottie animation
    const lottieContainer = document.getElementById("lottie-container");
    lottieContainer.style.display = "block";

    // Load the animation
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-animation"),
      renderer: "svg",
      loop: false,
      autoplay: true, // Set autoplay to true to start the animation automatically
      path: "https://lottie.host/880c2dab-8556-4015-9f6e-4d57c7c55eb8/pfpBT8ShzX.json", // Provide the path to your Lottie animation JSON file
    });

    // When the animation completes, hide the Lottie container and background image
    animation.addEventListener("complete", () => {
      lottieContainer.style.display = "none";
      document.querySelector("#lottie-overlay").style.display = "none";
    });
  }
}
