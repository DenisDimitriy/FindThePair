/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countSelected = 0, selected = null;

//создать массив случайных пар чисел
var RandomPairArray = getRandomPairArray(6);

//запомнить набор блоков card в коллекцию
var cards = document.getElementsByClassName("card");

//запомнить блок board
var board = document.getElementsByClassName("board")[0];

//Инициализировать блоки карт согласно массиву случайных пар чисел
for (var i = 0; i < RandomPairArray.length; i++) {
    cards[i].dataset.number = RandomPairArray[i];
    var url = "url(img/numbers/" + cards[i].dataset.number + ".png)";
    cards[i].style.backgroundImage = url;
}

//Клик в пределах доски
board.onclick = function (event) {
    var target = event.target;

    //клик на карту
    if (target.classList.contains("card")) {
        if (!selected) {
            selected = target;
            console.log(selected);
        }
        else if (selected) {
            if (selected.dataset.number == target.dataset.number && selected!=target) {
                alert ("The pair is found!");
                target.classList.remove("card");
                target.classList.add("spacer");
                target.style.backgroundImage = "none";
                selected.classList.remove("card");
                selected.classList.add("spacer");
                selected.style.backgroundImage = "none";
            }
            selected = null;
        }
    }
    return false;
};
