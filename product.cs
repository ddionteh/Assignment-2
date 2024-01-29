body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
}

.hotbar {
    position: relative;
    z-index: 2;
    background: url('https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: #fff;
}
.hotbar button {
    background: transparent;
    border: none;
    cursor: pointer;
}
.hotbar img {
    width: 80px; /* Adjust the size as needed */
    height: 80px; /* Adjust the size as needed */
}


.logo {
    width: 50px;
    height: 50px;
}

.categories {
    position: relative;
}

.categories span {
    cursor: pointer;
}

.dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: display 5s ease; /* Adjust the duration as needed */
    z-index: 3;
}

.categories .dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: display 5s ease; /* Adjust the duration as needed */
    z-index: 3;
    margin-top: 5px; /* Adjust the margin-top to move it closer */
}
.categories .dropdown a {
    display: block;
    padding: 10px 15px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.categories .dropdown a:hover {
    background-color: #9e9e9e;
    color: #555; /* Change the color on hover if needed */
}

.categories:hover .dropdown {
    display: block;
}

.search-bar {
    padding: 5px;
    margin: 0 10px;
}

.chatbot-icon, .redeem-icon, .cart-icon, .account-icon {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    margin: 0 5px;
    font-size: 25px;
}

.background-image {
    position: relative;
    z-index: 1;
    background: url('https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg') no-repeat;
    background-size: cover;
    height: 700px; /* Adjust as needed */
}

.products-section {
    margin-top: 30px;
    overflow: hidden;
    position: relative;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }
  
  .item {
    flex: 0 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: calc(33.33% - 20px);
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
  }
  .item .rating {
    color: #543700; /* Set the color you prefer for the ratings */
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
}
  
  .item img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ccc;
  }
  
  .description {
    padding: 15px;
    text-align: center;
  }
  
  .description h3 {
    margin-bottom: 5px;
    font-size: 18px;
  }
  
  .description p {
    font-size: 14px;
    color: #555;
  }
  .item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  }

   /*footer*/
footer {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
}

footer img {
    width: 50px;
    height: 50px;
}

.quick-links {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
}

.quick-links li {
    margin: 0 10px;
}

.social-icons {
    margin-top: 20px;
}

.social-icon {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
}