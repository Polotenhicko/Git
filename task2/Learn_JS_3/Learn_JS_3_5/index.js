// события указателя
// это современный способ обработки ввода с помощью различных указывающих устройств, таких как мышь, перо/стилус,
// сенсорный экран и так далее.

// Давным-давно, в прошлом, существовали только события мыши
// Затем получили широкое распространение сенсорные устройства, в частности телефоны и планшеты.
// Чтобы скрипты корректно работали, они генерировали(и до сих пор генерируют) события мыши.
// Например, касание сенсорного экрана генерирует событие mousedown

// Но сенсорные устройства во многих аспектах мощнее, чем мышь.
// Например, они позволяют касаться экрана сразу в нескольких местах(«мульти - тач»).
// Однако, события мыши не имеют необходимых свойств для обработки таких прикосновений.

// Поэтому появились события касания (Touch events), такие как touchstart, touchend, touchmove,
// которые имеют специфичные для касаний свойства

// Но и этих событий оказалось недостаточно, так как существует много других устройств,
// таких как перо, у которых есть свои особенности.Кроме того, универсальный код,
// который отслеживал бы и события касаний и события мыши, неудобно писать.

// Для решения этих задач был внедрён стандарт Pointer Events («События Указателя»).
// Он предоставляет единый набор событий для всех типов указывающих устройств.

// Если вы не разрабатываете под старые браузеры, такие как Internet Explorer 10, Safari 12, или более ранние версии,
//  больше нет необходимости использовать события мыши или касаний – можно переходить сразу на события указателя.

// Событие указателя	  Аналогичное событие мыши
// pointerdown	        mousedown
// pointerup	          mouseup
// pointermove	        mousemove
// pointerover	        mouseover
// pointerout	          mouseout
// pointerenter	        mouseenter
// pointerleave	        mouseleave
// pointercancel        -
// gotpointercapture    -
// lostpointercapture   -

// для каждого mouse<события> есть соответствующее pointer<событие>, которое играет аналогичную роль
// Также есть 3 дополнительных события указателя, у которых нет соответствующего аналога mouse...

// Мы можем заменить события mouse... на аналогичные pointer... в коде и быть уверенными,
//  что с мышью по - прежнему всё будет работать нормально.

// При этом поддержка сенсорных устройств «волшебным» образом улучшится.
// Хотя, возможно, кое - где понадобится добавить touch - action: none в CSS

// События указателя содержат те же свойства, что и события мыши, например clientX/Y, target и т.п., и несколько дополнительных:

// pointerId – уникальный идентификатор указателя, вызвавшего событие.
// Идентификатор генерируется браузером. Это свойство позволяет обрабатывать несколько указателей,
//  например сенсорный экран со стилусом и мульти - тач

// pointerType – тип указывающего устройства. Должен быть строкой с одним из значений: «mouse», «pen» или «touch».
// Можно это использовать чтобы сделать разное поведение для разных типов указателя

// isPrimary - true для основного указателя (первый палец в мульти-тач)

// Некоторые устройства измеряют область контакта и степень надавливания, например пальца на сенсоре
// Для этого есть дополниельные свойства:

// width - ширина области соприкосновения указателя с устройством. Если не поддерживается, к примеру у мыши, то равно 1
// height - тоже самое, но высота
// pressure - степень давления указателя в диапазоне от 0 до 1. Если не поддерживается, то 0.5(нажато), либо 0
// tangentialPressure - нормалезированное тангенциальное давление. чзх?
// tiltX, tiltY, twist - специфичное для пера свойства, описывающие положение пера относительно сенсора.

// Эти свойства большинство устройств не поддерживается, поэтому редко используется

// Мульти-тач
// Есть функция, которую абсолютно не поддерживают мыши, это мульти-тач
// с ним можно касаться сразу нескольких мест на телефоне или планшете и выполнять спец жесты

// События указателя позволяют обрабатывать мульти-тач с помощью свойств pointerId и isPrimary

// Вот что происходит, когда пользователь касается сенсорного экрана в одном месте, а затем в другом:

// При касании первым пальцем:
// происходит событие pointerdown со свойством isPrimary=true и некоторым pointerId.

// При касании вторым и последующими пальцами (при остающемся первом):
// происходит событие pointerdown со свойством isPrimary=false и уникальным pointerId для каждого касания.

// Обратите внимание: pointerId присваивается не на всё устройство, а для каждого касающегося пальца.
// Если коснуться экрана 5 пальцами одновременно, получим 5 событий pointerdown,
// каждое со своими координатами и индивидуальным pointerId.

// События, связанные с первым пальцем, всегда содержат свойство isPrimary=true.

// Мы можем отслеживать несколько касающихся экрана пальцев, используя их pointerId.
// Когда пользователь перемещает, а затем убирает палец, получаем события pointermove и pointerup с тем же pointerId,
// что и при событии pointerdown.

// Теперь про событие pointercancel, на который нет аналога с mouse

// Событие pointercancel происходит, когда текущее действие с указателем по какой-то причине прерывается,
//  и события указателя больше не генерируются.

// К таким причинам можно отнести:
// Указывающее устройство было физически выключено.
// Изменилась ориентация устройства (перевернули планшет).
// Браузер решил сам обработать действие, считая его жестом мыши, масштабированием и т.п.

// продемонстрируем pointercancel на практическом примере
// Допустим, мы реализуем перетаскивание («drag-and-drop») для нашего мяча

// Вот последовательность действий пользователя и соответствующие события:

// Пользователь нажимает на изображении, чтобы начать перетаскивание
//    происходит событие pointerdown
// Затем он перемещает указатель, двигая изображение
//    происходит событие pointermove (возможно, несколько раз)
// И тут происходит сюрприз! Браузер имеет встроенную поддержку «Drag’n’Drop» для изображений,
// которая запускает и перехватывает процесс перетаскивания, генерируя при этом событие pointercancel.
//    Теперь браузер сам обрабатывает перетаскивание изображения. У пользователя есть возможность перетащить изображение мяча
//    даже за пределы браузера, в свою почтовую программу или файловый менеджер.
//    Событий pointermove для нас больше не генерируется.

// Мы бы хотели реализовать перетаскивание самостоятельно, поэтому давайте скажем браузеру не перехватывать его.
// Предотвращайте действие браузера по умолчанию, чтобы избежать pointercancel!!!

// Нужно сделать две вещи:

// Предотвратить запуск встроенного drag’n’drop
//    Мы можем сделать это, задав ball.ondragstart = () => false
//    Это работает для событий мыши.
// Для устройств с сенсорным экраном существуют другие действия браузера, связанные с касаниями, кроме drag’n’drop.
// Чтобы с ними не возникало проблем:
//    Мы можем предотвратить их, добавив в CSS свойство #ball { touch-action: none }.
//    Затем наш код начнёт корректно работать на устройствах с сенсорным экраном

// После того, как мы это сделаем, события будут работать как и ожидается,
// браузер не будет перехватывать процесс и не будет вызывать событие pointercancel.

// Захват указателя – особая возможность событий указателя.

// elem.setPointerCapture(pointerId)
// - привязывает события с данным pointerId к elem
// После такого вызова все события указателя с таким pointerId будут иметь elem в качестве целевого элемента
// (как будто произошли над elem), вне зависимости от того, где в документе они произошли.

// Другими словами, elem.setPointerCapture(pointerId) меняет target всех дальнейших событий с данным pointerId на elem.

// Эта привязка отменяется:
// автоматически, при возникновении события pointerup или pointercancel,
// автоматически, если elem удаляется из документа,
// при вызове elem.releasePointerCapture(pointerId).

// Захват указателя используется для упрощения операций с переносом (drag’n’drop) элементов.

// Мы делаем элемент для слайдера – полоску с «ползунком» (thumb) внутри

// Затем он работает так:

// Пользователь сначала нажимает на ползунок thumb – срабатывает pointerdown.
// Затем двигает его указателем – срабатывает pointermove, и наш код перемещает элемент thumb.
//    …Причём, по мере движения, указатель может покидать ползунок – перемещаться выше или ниже.
//    При этом ползунок должен передвигаться строго по горизонтали, на одной линии с указателем.

// В решении, основанном на событиях мыши, для отслеживания всех движений указателя, включая те, которые происходят выше/ниже элемента
// thumb, мы должны были назначить обработчик события mousemove на весь документ document.

// Однако это не самое правильное решение.
// Одна из проблем – это то, что движения указателя по документу могут вызвать сторонние эффекты,
//  заставить работать другие обработчики(например, mouseover), не имеющие отношения к слайдеру.

// Именно здесь вступает в игру setPointerCapture:
// Мы можем вызывать thumb.setPointerCapture(event.pointerId) в обработчике pointerdown,
// Тогда дальнейшие события указателя до pointerup/cancel будут привязаны к thumb.
// Затем, когда произойдёт pointerup (передвижение завершено), привязка будет автоматически удалена,
// нам об этом не нужно беспокоиться.

// Так что, даже если пользователь будет двигать указателем по всему документу, обработчики событий будут вызваны на thumb.
// Причём все свойства объекта события, такие как clientX / clientY, будут корректны – захват указателя влияет только
// на target / currentTarget.

thumb.onpointerdown = function (e) {
  // все события указателя до pointerup идут на thumb
  thumb.setPointerCapture(e.pointerId);
  // начать отслеживать пермещение указателя
  thumb.onpointermove = function (e) {
    // перемещение слайдера: отслеживание thumb, т.к все события указателя перенацелены на него
    // поэтому не document.onpointermove
    const newLeft = e.clientX - slider.getBoundingClientRect().left;
    thumb.style.left = newLeft + 'px';
  };
  // если сработало событие pointerup, завершить отслеживание перемещения указателя
  thumb.onpointerup = function (e) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // можно обработать конец перемещения
  };
};
// примечание: нет необходимости вызывать thumb.releasePointerCapture,
// это происходит автоматически при pointerup

// тест с документом
// итог: с mouse и pointer идёт перенаправление, то есть e.target = thumb, а currentTarget всегда равен this
// document.addEventListener('mousemove', function (e) {
//   console.log('mousemove', e.pointerId, e.target);
// });
document.addEventListener('pointermove', function (e) {
  console.log('pointermove', e.pointerId, e.target);
});

// Таким образом, мы имеем два бонуса:
// Код становится чище, поскольку нам больше не нужно добавлять/удалять обработчики для всего документа.
// Удаление привязки происходит автоматически.

// Если в документе есть какие-то другие обработчики pointermove, то они не будут нечаянно вызваны,
// пока пользователь находится в процессе перетаскивания слайдера.
// Хотя они вызываются, но идёт перенаправление

// Существует два связанных с захватом события:
// gotpointercapture срабатывает, когда элемент использует setPointerCapture для включения захвата.

// lostpointercapture срабатывает при освобождении от захвата:
// явно с помощью releasePointerCapture или автоматически, когда происходит событие pointerup / pointercancel.