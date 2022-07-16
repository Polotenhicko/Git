// __proto__ является устаревшим и по стандарту должно поддерживаться только браузерами

// современные способы:

let animal = {
  eats: true,
};

let rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit)); // {eats: true} - animal

Object.setPrototypeOf(rabbit, Object.prototype);

console.log(Object.getPrototypeOf(rabbit) == Object.prototype); // true

rabbit = Object.create(animal, {
  jumps: {
    value: true,
  },
});

console.log(rabbit.jumps); // true
console.log(rabbit.eats); // true

console.log('----------');

let test = Object.create(rabbit, {
  __proto__: {
    value: animal,
  },
});

console.log(test.jumps); // true
console.log(Object.getPrototypeOf(test) == rabbit); // true, хотя при создании указал __proto__

console.log('////////');

// мошный код для копирования объекта с дескрипторами

let clone = Object.create(Object.getPrototypeOf(animal), Object.getOwnPropertyDescriptors(animal));

console.log(clone == animal); // false

// Если у прототипа есть сеттер или геттер, то свойство не будет создано
// с __proto__ тоже самое

Object.defineProperties(animal, {
  test1: {
    get() {
      console.log('getter');
    },
  },
  test2: {
    set(value) {
      console.log('setter');
    },
  },
  test3: {
    get() {
      console.log('getter & setter');
    },
    set(value) {
      console.log('getter & setter');
    },
  },
});

const testObj = Object.create(animal);

testObj.test1; // 'getter'
testObj.test1 = 'g';
console.log(testObj.test1); // 'getter', undefined

console.log('==========');

testObj.test2; // empty
testObj.test2 = 'g'; // 'setter'
console.log(testObj.test2); // 'setter', undefined

console.log('==========');

testObj.test3; // 'getter & setter'
testObj.test3 = 'g'; // 'getter & setter'
console.log(testObj.test3); // 'getter & setter', undefined

// сам же __proto__ говно, это свойство у Object.prototype и лишь способ задания [[Prototype]]

animal = {
  __proto__: null,
  eats: true,
};

rabbit = Object.create(animal);

rabbit.__proto__ = {
  eats: false,
};

// __proto__ теперь просто как свойство, без возможности get/set Prototype
console.log(rabbit.eats); // true
console.log(rabbit); // обычное свойство __proto__
console.log(Object.getPrototypeOf(rabbit)); // animal
