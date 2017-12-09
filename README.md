FindThePair
=====================
---
> _Find_ _a_ _pair_ _of_ _identical_ _cards_ _as_ _rapidly_ _as_ _possible_.
---

### Порядок запуска игры

Для запуска игры необходимо скачать файлы и папки с репозитория и запустить файл index.html в браузере.
Откроется форма, где будет предложено выбрать имя игрока, размер игрового поля и тему оформления.
Если имя игрока введено корректно, при нажатии на кнопку "Play" загрузится сраница с игрой.
Для начала игры нужно нажать на кнопку "Start". После старта эта кнопка поменяется на кнопку "Pause".
После зауска игры нажатие на кнопку "Pause/resume" будет останавливать и возобнавлять игру.
При нажатии на кнопку рестарт игровое поле снова сгенерируется в случайном порядке.
Нажатие на кнопку "Scores" загрузит файл с таблицами результатов.
На странице результатами кнопка "Refresh" обновит таблицы.
Копка "Clear" очистит Local storage от всех записей.

### Правила игры

Цель игры - переворачивая карты найти все пары одинаковых карт.
В ходе игры таймер считает время, и счетчик считает количество попыток.
Во время паузы таймер приостанавливается, а переворачивать карты запрещается
После окончания игры насчитываются очки в зависимости от времени и количества попыток
Чем больше время и чем больше попыток, тем меньше очков насчитывается

### Ссылки на использованные фрагменты кода

[Получение в javascript параметров формы методом get](https://ru.stackoverflow.com/questions/453355/javascript-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-get-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80)

[Вкладки на css](http://dbmast.ru/adaptivnye-vkladki-taby-na-css3)

[Стилизация скролла](https://yraaa.ru/scripts/stilizatsiya-polosyi-prokrutki-s-pomoschyu-css)

[Валидация поля ввода имени и почты](https://javascript.ru/forum/dom-window/40329-gramotnaya-validaciya-formy.html)