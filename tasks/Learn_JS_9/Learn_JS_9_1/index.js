// User - функция
class User {
  // constructor - код функции
  constructor(name) {
    this.name = name;
  }

  // методы записываются в User.prototype
  sayHi() {
    console.log(this.name);
  }
}

// Создаётся новый объект, затем выполняется constructor
let user = new User('Name');
user.sayHi(); // 'Name'

// класс - это функция
console.log(typeof User); // function

console.log(User == User.prototype.constructor); // true

console.log(Object.getPrototypeOf(user) == User.prototype); // true

// код идентичен этом:

function User2(name) {
  this.name = name;
}

User2.prototype.sayHi = function sayHi() {
  console.log(this.name);
};

let user2 = new User2('name');
user2.sayHi();

// отличия:

// функция, созданная при помощи классов, помечается специальным внуренним свойством [[IsClassConstructor]] : true

// класс нельзя вызвать без оператора new

try {
  User();
} catch (e) {
  // TypeError: Class constructor User cannot be invoked without 'new'
  console.error(e);
}

User2(); // нет ошибки, т.к. не строгий режим

// строковое представление класса во многих движках начинается с class...

console.log(String(User)); // class...

// методы класса являются неперечисляемыми
// {writable: true, enumerable: false, configurable: true, value: ƒ}
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(user), 'sayHi'));

// весь кодв внутри класса всегда в строгом режиме

// Class Expression

let Guest = class {
  hi() {
    console.log('hi');
  }
};

new Guest().hi(); // 'hi'

// а также NFE

let Admin2 = class Admin {
  hi() {
    console.log(Admin);
  }
};

new Admin2().hi(); // class Admin

// Можем даже динамически создавать классы

function makeClass(name) {
  return class {
    hi() {
      console.log(name);
    }
  };
}

User = makeClass('name');

new User().hi(); // name

// в классах можно объявить геттеры/сеттеры

class Test {
  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log('Имя слишком короткое.');
      return;
    }
    this._name = value;
  }
}

let test = new Test('123'); // имя слишком короткое
console.log(test); // Test

test.name = '1234';
console.log(test.name); // '1234'

// плохая поддержка свойств класса
class Test2 {
  name = 'Anonim';

  sayHi() {
    console.log(this.name);
  }
}

new Test2().sayHi(); // 'Anonim'
