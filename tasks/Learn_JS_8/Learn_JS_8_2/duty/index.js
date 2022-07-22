// undefined === Object.prototype
console.log({}.prototype === {}.__proto__); // false сравнивается undefined с прототипом объекта, т.е. Object.prototype

function itKamasutra() {}
// {constructor: f()} === Function.prototype
console.log(itKamasutra.prototype === itKamasutra.__proto__); // false, сравнение прототипа моей функции с Function.prototype

function itIncubator() {}
console.log(itIncubator.__proto__ === itKamasutra.__proto__); // true, оба равны Function.prototype

// {constructor: itIncubator} === {constructor: itKamasutra}
console.log(itIncubator.prototype === itKamasutra.prototype); // false, т.к. это объекты, по умолчанию со свойством constructor

let Component = (props) => {
  return `<div>I don't know Prorotype</div>`;
};
// undefined === Object.prototype
console.log(Component.prototype === Object.prototype); // false

let age = 18;
console.log(age.prototype === Number.prototype); // false, т.к. не найдёт у объекта-обёртки свойства prototype
console.log(age.__proto__ === Number.prototype); // true, найдёт сеттер __proto__ у Object.prototype и выдаст Number.prototype

class Hacker {}
console.log(Hacker.__proto__ === Function.prototype); // true, class - функция

// console.log(itIncubator.__proto__ === ????);

let count = 12;
// console.log(count.__proto__ === ???);
