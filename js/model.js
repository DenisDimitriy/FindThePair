/**
 * Created by Denis on 08.11.2017.
 */
function getRandomPairArray(dimension) {
    var arrayFirst = [];
    var arraySecond = [];
    for (var i = 0; i < dimension; i++) {
        arrayFirst[i] = i;
        arraySecond[i] = i;
    }

    var arrayRezult = [];
    var index;
    for (i = 0; i < (dimension * 2); i++) {
        index = Math.floor(Math.random() * arrayFirst.length);
        arrayRezult[i] = arrayFirst.splice(index, 1);
        i++;
        index = Math.floor(Math.random() * arraySecond.length);
        arrayRezult[i] = arraySecond.splice(index, 1);
    }
    return arrayRezult;
}

function initBoard(countOfPair) {
    var board = document.querySelector(".board");

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

    for (var i = 0; i < countOfPair * 2; i++) {
        var newCard = document.createElement("div");
        var newFlipper = document.createElement("div");
        var newFront = document.createElement("div");
        var newBack = document.createElement("div");
        newCard.className = "card flip-container";
        newFlipper.className = "flipper";
        newFront.className = "front";
        newBack.className = "back";
        newFlipper.appendChild(newFront);
        newFlipper.appendChild(newBack);
        newCard.appendChild(newFlipper);
        board.appendChild(newCard);
    }


    return board;
}

function removeCard(element) {

    //Инициализировать контейнеры
    var gameSpace = document.body.querySelector('.game-space');
    var discardStack = document.querySelector(".discard-stack");

    //Создать клоны
    var newElement1 = element.cloneNode(true);
    var newElement2 = element.cloneNode(true);

    //Удалить исходную карту
    element.innerHTML = null;
    element.className = "spacer";

    //Поместить клон 1 в игровое пространство
    newElement1.classList.add("avatar");
    gameSpace.appendChild(newElement1);

    //Поместить клон 2 в стэк
    newElement2.className = "spacer stacked-card";
    newElement2.innerHTML = null;
    discardStack.appendChild(newElement2);

    //Позиционировать клон 1 на месте исходной карты
    var offSetTop = element.offsetTop;
    var offSetLeft = element.offsetLeft;
    var margTop = parseInt(getComputedStyle(element).marginTop, 10);
    var margLeft = parseInt(getComputedStyle(element).marginLeft, 10);
    var newTop = offSetTop - margTop;
    var newLeft = offSetLeft - margLeft;
    console.log(newTop + " : " + newLeft);
    newElement1.style.top = newTop + "px";
    newElement1.style.left = newLeft + "px";

    //Открыть клон 1 карты
    setTimeout(function () {
        openCard(newElement1);
    }, 0);

    //Переместить клон 1 в стэк
    setTimeout(function () {
        newElement1.classList.add("small");
        offSetTop = newElement2.offsetTop;
        offSetLeft = newElement2.offsetLeft;
        margTop = parseInt(getComputedStyle(newElement2).marginTop, 10);
        margLeft = parseInt(getComputedStyle(newElement2).marginLeft, 10);
        newTop = offSetTop - margTop;
        newLeft = offSetLeft - margLeft;
        //newTop = parseInt(newElement1.style.top, 10) + 100;
        newElement1.style.top = newTop + "px";
        newElement1.style.left = newLeft + "px";
    }, 1000);


    //Переместить карту в стэк
    //discardCard(newElement);
}

function openCard(element) {
    element.classList.add('hover');
}

function closeCard(element) {
    element.classList.remove('hover');
}
