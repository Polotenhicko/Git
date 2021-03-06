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

window.Test = function Test() {
  console.log('от глобального');
};

Test(); // 'от глобального'

function Test() {
  console.log('не глобальный');
}

Test(); // 'от глобального'

function Test2() {
  console.log(123);
}

window.Test2(); // Инициализация функции записывается в глобальный объект: 123

Test = function Test() {
  console.log('TEST');
};

Test(); // 'TEST'

if (false) {
  window.test_test = 'test test';
}

try {
  console.log(test_test); // ошибка
} catch (e) {
  console.error(e);
}

// С use strict не работает
function aa() {
  a = 20;
}

aa();

console.log(a);

var double = 22;

function double(num) {
  return num * 2;
}

console.log(typeof double);

try {
  var Frodo = new Hobbit();
  Frodo.height = 100;
  Frodo.weight = 300;
  console.log(Frodo);

  class Hobbit {
    constructor(height, weight) {
      this.height = height;
      this.weight = weight;
    }
  }
} catch (e) {
  // Нельзя получить доступ к классу до инициализации
  console.error(e);
}
