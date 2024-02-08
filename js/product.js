
  
function fetchImage(imageLink) {
  fetch(imageLink,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '501a82a3ba05bbbf2d6f9cd1bc53c83f7984e',
    },
  })
  .then(imageResponse => {
    if (!imageResponse.ok) throw new Error('Network response was not ok');
    return imageResponse.blob();
  })
  .then(blob => {
    // Create a URL from the blob data
    const imgUrl = URL.createObjectURL(blob);
    // Display the image using an <img> tag
    const img = document.createElement('img');
    img.src = imgUrl;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}


let allProducts = []; // This will hold the fetched products
const categoryMap = new Map();
const genderMap = new Map();
const availabilityMap = new Map();

// Assuming checkboxes have a data attribute for the price value, like data-price="value"
let upperBound;
let lowerBound;
let selectedToNone = true; // Default to true, indicating no selection

// Define price ranges
const priceRangeMap = new Map([
  ["$0 - $15", { min: 0, max: 15, products: [] }],
  ["$15 - $30", { min: 15, max: 30, products: [] }],
  ["$30 - $45", { min: 30, max: 45, products: [] }],
  ["$45 - $60", { min: 45, max: 60, products: [] }],
  ["$60 - $75", { min: 60, max: 75, products: [] }],
  [">$75", { min: 75, max: 1000, products: [] }],
  // Add more ranges as needed
]);
// Call the function to fetch products on page load
document.addEventListener('DOMContentLoaded', fetchProducts());


// Fetch products from the API and store in allProducts
// Function to fetch products from RESTDB API
function fetchProducts() {
  fetch('https://fedassignmentv2-a543.restdb.io/rest/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '65c39896c4f5c2ad3b12406d',
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(products => {
    allProducts = products;
    products.forEach(product => {
      // Check if the category already exists in the map
      if (!categoryMap.has(product.Category)) {
        categoryMap.set(product.Category, []);
      }
      // Add the product to the corresponding category array
      categoryMap.get(product.Category).push(product);
      
      // Check if the gender already exists in the map
      if (!genderMap.has(product.Gender)) {
        genderMap.set(product.Gender, []);
      }
      // Add the product to the corresponding gender array
      genderMap.get(product.Gender).push(product);

      // Check if the availability type already exists in the map
      if (!availabilityMap.has(product.Availability)) {
        availabilityMap.set(product.Availability, []);
      }
      // Add the product to the corresponding availability array
      availabilityMap.get(product.Availability).push(product);
      
      console.log(product);
      console.log(genderMap);
      console.log(availabilityMap);
      console.log(categoryMap);

      createProductCard(product);
    });
    createFilterCheckboxes();
    createPriceRangeCheckboxes();

  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

// Dynamically create checkboxes for filtering
function createFilterCheckboxes() {
  // Assume you have a div with id 'filters' in your HTML to hold the checkboxes
  const filtersDiv = document.getElementById('filters');
  
  // Create checkboxes for categories
  for (let category of categoryMap.keys()) {
    let checkbox = createCheckbox(category, 'category');
    filtersDiv.appendChild(checkbox);
  }
  
  // Create checkboxes for genders
  for (let gender of genderMap.keys()) {
    let checkbox = createCheckbox(gender, 'gender');
    filtersDiv.appendChild(checkbox);
  }
  
  // Create checkboxes for availability
  for (let availability of availabilityMap.keys()) {
    let checkbox = createCheckbox(availability, 'availability');
    filtersDiv.appendChild(checkbox);
  }

  // Add event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
    updateBounds();
  }); 
}

// Helper function to create a checkbox element
function createCheckbox(value, name) {
  let container = document.createElement('div');
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = value;
  checkbox.id = value;
  checkbox.name = name;

  let label = document.createElement('label');
  label.htmlFor = value;
  label.textContent = value;

  container.appendChild(checkbox);
  container.appendChild(label);

  if (name === 'price') {
    checkbox.setAttribute('data-min', value.min);
    checkbox.setAttribute('data-max', value.max);
  }
  return container;
}
// Create price range checkboxes correctly using priceRangeMap
function createPriceRangeCheckboxes() {
  const priceFilterDiv = document.getElementById('price-filters');

  priceRangeMap.forEach((value, label) => {
    let checkbox = createCheckbox(label, 'price'); // Use the label for the checkbox
    checkbox.querySelector('input').setAttribute('data-min', value.min);
    checkbox.querySelector('input').setAttribute('data-max', value.max);
    priceFilterDiv.appendChild(checkbox);
  });
}


function categorizeProductByPrice(product) {
  for (let [label, range] of priceRangeMap.entries()) {
    if (product.Price > range.min && product.Price <= range.max) {
      range.products.push(product);
      break; // Assuming a product only fits into one range, stop once matched
    }
  }
}
// Apply filters and update product display
function applyFilters() {
  let filteredProducts = allProducts;

  // Filter by category
  let selectedCategories = new Set();
  document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
    selectedCategories.add(checkbox.value);
  });
  if (selectedCategories.size > 0) {
    filteredProducts = filteredProducts.filter(product => selectedCategories.has(product.Category));
  }

  // Filter by gender
  let selectedGenders = new Set();
  document.querySelectorAll('input[name="gender"]:checked').forEach(checkbox => {
    selectedGenders.add(checkbox.value);
  });
  if (selectedGenders.size > 0) {
    filteredProducts = filteredProducts.filter(product => selectedGenders.has(product.Gender));
  }

  // Filter by availability
  let selectedAvailabilities = new Set();
  document.querySelectorAll('input[name="availability"]:checked').forEach(checkbox => {
    selectedAvailabilities.add(checkbox.value);
  });
  if (selectedAvailabilities.size > 0) {
    filteredProducts = filteredProducts.filter(product => selectedAvailabilities.has(product.Availability));
  }

  // // Adjusted filtering for price ranges
  // let selectedPriceLabels = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(checkbox => checkbox.value);
  // if (selectedPriceLabels.length > 0) {
  //   filteredProducts = filteredProducts.filter(product =>
  //     selectedPriceLabels.some(label =>
  //       priceRangeMap.get(label).products.includes(product)
  //     )
  //   );
  // }
  
  // // Update display with filtered products
  // updateProductDisplay(filteredProducts);
}

// Clear the current products and display the new filtered products
function updateProductDisplay(filteredProducts) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''; // Clear existing cards

  filteredProducts.forEach(product => {
    cardContainer.appendChild(createProductCard(product)); // Assuming you have a function to create a card
  });
}


// Function to update the display of product cards based on filters
function updateDisplay() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''; // Clear out the current products
  
  // Assuming you have a function to create a product card, you would call it here
  // For example, createProductCard(product)
  
  // Get selected categories
  let selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(checkbox => checkbox.value);
  // Get selected genders
  let selectedGenders = Array.from(document.querySelectorAll('.gender-filter:checked')).map(checkbox => checkbox.value);
  // Get selected availabilities
  let selectedAvailabilities = Array.from(document.querySelectorAll('.availability-filter:checked')).map(checkbox => checkbox.value);

  let filteredProducts = allProducts.filter(product => {
    let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.Category);
    let genderMatch = selectedGenders.length === 0 || selectedGenders.includes(product.Gender);
    let availabilityMatch = selectedAvailabilities.length === 0 || selectedAvailabilities.includes(product.Availability);
    
    return categoryMatch && genderMatch && availabilityMatch;
  });

  filteredProducts.forEach(product => {
    cardContainer.appendChild(createProductCard(product));
  });
}

// Attach event listeners to filter checkboxes
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', updateDisplay);

});

// Call updateBounds function whenever a price checkbox is clicked
document.querySelectorAll('input[name="price"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    updateBounds();
    applyFilters(); // Then apply filters with updated bounds
    console.log("SUcess");
  });
});
// Function to create a product card (you will need to define the HTML structure of a card)
function createProductCard(product) {

  // Create card elements and fill with product data
  const cardContainer = document.getElementById('card-container');

  const card = document.createElement('div');
  card.className = 'product-card';
  
  // const imageLink = "https://fedassignment-8d9a.restdb.io/media/" + product.Image[0];
  const image = document.createElement('img');
  console.log(product.Image[0]);
  // Construct the image URL directly using the provided 'Image' property
  // image.src = `https://fedassignmentv2-a543.restdb.io/media/${product.Image[0]}`;
  // image.alt = product.Name;
  // Append elements to card
  card.appendChild(image);
  
  image.src = 'https://corsproxy.io/?' +
  encodeURIComponent(`https://fedassignmentv2-a543.restdb.io/media/${product.Image[0]}`);

  // setTimeout(fetchImage(url),1000);
  console.log(product.Image[0]);
  // placeholder, remove later
  console.log(image.src);
  const name = document.createElement('h3');
  name.textContent = product.Name;
  
  const description = document.createElement('p');
  description.textContent = product.Description.length > 100 ? product.Description.substring(0, 97) + '...' : product.Description;
  
  const price = document.createElement('p');
  price.textContent = `$${product.Price}`;
  
  const stockStatus = document.createElement('p');
  stockStatus.textContent = product.Availability;
  
  // Append elements to card
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(stockStatus);

  // Append card to card container
  cardContainer.appendChild(card);
  return card;
}

// Function to update bounds based on selected checkboxes
function updateBounds() {
    const checkboxes = document.querySelectorAll('#price-filters input[type="checkbox"]:checked');
    selectedToNone = checkboxes.length === 0; // Update based on whether any checkboxes are checked

    const prices = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.price, 10));

    // Update lowerBound and upperBound based on selected checkboxes
    if (prices.length > 0) {
        lowerBound = Math.min(...prices);
        upperBound = Math.max(...prices);
    }
}

function displayProducts() {
  const products = document.querySelectorAll('#card-container .product-card'); // Assuming each card has a class `.product-card`
  const checkboxes = document.querySelectorAll('#price-filters input[type="checkbox"]:checked');
  
  // If no checkbox is selected, make all products visible
  if (checkboxes.length === 0) {
      products.forEach(product => {
          product.style.display = "";
      });
  } else {
      // Hide or show products based on the price attribute
      products.forEach(product => {
          const price = parseInt(product.getAttribute('data-price'), 10); // Assuming each card has a `data-price` attribute

          // Show or hide the product card based on its price
          if (price >= lowerBound && price <= upperBound) {
              product.style.display = ""; // Show
          } else {
              product.style.display = "none"; // Hide
          }
      });
  }
}


// // Filter products by selected categories
// function getFilteredProductsByCategory() {
//   const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);
//   return allProducts.filter(product => selectedCategories.includes(product.Gender));
// }

// // Filter products by selected price
// function getFilteredProductsByPrice(maxPrice) {
//   return allProducts.filter(product => product.Price <= maxPrice);
// }

// // Update the product listing based on filters
// function updateProductListing() {
//   const categoryFilteredProducts = getFilteredProductsByCategory();
//   const maxPrice = document.getElementById('price-filter').value;
//   const priceFilteredProducts = getFilteredProductsByPrice(maxPrice);
//   const filteredProducts = categoryFilteredProducts.filter(product => priceFilteredProducts.includes(product));

//   // Clear existing products
//   const productListing = document.getElementById('product-listing');
//   productListing.innerHTML = '';

//   // Add filtered products
//   filteredProducts.forEach(product => {
//     createProductCard(product); // Your existing function to create product cards
//   });
// }

// // Event listeners for filter changes
// document.querySelectorAll('.category-filter').forEach(checkbox => {
//   checkbox.addEventListener('change', updateProductListing);
// });

// document.getElementById('price-filter').addEventListener('input', function() {
//   const priceValue = document.getElementById('price-value');
//   priceValue.textContent = this.value;
//   updateProductListing();
// });

// // Call fetchProducts on page load
// document.addEventListener('DOMContentLoaded', fetchProducts);

