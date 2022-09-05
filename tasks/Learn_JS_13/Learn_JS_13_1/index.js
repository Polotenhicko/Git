// модуль - это просто файл
// 1 скрипт - 1 модуль

// export - отмечает переменные и функции, которые будут доступны вне скрипта
// import - позволяет импортировать функциональность из других модулей

import { sayHi } from './sayHi.js';

console.log(sayHi); // ƒ sayHi(user) {
sayHi('John'); // Hello John

// import записывает экспортированную функцию в соотв переменную

// различия от обычных скриптов

// внутри type = "module" всегда строгий режим
try {
  e = 5;
} catch (e) {
  console.error(e);
}

// 2 не соединённых type="module" не связаны (да ладно)

// код в модуле выполняется только 1 раз при импорте

import './one.js'; // 'ONE!!!'
import './one.js'; // ничего не покажет

import './1.js';
import './2.js'; // 1.js

// моудль выполняется только 1 раз!!!

import { admin } from './kaka.js';
admin.name = 'Pete';

import { sayHi2 } from './kaka.js';

sayHi2(); // 'Pete'

// import.meta содержит информацию о текущем модуле

console.log(import.meta.url); // http://127.0.0.1:5500/tasks/Learn_JS_13/Learn_JS_13_1/index.js

// в модуле this = undefined, хоть и в глобальном контексте
console.log(this); // undefined

// модули всегда в режиме defer, как встроенные, так и внешние
// т.е. загрузка defer не блокирует обработку html
// модули если загрузятся первыми, всё равно ожидают загрузки html
// сохраняется порядок скриптов, скрипты, которые идут раньше, выполняются раньше