// Фокусировка: focus/blur

// Элемент получает фокус, когда пользователь кликает по нему или использует клавишу Tab

// Также существует HTML-атрибут autofocus, который устанавливает фокус на элемент, когда страница загружается

// Момент потери фокуса («blur») может быть важнее. Это момент, когда пользователь кликает куда-то ещё или нажимает Tab,
//  чтобы переключиться на следующее поле формы

// Событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус.

// В примере ниже:

// Обработчик blur проверяет, введён ли email, и если нет – показывает ошибку.
// Обработчик focus скрывает это сообщение об ошибке (в момент потери фокуса проверка повторится):

input.onblur = function () {
  if (!input.value.includes('@')) {
    // не email
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.';
  }
};

input.onfocus = function () {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    error.innerHTML = '';
  }
};

// Современный HTML позволяет делать валидацию с помощью атрибутов required, pattern и т.д

// Методы elem.focus() и elem.blur() устанавливают/снимают фокус.

// Например, запретим посетителю переключаться с поля ввода, если введённое значение не прошло валидацию:

input.onblur = function () {
  // не email
  if (!this.value.includes('@')) {
    // показать ошибку
    this.classList.add('error');
    this.focus();
  } else {
    this.classList.remove('error');
  }
};

input.remove();

// теперь будет фокус если введено неверно

// Это сработает во всех браузерах, кроме Firefox (bug).
// чзх?

// мы не можем «отменить потерю фокуса», вызвав event.preventDefault() в обработчике onblur потому,
//  что onblur срабатывает после потери фокуса элементом.

// короче не желательно мешать, так как мы мешаем пользователю заполнять форму

// Потеря фокуса может произойти по множеству причин.
// пример: вызов alert, будет удалён элемент из DOM

// из-за этого обработчики focus/blur могут сработать когда это не требуется

// Многие элементы по умолчанию не поддерживают фокусировку.

// Какие именно – зависит от браузера, но одно всегда верно: поддержка focus/blur гарантирована для элементов,
// с которыми посетитель может взаимодействовать: <button>, <input>, <select>, <a> и т.д.

// С другой стороны, элементы форматирования <div>, <span>, <table> – по умолчанию не могут получить фокус.
// Метод elem.focus() не работает для них, и события focus / blur никогда не срабатывают.

// Это можно изменить HTML-атрибутом tabindex.

// Любой элемент поддерживает фокус, если имеет tabindex
// Значение этого атрибута – порядковый номер элемента, когда клавиша Tab

// Порядок перебора таков: сначала идут элементы со значениями tabindex от 1 и выше, в порядке tabindex,
//  а затем элементы без tabindex(например, обычный < input >).

// При совпадающих tabindex элементы перебираются в том порядке, в котором идут в документе.

// Есть два специальных значения:
// 1. tabindex="0" ставит элемент в один ряд с элементами без tabindex.
// То есть, при переключении такие элементы будут после элементов с tabindex ≥ 1.
// Обычно используется, чтобы включить фокусировку на элементе, но не менять порядок переключения.
// Чтобы элемент мог участвовать в форме наравне с обычными < input >.

// 2. tabindex="-1" позволяет фокусироваться на элементе только программно.
// Клавиша Tab проигнорирует такой элемент, но метод elem.focus() будет действовать.

// можно добавлять этот атрибут через свойство tabIndex

// События focus и blur не всплывают.

// Например, мы не можем использовать onfocus на <form>, чтобы подсветить её
// фокус будет срабатывать на элементах формы, но не на форме

// У этой проблемы два решения.

// 1

// забавная особенность – focus/blur не всплывают, но передаются вниз на фазе перехвата.

form.addEventListener('focus', () => form.classList.add('focused'), true);
form.addEventListener('blur', () => form.classList.remove('focused'), true);

// 2

// события focusin и focusout – такие же, как и focus/blur, но они всплывают.
// эти события используются с addEventListener, но не с .on

form2.addEventListener('focusin', () => form2.classList.add('focused'));
form2.addEventListener('focusout', () => form2.classList.remove('focused'));

// Текущий элемент с фокусом можно получить из document.activeElement.

document.body.addEventListener('focusin', () => console.log(document.activeElement));
