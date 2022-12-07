// Вот документ с таблицей и формой.

// Как найти?…

// Таблицу с id="age-table".

const table = document.getElementById('age-table');
const table2 = document.querySelector('#age-table');

console.log(table, table2);

// Все элементы label внутри этой таблицы (их три).

const labels = table.querySelectorAll('label');
const labels2 = table.getElementsByTagName('label');

console.log(labels, labels2);

// Первый td в этой таблице (со словом «Age»).

const td = table.querySelector('td');
const td2 = table.getElementsByTagName('td')[0];

console.log(td, td2);

// Форму form с именем name="search".

const form = document.querySelector('[name="search"]');

console.log(form);

// Первый input в этой форме.

const firstInput = form.querySelector('input');
const firstInput2 = form.getElementsByTagName('input')[0];

console.log(firstInput, firstInput2);

// Последний input в этой форме.
// с условием что мы не знаем html
const inputs = form.querySelectorAll('input');
const lastInput = inputs[inputs.length - 1];

console.log(lastInput);
