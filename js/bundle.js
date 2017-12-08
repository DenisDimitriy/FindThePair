/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(1);
/**
 * Created by Denis on 08.11.2017.
 */


//СЦЕНАРИЙ

//Глобальные переменные
var countOfPair = 6,
    name = "unknown",
    theme = "numbers",
    timerId,
    counterTryes = 0,
    counter = 0,
    selected = null,
    gameStarted = false,
    gamePaused = false,
    gameFinished = false,
    disableSelect = true,
    disableBtnControl = false,
    disableBtnRestart = false;


var loc = window.location;
var href = loc.href;
var index = href.indexOf("player");

if (index != -1) {
    var params = href.slice(index + 7);
    index = params.indexOf("&");
    var player = params.slice(0, index);

    index = player.indexOf("+");
    while (index != -1) {
        var string = player.slice(0, index) + ' ' + player.slice(index + 1);
        player = string;
        index = player.indexOf("+");
    }


    index = player.indexOf(" ");
    while (index != -1) {
        var partBefore = player.slice(0, index);
        var partBehind = player.slice(index + 1);
        console.log(partBefore.length + "|" + partBehind.length);

        if (partBefore.length != 0) {
            console.log("name");
            break;
        }
        else if (partBehind.length == 0) {
            player = "unknown";
            break;
        }
        else {
            player = partBehind;
            console.log(player);
            index = player.indexOf(" ");
        }
    }

    if (player == "") player = "unknown";

    index = href.indexOf("boardsize");
    params = href.slice(index + 10);
    index = params.indexOf("&");
    var size = params.slice(0, index);
    index = href.indexOf("theme");
    params = href.slice(index + 6);
    countOfPair = +size;
    name = player;
    theme = params;
}


/* КОНФИГУРИРОВАНИЕ */

//Выбрать элемент board
var board = document.querySelector(".board");

//Сгенерировать доску с картами
Object(__WEBPACK_IMPORTED_MODULE_0__model__["c" /* generateBoard */])(board, countOfPair);

//Задать ширину стека удаленных карт
var discardStack = document.querySelector(".discard-stack");
var boardWidth = parseInt(getComputedStyle(board).width, 10);
//discardStack.style.width = boardWidth + "px";

//Задать ширину обвертки
var wrapper = document.querySelector(".wrapper");
//var wrapperWidth = boardWidth + 204;
//wrapper.style.width = wrapperWidth + "px";


var wrapperBoard = document.querySelector(".wrapper-board");
if (countOfPair == 6) {
    wrapperBoard.style.paddingTop = '56px';
    wrapperBoard.style.paddingBottom = '56px';
}

var gameSpace = document.querySelector(".game-space");
gameSpace.style.backgroundImage = 'url("img/themes/' + theme + '/background.png")';


//Задать высоту панели
var panel = document.querySelector(".panel");
var wrapperHeight = parseInt(getComputedStyle(gameSpace).height, 10);
//panel.style.height = wrapperHeight + "px";

//Выбрать набор элементов card в коллекцию
var cards = document.getElementsByClassName("card");

//Инициализировать карты
Object(__WEBPACK_IMPORTED_MODULE_0__model__["d" /* initCards */])(cards, countOfPair, theme);

//Выбрать блок таймера
var timer = document.querySelector(".timer");

//Инициализировать таймер
Object(__WEBPACK_IMPORTED_MODULE_0__model__["e" /* initTimer */])(timer);

//Выбрать блок кнопки управления
var btnControl = document.querySelector(".btn-control");

//Выбрать блок кнопки управления
var btnRestart = document.querySelector(".btn-restart");

var cover = document.querySelector(".cover");

/*СЦЕНАРИЙ ИГРЫ*/

//Обработчики событий
//Клик на кнопку управления
btnControl.onclick = function () {
    console.log(gameStarted + " | " + disableBtnControl);
    //Если игра не начата
    if (!gameStarted) {
        disableBtnControl = true;
        disableBtnRestart = true;
        gameStarted = true;
        btnControl.innerHTML = "Pause";
        //Открыть карты
        for (var i = 0; i < cards.length; i++) {
            Object(__WEBPACK_IMPORTED_MODULE_0__model__["f" /* openCard */])(cards[i]);
        }
        //Через время открыть все карты, разрешить выбор карт, запустить таймер
        setTimeout(function () {
            for (i = 0; i < cards.length; i++) {
                Object(__WEBPACK_IMPORTED_MODULE_0__model__["a" /* closeCard */])(cards[i]);
            }
            disableSelect = false;
            timerId = Object(__WEBPACK_IMPORTED_MODULE_0__model__["h" /* startTimer */])(timer);
            disableBtnControl = false;
            disableBtnRestart = false;
        }, 2000);

        btnControl.classList.remove("btn-start");
    }
    //если игра запущена, не закончена и не нажата пауза
    else if (!gamePaused && !gameFinished && !disableBtnControl) {
        //включить паузу
        gamePaused = true;
        btnControl.innerHTML = "Resume";
        disableSelect = true;
        Object(__WEBPACK_IMPORTED_MODULE_0__model__["i" /* stopTimer */])(timerId);
        cover.classList.remove("finish");
        cover.classList.add("pause");
        cover.classList.remove("hidden");
        cover.innerHTML = "pause";
    }
    //если игра запущена, не закончена и нажата пауза
    else if (gamePaused && !gameFinished && !disableBtnControl) {
        //Выключить паузу
        gamePaused = false;
        btnControl.innerHTML = "Pause";
        disableSelect = false;
        timerId = Object(__WEBPACK_IMPORTED_MODULE_0__model__["h" /* startTimer */])(timer);
        cover.classList.add("hidden");
        cover.innerHTML = "";
    }
    //Если игра закончена
    if (gameFinished) {

        /*
         //Рестарт игры
         board.innerHTML = null;
         timer.innerHTML = null;
         discardStack.innerHTML = null;
         generateBoard(board, countOfPair);
         cards = document.getElementsByClassName("card");
         initCards(cards, countOfPair, theme);
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
    return false;
};

//Клик на restart
btnRestart.onclick = function () {
    if (disableBtnRestart) {
        return false
    }
    ;
    //Рестарт игры
    board.innerHTML = null;
    timer.innerHTML = null;
    discardStack.innerHTML = null;
    Object(__WEBPACK_IMPORTED_MODULE_0__model__["c" /* generateBoard */])(board, countOfPair);
    cards = document.getElementsByClassName("card");
    Object(__WEBPACK_IMPORTED_MODULE_0__model__["d" /* initCards */])(cards, countOfPair, theme);
    Object(__WEBPACK_IMPORTED_MODULE_0__model__["e" /* initTimer */])(timer);
    btnControl.innerHTML = "Start";
    counterTryes = 0;

    wrapperBoard.classList.remove("transparent");
    selected = null;
    counter = 0;
    disableSelect = true;
    timerId = null;
    gameStarted = false;
    gamePaused = false;
    gameFinished = false;
    disableBtnControl = false;

    cover.classList.add("hidden");

    btnControl.classList.remove("btn-disabled");
    btnControl.classList.add("btn-start");
    return false;
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
            Object(__WEBPACK_IMPORTED_MODULE_0__model__["f" /* openCard */])(selected);
        }

        //Eсли уже выбрана одна карта
        else if (selected) {

            //Eсли номера целевой и выбранной карт не совпадают и это не одна и та же карта
            if (selected.dataset.number != target.dataset.number && selected != target) {
                counterTryes++;
                disableSelect = true;
                Object(__WEBPACK_IMPORTED_MODULE_0__model__["f" /* openCard */])(target);
                setTimeout(function () {
                    Object(__WEBPACK_IMPORTED_MODULE_0__model__["a" /* closeCard */])(selected);
                    Object(__WEBPACK_IMPORTED_MODULE_0__model__["a" /* closeCard */])(target);
                    selected = null;
                    target = null;
                    disableSelect = false;
                }, 750)
            }

            //Eсли номера целевой и выбранной карт совпадают и это не одна и та же карта
            if (selected.dataset.number == target.dataset.number && selected != target) {
                counterTryes++;
                Object(__WEBPACK_IMPORTED_MODULE_0__model__["g" /* removeCard */])(selected);
                Object(__WEBPACK_IMPORTED_MODULE_0__model__["g" /* removeCard */])(target);
                selected = null;
                target = null;
                counter++;
                if (counter == countOfPair) {
                    gameFinished = true;
                    btnControl.innerHTML = "Start";
                    disableSelect = true;
                    disableBtnRestart = true;
                    setTimeout(function () {
                        disableBtnRestart = false;
                    }, 1500);

                    Object(__WEBPACK_IMPORTED_MODULE_0__model__["i" /* stopTimer */])(timerId);
                    Object(__WEBPACK_IMPORTED_MODULE_0__model__["b" /* finishGame */])(name, countOfPair, counterTryes);

                }
            }
        }
    }
    return false;
};


/*
 var params = window
 .location
 .search
 .replace('?','')
 .split('&')
 .reduce(
 function(p,e){
 var a = e.split('=');
 p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
 return p;
 },
 {}
 );

 alert( params['data']);
 */




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getRandomPairArray */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return generateBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return initCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return openCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return closeCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return initTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return startTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return stopTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return finishGame; });
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



function generateBoard(board, countOfPair) {
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

}




function initCards(cards, countOfPair, theme) {
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




function finishGame(
    name, 
    countOfPair, 
    counterTryes
)
{
    var records;

    var btnControl = document.querySelector(".btn-control");
    btnControl.classList.add("btn-disabled");

    var wrapperBoard = document.querySelector(".wrapper-board");
    var cover = document.querySelector(".cover");

    setTimeout(function(){
        wrapperBoard.classList.add("transparent");
        cover.classList.remove("pause");
        cover.classList.add("finish");
        cover.classList.remove("hidden");
        cover.innerHTML = "";
    }, 1200);

    setTimeout(function(){
        cover.classList.remove("finish");
        cover.classList.add("hidden");
        cover.innerHTML = "";
    }, 3000);

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



/***/ })
/******/ ]);