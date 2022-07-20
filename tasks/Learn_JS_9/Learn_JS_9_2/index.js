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
class Rabbit extends Animal {
  // extends - значит Rabbit.prototype.[[Prototype]] = Animal.prototype
  hide() {
    console.log(`${this.name} прячется!`);
  }
}

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
