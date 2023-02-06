// MutationObserver – это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений.

// Сначала мы создаём наблюдатель за изменениями с помощью колбэк-функции:
// let observer = new MutationObserver(callback);

// Потом прикрепляем его к DOM-узлу:
// observer.observe(node, config);

// config – это объект с булевыми параметрами «на какие изменения реагировать»:
// childList – изменения в непосредственных детях node,
// subtree – во всех потомках node,
// attributes – в атрибутах node,
// attributeFilter – массив имён атрибутов, чтобы наблюдать только за выбранными.
// characterData – наблюдать ли за node.data (текстовое содержимое),

// И ещё пара опций:

// characterDataOldValue – если true, будет передавать и старое, и новое значение node.data в колбэк (см далее),
//  иначе только новое(также требуется опция characterData),

// attributeOldValue – если true, будет передавать и старое, и новое значение атрибута в колбэк (см далее),
//  иначе только новое(также требуется опция attributes).

// Затем, после изменений, выполняется callback, в который изменения передаются первым аргументом как список объектов MutationRecord,
//  а сам наблюдатель идёт вторым аргументом.

// Объекты MutationRecord имеют следующие свойства:

// type – тип изменения, один из:
//  "attributes" изменён атрибут,
//  "characterData" изменены данные elem.data, это для текстовых узлов
//  "childList" добавлены/удалены дочерние элементы,
// target – где произошло изменение: элемент для "attributes", текстовый узел для "characterData" или элемент для "childList",
// addedNodes/removedNodes – добавленные/удалённые узлы,
// previousSibling/nextSibling – предыдущий или следующий одноуровневый элемент для добавленных/удалённых элементов,
// attributeName/attributeNamespace – имя/пространство имён (для XML) изменённого атрибута,
// oldValue – предыдущее значение, только для изменений атрибута или текста, если включена соответствующая
//    опция attributeOldValue / characterDataOldValue.

// Для примера возьмём <div> с атрибутом contentEditable. Этот атрибут позволяет нам сфокусироваться на элементе,
// например, кликнув, и отредактировать содержимое.

const elem = document.getElementById('elem');

let observer = new MutationObserver(console.log);

observer.observe(elem, {
  childList: true, // за непосредственными детьми
  subtree: true, // за более глубокими потомками
  characterDataOldValue: true, // передать старое значение data
});

// Теперь, если мы изменим текст внутри <b>меня</b>, мы получим единичное изменение:

// mutationRecords = [{
//   type: "characterData",
//   oldValue: "меня",
//   target: <text node>,
//   // другие свойства пусты
// }];

// если удалить <b>меня</b> полностью, то
// ...детали изменений зависят от того, как браузер обрабатывает такое удаление
// он может соединить два соседних текстовых узла "Отредактируй " и ", пожалуйста" в один узел
// или может оставить их разными текстовыми узлами

// Пример использования - удалять изменения от стороннего скрипта

// Есть и ситуации, когда MutationObserver хорошо подходит с архитектурной точки зрения.
// Представим, что мы создаём сайт о программировании

// На нашем сайте мы будем использовать JavaScript-библиотеку для подсветки синтаксиса, например Prism.js
// Вызов метода Prism.highlightElem(pre) ищет такие элементы pre и добавляет в них стили и теги,
//  которые в итоге дают цветную подсветку синтаксиса

// сначала просто включим подсветку

// document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElement);

// вдруг у нас есть асинхронный html

// let article = /* получить новую статью с сервера */
// articleElem.innerHTML = article;

// HTML подгружённой статьи article может содержать примеры кода. Нам нужно вызвать Prism.highlightElem для них, чтобы подсветить синтаксис.

// Можем использовать MutationObserver для решения этой задачи

observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    // проверим новые узлы, есть ли что-то, что надо подсветить?

    for (let node of mutation.addedNodes) {
      // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
      if (!(node instanceof HTMLElement)) continue;

      // проверить, не является ли вставленный элемент примером кода
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // или, может быть, пример кода есть в его поддереве?
      for (let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }
});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, { childList: true, subtree: true });

// динамически вставить содержимое как фрагменты кода
(async () => {
  demoElem.innerHTML = `Фрагмент кода ниже:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Ещё один:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
})();

// Есть доп методы:

// observer.disconnect() – останавливает наблюдение.
// Вместе с ним используют метод:

// let mutationRecords = observer.takeRecords()
// – получает список необработанных записей изменений, которые произошли,
// но колбэк для них ещё не выполнился.

// мы отключаем наблюдатель
observer.disconnect();

// он, возможно, не успел обработать некоторые изменения
let mutationRecords = observer.takeRecords();
// обработать mutationRecords

// MutationObserver прям как WeakMap, но использует слабые ссылки на узлы, чтобы при их удалении
// не было ссылки на элемент
