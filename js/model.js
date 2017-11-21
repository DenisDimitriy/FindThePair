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
    newElement2.className = "spacer small";
    newElement2.innerHTML = null;
    discardStack.appendChild(newElement2);

    //Позиционировать клон 1 на месте исходной карты
    var offSetTop = element.offsetTop;
    var offSetLeft = element.offsetLeft;
    var margTop = parseInt(getComputedStyle(element).marginTop, 10);
    var margLeft = parseInt(getComputedStyle(element).marginLeft, 10);
    var newTop = offSetTop - margTop;
    var newLeft = offSetLeft - margLeft;
    newElement1.style.top = newTop + "px";
    newElement1.style.left = newLeft + "px";

    //Открыть клон 1 карты
    setTimeout(function () {
        openCard(newElement1);
    }, 0);

    //Переместить клон 1 на место клона 2
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

        //Скопировать клон 2 в клон 1, клон 2 удалить
        setTimeout(function () {
            newElement2.className = newElement1.className;
            newElement2.innerHTML = newElement1.innerHTML;
            newElement2.classList.remove("avatar");
            gameSpace.removeChild(newElement1);
        }, 500)

    }, 1000);

    return newElement2;
}

function openCard(element) {
    element.classList.add('hover');
}

function closeCard(element) {
    element.classList.remove('hover');
}

function startTimer(timer) {

    timer.innerHTML = '';

    var hour = document.createElement("span");
    var minute = document.createElement("span");
    var second = document.createElement("span");
    var decisec = document.createElement("span");

    hour.classList.add("hour");
    minute.classList.add("minute");
    second.classList.add("second");
    decisec.classList.add("decisec");

    hour.dataset.hour = 0;
    minute.dataset.minute = 0;
    second.dataset.second = 0;
    decisec.dataset.decisec = 0;

    hour.innerHTML = "00:";
    minute.innerHTML = "00:";
    second.innerHTML = "00.";
    decisec.innerHTML = "0";

    timer.appendChild(hour);
    timer.appendChild(minute);
    timer.appendChild(second);
    timer.appendChild(decisec);

    //var startDate = new Date();
    var startDate = Date.now();
    var curDate;

    var idTimer = setInterval(function () {
        curDate = Date.now();
        var diffDate = curDate - startDate;
        decisec.dataset.decisec = Math.floor(diffDate / 100);
        second.dataset.second = Math.floor(decisec.dataset.decisec / 10);
        minute.dataset.minute = Math.floor(second.dataset.second / 60);
        hour.dataset.hour = Math.floor(minute.dataset.minute / 60);

        decisec.innerHTML = decisec.dataset.decisec - (second.dataset.second * 10);

        second.innerHTML = second.dataset.second - (minute.dataset.minute * 60);
        if (+second.innerHTML < 10) {
            second.innerHTML = "0" + second.innerHTML;
        }
        second.innerHTML = second.innerHTML + ".";


        minute.innerHTML = minute.dataset.minute - (hour.dataset.hour * 60);
        if (+minute.innerHTML < 10) {
            minute.innerHTML = "0" + minute.innerHTML;
        }
        minute.innerHTML = minute.innerHTML + ":";

        hour.innerHTML = hour.dataset.hour;
        if (+hour.innerHTML < 10) {
            hour.innerHTML = "0" + hour.innerHTML;
        }
        hour.innerHTML = hour.innerHTML + ":";

    }, 100);

    return idTimer;
}

function stopTimer(timerId) {
    clearInterval(timerId)
}

function resumeTimer(timer) {
    var decisec = timer.querySelector(".decisec");
    var second = timer.querySelector(".second");
    var minute = timer.querySelector(".minute");
    var hour = timer.querySelector(".hour");
    var lastTime = +decisec.dataset.decisec;

    //var startDate = new Date();
    var startDate = Date.now();
    var curDate;

    var idTimer = setInterval(function () {
        curDate = Date.now();
        var diffDate = curDate - startDate;
        decisec.dataset.decisec = Math.floor(diffDate / 100) + lastTime;
        second.dataset.second = Math.floor(decisec.dataset.decisec / 10);
        minute.dataset.minute = Math.floor(second.dataset.second / 60);
        hour.dataset.hour = Math.floor(minute.dataset.minute / 60);

        decisec.innerHTML = decisec.dataset.decisec - (second.dataset.second * 10);

        second.innerHTML = second.dataset.second - (minute.dataset.minute * 60);
        if (+second.innerHTML < 10) {
            second.innerHTML = "0" + second.innerHTML;
        }
        second.innerHTML = second.innerHTML + ".";


        minute.innerHTML = minute.dataset.minute - (hour.dataset.hour * 60);
        if (+minute.innerHTML < 10) {
            minute.innerHTML = "0" + minute.innerHTML;
        }
        minute.innerHTML = minute.innerHTML + ":";

        hour.innerHTML = hour.dataset.hour;
        if (+hour.innerHTML < 10) {
            hour.innerHTML = "0" + hour.innerHTML;
        }
        hour.innerHTML = hour.innerHTML + ":";

    }, 100);

    return idTimer;
}

function finishGame() {
    document.querySelector(".message").innerHTML = "FINISH";
}