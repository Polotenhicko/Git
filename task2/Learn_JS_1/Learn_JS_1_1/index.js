// в текущей среде браузера доступно множество объектов и функций
// которые дают средства для управления веб-страницами

// это объект window
console.log(window);

console.log(window.innerHeight); // 332 и т.п.
// и т.д.

// DOM Documental Object Model
// объективная модель документа, предоставляющая все содержимое страницы в виде объектов
// объект document - входная точка

document.body.style.background = 'green';
setTimeout(() => (document.body.style.background = ''), 1e3);

// BOM Browser Object Model - доп объект предоставляемый браузером
// для работы со всем, кроме документа

// пример navigator даёт информацию о самом браузере
console.log(navigator.userAgent); // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36

// location
console.log(location.href); // текущий URL

// alert/confirm/prompt являются частью BOM
// BOM также являются частью спецификации HTML
