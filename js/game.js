/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countOfPair = 6,
    theme = "numbers",
    skin = "hearthstone",
    selected = null,
    counter = 0,
    blockSelect = false;


//создать массив случайных пар чисел
var RandomPairArray = getRandomPairArray(countOfPair);

//запомнить набор блоков card в коллекцию
var cards = document.getElementsByClassName("card");

//запомнить блок board
var board = document.getElementsByClassName("board")[0];

//Инициализировать блоки карт согласно массиву случайных пар чисел
for (var i = 0; i < RandomPairArray.length; i++) {
    cards[i].dataset.number = RandomPairArray[i];
    var url = "url(img/themes/numbers/" + cards[i].dataset.number + ".png)";
    cards[i].style.backgroundImage = url;
    cards[i].classList.add("open");
}


//Отвернуть все карты
var timerStart = setTimeout(function () {
    for (i = 0; i < cards.length; i++) {
        turnCard(cards[i]);
    }
}, 2000);

//Обработчики событий
//Клик в пределах доски
board.onclick = function (event) {
    var target = event.target;

    //клик на карту
    if (target.classList.contains("card") && blockSelect != true) {

        //если ниодна карта еще не выбрана
        if (!selected) {
            selected = target;
            openCard(selected);
        }

        //если уже выбрана одна карта
        else if (selected) {

            //если номера целевой и выбранной карт не совпадают и это не одна и та же карта
            if (selected.dataset.number != target.dataset.number && selected != target) {
                blockSelect = true;
                openCard(target);
                timerShow = setTimeout(function () {
                    closeCard(selected);
                    closeCard(target);
                    selected = null;
                    blockSelect = false;
                }, 1000)
            }

            //если номера целевой и выбранной карт совпадают и это не одна и та же карта
            if (selected.dataset.number == target.dataset.number && selected != target) {
                blockSelect = true;
                openCard(target);
                timerShow = setTimeout(function () {
                    removeCard(selected);
                    removeCard(target);
                    selected = null;
                    blockSelect = false;
                    counter++;
                    if (counter == countOfPair) {
                        finishGame();
                    }
                }, 1000);
            }
        }
    }
    return false;
};