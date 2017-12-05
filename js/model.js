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

function generateBoard(board) {
    //Определить значение ширины
    switch (countOfPair) {
        case 6:
            board.style.width = '448px';
            break;
        case 8:
            board.style.width = '448px';
            break;
        case 10:
            board.style.width = '560px';
            break;
        case 12:
            board.style.width = '672px';
            break;
    }

    //Добавить элементы card с flipper
    for (var i = 0; i < countOfPair * 2; i++) {
        var newCard = document.createElement("div");
        var newFlipper = document.createElement("div");
        var newback = document.createElement("div");
        var newfront = document.createElement("div");
        newCard.className = "card flip-container";
        newFlipper.className = "flipper";
        newback.className = "back";
        newfront.className = "front";
        newFlipper.appendChild(newback);
        newFlipper.appendChild(newfront);
        newCard.appendChild(newFlipper);
        board.appendChild(newCard);
    }

    //return board;
}

function initCards(cards) {
//Сгенерировать массив случайных пар чисел
    var RandomPairArray = getRandomPairArray(countOfPair);

//Инициализировать блоки карт согласно массиву случайных пар чисел
    for (var i = 0; i < RandomPairArray.length; i++) {
        cards[i].dataset.number = RandomPairArray[i];
        var back = cards[i].querySelector(".back");
        back.style.backgroundImage = 'url("img/themes/' + theme + '/back-side.png")';
        var front = cards[i].querySelector(".front");
        front.style.backgroundImage = 'url("img/themes/' + theme + '/' + cards[i].dataset.number + '.png")';
    }
}

function removeCard(element) {

    //Инициализировать контейнеры
    var gameSpace = document.body.querySelector('.game-space');
    var discardStack = document.querySelector(".discard-stack");

    //Создать клоны
    var newElement1 = element.cloneNode(true);
    var newElement2 = element.cloneNode(true);

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
            newElement2.classList.remove("avatar");
            newElement2.innerHTML = newElement1.innerHTML;
            gameSpace.removeChild(newElement1);
        }, 500)

    }, 1000);

    //Удалить исходную карту
    element.innerHTML = null;
    element.className = "spacer";

    return newElement2;
}

function openCard(element) {
    element.classList.add('hover');
}

function closeCard(element) {
    element.classList.remove('hover');
}

function initTimer(timer) {
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
}

function startTimer(timer) {

    var hour = timer.querySelector(".hour");
    var minute = timer.querySelector(".minute");
    var second = timer.querySelector(".second");
    var decisec = timer.querySelector(".decisec");

    //var startDate = new Date();
    var startDate = Date.now();
    var curDate;
    var lastDecisec = +(decisec.dataset.decisec);

    var timerId = setInterval(function () {
        curDate = Date.now();
        var diffDate = curDate - startDate;

        decisec.dataset.decisec = Math.floor(diffDate / 100) + lastDecisec;
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

    return timerId;
}

function stopTimer(timerId) {
    clearInterval(timerId)
}

function finishGame(name, countOfPair, counterTryes) {
    var records;

    btnControl.classList.add("btn-disabled");
    setTimeout(function(){
        var wrapperBoard = document.querySelector(".wrapper-board");
        var cover = document.querySelector(".cover");
        wrapperBoard.classList.add("transparent");
        cover.classList.remove("pause");
        cover.classList.add("finish");
        cover.classList.remove("hidden");
        cover.innerHTML = "";
    }, 1200);

    var dateNew = new Date();
    var day = +dateNew.getDate();
    var month = +dateNew.getMonth() + 1;
    var year = +dateNew.getFullYear();
    var hour = +dateNew.getHours();
    var minute = +dateNew.getMinutes();
    var second = +dateNew.getSeconds();

    var timer = document.querySelector(".timer");
    var decisec = timer.querySelector(".decisec");
    var time = decisec.dataset.decisec;

    var k1, k2;

    switch (countOfPair) {
        case 6:
            k1 = 60;
            k2 = 8;
            break;
        case 8:
            k1 = 120;
            k2 = 12;
            break;
        case 10:
            k1 = 240;
            k2 = 18;
            break;
        case 12:
            k1 = 360;
            k2 = 24;
            break;
    }

    var scores = countOfPair * ( k1/time + k2/counterTryes );

    scores = Math.round(scores*10)/10;

    var newRecord = {
        date: {day: day, month: month, year: year, hour: hour, minute: minute, second: second},
        name: name,
        size: countOfPair,
        time: time,
        countOftTryes: counterTryes,
        scores: scores
    };

    var recordsJSON = localStorage.getItem("records");
    if (recordsJSON == null) {

        var recordsNew = [];
        recordsNew.push(newRecord);
        var recordsNewString = JSON.stringify(recordsNew); //сериализуем его
        localStorage.removeItem("records");
        localStorage.setItem("records", recordsNewString); //запишем его в хранилище по ключу "records"

    }
    else {
        records = JSON.parse(recordsJSON);
        records.push(newRecord);
        var recordsString = JSON.stringify(records); //сериализуем его
        localStorage.removeItem("records");
        localStorage.setItem("records", recordsString);
    }
}
