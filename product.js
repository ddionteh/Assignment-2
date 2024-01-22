function sortBy(option) {
  const productsSection = document.querySelector(".products");
  const productItems = document.querySelectorAll(".item");

  const sortedItems = Array.from(productItems);

  if (option === "availability") {
    sortedItems.sort((a, b) => {
      const availabilityA = a.querySelector(".availability").textContent;
      const availabilityB = b.querySelector(".availability").textContent;

      // Assuming availability is in the format 'In Stock' or 'Out of Stock'
      return availabilityA.localeCompare(availabilityB);
    });
  } else if (option === "price") {
    sortedItems.sort((a, b) => {
      const priceA = parseFloat(a.querySelector(".price").textContent.slice(1));
      const priceB = parseFloat(b.querySelector(".price").textContent.slice(1));

      return priceA - priceB;
    });
  }

  // Clear and re-append sorted items to the container
  productsSection.innerHTML = "";
  sortedItems.forEach((item) => {
    productsSection.appendChild(item);
  });
}
let cartItems = [];

// Function to add item to the cart
function addToCart(productName) {
  const selecteditem = productName;
  const selectedamount = getProductPrice(selecteditem);

  // Check if the item already exists in the cart
  const items = cartItems.find((item) => item.name === selecteditem);

  if (items) {
    items.quantity++;
  } else {
    const newItem = {
      name: selecteditem,
      price: selectedamount,
      quantity: 1,
    };
    cartItems.push(newItem);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  displayCart();
}
