function User(name) {
  this.name = name;
}

let guest = {
  isAuth: false,
};

// Если для функции-конструктора указать свойство prototype,
// то экземпляры этой функции будут иметь __proto__ на этот объект

User.prototype = guest;

const kolya = new User('Kolya');

console.log(kolya.isAuth); // false

console.log(kolya.__proto__ == guest); // true

User.prototype = {
  test: 123,
};

// Если поменять свойство prototype,то уже созданные объекты не поменяются
console.log(kolya.__proto__ == guest); // true

guest = null;

// ссылка на объект всё ещё осталась
console.log(kolya.__proto__ == guest); // false
console.log(kolya.__proto__); // {isAuth: false}

function Test(test) {
  this.test = test;
}

// По умолчанию у функции-конструктора свойство prototype это объект со свойством constructor,
// который ссылается на функцию-конструктор
console.log(Test.prototype); // {constructor: Test()}

const test = new Test('test');

console.log(test.constructor == Test); // true

// можно создавать экземпляры через экземпляр
const test2 = new test.constructor('test');

console.log(test2);
