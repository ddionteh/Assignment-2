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

document.getElementById("sortSelect").addEventListener("change", function () {
    const selected = this.value;
    if (selected !== "default") {
      sortBy(selected);
    }
  });
  
  // Function to get price based on product name (Sample implementation)
  function getProductPrice(productName) {
    if (productName === "DRY-EX Crew Neck Short Sleeve T-Shirt (Print)") {
      return 14.90;
    } else if (productName === "AIRism Cotton Crew Neck T-Shirt") {
      return 19.90;
    } else if (productName === "AIRism Cotton Crew Neck Oversized T-Shirt") {
      return 19.90;
    } else if (productName === "AIRism Cotton Crew Neck Short Sleeve T-Shirt") {
      return 14.90;
    } else if (productName === "Waffle Crew Neck Long Sleeve T-Shirt") {
      return 29.90;
    } else if (productName === "Dry Crew Neck Short Sleeve Colour T-Shirt") {
      return 9.90;
    } else if (productName === "Ultra Stretch AIRism Cropped Short Sleeve T-Shirt (Co-ord)") {
      return 14.90;
    } else if (productName === "AIRism Drape Short Sleeve T-Shirt") {
      return 14.90;
    } else if (productName === "HEATTECH Seamless Ribbed Striped T-Shirt (Extra Warm)") {
      return 14.90;
    } else if (productName === "Ribbed Cropped Ringer Tank Top") {
      return 14.90;
    } else if (productName === "Ribbed Cropped Tank Top") {
      return 14.90;
    } else if (productName === "Soft Ribbed Crew Neck Striped T-Shirt") {
      return 14.90;
    } else if (productName === "Mini Short Sleeve T-Shirt") {
      return 14.90;
    } else if (productName === "Supima Cotton Crew Neck Short Sleeve T-Shirt") {
      return 14.90;
    } else if (productName === "Smooth Stretch Cotton Crew Neck Long Sleeve T-Shirt") {
      return 19.90;

    } else if (productName === "Miracle Air Pants (AirSense Pants) (Cotton Like)") {
      return 59.90;
    } else if (productName === "Ultra Stretch DRY-EX Jogger Pants") {
      return 29.90;
    } else if (productName === "Smart Ankle Pants (Gunclub Check)") {
      return 49.90;
    } else if (productName === "Washed Jersey Jogger Pants") {
      return 39.90;
    } else if (productName === "Smart Ankle Pants (Ultra Stretch)") {
      return 49.90;
    } else if (productName === "Cargo Pants") {
      return 49.90;
    } else if (productName === "Linen Blend Relaxed Pants") {
      return 49.90;
    } else if (productName === "Denim Wide Straight Cargo Pants") {
      return 49.90;
    } else if (productName === "Wide Straight Cargo Pants") {
      return 49.90;
    } else if (productName === "Ultra Stretch Soft Pants") {
      return 29.90;
    } else if (productName === "Pleated Straight Pants") {
      return 39.90;
    } else if (productName === "Flannel Pants") {
      return 19.90;

    } else if (productName === "Ultra Light Down Jacket") {
      return 99.90;
    } else if (productName === "Cotton Blend Parka") {
      return 59.90;
    } else if (productName === "Jersey Relaxed Jacket") {
      return 49.90;
    } else if (productName === "Seamless Down Parka (Nanodesign)") {
      return 49.90;
    }else if (productName === "AirSense Jacket (Co-ord)") {
      return 39.90;
    } else if (productName === "Pocketable UV Protection Parka (Patterned)") {
      return 49.90;
    } else if (productName === "Double Face Wrap Coat") {
      return 39.90;
    } else if (productName === "Coach Jacket (Graphic) (Keith Haring)") {
      return 59.90;
    }else if (productName === "Ultra Light Down Parka (3D Cut)") {
      return 99.90;
    } else if (productName === "Sweat Long Sleeve Full-Zip Hoodie (Co-ord)") {
      return 49.90;
    } else if (productName === "AirSense Jacket (Cotton Like)") {
      return 79.90;
    } else if (productName === "Miracle Air Jacket (AirSense Jacket) (Cotton Like)") {
      return 79.90;
    }

    else if (productName === "Italian Leather Vintage Belt") {
      return 39.90;
    } else if (productName === "Leather Wide Mesh Belt") {
      return 39.90;
    } else if (productName === "HEATTECH Lined Stretch Gloves") {
      return 19.90;
    } else if (productName === "Square Sunglasses") {
      return 29.90;
    }else if (productName === "UV Protection 2WAY Stretch Cap") {
      return 29.90;
    } else if (productName === "UV Protection Cap (Keith Haring)") {
      return 29.90;
    } else if (productName === "UV Protection Knitted Cap") {
      return 29.90;
    } else if (productName === "One Handle Bag") {
      return 39.90;
    }else if (productName === "Crochet Hat") {
      return 39.90;
    } else if (productName === "Studio Ghibli Round Mini Shoulder Bag") {
      return 19.90;
    } else if (productName === "Clean Belt") {
      return 39.90;
    } else if (productName === "HEATTECH Lining Function Gloves") {
      return 19.90;
    }
