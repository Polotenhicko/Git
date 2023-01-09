// эти события бывают не только из-за мыши, но и эмулируются на других устройствах, в частности, на мобильных, для совместимости.

// Типы событий мыши

// mousedown/mouseup
// Кнопка мыши нажата/отпущена над элементом.

// mouseover/mouseout
// Курсор мыши появляется над элементом и уходит с него.

// mousemove
// Каждое движение мыши над элементом генерирует это событие.

// click
// Вызывается при mousedown , а затем mouseup над одним и тем же элементом, если использовалась левая кнопка мыши.

// dblclick
// Вызывается двойным кликом на элементе.

// contextmenu
// Вызывается при попытке открытия контекстного меню, как правило, нажатием правой кнопки мыши.
// Но, заметим, это не совсем событие мыши, оно может вызываться и специальной клавишей клавиатуры.

// клик мышью вначале вызывает mousedown, когда кнопка нажата, затем mouseup и click, когда она отпущена.

// В случае, когда одно действие инициирует несколько событий, порядок их выполнения фиксирован.
// То есть обработчики событий вызываются в следующем порядке: mousedown → mouseup → click.

// События, связанные с кликом, всегда имеют свойство button, которое позволяет получить конкретную кнопку мыши.

// Обычно мы не используем его для событий click и contextmenu,
// потому что первое происходит только при щелчке левой кнопкой мыши, а второе – только при щелчке правой кнопкой мыши.

// С другой стороны, обработчикам mousedown и mouseup может потребоваться event.button, потому что эти события срабатывают на любую кнопку

// Состояние кнопки	                  event.button
// Левая кнопка (основная)	          0
// Средняя кнопка (вспомогательная)	  1
// Правая кнопка (вторичная)	        2
// Кнопка X1 (назад)	                3
// Кнопка X2 (вперёд)	                4

// document.addEventListener('click', (e) => console.log(e.button));
// Также есть свойство event.buttons, в котором все нажатые в данный момент кнопки представлены в виде целого числа,
// по одному биту на кнопку

// В старом коде вы можете встретить event.which свойство – это старый нестандартный способ получения кнопки с возможными значениями:

// event.which == 1 – левая кнопка,
// event.which == 2 – средняя кнопка,
// event.which == 3 – правая кнопка.

// Все события мыши включают в себя информацию о нажатых клавишах-модификаторах.
// Свойства события:

// shiftKey: Shift
// altKey: Alt (или Opt для Mac)
// ctrlKey: Ctrl
// metaKey: Cmd для Mac

// Они равны true, если во время события была нажата соответствующая клавиша.

document.addEventListener('click', function (e) {
  console.log('shift: ' + e.shiftKey, 'Alt(Opt): ' + e.altKey, 'Ctrl: ' + e.ctrlKey, 'meta(Mac): ' + e.metaKey);
});

// Внимание: обычно на Mac используется клавиша Cmd вместо Ctrl
// Комбинации клавиш хороши в качестве дополнения к рабочему процессу. Так что, если посетитель использует клавиатуру – они работают.

// Но если на их устройстве его нет – тогда должен быть способ жить без клавиш-модификаторов.

// Все события мыши имеют координаты двух видов:

// Относительно окна: clientX и clientY.
// Относительно документа: pageX и pageY.

// Двойной клик мыши имеет побочный эффект, который может быть неудобен в некоторых интерфейсах: он выделяет текст.
// Если зажать левую кнопку мыши и, не отпуская кнопку, провести мышью, то также будет выделение,
// которое в интерфейсах может быть «не кстати».

const h1 = document.getElementById('h1');

// самым разумным будет отменить действие браузера по умолчанию при событии mousedown, это отменит оба этих выделения:

h1.addEventListener('mousedown', function (e) {
  e.preventDefault();
  console.log('onmousedown');
});

// элемент не выделяется при двойном клике, а также на нём нельзя начать выделение, зажав кнопку мыши.
// но всё ещё можно выделить если нажимать не на самом элементе
const div = document.getElementById('div');
// Если мы хотим отключить выделение для защиты содержимого страницы от копирования, то мы можем использовать другое событие: oncopy.
div.oncopy = function (e) {
  console.log('Нельзя копировать');
  return false;
};

// почему-то с preventDefault не хочет нормально работать
