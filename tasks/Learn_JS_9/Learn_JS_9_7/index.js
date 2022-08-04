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

// копируем методы в прототип
Object.assign(User.prototype, sayHiMixin);

new User('Vasya').sayHi(); // Привет, Vasya

// это не наследование, класс всё также может наследоваться

// примеси могут наследовать друг друга

let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

sayHiMixin = {
  __proto__: sayMixin,

  sayHi() {
    super.say(`Привет, ${this.name}`);
  },

  sayBye() {
    super.say(`Пока, ${this.name}`);
  },
};

User = class {
  constructor(name) {
    this.name = name;
  }
};

Object.assign(User.prototype, sayHiMixin);

new User('Вася').sayHi;
// это работает благодаря HomeObject

// возьмём примесь из learnjs

const eventMixin = {
  /**
   * Подписаться на событие, использование:
   * menu.on('select', function(item) { ... }
   */

  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Отменить подписку, использование:
   * menu.off('select', handler)
   */

  off(eventName, handler) {
    const handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Сгенерировать событие с указанным именем и данными
   * this.trigger('select', data1, data2);
   */

  trigger(eventName, ...args) {
    // обработчика такого события нет
    if (!this._eventHandlers || !this._eventHandlers[eventName]) return;

    this._eventHandlers[eventName].forEach((handler) => handler.apply(this, args));
  },
};

// использование

class Menu {
  choose(value) {
    this.trigger('select', value);
  }
}

Object.assign(Menu.prototype, eventMixin);

const menu = new Menu();

menu.on('select', (value) => console.log(`Выбрано ${value}`));

menu.choose('123'); // Выбрано 123
