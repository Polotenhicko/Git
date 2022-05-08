function makeCounter() {
  let count = 0;
  return function () {
    return count++; // есть доступ к внешней переменной "count"
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

function sayHiBye(firstName, lastName) {
  // функция-помощник, которую мы используем ниже
  function getFullName(firstName = '1', lastName = '2') {
    return firstName + ' ' + lastName;
  }

  console.log('Hello, ' + getFullName());
  console.log('Bye, ' + getFullName());
}

try {
  console.log(getFullName());
} catch (e) {
  console.error(e); // Не нашёл во внутреннем окружении и во внешнем окружении
}

let test = 'test';

if (true) {
  let test2 = 'test2';
  console.log(`${test2} ${test}`); // test2 test
}

try {
  console.log(`${test}`);
  console.log(`${test2}`); // is not defined
} catch (e) {
  console.error(e);
}

for (let i = 0; i < 10; i++) {
  // У каждой итерации цикла своё собственное лексическое окружение
  // {i: value}
}

try {
  console.log(i); // Ошибка, нет такой переменной
} catch (e) {
  console.error(e);
}

{
  // Создаётся собственное лексическое окружение
  let message = 'Hello';

  console.log(message); // Hello
}

try {
  console.log(message); // Ошибка: переменная message не определена
} catch (e) {
  console.error(e);
}

// IIFE

// function() { // <-- Error: Unexpected token (

//   let message = "Hello";

//   alert(message); // Hello

// }();

// Нельзя сразу вызывать
// function go() {

// }();

(function () {
  console.log('go');
})(); // 'go'

console.log(function () {
  console.log('go');
}); // ƒ () {
//   console.log('go');
// }

// Пути создания IIFE

// prettier не даёт возможность так сделать
// (function () {
//   console.log('Скобки вокруг всего');
// }());

// !function () {
//   console.log('Выражение начинается с логического оператора NOT');
// }();

// +function () {
//   console.log('Выражение начинается с унарного плюса');
// }();

function f() {
  let value = Math.random();

  return function () {
    alert(value);
  };
}

// три функции в массиве, каждая из них ссылается на лексическое окружение
// из соответствующего вызова f()
let arr = [f(), f(), f()];

// Нет ссылок на функции, а значит и лексическое окружение выше очищается
arr.splice(0, 3);

console.log(arr);

let value = 'value';

function f() {
  let value = 'ближайшее значение';

  function g() {
    debugger; // в консоли value = 'value'
  }

  return g;
}

let g = f();
g();
