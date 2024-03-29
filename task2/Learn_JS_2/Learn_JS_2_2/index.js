// Всплытие

// Когда на элементе происходит событие, обработчики сначала срабатывают на нём,
// потом на его родителе, затем выше и так далее, вверх по цепочке предков.

// Например, есть 3 вложенных элемента FORM > DIV > P

// Клик по внутреннему <p> вызовет обработчик onclick:

// Сначала на самом <p>.
// Потом на внешнем <div>.
// Затем на внешнем <form>.
// И так далее вверх по цепочке до самого document.

// Поэтому если кликнуть на <p>, то мы увидим три оповещения: p → div → form.

// Этот процесс называется «всплытием», потому что события «всплывают» от внутреннего элемента вверх через родителей подобно тому,
//  как всплывает пузырёк воздуха в воде.

// Почти все события всплывают.
// Например, событие focus не всплывает
// Однако, стоит понимать, что это скорее исключение, чем правило

// event.target
// Всегда можно узнать, на каком конкретно элементе произошло событие.

// Самый глубокий элемент, который вызывает событие, называется целевым элементом, и он доступен через event.target.

// Отличия от this (=event.currentTarget):

// event.target – это «целевой» элемент, на котором произошло событие, в процессе всплытия он неизменен.
// this – это «текущий» элемент, до которого дошло всплытие, на нём сейчас выполняется обработчик.

const form = document.getElementById('form');
form.addEventListener('click', function (e) {
  e.target.style.background = 'yellow';
  console.log('target ' + e.target.tagName + ' this ' + this.tagName);
});

// Возможна и ситуация, когда event.target и this – один и тот же элемент,
// например, если клик был непосредственно на самом элементе < form >, а не на его подэлементе.

// Прекращение всплытия

// Всплытие идёт с «целевого» элемента прямо наверх. По умолчанию событие будет всплывать до элемента <html>,
//  а затем до объекта document, а иногда даже до window, вызывая все обработчики на своём пути.

// Но любой промежуточный обработчик может решить, что событие полностью обработано, и остановить всплытие.
// Для этого нужно вызвать метод event.stopPropagation().

// теперь при нажатии на p, обработчик выше не пойдёт
const p = document.querySelector('#form p');
p.addEventListener('click', function (e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  console.log('stop');
});

// Если у элемента есть несколько обработчиков на одно событие, то даже при прекращении всплытия все они будут выполнены.
// stop, stop2
p.addEventListener('click', function (e) {
  console.log('stop2');
});

// То есть, event.stopPropagation() препятствует продвижению события дальше, но на текущем элементе все обработчики будут вызваны.

// Для того, чтобы полностью остановить обработку, существует метод event.stopImmediatePropagation().
// Он не только предотвращает всплытие, но и останавливает обработку событий на текущем элементе.

p.addEventListener('click', function (e) {
  e.stopImmediatePropagation(); // последующие вызовы не сработают
  console.log('stop3');
});

// Зачастую нет никакой необходимости прекращать всплытие. Задача, которая, казалось бы, требует этого, может быть решена иначе

// Погружение
// Существует ещё одна фаза из жизненного цикла события – «погружение» (иногда её называют «перехват»).
// Она очень редко используется в реальном коде, однако тоже может быть полезной.

// Стандарт DOM Events описывает 3 фазы прохода события:
// Фаза погружения (capturing phase) – событие сначала идёт сверху вниз.
// Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
// Фаза всплытия (bubbling stage) – событие начинает всплывать.

// Чтобы поймать событие на стадии погружения, нужно использовать третий аргумент capture вот так:

// elem.addEventListener(..., {capture: true})
// // или просто "true", как сокращение для {capture: true}
// elem.addEventListener(..., true)

// Существуют два варианта значений опции capture:

// Если аргумент false (по умолчанию), то событие будет поймано при всплытии.
// Если аргумент true, то событие будет перехвачено при погружении.

for (const elem of document.querySelectorAll('.test2 *')) {
  elem.addEventListener('click', (e) => console.log(`Погружение: ${elem.tagName}`), true);
  elem.addEventListener('click', (e) => console.log(`Всплытие: ${elem.tagName}`));
}

// Существует свойство event.eventPhase, содержащее номер фазы, на которой событие было поймано.
document.querySelector('#form2 p').addEventListener('click', function (e) {
  console.log(e.eventPhase); // 2
});

// Если мы добавили обработчик вот так addEventListener(..., true), то
//  мы должны передать то же значение аргумента capture в removeEventListener(..., true), когда снимаем обработчик.

// На каждой фазе разные обработчики на одном элементе срабатывают в порядке назначения
