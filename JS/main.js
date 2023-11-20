document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de eventos a todas as divs com a classe 'bot'
    var botDivs = document.querySelectorAll('.bot');

    botDivs.forEach(function (botDiv) {
        botDiv.addEventListener('click', function () {
            var botId = botDiv.id;
            console.log('Bot clicado: ' + botId);
        });
    });
});
let showbots = 1;
let bodyleft = document.querySelector('.bodyleft');
let showButton = document.querySelector('.ShowBots');

function ShowBots() {
    if (showbots === 0) {
        bodyleft.classList.add('none');
        showButton.innerHTML = 'mostrar bots';
        showbots = 1;
    } else {
        bodyleft.classList.remove('none');
        showButton.innerHTML = 'esconder';
        showbots = 0;
    }
}
