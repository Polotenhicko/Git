// Генерация пользовательских событий

// Можно генерировать не только совершенно новые, придуманные нами события, но и встроенные, такие как click, mousedown и другие.
//  Это бывает полезно для автоматического тестирования.

// Встроенные классы для событий формируют иерархию аналогично классам для DOM-элементов. Её корнем является встроенный класс Event.

// Событие встроенного класса Event можно создать так:
// let event = new Event(type[, options]);

// type – тип события, строка, например "click" или же любой придуманный нами – "my-event".
// options – объект с тремя необязательными свойствами:
// bubbles: true/false – если true, тогда событие всплывает.
// cancelable: true/false – если true, тогда можно отменить действие по умолчанию.
// composed: true/false – если true, тогда событие будет всплывать наружу за пределы Shadow DOM

// По умолчанию все три свойства установлены в false: {bubbles: false, cancelable: false, composed: false}.

// Метод dispatchEvent

// После того, как объект события создан, мы должны запустить его на элементе, вызвав метод elem.dispatchEvent(event).
// Затем обработчики отреагируют на него, как будто это обычное браузерное событие.
// Если при создании указан флаг bubbles, то оно будет всплывать.

const button = document.getElementById('button');
button.addEventListener('click', function (e) {
  console.log(e.isTrusted);
  console.log('Клик');
});

let event = new Event('click');
button.dispatchEvent(event); // выполнится клик, выведется false, клик

// Можно легко отличить «настоящее» событие от сгенерированного кодом.

// Свойство event.isTrusted принимает значение true для событий,
// порождаемых реальными действиями пользователя, и false для генерируемых кодом.

// Мы можем создать всплывающее событие с именем "hello" и поймать его на document.
// Всё, что нужно сделать – это установить флаг bubbles в true:

const elem = document.getElementById('elem');

// ловим на документе
document.addEventListener('hello', function (e) {
  console.log(`Привет от ${e.target.tagName}`);
});

event = new Event('hello', { bubbles: true });
elem.dispatchEvent(event); // запускаем на элементе

// событие всплывёт и сработает на document
// Обратите внимание:

// Мы должны использовать addEventListener для наших собственных событий,
// т.к.on < event > -свойства существуют только для встроенных событий, то есть document.onhello не сработает.

// Мы обязаны передать флаг bubbles:true, иначе наше событие не будет всплывать.

// Механизм всплытия идентичен как для встроенного события (click),
// так и для пользовательского события(hello).Также одинакова работа фаз всплытия и погружения.

// Для некоторых конкретных типов событий есть свои специфические конструкторы
// Стоит использовать их вместо new Event, если мы хотим создавать такие события. К примеру, new MouseEvent("click").
// Специфический конструктор позволяет указать стандартные свойства для данного типа события.

// Например, clientX/clientY для события мыши:

event = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  clientX: 80,
  clientY: 80,
});

console.log(event.clientX); // 80

// Обратите внимание: этого нельзя было бы сделать с обычным конструктором Event.

event = new Event('click', {
  bubbles: true,
  cancelable: true,
  clientX: 80,
  clientY: 80,
});

console.log(event.clientX); // undefined, вау, а нахуя?

// Для генерации событий совершенно новых типов, таких как "hello", следует использовать конструктор new CustomEvent
// Технически CustomEvent абсолютно идентичен Event за исключением одной небольшой детали.
// У второго аргумента-объекта есть дополнительное свойство detail, в котором можно указывать информацию для передачи в событие.

elem.addEventListener('hello2', function (e) {
  console.log(e.detail.name); // кукушка
});

elem.dispatchEvent(
  new CustomEvent('hello2', {
    detail: { name: 'Кукушка' },
  })
);

// Свойство detail может содержать любые данные
// Надо сказать, что никто не мешает и в обычное new Event записать любые свойства.
// Но CustomEvent предоставляет специальное поле detail во избежание конфликтов с другими свойствами события.

// Кроме того, класс события описывает, что это за событие, и если оно не браузерное, а пользовательское,
// то лучше использовать CustomEvent, чтобы явно об этом сказать.

event = new Event('click', { bubbles: true });
anchor.addEventListener('click', function (e) {
  console.log('всплытие'); // сработало, но не дефолтный клик
});
anchor.children[0].dispatchEvent(event); // переход по ссылке не произошёл

// Для многих браузерных событий есть «действия по умолчанию», такие как переход по ссылке, выделение и т.п.

// Для новых, пользовательских событий браузерных действий, конечно, нет, но код,
// который генерирует такое событие, может предусматривать какие - то свои действия после события.

// Вызов event.preventDefault() является возможностью для обработчика события сообщить в сгенерировавший событие код,
// что эти действия надо отменить.

// Тогда вызов elem.dispatchEvent(event) возвратит false. И код, сгенерировавший событие, узнает, что продолжать не нужно.

const rabbit = document.getElementById('rabbit');

function hide(elem) {
  const event = new CustomEvent('hide', {
    cancelable: true, // нужно чтобы preventDefault сработал
  });
  if (!rabbit.dispatchEvent(event)) {
    console.log('Действие отменено обработчиком');
  } else {
    elem.hidden = true;
  }
}

rabbit.addEventListener('click', function (e) {
  hide(e.currentTarget);
});

rabbit.addEventListener('hide', function (e) {
  if (confirm('Вызвать preventDefault?')) e.preventDefault();
});
// ощущение что максимальная хуета

// Обратите внимание: событие должно содержать флаг cancelable: true. Иначе, вызов event.preventDefault() будет проигнорирован.

// Обычно события обрабатываются асинхронно. То есть, если браузер обрабатывает onclick и в процессе этого произойдёт новое событие,
//  то оно ждёт, пока закончится обработка onclick.

menu.addEventListener('click', function (e) {
  console.log(1);

  // log("вложенное")
  menu.dispatchEvent(
    new CustomEvent('menu-open', {
      bubbles: true,
    })
  );

  console.log(2);
});

document.addEventListener('menu-open', () => console.log('Вложенное событие'));

// вложенное событие menu-open успевает всплыть и запустить обработчик на document
// Это справедливо не только для dispatchEvent, но и для других ситуаций. JavaScript в обработчике события может вызвать другие методы,
//  которые приведут к другим событиям – они тоже обрабатываются синхронно.

// Если нам это не подходит, то мы можем либо поместить dispatchEvent
// (или любой другой код, инициирующий события) в конец обработчика onclick,
// либо, если это неудобно, можно обернуть генерацию события в setTimeout с нулевой задержкой:

menu.onclick = function () {
  console.log(1);

  // log(2)
  setTimeout(() =>
    menu.dispatchEvent(
      new CustomEvent('menu-open', {
        bubbles: true,
      })
    )
  );

  console.log(2);
};

// пока могу сказать что полученная информация говна куска
