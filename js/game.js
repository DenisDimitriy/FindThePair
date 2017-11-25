/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countOfPair = 6,
    name = "Vasya",
    theme = "numbers",
    skin = "hearthstone",

    counterTryes = 0,
    selected = null,
    counter = 0,
    disableSelect = true,
    timerId,
    gameStarted = false,
    gamePaused = false,
    gameFinished = false,
    disableBtnControl = false;

/* КОНФИГУРИРОВАНИЕ */

//Выбрать элемент board
var board = document.querySelector(".board");

//Сгенерировать доску с картами
generateBoard(board);

//Задать ширину стека удаленных карт
var discardStack = document.querySelector(".discard-stack");
discardStack.style.width = parseInt(getComputedStyle(board).width, 10) + "px";

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
    //Если игра не начата
    if (!gameStarted) {
        disableBtnControl = true;
        gameStarted = true;
        btnControl.innerHTML = "Pause";
        //Открыть карты
        for (i = 0; i < cards.length; i++) {
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
};

//Клик на restart
btnRestart.onclick = function () {
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

    selected = null;
    counter = 0;
    disableSelect = true;
    timerId = null;
    gameStarted = false;
    gamePaused = false;
    gameFinished = false;
    disableBtnControl = false;
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
                    stopTimer(timerId);
                    finishGame(name, countOfPair, counterTryes);
                }
            }
        }
    }
    return false;
};
