/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countOfPair = 6,
    theme = "numbers",
    skin = "hearthstone",
    selected = null,
    counter = 0,
    disableSelect = true;

//создать массив случайных пар чисел
var RandomPairArray = getRandomPairArray(countOfPair);

//запомнить блок board
var board = document.getElementsByClassName("board")[0];

var boardWidth;
switch (countOfPair) {
    case 6:
        boardWidth = '448px';
        break;
    case 8:
        boardWidth = '448px';
        break;
    case 10:
        boardWidth = '560px';
        break;
    case 12:
        boardWidth = '672px';
        break;
}
board.style.width = boardWidth;

//запомнить набор блоков card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать блоки карт согласно массиву случайных пар чисел
for (var i = 0; i < RandomPairArray.length; i++) {
    cards[i].dataset.number = RandomPairArray[i];
    var front = cards[i].querySelector(".front");
    front.style.backgroundImage = 'url("img/skins/' + skin + '.png")';
    console.log (front);
    var back = cards[i].querySelector(".back");
    back.style.backgroundImage = 'url("img/themes/' + theme + '/' + cards[i].dataset.number + '.png")';
}

for (i = 0; i < cards.length; i++) {
    openCard(cards[i]);
}

//Отвернуть все карты
setTimeout(function () {
    for (i = 0; i < cards.length; i++) {
        closeCard(cards[i]);
    };
    disableSelect = false;
}, 2000);


//Обработчики событий
//Клик в пределах доски
board.onclick = function (event) {
    var target = event.target.closest('.card');
    if (target == null) return;

    //клик на карту
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
                //disableSelect = true;
                openCard(target);
                var card1 = selected;
                var card2 = target;
                selected = null;
                target = null;
                counter++;
                if (counter == countOfPair) {
                    finishGame();
                }
                setTimeout(function () {
                    removeCard(card1);
                    removeCard(card2);
                }, 500);
            }
        }
    }
    return false;
};

function finishGame() {
    document.querySelector("#message").innerHTML = "FINISH";
}