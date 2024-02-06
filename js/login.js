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
      redirectToHomePage(); // If form validation is successful, redirect to home page
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
    
        var username = document.getElementsByName("username")[0].value;
        var password = document.getElementsByName("pass")[0].value;
    
        // Send a request to RestDB to retrieve the user data
        fetch('https://fedassignment-8d9a.restdb.io/rest/user-credentials?', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-apikey": "65c0999900d3da120a63a29b",
                "cache-control": "no-cache"
            },
            // Add query parameters as needed to search for the user
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            // You would typically find the user by username here
            // and then compare the password they entered to what's stored in the database.
            // Since we can't do actual password matching on the client-side securely,
            // this is just a placeholder to show the process.
            let user = users.find(u => u.username === username);
            if (user && user.password === password) {
                console.log("Login successful", user);
                // Proceed with login success actions (e.g., redirect or session token storage)
                
            } else {
                console.log("Login failed: user not found or password mismatch");
                // Handle login failure (e.g., display an error message)
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
        });
    }
    
    // Add event listener to the login form
    document.querySelector('.login100-form').addEventListener('submit', loginUser);
    
    

})(jQuery);
