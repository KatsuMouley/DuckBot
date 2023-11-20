const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const history = document.querySelector('.history');
const newChatButton = document.getElementById("new-chat-button");

let messageCount = 0;
let saves = [];
let selectedSave = null;

// Adicione um ouvinte de evento de teclado ao campo de entrada
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o caractere "Enter" de quebrar a linha
        sendMessage();
    }
});

sendButton.addEventListener("click", sendMessage);
newChatButton.addEventListener("click", addSave);

function sendMessage() {
    const message = userInput.value;
    if (message) {
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        newMessage.classList.add("message");
        chatBox.appendChild(newMessage);
        userInput.value = "";
        messageCount++;

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

        // Adiciona a mensagem codificada à URL do Replit
        const replitUrl = "www.google.com";
        const urlWithMessage = `${replitUrl}/${encodedMessage}`;
        // Envia a mensagem para o Replit (você precisará implementar esta parte)
        sendMessageToReplit(urlWithMessage);

        // Verifica se a contagem atingiu 5 mensagens
        if (messageCount % 5 === 0) {
            // Envia uma resposta após 5 mensagens
            const responseMessage = "Bot fora de funcionamento";
            const newResponse = document.createElement("div");
            newResponse.textContent = responseMessage;
            newResponse.classList.add("message_bot");
            chatBox.appendChild(newResponse);
        }
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessageToReplit(url) {
    // Implemente a lógica para enviar a mensagem para o Replit aqui
    // Isso pode envolver uma solicitação HTTP, dependendo da sua configuração
    console.log("Enviando mensagem para o Replit:", url);
}

function deleteSave(saveId) {
    const indexToDelete = saves.findIndex((save) => save.saveId === saveId);

    if (indexToDelete !== -1) {
        saves.splice(indexToDelete, 1);
        updateHistory();
    }
}

function addSave() {
    const newSave = {
        saveId: saves.length + 1,
        saveName: "History" + (saves.length + 1),
        chatContent: [], // Inicializa um array vazio para armazenar as mensagens do chat
    };

    saves.push(newSave);
    updateHistory();
}

function editSaveName(saveId, saveNameElement) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = saveNameElement.textContent.trim();
    inputElement.classList.add("save-name-input");

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            saveNameElement.innerHTML = `<p>${inputElement.value}</p>`;
            updateSaveName(saveId, inputElement.value);
        }
    });

    saveNameElement.innerHTML = "";
    saveNameElement.appendChild(inputElement);

    inputElement.focus();
}

function updateSaveName(saveId, newName) {
    const saveIndex = saves.findIndex((save) => save.saveId === saveId);
    if (saveIndex !== -1) {
        saves[saveIndex].saveName = newName;
    }
}



function updateHistory() {
    history.innerHTML = "";
    saves.forEach((save) => {
        const saveBlock = document.createElement("div");
        saveBlock.classList.add("save");
        saveBlock.id = "SaveId" + save.saveId;

        saveBlock.addEventListener("click", function () {
            let currentChat = document.querySelectorAll(".save");
            currentChat.forEach(function (currentChat) {
                currentChat.classList.remove('currentChat');
            });
            this.classList.add('currentChat');

            loadHistory();
        });

        const saveName = document.createElement("div");
        saveName.classList.add("SaveName");
        saveName.innerHTML = `<p>${save.saveName}</p>`;
        saveName.addEventListener("dblclick", function () {
            editSaveName(save.saveId, saveName);
        });


        const saveMoreConfig = document.createElement("div");
        saveMoreConfig.classList.add("SaveMoreConfig");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("SaveMoreConfigButton");
        deleteButton.innerHTML = "&#x1F5D1";
        deleteButton.onclick = function () {
            deleteSave(save.saveId);
        };

        saveMoreConfig.appendChild(deleteButton);
        saveBlock.appendChild(saveName);
        saveBlock.appendChild(saveMoreConfig);
        history.appendChild(saveBlock);
    });
}


function initializeDefaultSave() {
    const defaultSave = {
        saveId: 1,
        saveName: "Default",
        chatContent: [],
        selected: true,
    };

    saves.push(defaultSave);
    updateHistory();
}

loadHistory();

initializeDefaultSave();
