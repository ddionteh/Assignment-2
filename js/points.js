  // points.js
  const API_KEY = '65c614116a1c9939a9be0023'; // Replace with your actual RestDB API key
  const BASE_URL = 'https://fedassignmentv2-7a2a.restdb.io/rest/user-credentials';
  let lastClickTime = 0;

  // Helper function to get the user object from localStorage
  function getUser() {
    console.log(JSON.parse(localStorage.getItem('user')) || null);
    return JSON.parse(localStorage.getItem('user')) || null;
  }

  // Helper function to save the user object to localStorage
  function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Function to update user points both locally and on the database
  function updateUserPoints(additionalPoints, callback) {
    const user = getUser();
    if (!user || Date.now() - lastClickTime < 3000) return; // Throttle updates to 3 sec

    lastClickTime = Date.now();
    const newPoints = user.Points + additionalPoints;

    // Update locally first
    user.Points = newPoints;
    setUser(user);


    // due to free plan constraints, CORS policy issues, unable to update
    // require premium plan for RESTDB to work.

    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    // const queryParam = encodeURIComponent(`{"User":"${user.User}"}`);
    // const url = `${corsProxyUrl}${BASE_URL}?q=${queryParam}}`;

    // // Then update in the database
    // fetch(url, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-apikey': API_KEY,
    //     'cache-control': 'no-cache',
    //   },
    //   body: JSON.stringify({ Points: newPoints })
    // })
    // .then(response => response.json())
    // .then(updatedUser => {
    //   setUser(updatedUser); // Save the updated user data
    //   console.log(user);
    //   if (callback) callback(updatedUser.Points);
    // })
    // .catch(error => console.error('Error updating user points:', error));
  }

  // Increment points by 1
  function incrementPoints(callback) {
    
    updateUserPoints(1, callback);
  }

  // Redeem points based on total bill

  function redeemPoints(pointsToRedeem, totalBill, callback) {
    const user = getUser();
    if (user && user.Points >= pointsToRedeem && pointsToRedeem * 0.01  <= totalBill) {
      updateUserPoints(-pointsToRedeem, callback);
    }
  }


// After cards are added to the DOM
// called in product.js
function addClickEventListenersToProductCards() {
  Array.from(document.getElementsByClassName("product-card")).forEach(card => {
      card.addEventListener('click', incrementProductClickPoints);
  });
  console.log("WKDA");
}


  function incrementProductClickPoints() {
    const user = getUser();
    if (user) {
      updateUserPoints(2, () => {
        console.log("Points incremented by 2 for product click.");
        // Optionally, refresh points display or trigger animation here
        updatePointsDisplay(); // Assuming this function updates the points display in the UI
      });
    }
  }

