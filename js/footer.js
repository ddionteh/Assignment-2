function createFooter() {
  // Create footer content
  var footerContent = document.createElement("div");
  footerContent.classList.add("content-box");

  // About Us
  var aboutUs = document.createElement("div");
  aboutUs.innerHTML =
    "<h3>About Us</h3><p>At VogueValley, we believe that shopping should be more than just a transaction – it should be an experience. Our mission is to provide a seamless and enjoyable online shopping experience for customers of all tastes and preferences.</p>";
  footerContent.appendChild(aboutUs);

  // Business Hours
  var businessHours = document.createElement("div");
  businessHours.innerHTML =
    "<h3>Business Hours</h3><p>Monday - Sunday<br>7am - 10pm</p><br><p>You may call us anytime of the day at <a href='tel:+6512345678'>+65 1234 5678</a></p>";
  footerContent.appendChild(businessHours);

  // Contact
  //var contact = document.createElement("div");
  // contact.innerHTML = "<h3>Contact</h3><p>You may call us anytime of the day at <a href='tel:+6512345678'>+65 1234 5678</a></p>";
  //footerContent.appendChild(contact);

  // Quick Links
  var quickLinks = document.createElement("div");
  quickLinks.innerHTML =
    "<h3>Quick Links</h3><button onclick=\"window.location.href='index.html'\">Home</button><button onclick=\"window.location.href='aichat.html'\">AI Chat</button><button onclick=\"window.location.href='redeem.html'\">Redeem</button><button onclick=\"window.location.href='cart.html'\">Shopping Cart</button><button onclick=\"window.location.href='login.html'\">Login</button>";
  footerContent.appendChild(quickLinks);

  // Image Box
  var imageBox = document.createElement("div");
  imageBox.classList.add("image-box");
  imageBox.innerHTML =
    "<h3>Connect</h3><a href='' target='_blank'><img src='https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-logo-instagram-ini-ada-varias-dan-transparan-33.png' alt='Instagram'></a><a href='' target='_blank'><img src='https://www.facebook.com/images/fb_icon_325x325.png' alt='Facebook'></a>";
  footerContent.appendChild(imageBox);

  // Append footer content to the footer
  document.getElementById("footerContent").appendChild(footerContent);
}

// Call the function to create footer
createFooter();
