// DOM-узел можно создать двумя методами:
// document.createElement(tag) - Создаёт новый элемент с заданным тегом:

const div = document.createElement('div');

// document.createTextNode(text)
// Создаёт новый текстовый узел с заданным текстом:

const textNode = document.createTextNode('Куку');

div.className = 'alert';
div.innerHTML = '<strong>Всем привет!</strong> Вы прочитали важное сообщение.';

// создали элемент, но он только перменная пока что

// Чтобы наш div появился, нам нужно вставить его где-нибудь в document. Например, в document.body.

// Для этого есть метод append, в нашем случае: document.body.append(div)

document.body.append(div);

// Вот методы для различных вариантов вставки:

// node.append(...nodes or strings) – добавляет узлы или строки в конец node,
// node.prepend(...nodes or strings) – вставляет узлы или строки в начало node,
// node.before(...nodes or strings) –- вставляет узлы или строки до node,
// node.after(...nodes or strings) –- вставляет узлы или строки после node,
// node.replaceWith(...nodes or strings) –- заменяет node заданными узлами или строками.

const ol = document.getElementById('ol');

ol.before('before'); // вставить строку перед ol
ol.after('after'); // вставить строку после ol

const liFirst = document.createElement('li');
liFirst.textContent = 'prepend';
ol.prepend(liFirst);

const liLast = document.createElement('li');
liLast.textContent = 'prepend';
ol.append(liLast);

// Эти методы могут вставлять несколько узлов и текстовых фрагментов за один вызов.

// Например, здесь вставляется строка и элемент:

div.before('<p>Привет</p>', document.createElement('hr'));
// Весь текст вставляется как текст

// &lt;p&gt;Привет&lt;/p&gt;
// <hr>
// <div id="div"></div>

// Другими словами, строки вставляются безопасным способом, как делает это elem.textContent.

// А что, если мы хотим вставить HTML именно «как html», со всеми тегами и прочим, как делает это elem.innerHTML?

// С этим может помочь другой, довольно универсальный метод: elem.insertAdjacentHTML(where, html).
// Первый параметр – это специальное слово, указывающее, куда по отношению к elem производить вставку.
// Значение должно быть одним из следующих:

// "beforebegin" – вставить html непосредственно перед elem,
// "afterbegin" – вставить html в начало elem,
// "beforeend" – вставить html в конец elem,
// "afterend" – вставить html непосредственно после elem.

// Второй параметр – это HTML-строка, которая будет вставлена именно «как HTML».
const div2 = document.getElementById('id2');
div2.insertAdjacentHTML('beforebegin', '<p>Привет</p>');
div2.insertAdjacentHTML('afterend', '<p>Пока</p>');

// У метода есть два брата:

// elem.insertAdjacentText(where, text) – такой же синтаксис, но строка text вставляется «как текст», вместо HTML,
// elem.insertAdjacentElement(where, elem) – такой же синтаксис, но вставляет элемент elem.

// Они существуют, в основном, чтобы унифицировать синтаксис. На практике часто используется только insertAdjacentHTML.
// Потому что для элементов и текста у нас есть методы append / prepend / before / after – их быстрее написать,
//  и они могут вставлять как узлы, так и текст.

// Для удаления узла есть методы node.remove().

setTimeout(() => div2.nextSibling.remove(), 2e3);

// Если нам нужно переместить элемент в другое место – нет необходимости удалять его со старого.
// Все методы вставки автоматически удаляют узлы со старых мест.

const first = document.getElementById('first');
const second = document.getElementById('second');

console.log(first.nextElementSibling == second); // true

second.after(first);

console.log(second.nextSibling == first); // true

// Элементы поменялись местами

// Как вставить ещё одно подобное сообщение?

// Мы могли бы создать функцию и поместить код туда.
// Альтернатива – клонировать существующий div и изменить текст внутри него(при необходимости).

// Иногда, когда у нас есть большой элемент, это может быть быстрее и проще.

// Вызов elem.cloneNode(true) создаёт «глубокий» клон элемента – со всеми атрибутами и дочерними элементами.
// Если мы вызовем elem.cloneNode(false), тогда клон будет без дочерних элементов.

const cloneDiv = document.querySelector('.alert').cloneNode(true);
console.log(cloneDiv == div); // false

cloneDiv.querySelector('strong').textContent = 'Пака';

div.after(cloneDiv); // клонированный после существующего

// DocumentFragment является специальным DOM-узлом, который служит обёрткой для передачи списков узлов.
// Мы можем добавить к нему другие узлы, но когда мы вставляем его куда-то, он «исчезает», вместо него вставляется его содержимое.

function getListContent() {
  const fragment = new DocumentFragment();

  for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

ol.append(getListContent()); // прям как вставка списка компонентов в jsx в реакте

// DocumentFragment редко используется

// код без него

function getListContent2() {
  const result = [];

  for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

ol.append(...getListContent2());

// теперь про легаси

// Сейчас уже нет причин их использовать, так как современные методы append, prepend, before, after, remove, replaceWith более гибкие и удобные.

// parentElem.appendChild(node)
// Добавляет node в конец дочерних элементов parentElem.

ol.appendChild(document.createElement('h2')); // добавилось

// parentElem.insertBefore(node, nextSibling)
// Вставляет node перед nextSibling в parentElem.

ol.insertBefore(document.createElement('h3'), ol.children[0]);

// parentElem.replaceChild(node, oldChild)
// Заменяет oldChild на node среди дочерних элементов parentElem.

// parentElem.removeChild(node)
// Удаляет node из parentElem (предполагается, что он родитель node).

ol.removeChild(ol.children[1]);

// Все эти методы возвращают вставленный/удалённый узел.
// Другими словами, parentElem.appendChild(node) вернёт node

// Есть ещё один, очень древний метод добавления содержимого на веб-страницу: document.write.

document.write('<b>Привет из JS</b>');

// Вызов document.write(html) записывает html на страницу «прямо здесь и сейчас».
// Строка html может быть динамически сгенерирована, поэтому метод достаточно гибкий

// Вызов document.write работает только во время загрузки страницы.

// Через одну секунду содержимое этой страницы будет заменено
setTimeout(() => document.write('<b>...Этим.</b>'), 1e3);

// вызов происходит после того, как страница загрузится, поэтому метод затирает содержимое

// Есть и преимущество

// document.write запускается во время чтения HTML браузером, и что-то пишет в документ,
//  то браузер воспринимает это так, как будто это изначально было частью загруженного HTML - документа.

// Поэтому он работает невероятно быстро, ведь при этом нет модификации DOM.
//  Метод пишет прямо в текст страницы, пока DOM ещё в процессе создания.
