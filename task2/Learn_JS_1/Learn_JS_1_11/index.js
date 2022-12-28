// Большинство соответствующих методов JavaScript работают в одной из двух указанных ниже систем координат:

// Относительно окна браузера - как position:fixed, отсчёт идёт от верхнего левого угла окна
// clientX/clientY

// Относительно документа – как position:absolute на уровне документа, отсчёт идёт от верхнего левого угла документа.
// pageX/pageY

// Когда страница полностью прокручена в самое начало, то верхний левый угол окна совпадает с левым верхним углом документа,
// при этом обе этих системы координат тоже совпадают.Но если происходит прокрутка,
// то координаты элементов в контексте окна меняются, так как они двигаются,
//  но в то же время их координаты относительно документа остаются такими же.

// Координаты относительно окна: getBoundingClientRect

// Метод elem.getBoundingClientRect() возвращает координаты в контексте окна для минимального по размеру прямоугольника,
//  который заключает в себе элемент elem, в виде объекта встроенного класса DOMRect.

// Основные свойства объекта типа DOMRect:
// x/y – X/Y-координаты начала прямоугольника относительно окна,
// width/height – ширина/высота прямоугольника (могут быть отрицательными).

// Дополнительные, «зависимые», свойства:
// top/bottom – Y-координата верхней/нижней границы прямоугольника,
// left/right – X-координата левой/правой границы прямоугольника.

// x/y и width/height уже точно задают прямоугольник. Остальные свойства могут быть легко вычислены на их основе:
// left = x;
// top = y;
// right = x + width;
// bottom = y + height;

// Заметим:
// Координаты могут считаться с десятичной частью, например 10.5. Это нормально, ведь браузер использует дроби
// в своих внутренних вычислениях.Мы не обязаны округлять значения при установке style.left / top.

// Координаты могут быть отрицательными. Например, если страница прокручена так,
//  что элемент elem ушёл вверх за пределы окна, то вызов elem.getBoundingClientRect().top вернёт отрицательное значение.

const div = document.getElementById('div');

console.log(div.getBoundingClientRect());
// x,y, left, right, bottom, top, width, height

// Зачем вообще нужны зависимые свойства? Для чего существуют top/left, если есть x/y?

// top/left, на самом деле не всегда равны x/y
// Технически, значения width/height могут быть отрицательными.
// Это позволяет задать «направленный» прямоугольник, например, для выделения мышью с отмеченным началом и концом.

// То есть, отрицательные значения width/height означают, что прямоугольник «растет» влево-вверх из правого угла.

// Internet Explorer и Edge: не поддерживают x/y
// Таким образом, мы можем либо сделать полифил (добавив соответствующие геттеры в DomRect.prototype),
// либо использовать top / left, так как это всегда одно и то же при положительных width / height,
// в частности – в результате вызова elem.getBoundingClientRect().

// elementFromPoint(x, y)
// Вызов document.elementFromPoint(x, y) возвращает самый глубоко вложенный элемент в окне, находящийся по координатам (x, y).
// const elem = document.elementFromPoint();

// Например, код ниже выделяет с помощью стилей и выводит имя тега элемента, который сейчас в центре окна браузера:
const centerX = document.documentElement.clientWidth / 2;
const centerY = document.documentElement.clientHeight / 2;

const elem = document.elementFromPoint(centerX, centerY);
// элемент, который в центре окна браузера
console.log(elem);

// Поскольку используются координаты в контексте окна, то элемент может быть разным, в зависимости от того, какая сейчас прокрутка.

// Для координат за пределами окна метод elementFromPoint возвращает null
console.log(document.elementFromPoint(10000, 10000)); // null

// Чаще всего нам нужны координаты для позиционирования чего-либо.

// Чтобы показать что-то около нужного элемента, мы можем вызвать getBoundingClientRect,
// чтобы получить его координаты элемента, а затем использовать CSS - свойство position вместе с left / top(или right / bottom).

// Например, функция createMessageUnder(elem, html) ниже показывает сообщение под элементом elem:
const element = document.querySelector('.coords');

function createMessageUnder(elem, html) {
  const message = document.createElement('div');
  message.style.cssText = 'position: fixed; border: 1px solid black';

  const coords = elem.getBoundingClientRect();
  message.style.top = coords.bottom + 'px';
  message.style.left = coords.left + 'px';

  message.innerHTML = html;
  return message;
}
// при прокрутке страницы сообщение уплывает от кнопки.
// это из-за position: fixed и того, что позиционирование идёт от окна браузера
const message = createMessageUnder(element, 'hello guys');
document.body.append(message);
setTimeout(() => message.remove(), 5e3);

// Координаты относительно документа

// В такой системе координат отсчёт ведётся от левого верхнего угла документа, не окна.
// В CSS координаты относительно окна браузера соответствуют свойству position:fixed,
// а координаты относительно документа – свойству position:absolute на самом верхнем уровне вложенности.

// Не существует стандартного метода, который возвращал бы координаты элемента относительно документа, но мы можем написать его сами.

// Две системы координат связаны следующими формулами:

// pageY = clientY + высота вертикально прокрученной части документа.
// pageX = clientX + ширина горизонтально прокрученной части документа.

// Функция getCoords(elem) берёт координаты в контексте окна с помощью elem.getBoundingClientRect()
// и добавляет к ним значение соответствующей прокрутки:

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

// Модифицированная функция createMessageUnder:

function createMessageUnderUltra(elem, html) {
  const message = document.createElement('div');
  message.style.cssText = 'position:absolute; color: red';

  const coords = getCoords(elem);
  message.style.left = coords.left + 'px';
  message.style.top = coords.bottom + 'px';

  message.innerHTML = html;

  return message;
}

document.body.append(createMessageUnderUltra(div, 'hi man'));
