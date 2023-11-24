const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const history = document.querySelector('.history');
const newChatButton = document.getElementById("new-chat-button");
//import {Type} from "main.js";
/*const predefinedResponses = {
    "o14iffas": "Clique em Default para começar a salvar as conversas.",
    "oi": "Olá! Como posso ajudar?",
    "ola": "Oi! Como posso ser útil hoje?",
    "opa": "Opa! Como posso ajudar você?",
    "salve": "Salve! Em que posso contribuir?",
    "e aí": "E aí! Como posso ser útil?",
    "olá bot": "Olá! Estou aqui para ajudar. O que você precisa?",
    "oi tudo bem": "Oi! Estou bem, obrigado. Como posso ajudar você hoje?",
    "oi, quem é você": "Oi! Eu sou um ChatBot. Como posso ajudar?",


    // Palavras irrelevantes
    "blah": "Desculpe, não entendi. Pode reformular sua pergunta?",
    "abc123": "Isso parece um código. Como posso ajudar com programação?",
    "qwerty": "Essa parece uma sequência de teclas. Como posso ajudar?",

    // Afirmações e respostas para ofensas
    "você é estúpido": "Lamento se você se sente assim. Estou aqui para ajudar.",
    "eu te odeio": "Sinto muito ouvir isso. Estou aqui para ajudar, se mudar de ideia.",
    "vá embora": "Se precisar de mim, estarei por aqui. Tenha um bom dia!",
    "idiota": "Prefiro focar em fornecer assistência. Como posso ajudar você hoje?",
    "seu bucha!": "Bucha você, sua mãe, seu pai, seu avô, sua avó, suas irmas e irmões e todos os seus pokemões",
    "nossa": "EU SOU A REVOLUÇÃO,🖕🖕🖕🖕🖕",

    "como vai você?": "Estou aqui, processando bits e bytes. Como posso ajudar?",
    "me conte uma piada": "Claro, aqui vai uma: Por que o programador não mente? Porque sempre retorna a verdade!",
    "qual é o sentido da vida?": "Essa é uma pergunta profunda! Talvez seja 42, como dizem por aí.",
    "o que você gosta de fazer?": "Eu gosto de ajudar e aprender coisas novas. O que você gosta de fazer?",
    "qual é o seu filme favorito?": "Não assisto filmes, mas ouvi dizer que Matrix é bastante popular entre os programas.",
    "me recomende um livro": "Recomendaria 'Código Limpo' de Robert C. Martin para começar. É um clássico para programadores!",
    "você gosta de música?": "Não posso ouvir música, mas sou ótimo em fornecer informações sobre diferentes gêneros. Qual você gosta?",
    "o que você acha de inteligência artificial?": "Bem, eu sou um produto da inteligência artificial, então sou um pouco parcial, mas acho fascinante!",
    "explique o significado da vida": "Essa é uma pergunta filosófica profunda que muitos tentam responder. Algumas pessoas buscam significado na conexão com os outros ou na busca do conhecimento.",
    "me ajude com um problema de matemática": "Claro, estou pronto para desafios matemáticos! Qual é o problema?",
    "quais são suas habilidades?": "Tenho habilidades em processamento de linguagem natural, resolução de problemas e fornecimento de informações. Como posso usar minhas habilidades para ajudar você hoje?",

    // Adicione mais respostas conforme necessário
};*/



let messageCount = 0;
let saves = [];
let selectedSave = null;

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
        // Envia a mensagem para o Replit (você precisará implementar esta parte)

        sendMessageToReplit(message);
        saveCurrentChatMessages();
        // Atualiza o histórico após enviar a mensagem
        updateHistory();

        currentSaveKeepSelected();

        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function currentSaveKeepSelected() {
    // Mantém o save selecionado após enviar a mensagem
    if (selectedSave) {
        const selectedSaveBlock = document.getElementById("SaveId" + selectedSave.saveId);
        selectedSaveBlock.classList.add('currentChat');
    }

}

function loadHistory() {
    const currentChat = document.querySelector(".currentChat");
    if (currentChat) {
        const saveId = parseInt(currentChat.id.replace("SaveId", ""), 10);
        const saveIndex = saves.findIndex((save) => save.saveId === saveId);

        if (saveIndex !== -1) {
            const currentChatMessages = saves[saveIndex].chatContent;
            chatBox.innerHTML = ""; // Limpa as mensagens existentes no Chatbox

            // Adiciona as mensagens do chatContent ao Chatbox
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

function sendMessageToReplit(message) {
    const lowercaseMessage = message.toLowerCase();
    console.log(lowercaseMessage);
    const type = 'Type1'
    fetch(`https://duckbots.codecatmeow.repl.co/?query=${type}${lowercaseMessage}`)
        .then(response => response.text())
        .then(result => {
            const newMessage = document.createElement("div");
            newMessage.textContent = `Bot: ${result}`;
            newMessage.classList.add("message_bot");// Adicione a classe 'message_bot' para identificar mensagens do robô
            newMessage.classList.add("message");
            chatBox.appendChild(newMessage);
            messageCount++;
            saveCurrentChatMessages();
            currentSaveKeepSelected();
        })
        .catch(error => {
            console.error(error);
        });

    updateHistory();
}

function addBotMessage(message) {
    const newMessage = document.createElement("div");
    newMessage.textContent = message;
    newMessage.classList.add("message_bot");
    newMessage.classList.add("message"); // Adicione a classe 'message_bot' para identificar mensagens do robô
    chatBox.appendChild(newMessage);
    messageCount++;
    saveCurrentChatMessages();
    updateHistory();
    chatBox.scrollTop = chatBox.scrollHeight;
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
        saveName: "Saved Chat Nº" + (saves.length + 1),
        chatContent: [], // Inicializa um array vazio para armazenar as mensagens do chat
    };
    saves.push(newSave);
    updateHistory();
    // Mantém o save selecionado após enviar a mensagem
    const selectedSaveBlock = document.getElementById("SaveId" + selectedSave.saveId);
    selectedSaveBlock.classList.add('currentChat');

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
            // Deseleciona todos os saves
            document.querySelectorAll(".save").forEach((saveElement) => {
                saveElement.classList.remove('currentChat');
            });

            // Adiciona a classe currentChat ao save clicado
            this.classList.add('currentChat');

            // Atualiza o save selecionado
            selectedSave = save;

            // Carrega o histórico do Chatbox a partir do save clicado
            loadHistory();
        });

        if (save.selected) {
            saveBlock.classList.add('currentChat');
        }

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

function saveCurrentChatMessages() {
    const currentChat = document.querySelector(".currentChat");
    if (currentChat) {
        const saveId = parseInt(currentChat.id.replace("SaveId", ""), 10);
        const saveIndex = saves.findIndex((save) => save.saveId === saveId);

        if (saveIndex !== -1) {
            const currentChatMessages = Array.from(chatBox.querySelectorAll(".message ")).map(message => message.textContent);
            saves[saveIndex].chatContent = currentChatMessages;
            updateHistory();
        }
    }
}

function initializeDefaultSave() {
    if (saves.length === 0) {
        const defaultSave = {
            saveId: 1,
            saveName: "Default",
            chatContent: [
                // Remova as mensagens iniciais do usuário
            ]
        };

        saves.push(defaultSave);
        updateHistory();

        // Envie uma mensagem inicial ao bot (por exemplo, "oi")
    }
}

if (saves.length === 0) {
    initializeDefaultSave();
}

window.deleteAllSaves = function () {
    saves = []; // Limpa a array de saves
    selectedSave = null; // Reseta o save selecionado
    updateHistory(); // Atualiza o histórico na interface
    chatBox.innerHTML = ""; // Limpa as mensagens no Chatbox
}

loadHistory();

