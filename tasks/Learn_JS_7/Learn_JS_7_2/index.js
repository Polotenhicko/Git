// первый тип - это свойства-данные
// второй - свойства-аксессоры, это функции для присвоения или получения
// значений, во внешнем коде они выглядят как обычные свойства

const obj = {
  get objName() {
    // геттер срабатывает при чтении obj.objName
  },
  set objName(value) {
    // сеттер срабатывает при записи obj.objName = value
  },
};

// геттер срабатывает когда свойство читается, сеттер - когда присваивается

let user = {
  name: 'Alex',
  lastName: 'Smith',
  get fullName() {
    return this.name + ' ' + this.lastName;
  },
};

console.log(user.fullName); // "Alex Smith"

user.fullName = 123;
// в строгом режиме будет ошибка, т.к. нет сеттера
console.log(user.fullName); // "Alex Smith"

user = {
  name: 'Alex',
  lastName: 'Smith',
  get fullName() {
    return this.name + ' ' + this.lastName;
  },
  set fullName(value) {
    [this.name, this.lastName] = value.split(' ');
  },
};

user.fullName = 'Andre Kuku';

console.log(user.fullName); // 'Andre Kuku'
console.log(user); // {name: 'Andre', lastName: 'Kuku'}

user = {
  name: 'Alex',
  lastName: 'Smith',
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.lastName}`;
  },
  set(value) {
    [this.name, this.lastName] = value.split(' ');
  },
});

console.log(user.fullName); // 'Alex Smith'

// {enumerable: false, configurable: false, get: ƒ, set: ƒ}
console.log(Object.getOwnPropertyDescriptor(user, 'fullName'));

// Либо свойство-данные(value), либо свойство-аксессор(get, set)
try {
  Object.defineProperty(user, 'test', {
    value: 123,
    get() {
      return this.test;
    },
  });
} catch (e) {
  // Ошибка
  console.error(e);
}

// умные геттеры/сеттеры

user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      console.log('Имя слишком короткое!');
    } else {
      this._name = value;
    }
  },
};

user.name = 'Ale';
console.log(user.name); // undefined

user.name = 'Alexey';
console.log(user.name); // 'Alexey'

user.name = 'a';
console.log(user.name); // 'Alexey'
