// Если у элемента есть атрибут id, то мы можем получить его вызовом document.getElementById(id), где бы он ни находился.

console.log(document.getElementById('elem'));
// Также есть глобальная переменная с именем, указанным в id:

// но если объявить, то будет приоритет от js
console.log(elem);
// let elem = 123; // охуенный пример на поднятие let

// но так лучше не делать

// Метод getElementById можно вызвать только для объекта document. Он осуществляет поиск по id по всему документу.

// elem.querySelectorAll(css), он возвращает все элементы внутри elem, удовлетворяющие данному CSS-селектору.

console.log(document.querySelectorAll('div')); // NodeList(2) [div#elem, div#elem-content]

// Метод elem.querySelector(css) возвращает первый элемент, соответствующий данному CSS-селектору.

console.log(document.querySelector('div')); // div#elem

// Метод elem.matches(css) ничего не ищет, а проверяет, удовлетворяет ли elem CSS-селектору, и возвращает true или false.
// Этот метод удобен, когда мы перебираем элементы (например, в массиве или в чём-то подобном)
// и пытаемся выбрать те из них, которые нас интересуют.

console.log(document.querySelector('.wrapper').matches('[data-list="3"]')); // true

// Предки элемента – родитель, родитель родителя, его родитель и так далее. Вместе они образуют цепочку иерархии от элемента до вершины.

// Метод elem.closest(css) ищет ближайшего предка, который соответствует CSS-селектору. Сам элемент также включается в поиск.
// Метод возвращает либо предка, либо null, если такой элемент не найден.

console.log(document.querySelector('.wrapper-list').closest('.wrapper')); // нашёл
console.log(document.querySelector('.wrapper-list').closest('div')); // нашёл себя
console.log(document.querySelector('.wrapper-list').closest('h1')); // null

// Существуют также другие методы поиска элементов по тегу, классу и так далее.
// На данный момент, они скорее исторические, так как querySelector более чем эффективен.

// elem.getElementsByTagName(tag) ищет элементы с данным тегом и возвращает их коллекцию. Передав "*" вместо тега, можно получить всех потомков.
// elem.getElementsByClassName(className) возвращает элементы, которые имеют данный CSS-класс.
// document.getElementsByName(name) возвращает элементы с заданным атрибутом name. Очень редко используется.

console.log(document.getElementsByTagName('div')); // все дивы
console.log(document.getElementsByTagName('div1')); // пустой список
console.log(document.querySelectorAll('div1')); // пустой список

// Все методы "getElementsBy*" возвращают живую коллекцию
// querySelectorAll возвращает статическую коллекцию

// elemA.contains(elemB) вернёт true, если elemB находится внутри elemA (elemB потомок elemA) или когда elemA==elemB.

console.log(document.querySelector('.wrapper').contains(document.querySelector('.wrapper .wrapper-list'))); // true
console.log(document.querySelector('.wrapper').contains(document.querySelector('.wrapper'))); // true elemA == elemB
