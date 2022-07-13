let obj = {};

console.log(obj.__proto__ == Object.prototype); // true

// Цепочка не идёт выше
console.log(Object.prototype.__proto__); // null

let arr = [1, 2, 3];

// наследует ли от Array.prototype?
console.log(arr.__proto__ === Array.prototype); // true

// затем наследует ли от Object.prototype?
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// и null на вершине иерархии
console.log(arr.__proto__.__proto__.__proto__); // null

function f() {}

console.log(f.__proto__ == Function.prototype); // true
console.log(f.__proto__.__proto__ == Object.prototype); // true, наследует от Object

// Тоже самое с примитивами
console.log(''.__proto__ == String.prototype); // true

// null и undefined не имеют объектов-обёрток

try {
  console.log(null.__proto__);
} catch (e) {
  // нельзя прочитать свойства, тоже самое с undefined
  console.error(e);
}

// Можно изменять встроенные прототипы, но это плохая идея
String.prototype.show = function () {
  console.log(this);
};

'Show'.show();

// Можно заимствовать методы напрямую

obj = {
  0: 'Hello',
  1: 'world!',
  length: 2,
};

// При помощи call
console.log([].join.call(obj, '_'));

obj.join = Array.prototype.join;

console.log(obj.join('_'));

// Можно поставить в obj.__proto__ = Array.prototype
