let userName = new String('Nick');
console.log(userName); // Объект-обёртка string
console.log(String(userName)); // 'Nick'

let price = new Number('100 рублей');
console.log(price); // Объект-обёртка Number с NaN
console.log(+price); // NaN

price = new Number('10');
console.log(price); // Объект-обёртка Number
console.log(+price); // 100

let user = new String();
console.log(user); // Пустой Объект-обёртка

user.userName = userName; // Создали для объекта user свойство userName со значением userName
user.price = price; // Создали для объекта user свойство price со значением price
console.log(user.userName === userName); // true Объект-обёртка string
console.log(user.price === price); // true Объект-обёртка number

price.toBinary = function toBinary() {
  return this.toString(2);
};

console.log(user.price.toBinary()); // 1010

let bool = new Boolean(123);
console.log(!!bool); // true

bool = new Boolean(0);
console.log(!!bool); // true!!

price = new Number(0);
console.log(!!price); // true!!

try {
  null.test = 123;
  console.log(null.test);
} catch (er) {
  // ошибка, т.к. у null и у undefined нет методов
  console.error(er);
}

// Работа с примитивами

userName = 'Nick';
userName.test = 'тестовое свойство';
userName.toDo = function toDo() {
  return 'todo';
};
console.log(userName.test); // undefined, в строгом режиме будет ошибка
console.log(userName.toDo); // undefined, в строгом режиме будет ошибка

try {
  console.log(userName.toDo());
} catch (error) {
  // Ошибка, так как данного метода нет
  console.error(error);
}
