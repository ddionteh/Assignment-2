document.getElementById("askButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;

  if (!userInput.trim()) {
    alert("Please enter some text.");
    return;
  }

  const response = await askGPT35(userInput);
  console.log(response);
  if (response) {
    document.getElementById("chatBox").textContent += `\nUser: ${userInput}\nAI: ${response}`;
  } else {
    document.getElementById("chatBox").textContent += "\nSorry, there was an error.";
  }
});

async function askGPT35(prompt) {

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: prompt
        },
      ]
    };
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer YOUR_OPENAI_API_KEY"  // Replace with your actual API key
    //     },
    //     body: JSON.stringify(requestBody)
    //   });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // Replace with your actual API key
      },
      body: JSON.stringify(requestBody)
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.choices[0].text.trim();
  
}


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


