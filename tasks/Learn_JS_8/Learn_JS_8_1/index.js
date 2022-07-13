let animal = {
  eats: true,
};

let rabbit = {
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
let longEar = {
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

animal = {
  eats: true,
  walk() {
    console.log('Animal walk!');
  },
};

rabbit = {
  jumps: true,
  __proto__: animal,
};

rabbit.walk = function () {
  console.log('Rabbit walk!');
};

// Нашёл метод walk внутри объекта и не полез искать в прототип
rabbit.walk(); // 'Rabbit walk!'

user = {
  name: 'John',
  surname: 'Smith',

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

admin = {
  __proto__: user,
  isAdmin: true,
};

// Свойства-аксессоры (get/set) работают нормально
console.log(admin.fullName); // "John Smith"

admin.fullName = 'Alice Cooper';

console.log(admin.fullName); // "Alice Cooper"

console.log(admin.name); // 'Alice'
console.log(admin.surname); // 'Cooper'

// цикл forin проходит ещё и по унаследованным свойствам
console.log('/////////');

for (const key in rabbit) {
  console.log(key); // jumps, walk, eats(от animal)
}

// Object.keys/values/entries возвращает только собственные свойства объекта

console.log(Object.keys(rabbit)); // jumps, walk

console.log(Object.values(rabbit)); // true, f

console.log(Object.entries(rabbit)); // [['jumps', true], ['walk', f]]

// Object.hasOwnProperty - возвращает true, если у obj key собственное свойство
for (const key in rabbit) {
  if (rabbit.hasOwnProperty(key)) {
    console.log(key); // jumps, walk
  }
}

// hasOwnProperty был найден у прототипа animal - Object
