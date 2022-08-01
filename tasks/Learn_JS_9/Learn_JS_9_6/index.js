// оператор instanceof позволяет проверить, к какому классу
// принадлежит объект, с учётом наследования

// obj instanceof Class

let Rabbit = class {};

let rabbit = new Rabbit();

// это экземпляр класса?
console.log(rabbit instanceof Rabbit); // true

// работает и с функциями-конструкторами
Rabbit = function Rabbit() {};

console.log(new Rabbit() instanceof Rabbit); // true

// и со встренными
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true

// Массив наследуется от объекта, поэтому true

// обычно оператор instanceof просматривает цепочку прототипов, но
// можно это изменить при помощи Symbol.hasInstance

// если есть такой метод, то вызывается он
// возвращает true или false и всё

let Animal = class {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
};

let obj = { canEat: true };
console.log(obj instanceof Animal); // true, хотя obj не экземпляр класса Animal

Animal = class {};
Rabbit = class extends Animal {};

rabbit = new Rabbit();

console.log(rabbit instanceof Animal); // true

console.log('////////');

// rabbit.__proto__ === Animal.prototype / false
// rabbit.__proto__.__proto__ === Animal.prototype / true

// есть метод obj2.isPrototypeOf(obj)
// тоже самое что obj instanceof obj2

console.log(Rabbit.prototype.isPrototypeOf(rabbit)); // true

// используется только цепочка прототипов Class.prototype
// вот что может быть

Rabbit = function Rabbit() {};

rabbit = new Rabbit();

Rabbit.prototype = {};

console.log(rabbit instanceof Rabbit); // false
console.log(Rabbit.prototype.isPrototypeOf(rabbit)); // false

// toString у объекта может быть использован как typeof

let toString = Object.prototype.toString;

console.log(toString.call([])); // [object Array]
console.log(toString.call(123)); // [object Number]
console.log(toString.call('')); // [object String]
console.log(toString.call(true)); // [object Boolean]

// поведение метода toString можно управлять

let user = {
  [Symbol.toStringTag]: 'User',
};

console.log(user.toString()); // [object User]

// такое свойство есть у большинства встроенных объектов

console.log(window[Symbol.toStringTag]); // Window
console.log(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

// получается typeof на стероидах
