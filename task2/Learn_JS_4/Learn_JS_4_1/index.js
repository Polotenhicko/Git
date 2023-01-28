// Формы и элементы управления, такие как <input>, имеют множество специальных свойств и событий.

// Формы входят в спец коллекцию document.forms

console.log(document.forms);
console.log(document.forms.first); // обращение по name

// внутри формы можем обращаться к элементам

const first = document.forms.first;

// есть список всех элементов
console.log(first.elements); // HTMLFormControlsCollection(2) [input, input, text: input]

const text = first.elements.text;
// обращение к элементам по их name
// если несколько элементов с одинаковым name, то они будут в коллекции
console.log(text); // RadioNodeList(2) [input, input, value: '']

// Все элементы управления формы, как бы глубоко они не находились в форме, доступны в коллекции form.elements.

// <fieldset> как «подформа»

console.log(form.elements.login); // input

const fieldset = form.elements.userFields;
console.log(fieldset); // fieldset

console.log(fieldset.elements); // HTMLCollection [input, login: input]

console.log(fieldset.elements.login === form.elements.login); // true

// есть сокращённая запись form.name

console.log(form.login); // input

// помарочка, что если поменяем имя, то всё равно сможем обращаться по старому

form.login.name = 'login2';
console.log(form.login == form.login2); // true

form.user.name = 'login2';
console.log(form.login2); // теперь это список

// всегда можно узнать ссылку на форму от элемента

const login = form2.login;
console.log(login.form == form2); // true
console.log(login.form);

// input, textarea

// значение можно получить через свойства value или checked для чекбоксов
// Используйте textarea.value вместо textarea.innerHTML

login.value = 'value';
console.log(login.value); // value

// select и option

// Элемент <select> имеет 3 важных свойства:

// select.options – коллекция из подэлементов <option>,
// select.value – значение выбранного в данный момент <option>,
// select.selectedIndex – номер выбранного <option>.

// Они дают три разных способа установить значение в <select>:

// Найти соответствующий элемент <option> и установить в option.selected значение true.
// Установить в select.value значение нужного <option>.
// Установить в select.selectedIndex номер нужного <option>.

const select = document.getElementById('select');

console.log(select.value); // 'apple' - value выбранного option
console.log(select.options); // список всех option
console.log(select.selectedIndex); // 0 индекс выбранного option

select.value = 'lol'; // поставил несуществующее значение
console.log(select.selectedIndex); // -1 т.к. значения нет в option

select.value = 'banana';
console.log(select.selectedIndex); // 2

select.selectedIndex = -1;
console.log(select.value); // ''

select.selectedIndex = 1;
console.log(select.value); // 'pear'

// также можно установить selected true для option

select.options[0].selected = true;
console.log(select.value); // apple

// но select позволяет выбрать несколько элементов

const select2 = document.getElementById('select2');
console.log(select2.value); // blues, хотя несколько выбранных
console.log(select2.multiple); // true

console.log(select2.selectedIndex); // 0, но несколько

// Получить массив выбранных значений

const values = Array.from(select2.options)
  .filter((option) => option.selected)
  .map((option) => option.value);

console.log(values); // ['blues', 'rock']

// Элемент <option> редко используется сам по себе, но и здесь есть кое-что интересное.
// В спецификации есть красивый короткий синтаксис для создания элемента <option>:

// option = new Option(text, value, defaultSelected, selected);

// Параметры:
// text – текст внутри <option>,
// value – значение,
// defaultSelected – если true, то ставится HTML-атрибут selected,
// selected – если true, то элемент <option> будет выбранным.

// лень разбираться в чём разница defaultSelected и selected

// selected - визуально выбран ли
// defaultselected - добавление свойства selected

let option = new Option('Text', 'Value');
// создаст <option value="Value">Text</option>

// Тот же элемент, но выбранный:
option = new Option('Текст', 'value', true, true);

// Элементы <option> имеют свойства:

// option.selected
// Выбрана ли опция.

// option.index
// Номер опции среди других в списке <select>.

// option.value
// Значение опции.

// option.text
// Содержимое опции (то, что видит посетитель).
