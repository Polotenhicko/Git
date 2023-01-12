// Drag’n’Drop – отличный способ улучшить интерфейс.
// Захват элемента мышкой и его перенос визуально упростят что угодно

// В современном стандарте HTML5 есть раздел о Drag and Drop – и там есть специальные события именно для Drag’n’Drop переноса,
//  такие как dragstart, dragend и так далее.

// Например, можно перетащить файл в браузер, так что JS получит доступ к его содержимому.

// Но у них есть и ограничения. Например, нельзя организовать перенос «только по горизонтали» или «только по вертикали».
// Также нельзя ограничить перенос внутри заданной зоны. Есть и другие интерфейсные задачи,
// которые такими встроенными событиями не реализуемы.Кроме того, мобильные устройства плохо их поддерживают.

// Алгоритм Drag’n’Drop
// Базовый алгоритм Drag’n’Drop выглядит так:

// При mousedown – готовим элемент к перемещению, если необходимо (например, создаём его копию).
// Затем при mousemove передвигаем элемент на новые координаты путём смены left/top и position:absolute.
// При mouseup – остановить перенос элемента и произвести все действия, связанные с окончанием Drag’n’Drop.

ball.onmousedown = function (e) {
  // подготовить к перемещению
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // в боди
  document.body.append(ball);
  // и устанавливаем мяч под курсор

  moveAt(e.pageX, e.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  // пермещение по экрану
  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function (e) {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};

// но чё-то работает говяно
// это из-за браузерного drag and drop, он кофликтует с моим
// так что его нужно отключать

ball.ondragstart = function () {
  return false;
};

// ещё важно что mousemove идёт на документе, а не на мяче

// мяч позиционируется так, что его центр оказывается под указателем мыши:
// хочелось бы чтобы позиционировался там, где взяли

// Обновим наш алгоритм:

// Когда человек нажимает на мячик (mousedown) – запомним расстояние от курсора до левого верхнего угла шара
// в переменных shiftX / shiftY.Далее будем удерживать это расстояние при перетаскивании.

ball.onmousedown = function (e) {
  // подготовить к перемещению
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // в боди
  document.body.append(ball);
  // и устанавливаем мяч под курсор
  const { left, top } = ball.getBoundingClientRect();
  const shiftY = e.clientY - top;
  const shiftX = e.clientX - left;

  function onMouseMove(e) {
    ball.style.left = e.pageX - shiftX + 'px';
    ball.style.top = e.pageY - shiftY + 'px';
  }

  // пермещение по экрану
  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function (e) {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};

// теперь если захватить за край, то мяч не будет прыгать

// цели переноса (droppable)

// в предыдущем примере мяч можно бросить куда угодно
// В реальности мы обычно берём один элемент и перетаскиваем в другой

// мы берём перетаскиваемый (draggable) элемент и помещаем его в другой элемент «цель переноса» (droppable).

// Нам нужно знать:

// куда пользователь положил элемент в конце переноса, чтобы обработать его окончание
// и, желательно, над какой потенциальной целью (элемент, куда можно положить, например, изображение папки)
// он находится в процессе переноса, чтобы подсветить её.

let currentDroppable;

ball.onmousedown = function (e) {
  // подготовить к перемещению
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // в боди
  document.body.append(ball);
  // и устанавливаем мяч под курсор
  const { left, top } = ball.getBoundingClientRect();
  const shiftY = e.clientY - top;
  const shiftX = e.clientX - left;

  function onMouseMove(e) {
    ball.style.left = e.pageX - shiftX + 'px';
    ball.style.top = e.pageY - shiftY + 'px';

    ball.hidden = true;
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    ball.hidden = false;

    // событие mousemove может произойти и за пределами окна
    if (!elemBelow) return;

    // что это цель переноса
    const droppableBelow = elemBelow.closest('.droppable');
    if (currentDroppable === droppableBelow) return;
    // мы либо залетаем на цель, либо улетаем из неё
    // внимание: оба значения могут быть null
    //   currentDroppable=null,
    //     если мы были не над droppable до этого события (например, над пустым пространством)
    //   droppableBelow=null,
    //     если мы не над droppable именно сейчас, во время этого события

    // вылет из droppable
    if (currentDroppable) leaveDroppable(currentDroppable);
    currentDroppable = droppableBelow;
    if (currentDroppable) enterDroppable(currentDroppable);
  }

  // пермещение по экрану
  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function (e) {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

  function enterDroppable(elem) {
    elem.style.background = 'pink';
  }

  function leaveDroppable(elem) {
    elem.style.background = '';
  }
};

// Теперь в течение всего процесса в переменной currentDroppable мы храним текущую потенциальную цель переноса,
// над которой мы сейчас, можем её подсветить или сделать что - то ещё.

// Существуют фреймворки, которые строят архитектуру поверх этого алгоритма, создавая такие классы, как DragZone, Droppable, Draggable
