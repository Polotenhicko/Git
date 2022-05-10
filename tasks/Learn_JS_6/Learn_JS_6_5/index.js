console.log(window == globalThis);

// globalThis - стандартизированное имя для глобального объекта
// window - для браузеров; global - для nodejs

var globalVar = 'globalVar';
let test = 'test';
const testC = 'test';

console.log(window.globalVar); // 'globalVar', лучше не использовать!
console.log(window.test); // undefined
console.log(window.testC); // undefined

window.globalObj = {
  name: 'Глобальный объект',
};

console.log(globalObj.name); // 'Глобальный объект'
console.log(window.globalObj.name); // 'Глобальный объект'

console.log(globalObj === window.globalObj); // true

// Можно использовать для проверки встроенных объектов

if (!window.Promise) {
  console.log('Ваш браузер очень старый!');
  window.Promise = 'Реализация промиса';
}
