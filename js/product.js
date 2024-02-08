let allProducts = []; // This will hold the fetched products
const categoryMap = new Map();
const genderMap = new Map();
const availabilityMap = new Map();



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

document.addEventListener('DOMContentLoaded', async () => { // Mark this function as async
  await fetchProducts(); // Wait for fetchProducts to complete
  console.log("OMDSA");

  // Now that fetchProducts has completed, you can safely attach event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    console.log("omg");
    checkbox.addEventListener('change', applyFilters);
  });

  console.log("Sucas");
});


// Fetch products from the API and store in allProducts
// Function to fetch products from RESTDB API
async function fetchProducts() {
  try {
    const response = await fetch('https://fedassignmentv2-4ad8.restdb.io/rest/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '65c48740c2b4fe7bff13a228',
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const products = await response.json();
    
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

      createProductCard(product);
    });

    createFilterCheckboxes();
    createPriceRangeCheckboxes();
    console.log("success");
    return;

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
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


// function categorizeProductByPrice(product) {
//   for (let [label, range] of priceRangeMap.entries()) {
//     if (product.Price > range.min && product.Price <= range.max) {
//       range.products.push(product);
//       break; // Assuming a product only fits into one range, stop once matched
//     }
//   }
// }

// // This function updates the display of product cards based on filters
// function applyFilters() {
//   const selectedCategories = new Set(
//     Array.from(document.querySelectorAll('input[name="category"]:checked'), checkbox => checkbox.value)
//   );
//   const selectedGenders = new Set(
//     Array.from(document.querySelectorAll('input[name="gender"]:checked'), checkbox => checkbox.value)
//   );
//   const selectedAvailabilities = new Set(
//     Array.from(document.querySelectorAll('input[name="availability"]:checked'), checkbox => checkbox.value)
//   );

//   // Gather all selected price ranges
//   const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(checkbox => ({
//     min: Number(checkbox.getAttribute('data-min')),
//     max: Number(checkbox.getAttribute('data-max'))
//   }));

//   // Filter products based on the selected categories, genders, availabilities, and price ranges
//   const filteredProducts = allProducts.filter(product => {
//     const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(product.Category);
//     const genderMatch = selectedGenders.size === 0 || selectedGenders.has(product.Gender);
//     const availabilityMatch = selectedAvailabilities.size === 0 || selectedAvailabilities.has(product.Availability);
//     const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => product.Price >= range.min && product.Price <= range.max);

//     return categoryMatch && genderMatch && availabilityMatch && priceMatch;
//   });

//   // Update display with filtered products
//   updateProductDisplay(filteredProducts);
// }

function applyFilters() {
  const selectedCategories = new Set([...document.querySelectorAll('input[name="category"]:checked')].map(el => el.value));
  const selectedGenders = new Set([...document.querySelectorAll('input[name="gender"]:checked')].map(el => el.value));
  const selectedAvailabilities = new Set([...document.querySelectorAll('input[name="availability"]:checked')].map(el => el.value));
  const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(checkbox => ({
    min: Number(checkbox.dataset.min),
    max: Number(checkbox.dataset.max)
  }));

  let filteredProducts = allProducts.filter(product => {
    const inSelectedCategory = selectedCategories.size === 0 || selectedCategories.has(product.Category);
    const inSelectedGender = selectedGenders.size === 0 || selectedGenders.has(product.Gender);
    const inSelectedAvailability = selectedAvailabilities.size === 0 || selectedAvailabilities.has(product.Availability);
    const inSelectedPriceRange = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => product.Price > range.min && product.Price <= range.max);

    return inSelectedCategory && inSelectedGender && inSelectedAvailability && inSelectedPriceRange;
  });
  console.log(filteredProducts);
  updateProductDisplay(filteredProducts);
}

function updateProductDisplay(filteredProducts) {
  // Assuming each product card has a unique identifier such as a `data-id` attribute
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => card.style.display = 'none'); // Hide all cards initially

  // Now, loop through all filtered products and set display to block
  filteredProducts.forEach(product => {
    const productCard = document.querySelector(`.product-card[data-id="${product.ProductID}"]`); // Use the unique identifier to find the card
    if (productCard) {
      productCard.style.display = 'block';
    }

    console.log("TRIE");
  });
}

// Function to create a product card (you will need to define the HTML structure of a card)
function createProductCard(product) {
  // Create card elements and fill with product data
  const cardContainer = document.getElementById('card-container');

  const card = document.createElement('div');
  card.className = 'product-card';
  
  const image = document.createElement('img');

  // Construct the image URL directly using the provided 'Image' property
  image.src = `../images/product-${product.ProductID}.avif`;
  image.alt = product.Name;

  // Append elements to card
  card.appendChild(image);

  const name = document.createElement('h3');
  name.textContent = product.Name;
  
  const description = document.createElement('p');
  description.textContent = product.Description.length > 100 ? product.Description.substring(0, 97) + '...' : product.Description;
  
  const price = document.createElement('p');
  price.textContent = `$${product.Price}`;
  card.setAttribute('data-price', product.Price); // Store the product's price as a data attribute

  card.setAttribute('data-id', product.ProductID);
  
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

// function displayProducts() {
//   const products = document.querySelectorAll('#card-container .product-card'); // Assuming each card has a class `.product-card`
//   const checkboxes = document.querySelectorAll('#price-filters input[type="checkbox"]:checked');
  
//   // If no checkbox is selected, make all products visible
//   if (checkboxes.length === 0) {
//       products.forEach(product => {
//           product.style.display = "";
//       });
//   } else {
//       // Hide or show products based on the price attribute
//       products.forEach(product => {
//           const price = parseInt(product.getAttribute('data-price'), 10); // Assuming each card has a `data-price` attribute

//           // Show or hide the product card based on its price
//           if (price >= lowerBound && price <= upperBound) {
//               product.style.display = ""; // Show
//           } else {
//               product.style.display = "none"; // Hide
//           }
//       });
//   }
// }
// // Clear the current products and display the new filtered products
// function updateProductDisplay(filteredProducts) {
//   const cardContainer = document.getElementById('card-container');
//   cardContainer.innerHTML = ''; // Clear existing cards

//   filteredProducts.forEach(product => {
//     cardContainer.appendChild(createProductCard(product)); 
//   });
// }


// // Apply filters and update product display
// function applyFilters() {
//   let filteredProducts = allProducts;

//   // Filter by category
//   let selectedCategories = new Set();
//   document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
//     selectedCategories.add(checkbox.value);
//   });
//   if (selectedCategories.size > 0) {
//     filteredProducts = filteredProducts.filter(product => selectedCategories.has(product.Category));
//   }

//   // Filter by gender
//   let selectedGenders = new Set();
//   document.querySelectorAll('input[name="gender"]:checked').forEach(checkbox => {
//     selectedGenders.add(checkbox.value);
//   });
//   if (selectedGenders.size > 0) {
//     filteredProducts = filteredProducts.filter(product => selectedGenders.has(product.Gender));
//   }

//   // Filter by availability
//   let selectedAvailabilities = new Set();
//   document.querySelectorAll('input[name="availability"]:checked').forEach(checkbox => {
//     selectedAvailabilities.add(checkbox.value);
//   });
//   if (selectedAvailabilities.size > 0) {
//     filteredProducts = filteredProducts.filter(product => selectedAvailabilities.has(product.Availability));
//   }

//   // // Adjusted filtering for price ranges
//   // let selectedPriceLabels = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(checkbox => checkbox.value);
//   // if (selectedPriceLabels.length > 0) {
//   //   filteredProducts = filteredProducts.filter(product =>
//   //     selectedPriceLabels.some(label =>
//   //       priceRangeMap.get(label).products.includes(product)
//   //     )
//   //   );
//   // }
  
//   // // Update display with filtered products
//   // updateProductDisplay(filteredProducts);
// }

// Function to update the display of product cards based on filters


// function updateDisplay() {
//   const cardContainer = document.getElementById('card-container');
//   cardContainer.innerHTML = ''; // Clear out the current products
  
//   // Assuming you have a function to create a product card, you would call it here
//   // For example, createProductCard(product)
  
//   // Get selected categories
//   let selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(checkbox => checkbox.value);
//   // Get selected genders
//   let selectedGenders = Array.from(document.querySelectorAll('.gender-filter:checked')).map(checkbox => checkbox.value);
//   // Get selected availabilities
//   let selectedAvailabilities = Array.from(document.querySelectorAll('.availability-filter:checked')).map(checkbox => checkbox.value);

//   let filteredProducts = allProducts.filter(product => {
//     let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.Category);
//     let genderMatch = selectedGenders.length === 0 || selectedGenders.includes(product.Gender);
//     let availabilityMatch = selectedAvailabilities.length === 0 || selectedAvailabilities.includes(product.Availability);
    
//     return categoryMatch && genderMatch && availabilityMatch;
//   });

//   filteredProducts.forEach(product => {
//     cardContainer.appendChild(createProductCard(product));
//   });
// }
