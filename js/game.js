/**
 * Created by Denis on 08.11.2017.
 */

// Импорт функций из файла model.js

import {
    getRandomPairArray,
    generateBoard,
    initCards,
    removeCard,
    openCard,
    closeCard,
    initTimer,
    startTimer,
    stopTimer,
    finishGame
} from './model';


/** СЦЕНАРИЙ */

//Глобальные переменные
var countOfPair = 6,
    name = "unknown",
    theme = "hearthstone",
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

// Определения входящих параметров
var loc = window.location;
var href = loc.href;
var index = href.indexOf("player");

if (index != -1) {
    var params = href.slice(index + 7);
    index = params.indexOf("&");
    var player = params.slice(0, index);

    index = player.indexOf("+");
    while (index != -1) {
        var string = player.slice(0, index) + ' ' + player.slice(index + 1);
        player = string;
        index = player.indexOf("+");
    }


    index = player.indexOf(" ");
    while (index != -1) {
        var partBefore = player.slice(0, index);
        var partBehind = player.slice(index + 1);
        console.log(partBefore.length + "|" + partBehind.length);

        if (partBefore.length != 0) {
            console.log("name");
            break;
        }
        else if (partBehind.length == 0) {
            player = "unknown";
            break;
        }
        else {
            player = partBehind;
            console.log(player);
            index = player.indexOf(" ");
        }
    }

    if (player == "") player = "unknown";

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


/** КОНФИГУРИРОВАНИЕ */

//Выбрать элемент board
var board = document.querySelector(".board");

//Сгенерировать доску с картами
generateBoard(board, countOfPair);

//Выбрать стек удаленных карт
var discardStack = document.querySelector(".discard-stack");

//Адаптировать обвертку игровой доски под размер 6х6
var wrapperBoard = document.querySelector(".wrapper-board");
if (countOfPair == 6) {
    wrapperBoard.style.paddingTop = '56px';
    wrapperBoard.style.paddingBottom = '56px';
}

//Выбрать фоновое изображение согласно выбранной теме
var gameSpace = document.querySelector(".game-space");
gameSpace.style.backgroundImage = 'url("img/themes/' + theme + '/background.png")';

//Выбрать набор элементов card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать карты
initCards(cards, countOfPair, theme);

//Выбрать блок таймера
var timer = document.querySelector(".timer");

//Инициализировать таймер
initTimer(timer);

//Выбрать блок кнопки управления
var btnControl = document.querySelector(".btn-control");

//Выбрать блок кнопки перезапуска
var btnRestart = document.querySelector(".btn-restart");

//Выбрать блок заставки паузы и финиша
var cover = document.querySelector(".cover");


/** СЦЕНАРИЙ ИГРЫ */

//Обработчики событий
//Клик на кнопку управления
btnControl.onclick = function () {

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

        //Через время закрыть все карты, разрешить выбор карт, запустить таймер
        setTimeout(function () {
            for (i = 0; i < cards.length; i++) {
                closeCard(cards[i]);
            }
            disableSelect = false;
            timerId = startTimer(timer);
            disableBtnControl = false;
            disableBtnRestart = false;
        }, 2000);
        btnControl.classList.remove("btn-start");
    }

    //Если игра запущена, не окончена и не нажата пауза
    else if (!gamePaused && !gameFinished && !disableBtnControl) {

        //Включить паузу
        gamePaused = true;
        btnControl.innerHTML = "Resume";
        disableSelect = true;
        stopTimer(timerId);
        cover.classList.remove("finish");
        cover.classList.add("pause");
        cover.classList.remove("hidden");
        cover.innerHTML = "pause";
    }

    //Если игра запущена, не окончена и нажата пауза
    else if (gamePaused && !gameFinished && !disableBtnControl) {

        //Выключить паузу
        gamePaused = false;
        btnControl.innerHTML = "Pause";
        disableSelect = false;
        timerId = startTimer(timer);
        cover.classList.add("hidden");
        cover.innerHTML = "";
    }

    return false;
};

//Клик на restart
btnRestart.onclick = function () {
    if (disableBtnRestart) {
        return false
    }

    //Рестарт игры
    board.innerHTML = null;
    timer.innerHTML = null;
    discardStack.innerHTML = null;
    generateBoard(board, countOfPair);
    cards = document.getElementsByClassName("card");
    initCards(cards, countOfPair, theme);
    initTimer(timer);
    btnControl.innerHTML = "Start";
    counterTryes = 0;
    wrapperBoard.classList.remove("transparent");
    selected = null;
    counter = 0;
    disableSelect = true;
    timerId = null;
    gameStarted = false;
    gamePaused = false;
    gameFinished = false;
    disableBtnControl = false;
    cover.classList.add("hidden");
    btnControl.classList.remove("btn-disabled");
    btnControl.classList.add("btn-start");
    return false;
};

//Клик в пределах доски
board.onclick = function (event) {

    //Выбрать карту в цели клика
    var target = event.target.closest('.card');

    //Возврат, если клик не на карте
    if (target == null) return;

    //Если клик на карте и нет запрета выбора карты
    if (target.classList.contains("card") && disableSelect != true) {

        //Если ниодна карта еще не выбрана
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

                //Eсли все пары найдены
                if (counter == countOfPair) {
                    gameFinished = true;
                    btnControl.innerHTML = "Start";
                    disableSelect = true;
                    disableBtnRestart = true;
                    setTimeout(function () {
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
