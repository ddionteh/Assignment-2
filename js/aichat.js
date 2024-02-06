// aichat.js
// Gemini API key: AIzaSyCTYgBtE1NR5Iy (placeholder) wGYSOwNYB_me6VeZAA5s
// OpenAI API key: sk-1VjfI36JtCWiPopkC1yST (placeholder) 3BlbkFJabZl0h5iZWk9U3qBRDCm


function loadChatbot() {
  // Create chatbot elements
  const chatbotDiv = document.createElement('div');
  chatbotDiv.id = 'chatbot';
  chatbotDiv.innerHTML = `
    <button class="chatbot-toggler">
      <span class="material-symbols-rounded">mode_comment</span>
      <span class="material-symbols-outlined">close</span>
    </button>
    <div class="chatbot">
      <header>
        <h2>AI Stylist</h2>
        <span class="close-btn material-symbols-outlined">close</span>
      </header>
      <ul class="chatbox">
        <li class="chat incoming">
          <span class="material-symbols-outlined">smart_toy</span>
          <p>Hi there 👋<br>How can I help you today?</p>
        </li>
      </ul>
      <div class="chat-input">
        <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
        <span id="send-btn" class="material-symbols-rounded">send</span>
      </div>
    </div>
  `;

  // Append the chatbot to the body
  document.body.appendChild(chatbotDiv);

  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");

  let userMessage = null; // Variable to store user's message
  const API_KEY = "YOUR_OPEN_AI_API_KEY"; // Paste your API key here

  // Set the initial height for the chat input
  const inputInitHeight = chatInput.scrollHeight;

  const createChatLi = (message, className) => {
      // Create a chat <li> element with passed message and className
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", `${className}`);
      let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
      chatLi.innerHTML = chatContent;
      chatLi.querySelector("p").textContent = message;
      return chatLi; // return chat <li> element
  }

  // initialise event listeners
  function initChatbotEventListeners() {
    chatInput.addEventListener("input", () => {
      // Adjust the height of the input textarea based on its content
      chatInput.style.height = `${inputInitHeight}px`;
      chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

  }

  // Fetch available products from RestDB
  function fetchAvailableProducts(callback) {
      fetch('https://fedassignment-8d9a.restdb.io/rest/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "x-apikey": "65c0999900d3da120a63a29b",
          "cache-control": "no-cache"
        }
      })
      .then(response => response.json())
      .then(data => {
        // Filter for available products
        const availableProducts = data.filter(product => product.Availability.toLowerCase() === "in stock");
        callback(availableProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
    }
    
    // Generate a message to send to the chatbot API
    function generateMessage(products, chatElement) {
      // Create a string that lists available products
      const productList = products.map(p => `${p.Name}: ${p.Description}`).join('. ');
      
      // Now send this string to the chatbot API
      generateResponse(productList, chatElement);
    }
    
  const generateResponse = (productList, chatElement) => {
      if (!(chatElement instanceof Element)) {
          console.error('generateResponse: Invalid chat element.');
          return;
      }
      const API_URL = 'https://api.openai.com/v1/chat/completions';
      const messageElement = chatElement.querySelector("p");

      const requestOptions = {    
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant, the best stylist in the world. You give the best advice.' },
            { role: 'user', content: userMessage },
            { role: 'assistant', content: `Here are some outfit suggestions based on our current stock: ${productList}` }
          ],
        })
      };
    
      // Send POST request to API, get response and set the reponse as paragraph text
      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
          messageElement.textContent = data.choices[0].message.content.trim();
      }).catch(() => {
          messageElement.classList.add("error");
          messageElement.textContent = "Oops! Something went wrong. Please try again.";
      }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
  }

  const handleChat = () => {
      userMessage = chatInput.value.trim(); 
      if(!userMessage) return;

      chatInput.value = "";
      chatInput.style.height = `${inputInitHeight}px`;

      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
      
      // Simulate a delay before showing the chatbot's response
      setTimeout(() => {
          // Display "Thinking..." message while waiting for the response
          const incomingChatLi = createChatLi("Thinking...", "incoming");
          chatbox.appendChild(incomingChatLi);
          chatbox.scrollTo(0, chatbox.scrollHeight);
          fetchAvailableProducts((availableProducts) => {
              generateMessage(availableProducts, incomingChatLi);
          });
      }, 1200); // Adjust the delay as needed
  }

  // Initialize event listeners (for toggling chatbot, sending messages, etc.)
  initChatbotEventListeners();
}

// Make sure to wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  loadChatbot();
});

// // Global variable to store products
// let products = [];

// // Fetch products from RestDB when the page loads
// window.onload = function() {
//   fetch('https://fedassignment-8d9a.restdb.io/rest/products?', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       "x-apikey": "65c0999900d3da120a63a29b",
//       "cache-control": "no-cache"
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     products = data; // Store the products for later use
//   })
//   .catch(error => console.error('Error fetching products:', error));
// };

// console.log(products);

// // // Function to handle sending a message
// // function sendMessage(userText) {
// //   // Filter products based on userText or any other criteria
// //   let filteredProducts = filterProducts(userText);

// //   // Prepare the message for OpenAI
// //   let messages = [
// //     {"role": "system", "content": "You are the best stylist in the world, able to recommend the best outfits to users. You are able to give different outfits for different demographics. "},
// //     // Include user's last message
// //     {"role": "user", "content": userText},
// //     // Include a placeholder assistant message with available products
// //     {"role": "assistant", "content": "A Ribbed Cropped Ringer Tank Top and Ultra Stretch Soft Pants."},
// //     // Add more context or messages as needed
// //   ];

// //   // Fetch recommendations from OpenAI
// //   fetch('https://api.openai.com/v1/chat/completions', {
// //     method: 'POST',
// //     headers: {
// //       'Authorization': 'Bearer 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',
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       model: "gpt-3.5-turbo",
// //       messages: messages
// //     })
// //   })
// //   .then(response => response.json())
// //   .then(data => {
// //     // Display the AI's response in the chatbox
// //     displayChatMessage(data.choices[0].message.content, 'bot');
// //   })
// //   .catch(error => console.error('Error:', error));
// // }

// // Function to handle sending a message
// function sendMessage(userText) {
//   // Filter available products
//   let availableProducts = products.filter(product => product.Availability === "In Stock");
  
//   // Format the available products for the AI context
//   let productDescriptions = availableProducts.map(p => `${p.Name}, ${p.Description}`).join('. ');

//   let messages = [
//       {"role": "system", "content": "You are the best stylist in the world, able to recommend the best outfits to users based on our current stock."},
//       {"role": "user", "content": userText},
//       {"role": "assistant", "content": productDescriptions},
//   ];

//   const messageElement = chatElement.querySelector("p");

//   // Define the properties and message for the API request
//   // Fetch recommendations from OpenAI
//   fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//           'Authorization': 'Bearer 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',
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: messages
//       })
//   })
//   // Send POST request to API, get response and set the reponse as paragraph text
//   .then(res => res.json())
//   .then(data => {
//       messageElement.textContent = data.choices[0].message.content.trim();
//   })
//   .catch(() => {
//       messageElement.classList.add("error");
//       messageElement.textContent = "Oops! Something went wrong. Please try again.";
//   })
//   .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }


// // // Function to filter products based on user input or other criteria
// // function filterProducts(userInput) {
// //   // Implement filtering logic here based on product properties and user input
// //   // This is just a placeholder
// //   return products.filter(product => product.category === userInput);
// // }


// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     // Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", `${className}`);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi; // return chat <li> element
// }

// const handleChat = () => {
//   userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
//   if(!userMessage) return;

//   // Clear the input textarea and set its height to default
//   chatInput.value = "";
//   chatInput.style.height = `${inputInitHeight}px`;

//   // Append the user's message to the chatbox
//   chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//   chatbox.scrollTo(0, chatbox.scrollHeight);
  
//   setTimeout(() => {
//       // Display "Thinking..." message while waiting for the response
//       const incomingChatLi = createChatLi("Thinking...", "incoming");
//       chatbox.appendChild(incomingChatLi);
//       chatbox.scrollTo(0, chatbox.scrollHeight);
//       sendMessage(incomingChatLi);
//   }, 600);
// }

// chatInput.addEventListener("input", () => {
//   // Adjust the height of the input textarea based on its content
//   chatInput.style.height = `${inputInitHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//   // If Enter key is pressed without Shift key and the window 
//   // width is greater than 800px, handle the chat
//   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//       e.preventDefault();
//       handleChat();
//   }
// });

// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// // Event listener for the send button
// document.getElementById("buttonInput").addEventListener("click", function() {
//   let userText = document.getElementById("textInput").value;
//   if (userText === "") {
//     alert("Please enter a message.");
//     return;
//   }
//   sendMessage(userText);
//   displayChatMessage(userText, 'user'); // Display the user's message in the chatbox
//   document.getElementById("textInput").value = ""; // Clear the input box
// });





// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     // Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", `${className}`);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi; // return chat <li> element
// }

// const generateResponse = (chatElement) => {
//     const API_URL = "https://api.openai.com/v1/chat/completions";
//     const messageElement = chatElement.querySelector("p");

//     // Define the properties and message for the API request
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{role: "user", content: userMessage}],
//         })
//     }

//     // Send POST request to API, get response and set the reponse as paragraph text
//     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//         messageElement.textContent = data.choices[0].message.content.trim();
//     }).catch(() => {
//         messageElement.classList.add("error");
//         messageElement.textContent = "Oops! Something went wrong. Please try again.";
//     }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }

// const handleChat = () => {
//     userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
//     if(!userMessage) return;

//     // Clear the input textarea and set its height to default
//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     // Append the user's message to the chatbox
//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);
    
//     setTimeout(() => {
//         // Display "Thinking..." message while waiting for the response
//         const incomingChatLi = createChatLi("Thinking...", "incoming");
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);
//         generateResponse(incomingChatLi);
//     }, 600);
// }

// chatInput.addEventListener("input", () => {
//     // Adjust the height of the input textarea based on its content
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed without Shift key and the window 
//     // width is greater than 800px, handle the chat
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// });

// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// document.getElementById("buttonInput").addEventListener("click", function() {
//   let userText = document.getElementById("textInput").value;
//   if (userText == "") {
//       alert("Please enter a message.");
//       return;
//   }
//   let chatbox = document.getElementById("chatbox");
//   chatbox.innerHTML += `<p class="userText"><span>${userText}</span></p>`;
//   document.getElementById("textInput").value = "";

//   // Example: Sending a request to OpenAI's API
//   fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//         'Authorization': 'Bearer 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',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {"role": "system", "content": "You are the best stylist in the world, able to recommend the best outfits to users. You are able to give different outfits for different demographics. "},
//             {"role": "assistant", "content": "Black Cargo pants and oversized White-colored T-Shirt."},
//         ]
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));
// });



// document.getElementById("askButton").addEventListener("click", async () => {
//   const userInput = document.getElementById("userInput").value;

//   if (!userInput.trim()) {
//     alert("Please enter some text.");
//     return;
//   }

//   const response = await askGPT35(userInput);
//   console.log(response);
//   if (response) {
//     document.getElementById("chatBox").textContent += `\nUser: ${userInput}\nAI: ${response}`;
//   } else {
//     document.getElementById("chatBox").textContent += "\nSorry, there was an error.";
//   }
// });

// async function askGPT35(prompt) {

//     const requestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant."
//         },
//         {
//           role: "user",
//           content: prompt
//         },
//       ]
//     };
//     // const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       "Authorization": "Bearer YOUR_OPENAI_API_KEY"  // Replace with your actual API key
//     //     },
//     //     body: JSON.stringify(requestBody)
//     //   });
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer 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" // Replace with your actual API key
//       },
//       body: JSON.stringify(requestBody)
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data.choices[0].text.trim();
  
// }


// function askAI() {
//   var userInput = document.getElementById("userInput").value;
//   var chatBox = document.getElementById("chatBox");

//   // Validate if the user input is not empty
//   if (userInput.trim() !== "") {
//     // Display user input in the chat box
//     chatBox.innerHTML += `<div>User: ${userInput}</div>`;

//     // Simulate AI response (replace with actual AI response logic)
//     var aiResponse = "AI: Hello! I'm just a simple simulation.";

//     // Display AI response in the chat box
//     chatBox.innerHTML += `<div>${aiResponse}</div>`;

//     // Clear the user input field
//     document.getElementById("userInput").value = "";

//     // Scroll the chat box to the bottom to show the latest messages
//     chatBox.scrollTop = chatBox.scrollHeight;
//   }
// }

// async function askGemini(model, inputText) {
//   try {
//     // Sending a request to the Gemini model
//     const response = await model.generateContent(inputText);
//     console.log(response);
//     // Process the response
//     const textResponse = response.response.text; // This is an example and might need to be adjusted
//     return textResponse; // This will depend on the response structure
//   } catch (error) {
//     console.error('Error interacting with Gemini model:', error);
//     return null; // Handle errors appropriately
//   }
// }


// document.getElementById("askButton").addEventListener("click", async () => {
//   const userInput = document.getElementById("userInput").value;

//   if (!userInput.trim()) {
//     alert("Please enter some text.");
//     return;
//   }

//   const geminiResponse = await askGemini(model, userInput);

//   console.log(model + userInput);
//   if (geminiResponse) {
//     document.getElementById("response").textContent = geminiResponse;
//   } else {
//     document.getElementById("response").textContent = "Sorry, there was an error.";
//   }
// });


// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const prompt = "Do these look store-bought or homemade?";
// const image = {
//   inlineData: {
//     data: base64EncodedImage /* see JavaScript quickstart for details */,
//     mimeType: "image/png",
//   },
// };

// const result = await model.generateContent([prompt, image]);
// console.log(result.response.text());

// const result = await model.generateContent([prompt, image]);
// console.log(result.response.text());

// async function askAI() {
//   var userInput = document.getElementById("userInput").value;
//   var chatBox = document.getElementById("chatBox");

//   // Validate if the user input is not empty
//   if (userInput.trim() !== "") {
//     // Display user input in the chat box
//     chatBox.innerHTML += `<div>User: ${userInput}</div>`;

//     try {
//       // Make an API request to Gemini AI
//       let response = await fetch('https://api.gemini-ai.example.com', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'AIzaSyCoqHe1uuYUgLSOiUUG7nPsbgiw3FZBn08'
//         },
//         body: JSON.stringify({ message: userInput })
//       });

//       if (response.ok) {
//         let data = await response.json();
//         // Display AI response in the chat box
//         chatBox.innerHTML += `<div>AI: ${data.aiResponse}</div>`;
//       } else {
//         // Handle HTTP errors
//         console.error('API request failed with status', response.status);
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.error('API request failed:', error);
//     }

//     // Clear the user input field
//     document.getElementById("userInput").value = "";

//     // Scroll the chat box to the bottom to show the latest messages
//     chatBox.scrollTop = chatBox.scrollHeight;
//   }
// }


