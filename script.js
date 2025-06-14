function getDeterministicResponse(message) {
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
        hash += message.charCodeAt(i);
    }

    const responses = [
        'Cześć! Jak mogę pomóc?',
        'Dobrze, dzięki że pytasz 😊',
        'Potrafię odpowiadać na pytania!'
    ];

    const index = hash % responses.length;
    return responses[index];
}

function generateBotResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes('co robisz')) {
        return { text: 'Odpowiadam na Twoje pytania. A Ty?', isGif: false };
    }
    else if (lower.includes('co potrafisz')) {
        return { text: 'Wszystko! Razem możemy podbijać świat!', isGif: false };
    }
    else if (lower.includes('bursztynowa komnata') || lower.includes('bursztynowej komnaty')) {
        return { text: 'To łatwe: dokładnie tam, gdzie złoty pociąg!', isGif: false };
    }
    else if (lower.includes('wybory') || lower.includes('wyborów') || lower.includes('Trzaskowski') || lower.includes('Nawrocki')) {
        return { text: 'Wybory!', gifUrl: 'https://media.giphy.com/media/eKrgVyZ7zLvJrgZNZn/giphy.gif', isGif: true };
    }
    else {
        return { text: getDeterministicResponse(message), isGif: false };
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    input.value = '';

    showTypingIndicator();

    const delay = 500 + Math.random() * 1000;
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        if (response.isGif) {
            appendGifMessage('bot', response.gifUrl);
        } else {
            appendMessage('bot', response.text);
        }
    }, delay);
}


function showTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.classList.add('message', 'bot');

    typingDiv.innerHTML = `<span class="dots">
        <span>.</span><span>.</span><span>.</span>
    </span>`;

    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}

function appendMessage(sender, text) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const now = new Date();

    messageDiv.innerText = text;

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = `(${now.toLocaleTimeString()})`;

    messageDiv.appendChild(timestamp);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendGifMessage(sender, gifUrl) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = 'gif';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.marginTop = '8px';

    const now = new Date();
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = `(${now.toLocaleTimeString()})`;

    messageDiv.appendChild(img);
    messageDiv.appendChild(timestamp);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        appendMessage('bot', 'Co u Ciebie dobrego? :D');

        const gifs = [
            'https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif',
            'https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif',
            'https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif',
            'https://media.giphy.com/media/w37nrMphA95albxrn9/giphy.gif',
        ];

        const randomIndex = Math.floor(Math.random() * gifs.length);
        const gifUrl = gifs[randomIndex];

        appendGifMessage('bot', gifUrl);
    }, 2500);
});

document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
});
