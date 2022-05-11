// Функции это объекты

console.log(typeof function () {}); // хотя тут 'function'

function aboba() {
  console.log('aboba test');
}

console.log(aboba.name); // 'aboba'

// Без имени функции == ''
console.log(function () {}.name == ''); // ''

let saHi = () => 3;

console.log(saHi.name); // 'saHi' - умное нахождение имени

// Даже значение по умолчанию!
// Называется: контекстное имя: JS пытается определить имя из контекста
function f(sayHi = function () {}) {
  console.log(sayHi.name); // sayHi (работает!)
}

f();

// Имена имеют и методы объектов!

let user = {
  sayHi() {
    // ...
  },

  sayBye: function () {
    // ...
  },
};

console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}
function nothing(...more) {}

// Свойство length показывает количество параметров функций, кроме rest оператора
console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2
console.log(nothing.length); // 0

function test() {
  console.log('Функция была вызвана:', ++test.count, 'раза');
}

test.count = 0;

test();
test();
test();

// Можно использовать sayHi('Guest'), но если перменная sayHi изменится, то получится ошибка
let sayHi = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func('Guest'); // использует func, чтобы снова вызвать себя же
  }
};

sayHi(); // Hello, Guest

let sayHi2 = function sayHi2(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi2('Guest'); // ссылается на функцию!
  }
};

sayHi2(); // Hello, Guest

let welcome = sayHi2;
sayHi2 = null;

welcome();

// Описано что function declaration не может ссылаться на себя, но тут обратное
function func1(who) {
  if (who) {
    console.log(`Hello there, ${who}`);
  } else {
    func1('newName'); // использует func, чтобы снова вызвать себя же
  }
}

func1();

function makeCounter() {
  let count = 0;

  Counter.set = (n) => (count = n);
  Counter.decrease = () => count--;

  function Counter() {
    return count++;
  }

  return Counter;
}

let counter = makeCounter();

counter.set(10);

// Моё решение с подсказками от learnjs
function sum(n) {
  sum.sum === undefined ? (sum.sum = n) : (sum.sum += n);

  sum.toString = function () {
    let temp = sum.sum;
    sum.sum = 0;
    return temp;
  };

  return sum;
}

// Решение от learnjs

function sum2(a) {
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function () {
    return currentSum;
  };

  return f;
}

console.log(sum(1) + ''); // 1
console.log(sum(1)(2) + ''); // 3
console.log(sum(5)(-1)(2) + ''); // 6
console.log(sum(6)(-1)(-2)(-3) + ''); // 0
console.log(sum(0)(1)(2)(3)(4)(5) + ''); // 15
