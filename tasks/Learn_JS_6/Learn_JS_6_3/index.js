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
    // debugger; // в консоли value = 'value'
  }

  return g;
}

let g = f();
g();

function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter11 = makeCounter();
let counter22 = counter11;

console.log(counter11()); // 0
console.log(counter11()); // 1

console.log(counter22()); // 2
console.log(counter22()); // 3

function sum(a) {
  return function (b) {
    return a + b;
  };
}
console.log('////////');
console.log(sum(1)(2)); // 1+2 = 3
console.log(sum(3)(2)); // 3+2 = 5

function inBetween(a, b) {
  return function (item) {
    return item >= a && item <= b;
  };
}

function inArray(arr) {
  return function (item) {
    return arr.includes(item);
  };
}

console.log('////////');

arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
];

console.log('/////');

function byField(type) {
  return function (itemA, itemB) {
    return itemA[type] > itemB[type] ? 1 : -1;
  };
}

users.forEach((user) => console.log(user.name)); // John, Pete, Ann

console.log(users.sort(byField('name')));
users.forEach((user) => console.log(user.name)); // Ann, John, Pete
console.log(users.sort(byField('age')));

console.log('-------');

function byField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

console.log(users.sort(byField('name')));
users.forEach((user) => console.log(user.name)); // Ann, John, Pete

console.log(users.sort(byField('age')));

console.log('========');

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function () {
      // функция shooter
      console.log(j); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
// army[5]();
