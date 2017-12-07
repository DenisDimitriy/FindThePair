/**
 * Created by Denis on 02.12.2017.
 */

var formOptions = document.querySelector("#form-options");
var submitOptions = document.querySelector("#submit-options");

//var inputName = document.querySelector(".input-name");
/*
 formOptions.onsubmit = function () {
 validate();
 return false;
 };
 */
/*
 function validate() {
 var valid;
 var string = inputName.value;

 console.log(inputName.value);
 return valid;
 }
 */

var form = formOptions,
    field = form.querySelector('.input-name'),
    msg = document.getElementById('required'),
    regExp = [/^[A-Za-z0-9\s-]+$|^$/];
//regExp = [/^[А-Яа-яЁё]+$/, /.+@.+\..+/i, /^[А-Яа-яЁё\W\s\d]+$/, /^[А-Яа-яЁё\W\s\d]+$/];

var valid = true;
form.onsubmit = function (event) {

    event.preventDefault();
/*
    field.classList.remove('invalid');
    if (!field.value.length) {
    }
*/
    validate();

    if (valid) {
        form.submit();
    }

};

submitOptions.onclick = function () {
    var event = new Event("submit");
    form.dispatchEvent(event);
};

field.onblur = function () {
    validate();
};

field.onfocus = function () {
    validate();
};


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



/*
 var	form = formOptions,
 fields = form.querySelectorAll('input[type="text"], input[type="email"]'),
 msg = document.getElementById('required'),
 regExp = [/^[А-Яа-яЁё]+$/, /.+@.+\..+/i, /^[А-Яа-яЁё\W\s\d]+$/, /^[А-Яа-яЁё\W\s\d]+$/];
 //regExp = [/^[А-Яа-яЁё]+$/, /.+@.+\..+/i, /^[А-Яа-яЁё\W\s\d]+$/, /^[А-Яа-яЁё\W\s\d]+$/];

 form.onsubmit = function(event) {
 var valid = true, cnt = 0;

 event.preventDefault();

 Array.prototype.forEach.call(fields, function(input) {
 input.classList.remove('invalid');
 if(!input.value.length) {
 cnt++;
 }
 });

 if(cnt == fields.length) {
 Array.prototype.forEach.call(fields, function(input) {
 input.classList.add('invalid');
 });
 msg.innerHTML = 'Заполните обязательные поля!';
 return;
 }
 */
/*
 for (var i = 0, l = fields.length; i < l; i++) {
 fields[i].classList.remove('invalid');
 if(!fields[i].value.match(regExp[i])) {
 fields[i].classList.add('invalid');
 msg.innerHTML = 'Неверно введено поле ' + fields[i].title + '!';
 valid = false;
 break;
 }
 }

 if (valid) {
 form.submit();
 };

 }
 */