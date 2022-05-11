console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

// инициализация переменной через var поднимает её вверх

console.log(variable); // undefined

var variable;

// Неинициализированные переменные сохраняются в глобальный объект
// и имеют тип undefined и равны 'undefined'

console.log(typeof undef); // undefined
console.log(typeof asdasdasdas); // undefined

// let и const тоже поднимаются вверх, но создаётся мёртвая зона
// которая выдаёт ошибку при попытки обращения к переменной до её инициализации

try {
  console.log(typeof aboba);
} catch (e) {
  // Reference error: Cannot access 'aboba' before initialization
  console.error(e);
}

let aboba;

console.log(aboba); // undefined
console.log(typeof aboba); // undefined

try {
  console.log(typeof abobaNew);
} catch (e) {
  // Reference error: Cannot access 'abobaNew' before initialization
  console.error(e);
}

const abobaNew = 'abob';
