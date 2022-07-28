let CoffeMachine = class {
  waterAmount = 0; // кол-во воды внутри

  constructor(power) {
    this.power = power;
    console.log(`Создана кофеварка, мощность: ${power}`);
  }
};

let coffeMachine = new CoffeMachine(100);
// Создана кофеварка, мощность: 100

coffeMachine.waterAmount = 200;

// power и waterAmount являются публичными свойствами
// защищённое свойство обычно начинается с префикса _

CoffeMachine = class {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error('Отрицательное количество воды');
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
};

coffeMachine = new CoffeMachine(100);

try {
  coffeMachine.waterAmount = -10;
} catch (e) {
  // Отрицательное количество воды
  console.error(e);
}

// сделать свойство power только для чтения:
// просто убрать сеттер

CoffeMachine = class {
  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
};

coffeMachine = new CoffeMachine(100);

console.log(`Мощность: ${coffeMachine.power}W`);

coffeMachine.power = 10; // не сработает

// новая возможность - приватные свойства, обычно нужен полифил
// начинаются с #

CoffeMachine = class {
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error('Отрицательный уровень воды');
    if (value > this.#waterLimit) throw new Error('Слишком много воды');
  }
};

coffeMachine = new CoffeMachine();

// Uncaught SyntaxError: Private field '#checkWater' must be declared in an enclosing class
// coffeMachine.#checkWater();

// Uncaught SyntaxError: Private field '#waterLimit' must be declared in an enclosing class
// coffeMachine.#waterLimit = 1000;

// нельзя получить доступ извне или из наследуемых классов
// приватные поля не конфликтуют с публичными, может быть 2 поля одновременно

CoffeMachine = class {
  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error('Отрицательный уровень воды');
    this.#waterAmount = value;
  }
};

let machine = new CoffeMachine();

console.log(machine.waterAmount); // 0
machine.waterAmount = 100;
console.log(machine.waterAmount); // 100

// Uncaught SyntaxError: Private field '#waterAmount' must be declared in an enclosing class
// machine.#waterAmount;

class MegaCoffeMachine extends CoffeMachine {
  method() {
    // нельзя даже в наследнике получить доступ????
    // Uncaught SyntaxError: Private field '#waterAmount' must be declared in an enclosing class
    // console.log(this.#waterAmount);
  }
}

class Guest {
  #phrase = 'Hello';
}

class User extends Guest {
  hi() {
    // ограничение синтаксиса
    console.log(this['#phrase']);
  }
}

new User().hi(); // не работает
