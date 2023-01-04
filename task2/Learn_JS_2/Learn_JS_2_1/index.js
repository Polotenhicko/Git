// События мыши:

// click – происходит, когда кликнули на элемент левой кнопкой мыши
// (на устройствах с сенсорными экранами оно происходит при касании).
// contextmenu – происходит, когда кликнули на элемент правой кнопкой мыши.
// mouseover / mouseout – когда мышь наводится на / покидает элемент.
// mousedown / mouseup – когда нажали / отжали кнопку мыши на элементе.
// mousemove – при движении мыши.

// События на элементах управления:

// submit – пользователь отправил форму <form>.
// focus – пользователь фокусируется на элементе, например нажимает на <input>.

// Клавиатурные события:

// keydown и keyup – когда пользователь нажимает / отпускает клавишу.

// События документа:

// DOMContentLoaded – когда HTML загружен и обработан, DOM документа полностью построен и доступен.

// CSS events:

// transitionend – когда CSS-анимация завершена.

// HTML
// <input type="button" onclick="alert('Клик!')" value="Кнопка">

// HTML + JS
const button = document.getElementById('button');
button.onclick = function () {
  console.log('Клик');
};

// Так как у элемента DOM может быть только одно свойство с именем onclick, то назначить более одного обработчика так нельзя.

// Убрать обработчик можно назначением elem.onclick = null.

// Внутри обработчика события this ссылается на текущий элемент,
//  то есть на тот, на котором, как говорят, «висит» (т.е.назначен) обработчик.
// <button id="button" type="button">Нажми</button>
button.onclick = function () {
  console.log(this.outerHTML);
};

// если стрелочная
button.onclick = () => {
  console.log(this.outerHTML); // undefined
};

// Если добавить скобки, то sayThanks() – это уже вызов функции,
// результат которого(равный undefined, так как функция ничего не возвращает)

// …А вот в разметке, в отличие от свойства, скобки нужны:

// <input type="button" id="button" onclick="sayThanks()">
// При создании обработчика браузером из атрибута, он автоматически создаёт функцию с телом из значения атрибута: sayThanks().

// Так что разметка генерирует такое свойство:
button.onclick = function () {
  sayThanks(); // содержимое атрибута
};

// Используйте именно функции, а не строки.

// Назначение обработчика строкой elem.onclick = "alert(1)" также сработает.
// Это сделано из соображений совместимости, но делать так не рекомендуется.

// Не используйте setAttribute для обработчиков.
// Такой вызов работать не будет:

document.body.setAttribute('onclick', function () {
  alert(1);
});

// Используйте elem.onclick, а не elem.ONCLICK, потому что DOM-свойства чувствительны к регистру.
// т.к. это js

// Фундаментальный недостаток описанных выше способов назначения обработчика – невозможность повесить несколько обработчиков на одно событие.

// Разработчики стандартов достаточно давно это поняли и предложили альтернативный способ назначения
//  обработчиков при помощи специальных методов addEventListener и removeEventListener

// element.addEventListener(event, handler, [options]);

// options
// Дополнительный объект со свойствами:
// once: если true, тогда обработчик будет автоматически удалён после выполнения.

// capture: фаза, на которой должен сработать обработчик,
//  Так исторически сложилось, что options может быть false / true, это то же самое, что { capture: false / true }.

// passive: если true, то указывает, что обработчик никогда не вызовет preventDefault(),

// element.removeEventListener(event, handler, [options]);
// Для удаления нужно передать именно ту функцию-обработчик которая была назначена.

// Обратим внимание – если функцию обработчик не сохранить где - либо, мы не сможем её удалить.
// Нет метода, который позволяет получить из элемента обработчики событий, назначенные через addEventListener.

// Метод addEventListener позволяет добавлять несколько обработчиков на одно событие одного элемента
button.addEventListener('click', () => {
  console.log(1);
});
button.addEventListener('click', () => {
  console.log(2);
});

//  можно одновременно назначать обработчики и через DOM-свойство и через addEventListener

// Существуют события, которые нельзя назначить через DOM-свойство, но можно через addEventListener.
// Например, таково событие DOMContentLoaded, которое срабатывает, когда завершена загрузка и построение DOM документа.

document.onDOMContentLoaded = function () {
  console.log('DOM построен'); // не будет работать
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM построен'); // а вот так сработает
});
// это скорее исключение, чем правило.

// Когда происходит событие, браузер создаёт объект события, записывает в него детали и передаёт его в качестве аргумента функции-обработчику.
button.onclick = function (event) {
  // вывести тип события, элемент и координаты клика
  console.log(event.type + ' на ' + event.currentTarget);
  console.log('Координаты: ' + event.clientX + ':' + event.clientY);
};

// Некоторые свойства объекта event:

// event.type
// Тип события, в данном случае "click".

// event.currentTarget
// Элемент, на котором сработал обработчик. Значение – обычно такое же, как и у this

// event.clientX / event.clientY
// Координаты курсора в момент клика относительно окна, для событий мыши.

// При назначении обработчика в HTML, тоже можно использовать объект event, вот так:
// <input type="button" onclick="alert(event.type)" value="Тип события">

// Это возможно потому, что когда браузер из атрибута создаёт функцию-обработчик,
// то она выглядит так: function(event) { alert(event.type) }

// Мы можем назначить обработчиком не только функцию, но и объект при помощи addEventListener
// В этом случае, когда происходит событие, вызывается метод объекта handleEvent.

const elem = document.getElementById('elem');

elem.addEventListener('click', {
  handleEvent(event) {
    console.log(event.type + ' на ' + event.currentTarget);
  },
});

// addEventListener получает объект в качестве обработчика, он вызывает object.handleEvent(event)

// Мы также можем использовать класс для этого:

let Menu = class Menu {
  handleEvent(event) {
    switch (event.type) {
      case 'mousedown':
        elem.innerHTML = 'Нажата кнопка мыши';
        break;
      case 'mouseup':
        elem.innerHTML += '...и отжата.';
        break;
    }
  }
};

let menu = new Menu();
// elem.addEventListener('mousedown', menu);
// elem.addEventListener('mouseup', menu);

// Метод handleEvent не обязательно должен выполнять всю работу сам.
// Он может вызывать другие методы, которые заточены под обработку конкретных типов событий, вот так:

Menu = class Menu {
  handleEvent(event) {
    // mousedown -> onMousedown
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onMousedown() {
    elem.innerHTML = 'Кнопка мыши нажата';
  }

  onMouseup() {
    elem.innerHTML += '...и отжата.';
  }
};
menu = new Menu();
elem.addEventListener('mousedown', menu);
elem.addEventListener('mouseup', menu);

// Теперь обработка событий разделена по методам, что упрощает поддержку кода.
