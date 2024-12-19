// Replace the existing sendMessage function with the following:

function sendMessage() {
    // Get the user input
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    // If the input is empty, do nothing
    if (userMessage === "") return;

    // Add user message to the chatbox
    const messages = document.getElementById("messages");
    messages.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    // Send the user message to the backend
    fetch("/get_response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        // Add bot response to the chatbox
        messages.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
        
        // Auto-scroll to the latest message
        messages.scrollTop = messages.scrollHeight;
    });

    // Clear the input field after sending the message
    userInput.value = "";
}

// Add the following code to handle form submission
document.querySelector("form").onsubmit = async (e) => {
    e.preventDefault();

    // Get the user input message
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    // If the message is empty, do nothing
    if (userMessage === "") return;

    // Add the user message to the chatbox
    const messages = document.getElementById("messages");
    messages.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    // Send the user message to the backend
    const response = await fetch("/get_response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    });

    // Wait for the response and add it to the chatbox
    const data = await response.json();
    messages.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
    
    // Auto-scroll to the latest message
    messages.scrollTop = messages.scrollHeight;

    // Clear the input field
    userInput.value = "";
};
