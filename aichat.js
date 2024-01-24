function askAI() {
  var userInput = document.getElementById("userInput").value;
  var chatBox = document.getElementById("chatBox");

  // Validate if the user input is not empty
  if (userInput.trim() !== "") {
    // Display user input in the chat box
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;

    // Simulate AI response (replace with actual AI response logic)
    var aiResponse = "AI: Hello! I'm just a simple simulation.";

    // Display AI response in the chat box
    chatBox.innerHTML += `<div>${aiResponse}</div>`;

    // Clear the user input field
    document.getElementById("userInput").value = "";

    // Scroll the chat box to the bottom to show the latest messages
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
