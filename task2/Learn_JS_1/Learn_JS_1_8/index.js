// Как правило, существует два способа задания стилей для элемента:

// Создать класс в CSS и использовать его: <div class="...">
// Писать стили непосредственно в атрибуте style: <div style="...">.

// JavaScript может менять и классы, и свойство style.

// Классы – всегда предпочтительный вариант по сравнению со style.
// Мы должны манипулировать свойством style только в том случае, если классы «не могут справиться».

// Например, использование style является приемлемым,
// если мы вычисляем координаты элемента динамически и хотим установить их из JavaScript:

// Когда-то давно в JavaScript существовало ограничение: зарезервированное слово типа "class" не могло быть свойством объекта.
// Это ограничение сейчас отсутствует, но в то время было невозможно иметь свойство elem.class.

// Поэтому для классов было введено схожее свойство "className": elem.className соответствует атрибуту "class".

console.log(document.body.className); // "bodyClass btn"

// если мы присваиваем что-то elem.className, то это заменяет всю строку с классами

// часто мы хотим добавить/удалить один класс.
// Для этого есть другое свойство: elem.classList.

// elem.classList – это специальный объект с методами для добавления/удаления одного класса.

document.body.classList.add('article');
console.log(document.body.className); // "bodyClass btn article"

// Так что мы можем работать как со строкой полного класса, используя className, так и с отдельными классами, используя classList

// Методы classList:

// elem.classList.add/remove("class") – добавить/удалить класс.
// elem.classList.toggle("class") – добавить класс, если его нет, иначе удалить.
// elem.classList.contains("class") – проверка наличия класса, возвращает true/false.

// Кроме того, classList является перебираемым, поэтому можно перечислить все классы при помощи for..of:

for (const classItem of document.body.classList) {
  console.log(classItem); // bodyClass, btn, article
}

// Свойство elem.style – это объект, который соответствует тому, что написано в атрибуте "style".
// Установка стиля elem.style.width="100px" работает так же, как наличие в атрибуте style строки width:100px.

// Для свойства из нескольких слов используется camelCase:
// background-color  => elem.style.backgroundColor
// z-index           => elem.style.zIndex
// border-left-width => elem.style.borderLeftWidth

document.body.style.backgroundColor = 'green';

// Стили с браузерным префиксом, например,
// -moz - border - radius, -webkit - border - radius преобразуются по тому же принципу: дефис означает заглавную букву.
document.body.style.MozBorderRadius = '5px';

// Иногда нам нужно добавить свойство стиля, а потом, позже, убрать его.

// Например, чтобы скрыть элемент, мы можем задать elem.style.display = "none".
// Затем мы можем удалить свойство style.display, чтобы вернуться к первоначальному состоянию.
// Вместо delete elem.style.display мы должны присвоить ему пустую строку: elem.style.display = "".

document.body.style.display = 'none'; // скрыть
setTimeout(() => (document.body.style.display = ''), 1000); // возврат к нормальному состоянию
// Если мы установим в style.display пустую строку, то браузер применит CSS-классы и встроенные стили,
//  как если бы такого свойства style.display вообще не было.

// Обычно мы используем style.* для присвоения индивидуальных свойств стиля
// Нельзя установить список стилей как, например, div.style="color: red; width: 100px", потому что div.style – это объект, и он доступен только для чтения.

// Для задания нескольких стилей в одной строке используется специальное свойство style.cssText:

document.body.style.cssText = `color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;
console.log(document.body.style);
// Это свойство редко используется, потому что такое присваивание удаляет все существующие стили
// То же самое можно сделать установкой атрибута: div.setAttribute('style', 'color: red...').

// Не забудьте добавить к значениям единицы измерения.

// Например, мы должны устанавливать 10px, а не просто 10 в свойство elem.style.top. Иначе это не сработает:

document.body.style.margin = 20;
console.log(document.body.style.margin); // ''

// Итак, изменить стиль очень просто. Но как его прочитать?
// Например, мы хотим знать размер, отступы, цвет элемента. Как это сделать?

// Свойство style оперирует только значением атрибута "style", без учёта CSS-каскада.
// Поэтому, используя elem.style, мы не можем прочитать ничего, что приходит из классов CSS.

console.log(document.body.style.borderRadius); // пустая строка

// но я хочу получить это
// Для этого есть метод: getComputedStyle.

// getComputedStyle(element, [pseudo])
// element- Элемент, значения для которого нужно получить
// pseudo - Указывается, если нужен стиль псевдоэлемента, например ::before.
// Пустая строка или отсутствие аргумента означают сам элемент.

// Результат вызова – объект со стилями, похожий на elem.style, но с учётом всех CSS-классов.

const div = document.querySelector('div.btn');
const computedStyle = getComputedStyle(div);

console.log(computedStyle.borderRadius); // 5px
console.log(computedStyle.borderBottomLeftRadius); // 5px
console.log(computedStyle.padding); // 3px

// Есть две концепции в CSS:

// Вычисленное (computed) значение – это то, которое получено после применения всех CSS-правил и CSS-наследования.
// Например, height: 1em или font - size: 125 %.

// Окончательное (resolved) значение – непосредственно применяемое к элементу.
// Значения 1em или 125 % являются относительными.Браузер берёт вычисленное значение и делает все единицы измерения
// фиксированными и абсолютными, например, height: 20px или font - size: 16px.
// Для геометрических свойств разрешённые значения могут иметь плавающую точку, например, width: 50.5px.

// Давным-давно getComputedStyle был создан для получения вычисленных значений,
// но оказалось, что окончательные значения гораздо удобнее, и стандарт изменился.

// Так что, в настоящее время getComputedStyle фактически возвращает окончательное значение свойства,
// для геометрии оно обычно в пикселях.

// getComputedStyle требует полное свойство!
// Для правильного получения значения нужно указать точное свойство. Например: paddingLeft, marginTop, borderTopWidth
// При обращении к сокращённому: padding, margin, border – правильный результат не гарантируется.
