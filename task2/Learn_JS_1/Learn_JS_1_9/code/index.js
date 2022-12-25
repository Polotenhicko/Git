// Свойство elem.scrollTop содержит размер прокрученной области при отсчёте сверху.
// А как подсчитать размер прокрутки снизу(назовём его scrollBottom) ?

// P.S. Проверьте: если прокрутки нет вообще или элемент полностью прокручен – оно должно давать 0.

Object.defineProperty(HTMLElement.prototype, 'scrollBottom', {
  get() {
    return this.scrollHeight - this.clientHeight - this.scrollTop;
  },
});

const example = document.getElementById('example');
console.log(example.scrollBottom);

// Каковы координаты центра поля?

// Вычислите их и используйте, чтобы поместить мяч в центр поля:

// Элемент должен позиционироваться за счёт JavaScript, а не CSS.
// Код должен работать с любым размером мяча (10, 20, 30 пикселей) и любым размером поля без привязки к исходным значениям.

function setBallOnCenter() {
  const field = document.getElementById('field');
  const ball = document.getElementById('ball');
  const centerField = {
    x: field.clientWidth / 2,
    y: field.clientHeight / 2,
  };

  ball.style.left = `${centerField.x - ball.clientWidth / 2}px`;
  ball.style.top = `${centerField.y - ball.clientHeight / 2}px`;

  console.log(`Центр поля: x:${centerField.x} y:${centerField.y}`);
}

// Если браузеру неизвестны ширина и высота изображения (из атрибута HTML-тега или CSS-свойств),
// он считает их равными 0 до тех пор, пока изображение не загрузится.
// Мы можем исправить это, добавив атрибуты width/height тегу <img>:

setBallOnCenter();
