// Существует множество JavaScript-свойств, которые позволяют считывать информацию об элементе:
// ширину, высоту и другие геометрические характеристики.В этой главе мы будем называть их «метрики».

// В качестве простого примера демонстрации свойств мы будем использовать следующий элемент:

// <div id="example">
//   ...Текст...
// </div>
// <style>
//   #example {
//     width: 300px;
//     height: 200px;
//     border: 25px solid #E8C48F;
//     padding: 20px;
//     overflow: auto;
//   }
// </style>

// У элемента есть рамка (border), внутренний отступ (padding) и прокрутка
// тут нет внешних отступов (margin), потому что они не являются частью элемента, для них нет особых JavaScript-свойств.

// Некоторые браузеры (не все) отбирают место для полосы прокрутки, забирая его у области,
// отведённой для содержимого(помечена как «content width» выше).

// Таким образом, без учёта полосы прокрутки ширина области содержимого (content width) будет 300px,
// но если предположить, что ширина полосы прокрутки равна 16px(её точное значение зависит от устройства и браузера),
// тогда остаётся только 300 - 16 = 284px

// если элемент содержит много текста, то он будет перекрывать padding-bottom, это нормально.

// offsetParent, offsetLeft/Top

// Эти свойства редко используются, но так как они являются «самыми внешними» метриками, мы начнём с них.

// В свойстве offsetParent находится предок элемента, который используется внутри браузера для вычисления координат при рендеринге.

// Является CSS-позиционированным (CSS-свойство position равно absolute, relative, fixed или sticky),
// или <td>, <th>, <table>,
// или <body>.

// Свойства offsetLeft/offsetTop содержат координаты x/y относительно верхнего левого угла offsetParent.

const example2 = document.getElementById('example2');
console.log(example2.offsetParent); // main
console.log(example2.offsetLeft); // 180
const example3 = document.getElementById('example3');
console.log(example3.offsetParent); // снова main
console.log(example3.offsetLeft); // 40, т.к. у article margin-left 40px

// Существует несколько ситуаций, когда offsetParent равно null:
// Для скрытых элементов (с CSS-свойством display:none или когда его нет в документе).
// Для элементов <body> и <html>.
// Для элементов с position:fixed.

console.log(document.body.offsetParent, document.documentElement.offsetParent); // null, null
// элемент с position: fixed
console.log(document.getElementById('example4').offsetParent); // null
// элемент с display: none
console.log(document.getElementById('example5').offsetParent); // null

// Теперь сам элемент
// offsetWidth/Height

// Они содержат «внешнюю» ширину/высоту элемента, то есть его полный размер, включая рамки.
const example = document.getElementById('example');
example.style.margin = '40px';
// offsetWidth = 390 – внешняя ширина блока, её можно получить сложением CSS-ширины
// (300px), внутренних отступов(2 * 20px) и рамок(2 * 25px).
console.log(example.offsetWidth); // 390
console.log(example.offsetHeight); // 290

console.log(document.body.offsetHeight); // 348

document.getElementById('example4').style.height = '20px';
console.log(document.getElementById('example4').offsetHeight); // 20
// Элемент с display: none
document.getElementById('example5').style.height = '30px';
console.log(document.getElementById('example5').offsetHeight); // 0, потому что он display none

// Если элемент (или любой его родитель) имеет display:none или отсутствует в документе,
// то все его метрики равны нулю(или null, если это offsetParent).

const emptyDiv = document.createElement('div');
console.log(emptyDiv.offsetHeight); // 0
console.log(emptyDiv.offsetLeft); // 0
console.log(emptyDiv.offsetParent); // null

// visibility: hidden И opacity: 0 не решают
console.log(document.getElementById('example6').offsetHeight); // 30
console.log(document.getElementById('example7').offsetWidth); // 20

// Мы можем использовать это, чтобы делать проверку на видимость:

function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
// функция isHidden также вернёт true для элементов, которые в принципе показываются, но их размеры равны нулю (например, пустые <div>).

console.log(isHidden(emptyDiv)); // true

// clientTop/Left

// Пойдём дальше. Внутри элемента у нас рамки (border).
// Для них есть свойства-метрики clientTop и clientLeft.

// В примере:

// clientLeft = 25 – ширина левой рамки
// clientTop = 25 – ширина верхней рамки

// Но на самом деле эти свойства – отступы внутренней части элемента от внешней.

// Она возникает, когда документ располагается справа налево (операционная система на арабском языке или иврите).
// Полоса прокрутки в этом случае находится слева, и тогда свойство clientLeft включает в себя ещё и ширину полосы прокрутки.
// В этом случае clientLeft будет равно 25, но с прокруткой – 25 + 16 = 41.

console.log(example.clientLeft); // 25
console.log(example.clientTop); // 25

// clientWidth/Height
// Эти свойства – размер области внутри рамок элемента.

// Они включают в себя ширину области содержимого вместе с внутренними отступами padding, но без прокрутки:

console.log(example.clientWidth); // 323

// Если нет внутренних отступов padding, то clientWidth/Height в точности равны размеру области содержимого внутри рамок
//  за вычетом полосы прокрутки(если она есть).

// Поэтому в тех случаях, когда мы точно знаем, что отступов нет,
// можно использовать clientWidth / clientHeight для получения размеров внутренней области содержимого.

// scrollWidth/Height

// Эти свойства – как clientWidth/clientHeight, но также включают в себя прокрученную (которую не видно) часть элемента.

console.log(example.scrollWidth); // 323 прокрутки нет
console.log(example.scrollHeight); // 256
console.log(example.clientHeight); // 240

// можно использовать чтобы распахнуть элемент на всю высоту (не считая box-sizing)

// example.style.height = `${example.scrollHeight}px`;

// scrollLeft/scrollTop

// Свойства scrollLeft/scrollTop – ширина/высота невидимой, прокрученной в данный момент, части элемента слева и сверху.

// свойство scrollTop – это «сколько уже прокручено вверх».

console.log(example.scrollTop); // 0

// Свойства scrollLeft/scrollTop можно изменять
// Установка значения scrollTop на 0 или Infinity прокрутит элемент в самый верх/низ соответственно.

example.scrollTop = 30;

// CSS-высоту и ширину можно извлечь, используя getComputedStyle.
// Так почему бы не получать, к примеру, ширину элемента при помощи getComputedStyle, вот так?

console.log(example.clientWidth); // 323, content(283) + padding(20*2) = 323
console.log(getComputedStyle(example).width); // '283px

// Почему мы должны использовать свойства-метрики вместо этого? На то есть две причины:

// Во-первых, CSS-свойства width/height зависят от другого свойства – box-sizing
// Во-вторых, CSS свойства width/height могут быть равны auto, например, для инлайнового элемента:

const span = document.createElement('span');
console.log(getComputedStyle(span).width); // ''
console.log(getComputedStyle(document.getElementById('span')).width); // 'auto'

// Есть и ещё одна причина: полоса прокрутки. Бывает, без полосы прокрутки код работает прекрасно, но стоит ей появиться,
//  как начинают проявляться баги.Так происходит потому, что полоса прокрутки «отъедает» место от области внутреннего
//  содержимого в некоторых браузерах.Таким образом, реальная ширина содержимого меньше CSS - ширины.
//  Как раз это и учитывают свойства clientWidth / clientHeight.

// Но с getComputedStyle(elem).width ситуация иная.
// Некоторые браузеры(например, Chrome) возвращают реальную внутреннюю ширину с вычетом ширины полосы прокрутки,
// а некоторые(например, Firefox) – именно CSS - свойство(игнорируя полосу прокрутки).
// Эти кроссбраузерные отличия – ещё один повод не использовать getComputedStyle, а использовать свойства - метрики.

// Обратите внимание: описанные различия касаются только чтения свойства getComputedStyle(...).width из JavaScript,
// визуальное отображение корректно в обоих случаях.
