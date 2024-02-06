// navigation menu
document.addEventListener('DOMContentLoaded', function() {
    const header = document.createElement('header');
    header.innerHTML = `
        <nav>
            <div class="logo">
                <a href="index.html">VOGUEVALLEY</a>
            </div>
            <input type="checkbox" id="click">
            <label for="click" class="mainicon">
                <div class="menu">
                    <i class="bi bi-list"></i>
                </div>
            </label>
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="redeem.html">Redeem</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="login.html">Log In</a></li>
            </ul>
        </nav>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // Here you can also include any JavaScript code needed for your navigation functionality.
});
