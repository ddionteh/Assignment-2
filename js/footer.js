function createFooter() {
  var footer = document.createElement("footer");
  var footerContent = document.createElement("div");
  footerContent.classList.add("footer-content");

  var aboutUs = createContentBox(
    "About Us",
    "At VogueValley, we believe that shopping should be more than just a transaction – it should be an experience. Our mission is to provide a seamless and enjoyable online shopping experience for customers of all tastes and preferences."
  );
  footerContent.appendChild(aboutUs);

  var businessHours = createContentBox(
    "Business Hours",
    "Monday - Sunday<br>7am - 10pm<br>You may call us anytime of the day at <a href='tel:+6512345678'>+65 1234 5678</a>"
  );
  footerContent.appendChild(businessHours);

  var quickLinks = createContentBox("Quick Links", null);
  quickLinks.appendChild(createLinks());
  footerContent.appendChild(quickLinks);

  var socialIcons = createContentBox("Connect", null);
  socialIcons.appendChild(createSocialIcons());
  footerContent.appendChild(socialIcons);

  footer.appendChild(footerContent);
  document.body.appendChild(footer);

  var legalInfo = document.createElement("div");
  legalInfo.classList.add("legal");
  legalInfo.innerHTML =
    "&copy; 2024 VogueValley. All rights reserved. <a href='#'>Privacy Policy</a> <a href='#'>Terms of Service</a>";
  footer.appendChild(legalInfo);
}

function createContentBox(title, content) {
  var box = document.createElement("div");
  box.classList.add("content-box");
  var titleElement = document.createElement("h3");
  titleElement.textContent = title;
  box.appendChild(titleElement);
  if (content) {
    var contentElement = document.createElement("p");
    contentElement.innerHTML = content;
    box.appendChild(contentElement);
  }
  return box;
}

function createLinks() {
  var links = document.createElement("div");
  links.classList.add("links");
  var linkNames = ["Home", "AI Chat", "Shopping Cart", "Login"];
  linkNames.forEach(function (name) {
    var link = document.createElement("a");
    link.textContent = name;
    link.href = name.toLowerCase().replace(" ", "") + ".html";
    links.appendChild(link);
  });
  return links;
}

function createSocialIcons() {
  var socialIcons = document.createElement("div");
  socialIcons.classList.add("social-icons");
  var instagram = createSocialIcon(
    "Instagram",
    "https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-logo-instagram-ini-ada-varias-dan-transparan-33.png"
  );
  socialIcons.appendChild(instagram);
  var facebook = createSocialIcon(
    "Facebook",
    "https://www.facebook.com/images/fb_icon_325x325.png"
  );
  socialIcons.appendChild(facebook);
  return socialIcons;
}

function createSocialIcon(alt, src) {
  var icon = document.createElement("a");
  icon.href = "#";
  var image = document.createElement("img");
  image.alt = alt;
  image.src = src;
  icon.appendChild(image);
  return icon;
}

createFooter();
