/**
 * Created by Denis on 02.12.2017.
 */

//Определить глобальные переменные
var formOptions = document.querySelector("#form-options");
var submitOptions = document.querySelector("#submit-options");

var form = formOptions,
    regExp = [/^[A-Za-z0-9\s-]+$|^$/];

var field = form.querySelector('.input-name');
var msg = document.getElementById('required');

var valid = true;

//Событие отправки формы
form.onsubmit = function (event) {

    event.preventDefault();

    validate();

    if (valid) {
        form.submit();
    }
};

//Событие клика на кнопку "Play"
submitOptions.onclick = function () {
    var event = new Event("submit");
    form.dispatchEvent(event);
};

//Событие фокусировки на поле ввода
field.onblur = function () {
    validate();
};

//Событие ухода с поля ввода
field.onfocus = function () {
    validate();
};

//Событие изменения поля ввода
if ("onpropertychange" in field) {
    // старый IE
    field.onpropertychange = function() {
        validate();
    };
} else {
    // остальные браузеры
    field.oninput = function() {
        validate();
    };
}

//Функция валидации формы
function validate() {
    valid = true;
    msg.innerHTML = '';
    field.classList.remove('invalid');
    if (!field.value.match(regExp[0])) {
        field.classList.add('invalid');
        msg.innerHTML = 'Invalid nickname!';
        valid = false;
    }
}