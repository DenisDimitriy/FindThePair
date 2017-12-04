/**
 * Created by Denis on 08.11.2017.
 */



//СЦЕНАРИЙ

//Глобальные переменные
var countOfPair = 6,
    name = "unknown",
    theme = "numbers",
    timerId,
    counterTryes = 0,
    counter = 0,
    selected = null,
    gameStarted = false,
    gamePaused = false,
    gameFinished = false,
    disableSelect = true,
    disableBtnControl = false,
    disableBtnRestart = false;


var loc = window.location;
var href = loc.href;
var index = href.indexOf("player");

if (index != -1) {
    var params = href.slice(index + 7);
    index = params.indexOf("&");
    var player = params.slice(0, index);
    index = player.indexOf("+");
    while (index != -1){
        var string = player.slice(0, index) + ' ' + player.slice(index + 1);
        player = string;
        index = player.indexOf("+");
    }

    if(player=="") player = "unknown";

    index = href.indexOf("boardsize");
    params = href.slice(index + 10);
    index = params.indexOf("&");
    var size = params.slice(0, index);
    index = href.indexOf("theme");
    params = href.slice(index + 6);
    countOfPair = +size;
    name = player;
    theme = params;
}


/* КОНФИГУРИРОВАНИЕ */

//Выбрать элемент board
var board = document.querySelector(".board");

//Сгенерировать доску с картами
generateBoard(board);

//Задать ширину стека удаленных карт
var discardStack = document.querySelector(".discard-stack");
var boardWidth = parseInt(getComputedStyle(board).width, 10);
//discardStack.style.width = boardWidth + "px";

//Задать ширину обвертки
var wrapper = document.querySelector(".wrapper");
//var wrapperWidth = boardWidth + 204;
//wrapper.style.width = wrapperWidth + "px";


var wrapperBoard = document.querySelector(".wrapper-board");
if (countOfPair == 6) {
    wrapperBoard.style.paddingTop = '56px';
    wrapperBoard.style.paddingBottom = '56px';
}

var gameSpace = document.querySelector(".game-space");
gameSpace.style.backgroundImage = 'url("img/themes/' + theme + '/background.png")';


//Задать высоту панели
var panel = document.querySelector(".panel");
var wrapperHeight = parseInt(getComputedStyle(gameSpace).height, 10);
//panel.style.height = wrapperHeight + "px";

//Выбрать набор элементов card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать карты
initCards(cards);

//Выбрать блок таймера
var timer = document.querySelector(".timer");

//Инициализировать таймер
initTimer(timer);

//Выбрать блок кнопки управления
var btnControl = document.querySelector(".btn-control");

//Выбрать блок кнопки управления
var btnRestart = document.querySelector(".btn-restart");

/*СЦЕНАРИЙ ИГРЫ*/

//Обработчики событий
//Клик на кнопку управления
btnControl.onclick = function () {
    console.log (gameStarted + " | " + disableBtnControl);
    //Если игра не начата
    if (!gameStarted) {
        disableBtnControl = true;
        disableBtnRestart = true;
        gameStarted = true;
        btnControl.innerHTML = "Pause";
        //Открыть карты
        for (var i = 0; i < cards.length; i++) {
            openCard(cards[i]);
        }
        //Через время открыть все карты, разрешить выбор карт, запустить таймер
        setTimeout(function () {
            for (i = 0; i < cards.length; i++) {
                closeCard(cards[i]);
            }
            disableSelect = false;
            timerId = startTimer(timer);
            disableBtnControl = false;
            disableBtnRestart = false;
        }, 2000);
    }
    //если игра запущена, не закончена и не нажата пауза
    else if (!gamePaused && !gameFinished && !disableBtnControl) {
        //включить паузу
        gamePaused = true;
        btnControl.innerHTML = "Resume";
        disableSelect = true;
        stopTimer(timerId);
    }
    //если игра запущена, не закончена и нажата пауза
    else if (gamePaused && !gameFinished && !disableBtnControl) {
        //Выключить паузу
        gamePaused = false;
        btnControl.innerHTML = "Pause";
        disableSelect = false;
        timerId = startTimer(timer);
    }
    //Если игра закончена
    if (gameFinished) {

        /*
         //Рестарт игры
         board.innerHTML = null;
         timer.innerHTML = null;
         discardStack.innerHTML = null;
         generateBoard(board);
         cards = document.getElementsByClassName("card");
         initCards(cards);
         initTimer(timer);
         btnControl.innerHTML = "Start";

         selected = null;
         counter = 0;
         disableSelect = true;
         timerId = null;
         gameStarted = false;
         gamePaused = false;
         gameFinished = false;
         */
    }
    return false;
};

//Клик на restart
btnRestart.onclick = function () {
    if(disableBtnRestart) {return false};
    //Рестарт игры
    board.innerHTML = null;
    timer.innerHTML = null;
    discardStack.innerHTML = null;
    generateBoard(board);
    cards = document.getElementsByClassName("card");
    initCards(cards);
    initTimer(timer);
    btnControl.innerHTML = "Start";
    counterTryes = 0;

    wrapperBoard.classList.remove("hidden");
    selected = null;
    counter = 0;
    disableSelect = true;
    timerId = null;
    gameStarted = false;
    gamePaused = false;
    gameFinished = false;
    disableBtnControl = false;
    return false;
};

//Клик в пределах доски
board.onclick = function (event) {
    //Выбрать карту в цели клика
    var target = event.target.closest('.card');

    //Возврат, если клик не на карте
    if (target == null) return;

    //Если клик на карту и нет запрета выбора карты
    if (target.classList.contains("card") && disableSelect != true) {

        //если ниодна карта еще не выбрана
        if (!selected) {
            selected = target;
            openCard(selected);
        }

        //Eсли уже выбрана одна карта
        else if (selected) {

            //Eсли номера целевой и выбранной карт не совпадают и это не одна и та же карта
            if (selected.dataset.number != target.dataset.number && selected != target) {
                counterTryes++;
                disableSelect = true;
                openCard(target);
                setTimeout(function () {
                    closeCard(selected);
                    closeCard(target);
                    selected = null;
                    target = null;
                    disableSelect = false;
                }, 750)
            }

            //Eсли номера целевой и выбранной карт совпадают и это не одна и та же карта
            if (selected.dataset.number == target.dataset.number && selected != target) {
                counterTryes++;
                removeCard(selected);
                removeCard(target);
                selected = null;
                target = null;
                counter++;
                if (counter == countOfPair) {
                    gameFinished = true;
                    btnControl.innerHTML = "Start";
                    disableSelect = true;
                    disableBtnRestart = true;
                    setTimeout(function(){
                        disableBtnRestart = false;
                    }, 1500);

                    stopTimer(timerId);
                    finishGame(name, countOfPair, counterTryes);

                }
            }
        }
    }
    return false;
};


/*
 var params = window
 .location
 .search
 .replace('?','')
 .split('&')
 .reduce(
 function(p,e){
 var a = e.split('=');
 p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
 return p;
 },
 {}
 );

 alert( params['data']);
 */


