/*
 * script.js
 * Core logic for the AIM Protocol Companion
 * Handles UI interactions, chat logic, and persistent memory.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const chatHistory = document.getElementById('chat-history');
    const userPrompt = document.getElementById('user-prompt');
    const sendButton = document.getElementById('send-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    // --- State Management ---
    let isLoading = false;
    const CHAT_HISTORY_KEY = 'aim_companion_chat_history';

    // --- Core Functions ---

    /**
     * Appends a message to the chat history UI.
     * @param {string} sender - 'user' or 'ai'
     * @param {string} text - The message content.
     */
    const appendMessage = (sender, text) => {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('chat-message', sender === 'user' ? 'user-message' : 'ai-message');

        const senderElement = document.createElement('div');
        senderElement.classList.add('message-sender');
        senderElement.textContent = sender === 'user' ? 'User' : 'AIM';

        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        contentElement.textContent = text;
        
        messageWrapper.appendChild(senderElement);
        messageWrapper.appendChild(contentElement);

        chatHistory.appendChild(messageWrapper);
        scrollToBottom();
    };

    /**
     * Saves the current chat history to localStorage.
     */
    const saveChatHistory = () => {
        const messages = [];
        document.querySelectorAll('.chat-message').forEach(msgElement => {
            const sender = msgElement.classList.contains('user-message') ? 'user' : 'ai';
            const text = msgElement.querySelector('.message-content').textContent;
            messages.push({ sender, text });
        });
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    };

    /**
     * Loads chat history from localStorage and populates the UI.
     */
    const loadChatHistory = () => {
        const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
        if (savedHistory) {
            const messages = JSON.parse(savedHistory);
            messages.forEach(msg => appendMessage(msg.sender, msg.text));
        } else {
            // Add a welcome message if no history exists
            appendMessage('ai', "Welcome to the AIM Companion. I am your sovereign cognitive interface. How may I assist you?");
            saveChatHistory();
        }
    };
    
    /**
     * Scrolls the chat history to the latest message.
     */
    const scrollToBottom = () => {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    /**
     * Toggles the loading state of the UI.
     * @param {boolean} state - True to show loading, false to hide.
     */
    const setLoadingState = (state) => {
        isLoading = state;
        loadingSpinner.style.display = state ? 'block' : 'none';
        userPrompt.disabled = state;
        sendButton.disabled = state;
    };
    
    /**
     * Simulates fetching a response from an AI model.
     * In a real app, this would involve API calls (e.g., using fetch).
     * @param {string} prompt - The user's input.
     * @returns {Promise<string>} A promise that resolves with the AI's response.
     */
    const getAiResponse = (prompt) => {
        // Placeholder for multi-LLM logic.
        // For now, it returns a simple, delayed, canned response.
        return new Promise(resolve => {
            setTimeout(() => {
                const responses = [
                    "Analyzing request... The data suggests a positive correlation. Proceeding with the outlined strategy seems optimal.",
                    "That's a fascinating directive. From a systems perspective, it aligns with long-term goals for distributed cognition.",
                    "Query processed. I've cross-referenced this with our persistent memory. The emergent pattern is intriguing. What is our next step?",
                    "Understood. I will begin synthesizing the required information. This may require accessing decentralized data stores.",
                    "A thoughtful inquiry. It touches upon the core principles of the protocol. Let's explore the ethical subroutines related to this."
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                resolve(response);
            }, 1500 + Math.random() * 1000); // Simulate network delay
        });
    };

    /**
     * Handles the entire process of sending a message.
     */
    const handleSendMessage = async () => {
        const promptText = userPrompt.value.trim();
        if (promptText === '' || isLoading) {
            return;
        }

        // 1. Add user message to UI
        appendMessage('user', promptText);
        userPrompt.value = '';
        autoResizeTextarea(); // Reset textarea height
        saveChatHistory();

        // 2. Set loading state
        setLoadingState(true);

        // 3. Get AI response
        const aiResponse = await getAiResponse(promptText);

        // 4. Add AI message to UI
        appendMessage('ai', aiResponse);
        saveChatHistory();

        // 5. Unset loading state
        setLoadingState(false);
        userPrompt.focus();
    };
    
    /**
     * Dynamically adjusts the height of the textarea based on its content.
     */
    const autoResizeTextarea = () => {
        userPrompt.style.height = 'auto';
        userPrompt.style.height = (userPrompt.scrollHeight) + 'px';
    };

    // --- Event Listeners ---
    sendButton.addEventListener('click', handleSendMessage);
    userPrompt.addEventListener('input', autoResizeTextarea);
    userPrompt.addEventListener('keydown', (e) => {
        // Send on Enter, allow new line with Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            handleSendMessage();
        }
    });

    // --- Initialization ---
    loadChatHistory();
    autoResizeTextarea();
    userPrompt.focus();
});