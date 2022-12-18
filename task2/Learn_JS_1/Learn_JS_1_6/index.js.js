// Когда браузер загружает страницу, он «читает» (также говорят: «парсит») HTML и генерирует из него DOM-объекты
//  Для узлов-элементов большинство стандартных HTML-атрибутов автоматически становятся свойствами DOM-объектов.

// Например, для такого тега <body id="page"> у DOM-объекта будет такое свойство body.id="page".
// Но преобразование атрибута в свойство происходит не один-в-один!

// DOM-узлы – это обычные объекты JavaScript. Мы можем их изменять.

// Например, создадим новое свойство для document.body:

document.body.myData = {
  name: 'Ceaser',
  age: 21,
};

console.log(document.body.myData);

// можно и метод

document.body.sayTagName = function () {
  console.log(this.tagName);
};

document.body.sayTagName(); // BODY

// Также можно изменять встроенные прототипы, такие как Element.prototype
Element.prototype.sayHi = function () {
  console.log(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY

// Итак, DOM-свойства и методы ведут себя так же, как и обычные объекты JavaScript:

// Им можно присвоить любое значение.
// Они регистрозависимы (нужно писать elem.nodeType, не elem.NoDeTyPe).

// В HTML у тегов могут быть атрибуты. Когда браузер парсит HTML,
// чтобы создать DOM - объекты для тегов, он распознаёт стандартные атрибуты и создаёт DOM - свойства для них.

// Таким образом, когда у элемента есть id или другой стандартный атрибут, создаётся соответствующее свойство
// Но этого не происходит, если атрибут нестандартный.

console.log(document.body.id); // div
// нестандартный атрибут не преобразуется в свойство
console.log(document.body.something); // undefined

// стандартный атрибут для одного тега может быть нестандартным для другого
// Например, атрибут "type" является стандартным для элемента <input> (HTMLInputElement),
// но не является стандартным для < body > (HTMLBodyElement).

console.log(document.body.type); // undefined
console.log(document.getElementById('input').type); // 'text'

// Все атрибуты доступны с помощью следующих методов:

// elem.hasAttribute(name) – проверяет наличие атрибута.
// elem.getAttribute(name) – получает значение атрибута.
// elem.setAttribute(name, value) – устанавливает значение атрибута.
// elem.removeAttribute(name) – удаляет атрибут.
// получить все атрибуты элемента можно с помощью свойства elem.attributes

console.log(document.body.getAttribute('type')); // 'text'
console.log(document.body.attributes); // {0: id, 1: something, 2: type, id: id, something: something, type: type, length: 3}

// У HTML-атрибутов есть следующие особенности:

// Их имена регистронезависимы (id то же самое, что и ID).
// Их значения всегда являются строками.

const div = document.getElementById('div');

console.log(div.getAttribute('aboba')); // "Test", хотя в html атрибут написан как Aboba
div.setAttribute('Test', 123); // запись
console.log(div.outerHTML); // body id="div" something="kek" type="text" aboba="Test" test="123">
// здесь первая буква заглавная, а в HTML – строчная. Но это не важно: имена атрибутов регистронезависимы.
// Мы можем присвоить что угодно атрибуту, но это станет строкой

// Коллекция attributes является перебираемой
for (const attr of div.attributes) {
  console.log(attr);
}

// Когда стандартный атрибут изменяется, соответствующее свойство автоматически обновляется.
// Это работает и в обратную сторону(за некоторыми исключениями).

div.setAttribute('iD', 'divSuper');
console.log(div.id); // 'divSuper'
// и обратно тоже
div.id = 'divNorm';
console.log(div.getAttribute('ID')); // 'divNorm'

// но вот исключение: input.value синхронизируется только в одну сторону – атрибут → значение, но не в обратную:

// атрибут => значение
const input = document.getElementById('input');
input.setAttribute('value', 'val');

console.log(input.getAttribute('value')); // 'val'
console.log(input.value); // 'val'

input.value = 'aboba';
console.log(input.getAttribute('value')); // 'val'
console.log(input.value); // 'aboba'
// В примере выше:

// Изменение атрибута value обновило свойство.
// Но изменение свойства не повлияло на атрибут.

// Иногда эта «особенность» может пригодиться, потому что действия пользователя
//  могут приводить к изменениям value, и если после этого мы захотим восстановить «оригинальное»
// значение из HTML, оно будет в атрибуте.

// DOM-свойства не всегда являются строками
// Например, свойство input.checked (для чекбоксов) имеет логический тип:
console.log(input.checked); // false, хотя тип текст
console.log(check.getAttribute('checked')); // пустая строка
console.log(check.checked); // true

console.log(div.style); // огромный объект
console.log(div.getAttribute('style')); // 'color: red; font-size: 120%' строка

console.log(`${div.style}`); // [object CSSStyleDeclaration]
console.log(div.style.color); // 'red'

// При этом некоторые из них, хоть и строки, могут отличаться от атрибутов
// Например, DOM-свойство href всегда содержит полный URL, даже если атрибут
//  содержит относительный URL или просто #hash.
const a = document.getElementById('a');
console.log(a.getAttribute('href')); // '#'
console.log(a.href); // http://127.0.0.1:5500/task2/Learn_JS_1/Learn_JS_1_6/index.html#

// При написании HTML мы используем много стандартных атрибутов. Но что насчёт нестандартных, пользовательских?
// Иногда нестандартные атрибуты используются для передачи пользовательских данных из HTML в JavaScript

// код находит элемент с пометкой и показывает запрошенную информацию
const user = {
  name: 'Pete',
  age: 20,
};

for (const div of document.querySelectorAll('[show-info]')) {
  // вставить соответствующую информацию в поле
  const field = div.getAttribute('show-info');
  div.innerHTML = user[field]; // сначала Pete в name, потом 25 в age
}

// Также они могут быть использованы, чтобы стилизовать элементы.

// Например, здесь для состояния заказа используется атрибут order-state:

//<style>
//  /* стили зависят от пользовательского атрибута "order-state" */
//  .order[order-state="new"] {
//    color: green;
//  }
//
//  .order[order-state="pending"] {
//    color: blue;
//  }
//
//  .order[order-state="canceled"] {
//    color: red;
//  }
//</style>

// <div class="order" order-state="new">
//   A new order.
// </div>
//
// <div class="order" order-state="pending">
//   A pending order.
// </div>
//
// <div class="order" order-state="canceled">
//   A canceled order.
// </div>

// Почему атрибут может быть предпочтительнее таких классов, как .order-state-new, .order-state-pending, order-state-canceled?
// Это потому, что атрибутом удобнее управлять. Состояние может быть изменено достаточно просто:
div.setAttribute('order-state', 'canceled');

// но лучше использовать data-*
// Все атрибуты, начинающиеся с префикса «data-», зарезервированы для использования программистами. Они доступны в свойстве dataset.

// Например, если у elem есть атрибут "data-about", то обратиться к нему можно как elem.dataset.about.

console.log(div.dataset.aboba); // 'aboba'

// Атрибуты, состоящие из нескольких слов, к примеру data-order-state, становятся свойствами,
//  записанными с помощью верблюжьей нотации: dataset.orderState.

// Использование data-* атрибутов – валидный, безопасный способ передачи пользовательских данных.

console.log(div.dataset); // регистр testTest стал testtest
