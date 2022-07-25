// есть возможность наследовать классы

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} стоит`);
  }
}

// Rabbit использует конструктор от Animal ?
let Rabbit = class extends Animal {
  // extends - значит Rabbit.prototype.[[Prototype]] = Animal.prototype
  hide() {
    console.log(`${this.name} прячется!`);
  }
};

let rabbit = new Rabbit('Кролик');

rabbit.run(3); // Кролик бежит со скоростью 3
rabbit.stop(); // Кролик стоит

console.log(Object.getPrototypeOf(rabbit) == Rabbit.prototype); // true
console.log(Object.getPrototypeOf(rabbit).constructor == Rabbit); // true ??
console.log(Object.getPrototypeOf(Rabbit.prototype) == Animal.prototype); // true

// после extends разрешены любые выражения

function Test(test) {
  return class {
    hi() {
      console.log(test);
    }
  };
}

class Test2 extends Test('hi') {}

new Test2().hi(); // hi

// Переопределение методов

Rabbit = class extends Animal {
  hide() {
    console.log(this.name + ' прячется!');
  }
  stop() {
    // есть ключевое слово super, которое вызывает родительский метод
    // сам super(...) вызывает родительский конструктор

    // ...будет использоваться для rabbi2.stop()
    super.stop(); // вызывает stop у родительского класса
    this.hide();
  }

  // у стрелочных нет super
  // при обращении, стрелочныя берёт super из внешней функции
  run(n) {
    (() => super.run(n))();
  }
};

rabbit = new Rabbit('Krolik');

rabbit.run(5); // Krolik бежит со скоростью 5
// Krolik стоит
// Krolik прячется!
rabbit.stop();

// Переопределение конструктора

Rabbit = class extends Animal {
  // по спецификации, если класс расширяет другой класс и не имеет конструктора
  // то автоматически создаётся такой конструктор
  constructor(...args) {
    super(...args);
  }
};

// в классах-потомках конструкторы обязаны вызывать super(...)
// и делать это перед использованием this

// такой код будет выдавать ошибку, т.к. нет super()
// Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
// Rabbit = class extends Animal {
//   constructor() {}
// };

Rabbit = class extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
};

rabbit = new Rabbit('Ras', 13);

console.log(rabbit.name); // 'Ras'
console.log(rabbit.earLength); // 13

// функция, объявленная как метод внутри объекта, получает внутреннее свойство [[HomeObject]], равное этому объекту

let animal = {
  name: 'Животное',
  eat() {
    // animal.eat.[[HomeObject]] == animal
    console.log(`${this.name} ест`);
  },
};

rabbit = {
  __proto__: animal,
  name: 'Кролик',
  eat() {
    // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  },
};

let longEar = {
  __proto__: rabbit,
  name: 'Длинноух',
  eat() {
    // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  },
};

// Метод знает свой [[HomeObject]] и получает метод родителя из прототипа
longEar.eat(); // Длинноух ест

// функции обычно свободны, не привязаны к контексту, и их можно вызывать с любым this
// но само существование [[HomeObject]] нарушает этот принцип, [[HomeObject]] нельзя изменить, эта связь - навсегда

// единственное где используется [[HomeObject]] - это super
// если метод не использует super, то можно считать его свободным, а если super есть, то могут быть побочные эффекты

animal = {
  name: 'Животное',
  sayHi() {
    console.log(`${this.name} Я животное`);
  },
};

// rabbit наследует от animal
rabbit = {
  __proto__: animal,
  name: 'Кролик',
  sayHi() {
    // вызывает метод прототипа
    super.sayHi();
  },
};

let plant = {
  name: 'Растение',
  sayHi() {
    console.log(`${this} Я растение`);
  },
};

let tree = {
  __proto__: plant,
  name: 'Дерево',
  sayHi: rabbit.sayHi,
};

tree.sayHi(); // 'Дерево Я животное'

// свойство [[HomeObject]] определено для классов и для обычных объектов
// но для объектов методы должны быть объявлены как method(), а не method: function() {}

animal = {
  eat: function () {
    console.log('ем');
  },
};

rabbit = {
  __proto__: animal,
  // так будет ошибка
  // eat: function() {
  //   super.eat();
  // },

  // так норм
  eat() {
    super.eat();
  },
};

rabbit.eat();
