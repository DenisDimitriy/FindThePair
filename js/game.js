/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countOfPair = 6,
    theme = "numbers",
    skin = "hearthstone",
    selected = null,
    counter = 0,
    disableSelect = true,
    timerId,
    gameStarted = false,
    gamePaused = false,
    gameFinished = false;

/* КОНФИГУРИРОВАНИЕ */

//Выбрать элемент board
var board = document.querySelector(".board");

//Сгенерировать доску с картами
generateBoard(board);

//Задать ширину стека удаленных карт
document.querySelector(".discard-stack").style.width = parseInt(getComputedStyle(board).width, 10) + "px";

//Выбрать набор элементов card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать карты
ititCards(cards);

//Выбрать блок таймера
var timer = document.querySelector(".timer");

//Инициализировать таймер
initTimer(timer);

//Выбрать блок кнопки управления
var btnControl = document.querySelector(".btn-control");


/*СЦЕНАРИЙ ИГРЫ*/

//Обработчики событий
//Клик на кнопку управления
btnControl.onclick = function () {
    //Если игра не начата
    if (!gameStarted) {
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
        }, 2000);
    }
    //если игра запущена, не закончена и не нажата пауза
    else if (!gamePaused && !gameFinished) {
        //включить паузу
        gamePaused = true;
        btnControl.innerHTML = "Resume";
        disableSelect = true;
        stopTimer(timerId)
    }
    //если игра запущена, не закончена и нажата пауза
    else if (gamePaused && !gameFinished) {
        //Выключить паузу
        gamePaused = false;
        btnControl.innerHTML = "Pause";
        disableSelect = false;
        timerId = startTimer(timer);
    }
    //Если игра закончена
    if (gameFinished){
        //Рестарт игры
        alert ("It must be restarted")
     }
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
                removeCard(selected);
                removeCard(target);
                selected = null;
                target = null;
                counter++;
                if (counter == countOfPair) {
                    gameFinished = true;
                    btnControl.innerHTML = "Restart";
                    stopTimer(timerId);
                    finishGame();
                }
            }
        }
    }
    return false;
};
