
const chatBox = document.getElementById("chat-box");

const userInput = document.getElementById("user-input");

const sendButton = document.getElementById("send-button")
    ;
const newChatButton = document.getElementById("new-chat-button");

const history = document.querySelector('.history');

let messageCount = 0;
let saves = [];

//---------------------------------------------------------------------------------------------------

// Adicione um ouvinte de evento de teclado ao campo de entrada
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o caractere "Enter" de quebrar a linha
        sendMessage()
    }
});

sendButton.addEventListener("click", sendMessage)
newChatButton.addEventListener("click", addSave);

function sendMessage() {
    const message = userInput.value;

    if (message) {
        const newMessage = document.createElement("div");
        newMessage.textContent = `User: ${message}`;
        newMessage.classList.add("message");
        newMessage.classList.add("UserMessage");
        chatBox.appendChild(newMessage);
        userInput.value = "";
        messageCount++;
        sendMessageToReplit(message);

        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function sendMessageToReplit(message) {
    const lowercaseMessage = message.toLowerCase();
    console.log(lowercaseMessage);
    const type = 'Type4';
    /*
    fetch(`https://duckbots.codecatmeow.repl.co/?query=${type}${lowercaseMessage}`)
        .then(response => response.text())
        .then(result => { addBotMessage(result) })
        .catch(error => {
            console.error(error);
        });
    */
    addBotMessage('Hello World!');
    updateHistory();
}

function addBotMessage(message) {
    const newMessage = document.createElement("div");
    newMessage.textContent = `Bot: ${message}`;
    newMessage.classList.add("message_bot");
    newMessage.classList.add("message");
    chatBox.appendChild(newMessage);
    messageCount++;
    saveCurrentChatMessages();
    updateHistory();
    chatBox.scrollTop = chatBox.scrollHeight;
}

//---------------------------------------------------------------------------------------------------

function loadHistory() {
    const currentChat = document.querySelector(".currentChat");
    if (currentChat) {
        const saveId = parseInt(currentChat.id.replace("SaveId", ""), 10);
        const saveIndex = saves.findIndex((save) => save.saveId === saveId);

        if (saveIndex !== -1) {
            const currentChatMessages = saves[saveIndex].chatContent;
            chatBox.innerHTML = "";

            currentChatMessages.forEach((message) => {
                const newMessage = document.createElement("div");
                newMessage.textContent = message;
                newMessage.classList.add("message");
                newMessage.classList.add("message_saved");

                chatBox.appendChild(newMessage);
            });
        }
    }
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
if (saves.length === 0) {
    initializeDefaultSave();
}
//---------------------------------------------------------------------------------------------------
window.deleteAllSaves = function () {
    saves = []; // Limpa a array de saves
    selectedSave = null; // Reseta o save selecionado
    chatBox.innerHTML = ""; // Limpa as mensagens no Chatbox
}
//---------------------------------------------------------------------------------------------------


