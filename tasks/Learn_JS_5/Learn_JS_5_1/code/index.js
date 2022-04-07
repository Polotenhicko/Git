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
