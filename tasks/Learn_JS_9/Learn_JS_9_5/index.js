// можно наследоваться от встроенных классов

let PowerArray = class extends Array {
  isEmpty() {
    return this.length === 0;
  }
};

let arr = new PowerArray(1, 2, 3, 4, 5);
console.log(arr.isEmpty()); // false

console.log(arr.filter((item) => item > 10).isEmpty()); // true

// интересный момент, методы map, filter и др. возвращают класс через конструктор

console.log(arr.filter((item) => item > 3)); // PowerArray
console.log(arr.filter((item) => item > 3).constructor === PowerArray); // true

delete PowerArray.prototype.constructor;

console.log(PowerArray.prototype.constructor === PowerArray); // false

// вызывает конструктор родителя
arr = new PowerArray(1, 2);
console.log(arr.filter((item) => item > 3).constructor === PowerArray); // false
console.log(arr.filter((item) => item > 3).constructor === Array); // true

// можно настроить это поведение при помощи Symbol.species
// это статический геттер

PowerArray = class extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // встроенные методы будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }
};

arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filterArr = arr.filter((item) => item > 10);

try {
  // нет такой функции
  filterArr.isEmpty();
} catch (e) {
  console.error(e);
}

console.log(filterArr.constructor === Array); // true

// встроенные классы дополняют друг друга, но сами классы не наследуют статические методы

console.log(Date.prototype.__proto__ === Object.prototype); // true
console.log(Date.__proto__ === Object); // false
