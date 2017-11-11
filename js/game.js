/**
 * Created by Denis on 08.11.2017.
 */
//Глобальные переменные
var countSelected, selected;

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

board.onclick = function (event) {
    var target = event.target;
    if (target.classList.contains("card")){
        alert (target.dataset.number);
    }
};