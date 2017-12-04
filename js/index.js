/**
 * Created by Denis on 02.12.2017.
 */

var formOptions = document.querySelector("#form-options");
var submitOptions = document.querySelector("#submit-options");
submitOptions.onclick = function () {
    formOptions.submit()
};

var inputName = document.querySelector(".input-name");

formOptions.onsubmit = function () {
    validate();
    return false;
};

function validate() {
    var valid;
    var string = inputName.value;

    console.log(inputName.value);
    return valid;
}


var form = formOptions,
    field = form.querySelector('.input-name'),
    msg = document.getElementById('required'),
    regExp = [/^[A-Za-z0-9А-Яа-я\s-]+$/];
//regExp = [/^[А-Яа-яЁё]+$/, /.+@.+\..+/i, /^[А-Яа-яЁё\W\s\d]+$/, /^[А-Яа-яЁё\W\s\d]+$/];

form.onsubmit = function (event) {
    var valid = true;

    event.preventDefault();

    field.classList.remove('invalid');
    if (!field.value.length) {
    }

    field.classList.remove('invalid');
    if (!field.value.match(regExp[0])) {
        field.classList.add('invalid');
        msg.innerHTML = 'Invalid nickname!';
        valid = false;
    }

    if (valid) {
        form.submit();
    }

};


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