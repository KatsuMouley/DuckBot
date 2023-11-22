document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de eventos a todas as divs com a classe 'bot'
    var botDivs = document.querySelectorAll('.bot');

    botDivs.forEach(function (botDiv) {
        botDiv.addEventListener('click', function () {
            var botId = botDiv.id;
            console.log('Bot clicado: ' + botId);
            changeBackgroundImage(botId);
        });
    });
});

function changeBackgroundImage(botId) {
    // Obtém a URL da imagem correspondente ao bot clicado
    var imageUrl = getImageUrl(botId);

    // Altera o src da imagem com a classe BGimg
    var bgImage = document.querySelector('.BGimg');
    bgImage.src = imageUrl;
}

function getImageUrl(botId) {
    // Mapeia os IDs dos bots para suas respectivas URLs de imagem
    var imageUrls = {
        'catbotimg': 'css/images/kittenBOG.jpg',
        'duckbot': 'css/images/duck picture.jpg',
        'dogbot': 'css/images/Puppy.jpg',
        'chaddog': 'css/images/SigmaDog.jpg',
        'crazycat': 'css/images/kitten.jpg',
        'uglyduck': 'css/images/prupru.jpg'
    };

    // Retorna a URL da imagem correspondente ao bot clicado
    return imageUrls[botId];
}

let showbots = 1;
let bodyleft = document.querySelector('.bodyleft');
let showButton = document.querySelector('.ShowBots');

function ShowBots() {
    if (showbots === 0) {
        bodyleft.classList.add('none');
        showButton.innerHTML = '<p>mostrar</P>';
        showbots = 1;
    } else {
        bodyleft.classList.remove('none');
        showButton.innerHTML = '<p>esconder</P>';
        showbots = 0;
    }
}
