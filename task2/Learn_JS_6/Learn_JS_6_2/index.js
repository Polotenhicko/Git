//  js позволяет получать существующее выделение, выделять и снимать выделение как целиком, так и по частям,
//  убирать выделенную часть из документа, оборачивать её в тег и так далее.

// Используются встроенные классы Range и Selection

// Range
// В основе выделения лежит Range - диапазон
// Он представляет собой пару «граничных точек»: начало и конец диапазона.

// Каждая точка представлена как родительский DOM-узел с относительным смещением от начала.
// Если этот узел - элемент, то смщение - номер дочернего элемента
// Если - текстовый узел, то смещение - позиция в тексте

// Создание диапазона
let range = new Range();

// Устанавливаем границы выделения, используя range.setStart(node, offset) и range.setEnd(node, offset)

// Пример
// Выделим "Example: <i>italic</i>"
// Это первые два дочерних узла тега <p> (учитывая текстовые узлы):

range.setStart(p, 0); // установка начала диапазона на нулевой ноде p - текстовый узел "Example: "
range.setEnd(p, 2); // расширяем до 2 не включая дочерней ноды

console.log(range.toString()); // Example: italic

// прмиеним диапазон для выделения документа
document.getSelection().addRange(range); // выделил текст

range.setEnd(p, 0);
console.log(range.toString()); // нельзя

range.setStart(p, 1);
try {
  range.setEnd(p, -1);
} catch (e) {
  console.log(e); // DOMException: Failed to execute 'setEnd' on 'Range': The offset 4294967295 is invalid.
}

// Конец должен идти после начала, иначе ошибка

// Попробуем выделить не весь текст
// Но теперь нужно установить начало и конец как относительное смещение в текстовых узлах

// Нам нужно создать диапазон, который:
// 1. начинается со второго индекса первого дочернего узла тега <p> (захватываем всё, кроме первых двух букв "Example: ")
// 2. заканчивается на 3 индексе первого дочернего узла тега <b> (захватываем первые три буквы «bold», но не более):

range = new Range();
range.setStart(p.firstChild, 2); // со 2 индекса текстового узла
range.setEnd(p.querySelector('b').firstChild, 3);

console.log(range.toString()); // ample: italic and bol

document.getSelection().removeAllRanges();
window.getSelection().addRange(range);

// Не обязательно использовать один и тот же элемент в setStart и setEnd.
//  Диапазон может охватывать множество не связанных между собой элементов
// Важно лишь чтобы конец шёл после начала.

// Объект диапазона Range имеет следующие свойства:

// 1. startContainer (p.firstChild) - нода начального смещения
// 2. startOffset (2) - начальное смещение
// 3. endContainer (b.firstChild) - нода конечного смещения
// 4. endOffset (3) - конечное смещение
// 5. collapsed - boolean, true если диапозон начинается на одном и закаончивается на том же месте
// то есть в диапазоне его нет
// 6. commonAncestorContainer (элемент p) - ближайший общий предок всех узлов диапазона

// Методы Range
// Есть много удобных методов манипуляции диапазона

// Установить начало диапазона:
// setStart(node, offset) установить начальную границу в позицию offset в node
// setStartBefore(node) установить начальную границу прямо перед node
// setStartAfter(node) установить начальную границу прямо после node

range = new Range();
range.setStartBefore(p);
range.setEnd(p, 2);
console.log(range.toString()); // Example: italic

range.setStartAfter(p.firstChild);
console.log(range.toString()); // italic

// Установить конец диапазона (похожи на предыдущие методы):
// setEnd(node, offset) установить конечную границу в позицию offset в node
// setEndBefore(node) установить конечную границу прямо перед node
// setEndAfter(node) установить конечную границу прямо после node

// Как было показано, node может быть как текстовым узлом, так и элементом:
// для текстовых узлов offset пропускает указанное количество символов,
// в то время как для элементов – указанное количество дочерних узлов.

// Другие методы:

// selectNode(node) выделить node целиком
// selectNodeContents(node) выделить всё содержимое node
// collapse(toStart) если указано toStart=true, установить конечную границу в начало,
//   иначе установить начальную границу в конец, схлопывая таким образом диапазон
// cloneRange() создать новый диапазон с идентичными границами

range = new Range();
range.selectNode(p);
console.log(range.toString()); // Example: italic and bold

range.selectNodeContents(p);
console.log(range.toString()); // Example: italic and bold
// 2 одинаковых?

range.collapse(true);
console.log(range.toString()); // ''

range.selectNodeContents(p);
range.collapse(false);
console.log(range.toString()); // ''

console.log(range.cloneRange() instanceof Range); // true

// Методы чтобы манипулировать содержимым в пределах диапазона:

// deleteContents() – удалить содержимое диапазона из документа
// extractContents() – удалить содержимое диапазона из документа и вернуть как DocumentFragment
// cloneContents() – склонировать содержимое диапазона и вернуть как DocumentFragment
// insertNode(node) – вставить node в документ в начале диапазона
// surroundContents(node) – обернуть node вокруг содержимого диапазона.
//  Чтобы этот метод сработал, диапазон должен содержать как открывающие, так и закрывающие теги для всех элементов внутри себя:
//  не допускаются частичные диапазоны по типу < i > abc.

// Используя эти методы, мы можем делать с выделенными узлами что угодно.

range = new Range();

// Каждый описанный метод представлен здесь:
const methods = {
  deleteContents() {
    range.deleteContents();
  },
  extractContents() {
    let content = range.extractContents();
    result.innerHTML = '';
    result.append('Извлечено: ', content);
  },
  cloneContents() {
    let content = range.cloneContents();
    result.innerHTML = '';
    result.append('Клонировано: ', content);
  },
  insertNode() {
    let newNode = document.createElement('u');
    newNode.innerHTML = 'НОВЫЙ УЗЕЛ';
    range.insertNode(newNode);
  },
  surroundContents() {
    let newNode = document.createElement('u');
    try {
      range.surroundContents(newNode);
    } catch (e) {
      console.log(e);
    }
  },
  resetExample() {
    p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
    result.innerHTML = '';

    range.setStart(p.firstChild, 2);
    range.setEnd(p.querySelector('b').firstChild, 3);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  },
};

for (let method in methods) {
  document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
}

// Selection

// Range это общий объект для управления диапазонами выделения. Сам он ничего не выделяет
// Выделение представлено объектом Selection, который может быть получен как
// window.getSelection() и document.getSelection();

// Выделение может включать 0 или более диапазонов
// Но на деле несколько диапазонов можно сделать только в firefox
// Остальные браузеры - максимум 1 диапазон

// Аналогично диапазону, выделение имеет начальную границу, именуемую «якорем», и конечную, называемую «фокусом».
// Основные свойства выделения:

// anchorNode – узел, с которого начинается выделение,
// anchorOffset – смещение в anchorNode, где начинается выделение,
// focusNode – узел, на котором выделение заканчивается,
// focusOffset – смещение в focusNode, где выделение заканчивается,
// isCollapsed – true, если диапазон выделения пуст или не существует.
// rangeCount – количество диапазонов в выделении, максимум 1 во всех браузерах, кроме Firefox.

// Конец выделения может быть в документе до его начала
// как? просто
// много методов выделить текст
// но мышь позволяет выделять текст в 2 направлениях
// слева направо и справа налево

// И тогда будет, что фокус раньше якоря

// Существуют события, позволяющие отслеживать выделение:

// elem.onselectstart – когда с elem начинается выделение, например пользователь начинает двигать мышкой с зажатой кнопкой.
// preventDefault() отменяет начало выделения.

// document.onselectionchange – когда выделение изменено.
// Заметьте: этот обработчик можно поставить только на document.

document.onselectionchange = function () {
  const { anchorNode, anchorOffset, focusNode, focusOffset } = document.getSelection();
  from.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
  to.value = `${focusNode && focusNode.data}:${focusOffset}`;
};

// Чтобы получить всё выделение как текст:
console.log(document.getSelection().toString()); // ample: italic and bol

// Как дом элемент:
console.log(document.getSelection().getRangeAt(0).cloneContents());

// Методы Selection
// Методы Selection для добавления и удаления диапазонов:

// getRangeAt(i) – взять i-ый диапазон, начиная с 0. Во всех браузерах, кроме Firefox, используется только 0.
// addRange(range) – добавить range в выделение. Все браузеры, кроме Firefox, проигнорируют этот вызов, если в выделении уже есть диапазон.
// removeRange(range) – удалить range из выделения.
// removeAllRanges() – удалить все диапазоны.
// empty() – сокращение для removeAllRanges.

// Также существуют методы управления диапазонами выделения напрямую, без обращения к Range:
// collapse(node, offset) – заменить выделенный диапазон новым, который начинается и заканчивается на node, на позиции offset.
// setPosition(node, offset) – то же самое, что collapse (дублирующий метод-псевдоним).
// collapseToStart() – схлопнуть (заменить на пустой диапазон) к началу выделения,
// collapseToEnd() – схлопнуть диапазон к концу выделения,
// extend(node, offset) – переместить фокус выделения к данному node, с позиции offset,
// setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset) – заменить диапазон выделения на
//    заданные начало anchorNode / anchorOffset и конец focusNode / focusOffset.Будет выделено всё содержимое между этими границами
// selectAllChildren(node) – выделить все дочерние узлы данного узла node.
// deleteFromDocument() – удалить содержимое выделения из документа.
// containsNode(node, allowPartialContainment = false) – проверяет, содержит ли выделение node
// (частично, если второй аргумент равен true)

// Так что для многих задач мы можем вызывать методы Selection, не обращаясь к связанному объекту Range.
// Пример с p

document.getSelection().setBaseAndExtent(p, 2, p, p.childNodes.length);
// выделить всё содержимое от нулевого потомка тега <p> до последнего

// Теперь с Range
range = new Range();
range.selectNodeContents(p);
document.getSelection().removeAllRanges(); // очистить текущее выделение, если оно существует
document.getSelection().addRange(range);

// Чтобы что-то выделить, сначала снимите текущее выделение

// Если выделение уже существует, сначала снимите его, используя removeAllRanges(), и только затем добавляйте новые диапазоны.
//  В противном случае все браузеры, кроме Firefox, проигнорируют добавление.
// Исключением являются некоторые методы выделения, которые заменяют существующее выделение, например, setBaseAndExtent

// Выделение в элементах форм
// Элементы форм, такие как input и textarea, предоставляют отдельное API для выделения.
// Так как значения полей представляют собой простой текст, а не HTML, и нам не нужны такие сложные объекты, как Range и Selection.

// Свойства:
// input.selectionStart – позиция начала выделения (это свойство можно изменять),
// input.selectionEnd – позиция конца выделения (это свойство можно изменять),
// input.selectionDirection – направление выделения, одно из: «forward» (вперёд), «backward» (назад)
// или «none» (без направления, если, к примеру, выделено с помощью двойного клика мыши).

// События:
// input.onselect – срабатывает, когда выделение завершено.

// Методы:
// input.select() – выделяет всё содержимое input (может быть textarea вместо input),
// input.setSelectionRange(start, end, [direction]) – изменить выделение, чтобы начиналось с позиции start, и заканчивалось end,
//  в данном направлении direction(необязательный параметр).
// input.setRangeText(replacement, [start], [end], [selectionMode]) – заменяет выделенный текст в диапазоне новым.
// Если аргументы start и end указаны, то они задают начало и конец диапазона, иначе используется текущее выделение.

// Последний аргумент, selectionMode, определяет, как будет вести себя выделение после замены текста. Возможные значения:
// "select" – только что вставленный текст будет выделен.
// "start" – диапазон выделения схлопнется прямо перед вставленным текстом (так что курсор окажется непосредственно перед ним).
// "end" – диапазон выделения схлопнется прямо после вставленного текста (курсор окажется сразу после него).
// "preserve" – пытается сохранить выделение. Значение по умолчанию.

// Пример: отслеживание выделения
area.onselect = function () {
  from1.value = area.selectionStart;
  to1.value = area.selectionEnd;
  console.log(area.selectionDirection);
};

// onselect срабатывает при выделении чего-либо, но не при снятии выделения.
// событие document.onselectionchange не должно срабатывать при выделении внутри элемента формы в соответствии со спецификацией,
// так как оно не является выделением элементов в document.Хотя некоторые браузеры генерируют это событие,
// полагаться на это не стоит.

// Пример: изменение позиции курсора
// Мы можем изменять selectionStart и selectionEnd, устанавливая выделение.
// Важный граничный случай – когда selectionStart и selectionEnd равны друг другу. В этом случае они указывают на позицию курсора
// Таким образом, задавая selectionStart и selectionEnd одно и то же значение, мы можем передвигать курсор.

area2.onfocus = function (e) {
  // задержка чтобы работало после фокуса
  // хотя onfocus - событие после фокуса, странно
  setTimeout(() => (area2.selectionStart = area2.selectionEnd = 10));
};

// Пример: изменение выделения
button.onclick = function () {
  if (input2.selectionStart == input2.selectionEnd) return;
  const selected = input2.value.slice(input2.selectionStart, input2.selectionEnd)?.trim();
  input2.setRangeText(`*${selected}*`);
};

// Передавая больше параметров, мы можем устанавливать start и end.
button2.onclick = function () {
  const pos = input2.value.indexOf('ЭТО');
  if (pos >= 0) {
    input2.setRangeText('*ЭТО*', pos, pos + 3, 'select');
    input2.focus();
  }
};

// Сделать что-то невыделяемым
// 3 способа

// 1. user-select: none

// Это свойство не позволяет начать выделение с elem,
// но пользователь может начать выделять с другого места и включить elem в getSelection

// так что на самом деле выделение произойдёт, но его содержимое обычно игнорируется при копировании и вставке.

// 2. Предотвратить действие по умолчанию в событии onselectstart или mousedown.
// Предотвратить действие по умолчанию в событии onselectstart или mousedown.
// но если начать выделять с другого элемента, то всё равно будет выделение

// 3. Мы можем очищать выделение через document.getSelection().empty()
// Этот способ используется редко, так как он вызывает нежелаемое мерцание при появлении и исчезновении выделения.
