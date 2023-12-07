document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de eventos a todas as divs com a classe 'bot'
    var botDivs = document.querySelectorAll('.bot');

    botDivs.forEach(function (botDiv) {
        botDiv.addEventListener('click', function () {
            var botId = botDiv.id;

            changeBackgroundImage(botId);
        });
        //        botDiv.classList.add('CurrentBot');
    });
});

function changeBackgroundImage(botId) {
    // Obtém a URL da imagem correspondente ao bot clicado
    var imageUrl = getImageUrl(botId);

    // Altera o src da imagem com a classe BGimg
    var bgImage = document.body;
    bgImage.style = `background:${imageUrl}; height: 100%; background-attachment: fixed; 
    background-color: #4e4e4e; background-position: center; background-repeat: no-repeat;
    background-size: cover; z-index: -1;`;
}

function getImageUrl(botId) {
    // Mapeia os IDs dos bots para suas respectivas URLs de imagem
    var imageUrls = {
        'catbotimg': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/kittenBOG.jpg')",
        'duckbot': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/duck picture.jpg')",
        'dogbot': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/Puppy.jpg')",
        'chaddog': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/SigmaDog.jpg')",
        'crazycat': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/kitten.jpg')",
        'uglyduck': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('css/images/prupru.jpg')"
    };

    // Retorna a URL da imagem correspondente ao bot clicado
    return imageUrls[botId];
}

let showbots = 1;
let bodyleft = document.querySelector('.bodyleft');
let showButton = document.querySelector('.ShowBots');

function ShowBots() {
    if (showbots === 0) {
        showButton.classList.remove('arrowRight');
        showButton.classList.add('arrowLeft');
        bodyleft.classList.add('none');
        showbots = 1;
    } else {
        showButton.classList.remove('arrowLeft');
        showButton.classList.add('arrowRight');
        bodyleft.classList.remove('none');
        showbots = 0;
    }
}


//export function type() {
