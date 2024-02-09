// Assuming there's a div with the id 'cart-items' to add the products
const cartContainer = document.getElementById('cart-items');

// Placeholder for user's points, replace with actual retrieval from localStorage

let user = JSON.parse(localStorage.getItem('user'));
const userPoints = parseInt(user.Points) || 0; // Fetch user points from localStorage

console.log(userPoints);
// Utility function to format currency
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// Fetch and parse the cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateTotalDisplay();
    updatePointsRedemption();
});

// Then define functions: updateCartDisplay, updateTotalDisplay, applyDiscount, etc.
function updateCartDisplay() {
    // Fetch cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = ''; // Clear the container before adding new items

    cartItems.forEach((item, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'card rounded-3 mb-4';
        productCard.innerHTML = `
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${`../images/product-${item.ProductID}.avif`}" class="img-fluid rounded-3" alt="${item.Name}">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${item.Name}</p>
                <p><span class="text-muted">Category: </span>${item.Category} <span class="text-muted">Gender: </span>${item.Gender}</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2 decrease-quantity">
                  <i class="fas fa-minus"></i>
                </button>
                <input id="form${index}" min="0" name="quantity" value="${item.Quantity}" type="number" class="form-control form-control-sm" />
                <button class="btn btn-link px-2 increase-quantity">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$${item.Price}</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#" class="text-danger remove-item" data-index="${index}"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        `;
        cartContainer.appendChild(productCard);

        // Attach event listeners to increase and decrease buttons
        const decreaseButton = productCard.querySelector('.btn-link.px-2.decrease-quantity');
        const increaseButton = productCard.querySelector('.btn-link.px-2.increase-quantity');
        const quantityInput = productCard.querySelector(`input[name="quantity"]`);
            
        increaseButton.setAttribute('data-index', index);
        decreaseButton.setAttribute('data-index', index);

        decreaseButton.addEventListener('click', () => adjustQuantity(index, -1, quantityInput));
        increaseButton.addEventListener('click', () => adjustQuantity(index, 1, quantityInput));
        
        productCard.querySelector('.remove-item').addEventListener('click', () => removeItem(index));
        
        // After updating the display, call updateTotalDisplay to refresh the subtotal and total
        updateTotalDisplay();
    });
}

function adjustQuantity(index, change, quantityInput) {
    const cartItem = cartItems[index];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItem) {
        cartItem.Quantity += change;
        // Prevent quantity from going below 1
        if (cartItem.Quantity < 1) cartItem.Quantity = 1;

        // Update the input field and localStorage
        quantityInput.value = cartItem.Quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Recalculate and display the updated total
        updateTotalDisplay();
        updateCartDisplay();
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); // Refresh the cart display    

    if (cart.length === 0) {
        setTotalDisplayToZero();
    }
}

function setTotalDisplayToZero() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    const discountElement = document.getElementById('cart-discount');

    // Display the subtotal and total as $0.00
    subtotalElement.textContent = formatCurrency(0);
    totalElement.textContent = formatCurrency(0);
    discountElement.textContent = formatCurrency(0);
}

function applyDiscount(discount) {
    // Apply discount to the total bill
    console.log(`Discount applied: $${discount}`);
}

function calculateTotalBill() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    return cartItems.reduce((total, item) => total + (item.Price * item.Quantity), 0);
}

function applyDiscount() {
    const pointsToRedeem = parseInt(document.getElementById('points-to-redeem').value) || 0;
    const totalBill = calculateTotalBill();
    const maxDiscount = Math.min(userPoints / 100, totalBill); // Ensure discount does not exceed total
    const discountAmount = Math.min(pointsToRedeem / 100, maxDiscount);
    const discountElement = document.getElementById('cart-discount');

    // Check if the entered points do not exceed the user's points and the total bill
    if (pointsToRedeem > userPoints) {
        alert('You do not have enough points.');
        return;
    }
    if (pointsToRedeem / 100 > totalBill) {
        alert('Discount cannot exceed the total bill.');
        return;
    }

    // Apply the discount and update the total display
    discountElement.textContent = formatCurrency(discountAmount);
    updateTotalDisplay();
}

function updatePointsRedemption() {
    const totalBill = calculateTotalBill();
    const maxPointsToRedeem = Math.min(userPoints, totalBill * 100); // Convert total bill to points
    document.getElementById('points-to-redeem').max = maxPointsToRedeem;
    document.getElementById('points-to-redeem').min = 1; // At least 1 point needs to be redeemed
}

function updateTotalDisplay() {
    const subtotal = calculateTotalBill();
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    const discountElement = document.getElementById('cart-discount');

    // Display the subtotal and total
    subtotalElement.textContent = formatCurrency(subtotal);
    totalElement.textContent = formatCurrency(subtotal - (discountElement.textContent.replace('$', '') || 0));
}

function handleCartItemInteraction(event) {
    const target = event.target;
    console.log(target);
    console.log("HELLasO");
    if (target.classList.contains('increase-quantity')) {
        // Extract index or product ID from a data attribute
        adjustQuantity(target.dataset.index, 1, event);
        console.log("HELLO");
    } else if (target.classList.contains('decrease-quantity')) {
        adjustQuantity(target.dataset.index, -1, event);
        console.log("HELLOas");
    } else if (target.classList.contains('remove-item')) {
        removeItem(target.dataset.index);
        console.log("HELasdLO");
    }
    // No need to call updateTotalDisplay here if it's called at the end of adjustQuantity and removeItem
}

// Finally, set up event listeners
document.getElementById('proceed-to-pay').addEventListener('click', () => {
    // Proceed to payment logic
    console.log('Proceeding to payment');
    localStorage.removeItem("cart");

    // also due to free plan RestDB cosntraints, unable to PUT method and update quantity of stock 

    alert("Successfully paid! Thank you for shopping with us :)"); // placeholder as real payment requires API that costs money to use.
    window.location.href = "../index.html"; // If checkout is successful, redirect to home page
});

document.getElementById('apply-points').addEventListener('click', () => {
    // Ensure user is logged in and has points
    if (userPoints <= 0) {
        alert('You are either not logged in or have no points to redeem.');
        return;
    }

    const pointsToRedeemInput = document.getElementById('points-to-redeem');
    const pointsToRedeem = parseInt(pointsToRedeemInput.value);

    // Check if the input is an integer
    if (isNaN(pointsToRedeem) || pointsToRedeem <= 0) {
        alert('Please enter a valid number of points to redeem.');
        return;
    }

    // Check if the points to redeem exceeds user's available points
    if (pointsToRedeem > userPoints) {
        alert('You cannot redeem more points than you have.');
        return;
    }

    const totalBill = calculateTotalBill();
    const maxDiscount = totalBill;
    const discount = Math.min(pointsToRedeem * 0.01, maxDiscount); // 1 point = $0.01

    // Check if the discount exceeds the total bill
    if (discount > totalBill) {
        alert('Discount cannot exceed the total bill.');
        return;
    }

    applyDiscount(discount);
});


