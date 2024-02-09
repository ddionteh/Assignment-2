
// navigation menu
document.addEventListener('DOMContentLoaded', function() {
    const header = document.createElement('header');
    header.innerHTML = `
        <nav>
            <div class="logo">
                <a href="index.html">VOGUEVALLEY</a>
            </div>
            <input type="checkbox" id="click">
            <label for="click" class="mainicon">
                <div class="menu">
                    <i class="bi bi-list"></i>
                </div>
            </label>
            <ul>
            <li><a href="${ isCurrentDirectory() ? "index.html" : "../index.html"
            }">Home</a></li>
            <li><a href="${
              isCurrentDirectory() ? "html/product.html" : "product.html"
            }">Products</a></li>
            <li><a href="${
              isCurrentDirectory() ? "html/cart.html" : "cart.html"
            }">Cart</a></li>
            <li><a href="${
              isCurrentDirectory() ? "html/login.html" : "login.html"
            }">Log In</a></li>
            <li id="points-display"></li>
            <div class="main-icon">
              <img src="../images/menu-icon.png" class="hamburger">
            </div>
            <div class="overlay"></div>
          
            </ul>
        </nav>
    `;

  document.body.insertBefore(header, document.body.firstChild);

  document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('ul').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
  });
  
  document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('ul').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
  });
  
  document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('ul').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    });

  document.addEventListener('ChatbotLoaded', () => {
    // Code that depends on elements created by aichat.js
    // Initialize a variable to track the state
    let navVisible = true;

    // Get the navigation element
    const navElement = document.querySelector('nav');

    // Add a click event listener to the chatbot toggler
    chatbotToggler.addEventListener("click", () => {
        if (navVisible) {
            // Hide the navigation
            navElement.style.display = "none";
        } else {
            // Show the navigation
            navElement.style.display = "flex";
        }
        
        // Toggle the state
        navVisible = !navVisible;
    });
    closeBtn.addEventListener("click", () => document.querySelector('nav').style.display = "flex");
  });
  });
  
  // check the link based on directory
  function isCurrentDirectory() {
    // Get the second last segment of the URL path
    const pathSegments = window.location.pathname.split("/");

    // file is in html folder
    if (pathSegments[pathSegments.length - 2] === "html") {
      return false;
    }
    // file is not in html folder (index.html)
    return true;
  }

    // Add click event listeners to navigation links
    document.querySelectorAll('nav ul li a').forEach(href => {
        href.addEventListener('click', handleNavClick);
    });
});

// Update the navigation points display when points change.
function updatePointsDisplay(points) {
  const pointsDisplay = document.getElementById('points-display');
  if (pointsDisplay) {
    pointsDisplay.textContent = `Points: ${points}`;
  }
}

// Function to handle navigation link clicks
function handleNavClick(event) {
  incrementPoints(updatePointsDisplay);
}

// Call updatePointsDisplay on page load to show the current points
document.addEventListener('DOMContentLoaded', () => {
  const user = getUser();

  console.log(user);
  if (user) {
    updatePointsDisplay(user.Points);
  }
});
