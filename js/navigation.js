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
            <li><a href="${isCurrentDirectory() ? 'index.html' : '../index.html'}">Home</a></li>
            <li><a href="${isCurrentDirectory() ? 'html/product.html' : 'product.html'}">Products</a></li>
            <li><a href="${isCurrentDirectory() ? 'html/redeem.html' : 'redeem.html'}">Redeem</a></li>
            <li><a href="${isCurrentDirectory() ? 'html/cart.html' : 'cart.html'}">Cart</a></li>
            <li><a href="${isCurrentDirectory() ? 'html/login.html' : 'login.html'}">Log In</a></li>
            </ul>
        </nav>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // check the link based on directory 
    function isCurrentDirectory() {
        // Get the second last segment of the URL path
        const pathSegments = window.location.pathname.split('/');
        
        // file is in html folder
        if (pathSegments[pathSegments.length - 2] === "html") {
            return false;
        }
        // file is not in html folder (index.html)
        return true;
    }    
});
