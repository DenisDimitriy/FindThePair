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
    idTimer;


/* КОНФИГУРИРОВАНИЕ */

//Сгенерировать массив случайных пар чисел
var RandomPairArray = getRandomPairArray(countOfPair);

//Сгенерировать доску с картами
var board = initBoard(countOfPair);

//Задать ширину стека
document.querySelector(".discard-stack").style.width = parseInt(getComputedStyle(board).width, 10) + "px";

//Выбрать набор блоков card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать блоки карт согласно массиву случайных пар чисел
for (var i = 0; i < RandomPairArray.length; i++) {
    cards[i].dataset.number = RandomPairArray[i];
    var front = cards[i].querySelector(".front");
    front.style.backgroundImage = 'url("img/skins/' + skin + '.png")';
    var back = cards[i].querySelector(".back");
    back.style.backgroundImage = 'url("img/themes/' + theme + '/' + cards[i].dataset.number + '.png")';
}

//Выбрать блок таймера
var timer = document.querySelector(".timer");


/*СЦЕНАРИЙ ИГРЫ*/

//Открыть карты
for (i = 0; i < cards.length; i++) {
    openCard(cards[i]);
}

//Через время отвернуть все карты, начать игру, запустить таймер
setTimeout(function () {
    for (i = 0; i < cards.length; i++) {
        closeCard(cards[i]);
    }
    disableSelect = false;
    idTimer = startTimer(timer);
}, 2000);


//Обработчики событий
//Клик в пределах доски
board.onclick = function (event) {
    //Выбрать карту в цели клика
    var target = event.target.closest('.card')

    //Возврат, если клик не на карте
    if (target == null) return;

    //Если клик на карту и нет запрета выбора карты
    if (target.classList.contains("card") && disableSelect != true) {

        //если ниодна карта еще не выбрана
        if (!selected) {
            selected = target;
            openCard(selected);
        }

        //если уже выбрана одна карта
        else if (selected) {

            //если номера целевой и выбранной карт не совпадают и это не одна и та же карта
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

            //если номера целевой и выбранной карт совпадают и это не одна и та же карта
            if (selected.dataset.number == target.dataset.number && selected != target) {
                removeCard(selected);
                removeCard(target);
                selected = null;
                target = null;
                counter++;
                if (counter == countOfPair) {
                    stopTimer(idTimer);
                    finishGame();
                }
            }
        }
    }
    return false;
};


