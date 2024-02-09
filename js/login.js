(function ($) {
  "use strict";

  /*==================================================================
    [ Focus input ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    if (check) {
      window.location.href = "../index.html"; // If form validation is successful, redirect to home page
    }
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
    return true;
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    function loginUser(event) {
        event.preventDefault(); // Prevent the default form submission
    
        var username = document.getElementsByName("username")[0].value.trim();
        var password = document.getElementsByName("pass")[0].value.trim();
      
        // Send a request to RestDB to retrieve the user data
        fetch('https://fedassignmentv2-7a2a.restdb.io/rest/user-credentials?q={"User":"' + username + '"}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-apikey": "65c614116a1c9939a9be0023",
                "cache-control": "no-cache"
            },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(users => {
          if (users.length > 0 && users[0].Password === password) {
            console.log("Login successful", users[0]);
            
            // Store user data in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(users[0])); 
            
            alert("Successfully logged in as : " + users[0].User);
            // Redirect to the homepage
            window.location.href = '../index.html';
          } else {
            console.log("Login failed: user not found or password mismatch");
            // Handle login failure (e.g., display an error message)
            alert("Login failed: user not found or password mismatch");
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          console.log("Error logging in!");
          alert("Sorry, there's an issue logging in.");
        });
      }
    
    // Add event listener to the login form
    document.querySelector('.login100-form').addEventListener('submit', loginUser);
    
    

})(jQuery);

document.getElementById("signup-link").addEventListener("click", function () {
  document.querySelector(".wrap-login100").style.display = "none"; // Hide login form
  document.querySelector(".wrap-signup100").style.display = "block"; // Show signup form
});

document.getElementById("login-link").addEventListener("click", function () {
  document.querySelector(".wrap-signup100").style.display = "none"; // Hide signup form
  document.querySelector(".wrap-login100").style.display = "block"; // Show login form
});

// Function to check if passwords match
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Function to check if the username is available
function isUsernameAvailable(username, successCallback, errorCallback) {
  fetch('https://fedassignmentv2-7a2a.restdb.io/rest/user-credentials?q={"User":"' + username + '"}', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "x-apikey": "65c614116a1c9939a9be0023",
      "cache-control": "no-cache"
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        // No user found with this username
        successCallback();
        console.log("No user with this username.");
      } else {
        errorCallback("Username is already taken");
      }
    })
    .catch((error) => {
      console.error("Error checking username availability:", error);
      alert("Error checking username availablity!");
    });
}

// Function to sign up a new user
function signUpUser(username, password) {
  const userData = {
    User: username,
    Password: password,
    Points: 0,
  };

  fetch('https://fedassignmentv2-7a2a.restdb.io/rest/user-credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-apikey": "65c614116a1c9939a9be0023",
      "cache-control": "no-cache"
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to sign up");
      }
    })
    .then((data) => {
      console.log("Signed up successfully", data);
      alert("Successfully signed up as: " + data.User);
      // Store user data in localStorage or sessionStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to the homepage
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Sign up error:", error);
      alert("Error: Unable to sign up.");
    });
}

// Add event listener to the sign-up form
document
  .querySelector(".signup100-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const username = document
      .getElementsByName("signup-username")[0]
      .value.trim();
    const password = document.getElementsByName("signup-pass")[0].value.trim();
    const confirmPassword = document
      .getElementsByName("signup-confirm-pass")[0]
      .value.trim();

    // Check if passwords match
    if (!passwordsMatch(password, confirmPassword)) {
      alert("Passwords do not match.");
      return;
    }

    // Check if username is available
    isUsernameAvailable(
      username,
      function () {
        // If available, sign up the user
        signUpUser(username, password);
      },
      function (errorMessage) {
        alert(errorMessage);
      }
    );
  });
