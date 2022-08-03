// простейший способ реализации примесей

let sayHiMixin = {
  sayHi() {
    console.log(`Привет, ${this.name}`);
  },
  sayBye() {
    console.log(`Пока, ${this.name}`);
  },
};

let User = class {
  constructor(name) {
    this.name = name;
  }
};

// копируем методы
Object.assign(User.prototype, sayHiMixin);

new User('Vasya').sayHi(); // Привет, Vasya
