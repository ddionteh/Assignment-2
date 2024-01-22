document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.querySelector(".cart-items");
  const orderSummaryContainer = document.querySelector(".order-summary");

  // Clear existing content
  cartItemsContainer.innerHTML = "";
  orderSummaryContainer.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${
      item.name
    }" class="Product Image">
                <div class="product-details">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-description">${item.description}</p>
                    <div class="rating">
                        Star Rating: ${item.rating}
                    </div>
                    <p class="product-price">$${item.price.toFixed(2)} x ${
      item.quantity
    }</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;

    cartItemsContainer.appendChild(cartItemDiv);

    total += item.price * item.quantity;
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  orderSummaryContainer.appendChild(totalDiv);
}
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
  } else {
    cartItems.splice(index, 1);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCart();
}

function continueShopping() {
  window.location.href = "tshirt.html";
}

function goToCheckout() {
  window.location.href = "checkout.html";
}
