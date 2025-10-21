


async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    userInput.value = '';
    addMessage('user', message);
    showTypingIndicator();

    try {
        // ✅ Changed from 127.0.0.1 to your LAN IP
        const res = await fetch("http://10.37.130.218:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        hideTypingIndicator();
        addMessage('bot', data.reply);
    } catch (err) {
        hideTypingIndicator();
        addMessage('bot', "⚠️ Error: Could not reach AI service.");
    }
}

function addMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'flex';
}
function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}
function askQuestion(q) {
    document.getElementById('userInput').value = q;
    sendMessage();
}
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}
