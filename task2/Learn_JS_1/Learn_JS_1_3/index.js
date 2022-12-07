// самые верхние элементы дерева досупны как элементы объекта document

// <html> = document.documentElement
// самый верхний узел документа: documet.documentElement. В DOM он соотв тегу html

// <body = document.body
// Другой часто используемый DOM-узел – узел тега <body>: document.body.

// <head> = document.head
// Тег <head> доступен как document.head.

// Нельзя получить доступ к элементу, которого ещё не существует в момент выполнения скрипта.
// В частности, если скрипт находится в <head>, document.body в нём недоступен, потому что браузер его ещё не прочитал.

// В DOM значение null значит «не существует» или «нет такого узла».

// Дочерние узлы (или дети) – элементы, которые являются непосредственными детьми узла.
// Другими словами, элементы, которые лежат непосредственно внутри данного.Например, <head> и <body> являются детьми элемента <html>.

// Потомки – все элементы, которые лежат внутри данного, включая детей, их детей и т.д.

// Коллекция childNodes содержит список всех детей, включая текстовые узлы.

console.log(document.body.childNodes);
for (const node of document.body.childNodes) {
  console.log(node);
}

// Свойства firstChild и lastChild обеспечивают быстрый доступ к первому и последнему дочернему элементу.

// Они, по сути, являются всего лишь сокращениями. Если у тега есть дочерние узлы, условие ниже всегда верно:

console.log(document.body.childNodes[0] === document.body.firstChild); // true
console.log(document.body.childNodes[document.body.childNodes.length - 1] === document.body.lastChild); // true

// Для проверки наличия дочерних узлов существует также специальная функция elem.hasChildNodes().

console.log(document.body.hasChildNodes()); // true
console.log(document.body.childNodes[0].hasChildNodes()); // #text у него false

// childNodes похож на массив. На самом деле это не массив, а коллекция – особый перебираемый объект-псевдомассив.

// И есть два важных следствия из этого:

// Для перебора коллекции мы можем использовать for..of:

// Это работает, потому что коллекция является перебираемым объектом (есть требуемый для этого метод Symbol.iterator).

// Методы массивов не будут работать, потому что коллекция – это не массив:

try {
  document.body.childNodes.map();
} catch (e) {
  console.error(e); // TypeError: document.body.childNodes.map is not a function
}

// но есть Array.from

console.log(Array.from(document.body.childNodes).filter((node) => node.nodeName == 'DIV')); // 2 div`a

// DOM-коллекции – только для чтения
// Мы не можем заменить один дочерний узел на другой, просто написав childNodes[i] = ....

// DOM-коллекции живые
// Почти все DOM-коллекции, за небольшим исключением, живые. Другими словами, они отражают текущее состояние DOM.
// т.к. являются ссылками

// Не используйте цикл for..in для перебора коллекций

console.log(document.body.childNodes);
for (const prop in document.body.childNodes) console.log(prop); // есть лишиние

// Соседи – это узлы, у которых один и тот же родитель.
// <head> и <body> соседи
// <body> – «следующий» или «правый» сосед <head>
// <head> «предыдущий» или «левый» сосед <body>.

// Следующий узел того же родителя (следующий сосед) – в свойстве nextSibling, а предыдущий – в previousSibling.
// Родитель доступен через parentNode.

console.log(document.body.parentNode === document.documentElement); // true
// 2 раза потому что есть отступ
console.log(document.head.nextSibling.nextSibling); // body
console.log(document.body.previousSibling.previousSibling); // head

// но если хочется только по элементам
// В частности, в childNodes находятся и текстовые узлы и узлы-элементы и узлы-комментарии, если они есть.

// children – коллекция детей, которые являются элементами.
// firstElementChild, lastElementChild – первый и последний дочерний элемент.
// previousElementSibling, nextElementSibling – соседи-элементы.
// parentElement – родитель-элемент.

console.log(document.documentElement.parentNode); // выведет #document
console.log(document.documentElement.parentElement); // выведет null

// #document это нода, но не элемент
// Эта деталь может быть полезна, если мы хотим пройти вверх по цепочке родителей от произвольного элемента elem к <html>, но не до document:

console.log(document.body.children); // div, ul, div, script
for (const element of document.body.children) {
  console.log(element);
}

// Элемент <table>, в дополнение к свойствам, о которых речь шла выше, поддерживает следующие:

// table.rows – коллекция строк <tr> таблицы.
// table.caption/tHead/tFoot – ссылки на элементы таблицы <caption>, <thead>, <tfoot>.
// table.tBodies – коллекция элементов таблицы <tbody> (по спецификации их может быть больше одного).

// <thead>, <tfoot>, <tbody> предоставляют свойство rows:

// tbody.rows – коллекция строк <tr> секции.

// <tr>:

// tr.cells – коллекция <td> и <th> ячеек, находящихся внутри строки <tr>.
// tr.sectionRowIndex – номер строки <tr> в текущей секции <thead>/<tbody>/<tfoot>.
// tr.rowIndex – номер строки <tr> в таблице (включая все строки таблицы).

// <td> and <th>:

// td.cellIndex – номер ячейки в строке <tr>.

//<html>
//  <body>
//    <div>Пользователи:</div>
//    <ul>
//      <li>Джон</li>
//      <li>Пит</li>
//    </ul>
//  </body>
//</html>;

// Напишите код, как получить…
// элемент <div>?

console.log(document.body.firstElementChild);

// <ul>

console.log(document.body.lastElementChild);

// второй <li> (с именем Пит)?

console.log(document.body.lastElementChild.lastElementChild);

// Напишите код, который выделит красным цветом все ячейки в таблице по диагонали.
// 5x5

for (const row of document.body.children[document.body.children.length - 2].rows) {
  Array.from(row.cells).forEach((cell, index) =>
    row.rowIndex == index ? (cell.style.background = 'red') : false
  );
}
