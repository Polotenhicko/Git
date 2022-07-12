const animal = {
  eats: true,
};

const rabbit = {
  jumps: true,
};

// animal является прототипом rabbit
rabbit.__proto__ = animal;

// мы вызываем свойство, которого нет у rabbit, и код ищет его в прототипе
console.log(rabbit.eats);

animal.walk = function () {
  console.log('Animal walk!');
};

// можно и функции
rabbit.walk(); // 'Animal walk!'

// можно сделать цепочку длиннее
const longEar = {
  __proto__: rabbit,
  length: 10,
};

longEar.walk(); // 'Animal walk!'

// Нельзя делать круг цепочек
try {
  animal.__proto__ = longEar;
} catch (e) {
  // TypeError: Cyclic __proto__ value
  console.error(e);
}

// __proto__ может быть объектом или null, остальное игнорируется
animal.__proto__ = 3;

// тут явно не 3
console.log(animal.__proto__);

rabbit.__proto__ = null;

console.log(rabbit.__proto__); // undefined
