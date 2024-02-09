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

document.addEventListener("DOMContentLoaded", async () => {
  // Mark this function as async
  await fetchProducts(); // Wait for fetchProducts to complete

  // Now that fetchProducts has completed, you can safely attach event listeners to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
});

// Fetch products from the API and store in allProducts
// Function to fetch products from RESTDB API
async function fetchProducts() {
  try {
    const response = await fetch('https://fedassignmentv2-7a2a.restdb.io/rest/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '65c614116a1c9939a9be0023',
      }
  });

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();

    allProducts = products;
    products.forEach((product) => {
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
    addClickEventListenersToProductCards();
    return;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    alert("Unable to display products!");
  }
}

// Dynamically create checkboxes for filtering
function createFilterCheckboxes() {
  // Assume you have a div with id 'filters' in your HTML to hold the checkboxes
  const filtersDiv = document.getElementById("filters");

  // Create checkboxes for categories
  for (let category of categoryMap.keys()) {
    let checkbox = createCheckbox(category, "category");
    filtersDiv.appendChild(checkbox);
  }

  // Create checkboxes for genders
  for (let gender of genderMap.keys()) {
    let checkbox = createCheckbox(gender, "gender");
    filtersDiv.appendChild(checkbox);
  }

  // Create checkboxes for availability
  for (let availability of availabilityMap.keys()) {
    let checkbox = createCheckbox(availability, "availability");
    filtersDiv.appendChild(checkbox);
  }
}

// Helper function to create a checkbox element
function createCheckbox(value, name) {
  let container = document.createElement("div");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = value;
  checkbox.id = value;
  checkbox.name = name;

  let label = document.createElement("label");
  label.htmlFor = value;
  label.textContent = value;

  container.appendChild(checkbox);
  container.appendChild(label);

  return container;
}
// Create price range checkboxes correctly using priceRangeMap
function createPriceRangeCheckboxes() {
  const priceFilterDiv = document.getElementById("price-filters");

  priceRangeMap.forEach((value, label) => {
    let checkbox = createCheckbox(label, "price"); // Use the label for the checkbox
    checkbox.querySelector("input").setAttribute("data-min", value.min);
    checkbox.querySelector("input").setAttribute("data-max", value.max);
    priceFilterDiv.appendChild(checkbox);
  });
}

function applyFilters() {
  const selectedCategories = new Set(
    [...document.querySelectorAll('input[name="category"]:checked')].map(
      (el) => el.value
    )
  );
  const selectedGenders = new Set(
    [...document.querySelectorAll('input[name="gender"]:checked')].map(
      (el) => el.value
    )
  );
  const selectedAvailabilities = new Set(
    [...document.querySelectorAll('input[name="availability"]:checked')].map(
      (el) => el.value
    )
  );
  const selectedPriceRanges = Array.from(
    document.querySelectorAll('input[name="price"]:checked')
  ).map((checkbox) => ({
    min: Number(checkbox.dataset.min),
    max: Number(checkbox.dataset.max),
  }));

  let filteredProducts = allProducts.filter((product) => {
    const inSelectedCategory =
      selectedCategories.size === 0 || selectedCategories.has(product.Category);
    const inSelectedGender =
      selectedGenders.size === 0 || selectedGenders.has(product.Gender);
    const inSelectedAvailability =
      selectedAvailabilities.size === 0 ||
      selectedAvailabilities.has(product.Availability);
    const inSelectedPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some(
        (range) => product.Price > range.min && product.Price <= range.max
      );

    return (
      inSelectedCategory &&
      inSelectedGender &&
      inSelectedAvailability &&
      inSelectedPriceRange
    );
  });
  console.log(filteredProducts);
  updateProductDisplay(filteredProducts);
}

function updateProductDisplay(filteredProducts) {
  // Assuming each product card has a unique identifier such as a `data-id` attribute
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => (card.style.display = "none")); // Hide all cards initially

  // Now, loop through all filtered products and set display to block
  filteredProducts.forEach((product) => {
    const productCard = document.querySelector(
      `.product-card[data-id="${product.ProductID}"]`
    ); // Use the unique identifier to find the card
    if (productCard) {
      productCard.style.display = "block";
    }
  });
}

// Function to create a product card (you will need to define the HTML structure of a card)
function createProductCard(product) {
  // Create card elements and fill with product data
  const cardContainer = document.getElementById('card-container');
  console.log("testing");
  const card = document.createElement('div');
  card.className = 'product-card';
  const image = document.createElement('img');

  // Construct the image URL directly using the provided 'Image' property
  image.src = `../images/product-${product.ProductID}.avif`;
  image.alt = product.Name;

  // Add an "Add to Cart" button
  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'Add to Cart';
  addToCartBtn.onclick = () => addToCart(product);

  const name = document.createElement("h3");
  name.textContent = product.Name;

  const description = document.createElement("p");
  description.textContent =
    product.Description.length > 100
      ? product.Description.substring(0, 97) + "..."
      : product.Description;

  const price = document.createElement("p");
  price.textContent = `$${product.Price}`;
  card.setAttribute("data-price", product.Price); // Store the product's price as a data attribute

  card.setAttribute("data-id", product.ProductID);

  const stockStatus = document.createElement("p");
  stockStatus.textContent = product.Availability;
  stockStatus.className = `card-availability ${product.Availability.toLowerCase().replace(
    " ",
    "-"
  )}`;

  // Append elements to card
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(stockStatus);
  card.appendChild(addToCartBtn);

  // Append card to card container
  cardContainer.appendChild(card);

  return card;
}

// Function to add item to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItem = cart.find(item => item.ProductID === product.ProductID);
  if (cartItem) {
    cartItem.Quantity += 1;
  } else {
    cart.push({ ProductID: product.ProductID, Name : product.Name, Quantity: 1, Image: `../images/product-${product.ProductID}.avif`, Description: product.Description, Category: product.Category, Gender: product.Gender, Availability: product.Availability, Price : product.Price});
  }
  localStorage.setItem('cart', JSON.stringify(cart));

  playLottieAnimation();
}

// Function to play the Lottie animation
function playLottieAnimation() {
  // Display the Lottie animation
  const lottieContainer = document.getElementById("lottie-animation");
  lottieContainer.style.display = "block";

  // Load the animation
  const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "https://lottie.host/8b6bfc9b-5cba-4a47-8c7b-ada50b1a9b8b/hdYc6nUa5Q.json", // Provide the path to your Lottie animation JSON file
  });

  // When the animation completes, hide the Lottie container
  animation.addEventListener("complete", () => {
    lottieContainer.style.display = "none";
  });
}