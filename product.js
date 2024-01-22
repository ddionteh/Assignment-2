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

// Function to remove item from cart
function removeFromCart(index) {
  const item = cartItems[index];
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cartItems.splice(index, 1);
  }
  displayCart();
}
const storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
}
document.getElementById("sortSelect").addEventListener("change", function () {
  const selected = this.value;
  if (selected !== "default") {
    sortBy(selected);
  }
});
function clearCart() {
  cartItems = [];
  localStorage.removeItem("cartItems");
  displayCart();
}

// Display cart on page load
displayCart();
// Function to display cart items
function displayCart() {
  const cartcontainer = document.getElementById("cartItems");
  cartcontainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-item");

    cartDiv.innerHTML = `
          <p>${item.name} - $${item.price} x ${item.quantity}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        `;

    cartcontainer.appendChild(cartDiv);
    total += item.price * item.quantity;
  });
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartcontainer.appendChild(totalDiv);
}
