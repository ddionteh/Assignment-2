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
                <img src="${item.Image}" alt="${
      item.Name
    }" class="Product Image">
                <div class="product-details">
                    <h3 class="product-name">${item.Name}</h3>
                    <p class="product-description">${item.Description}</p>
                    <p class="product-price">$${item.Price.toFixed(2)} x ${
      item.Quantity
    }</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;

    cartItemsContainer.appendChild(cartItemDiv);

    total += item.Price * item.Quantity;
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  orderSummaryContainer.appendChild(totalDiv);
}

function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems[index].Quantity > 1) {
    cartItems[index].Quantity--;
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
