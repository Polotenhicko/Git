// Определить геттер и сеттер для уже существующего класса

class Person {
  constructor(firstName, lastName) {
    // this.firstName = firstName;
    // this.lastName = lastName;
    // или
    this.name = firstName + ' ' + lastName;
  }
}

Object.defineProperty(Person.prototype, 'name', {
  get() {
    return this.firstName + ' ' + this.lastName;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
});

let user = new Person('Alex', 'Carson');

console.log(user.name); // Alex Carson

user.name = 'New Name';

console.log(user.name); // New Name

// var a = new Vector([1, 2, 3]);
// var b = new Vector([3, 4, 5]);
// var c = new Vector([5, 6, 7, 8]);

// a.add(b);      // should return a new Vector([4, 6, 8])
// a.subtract(b); // should return a new Vector([-2, -2, -2])
// a.dot(b);      // should return 1*3 + 2*4 + 3*5 = 26
// a.norm();      // should return sqrt(1^2 + 2^2 + 3^2) = sqrt(14)
// a.add(c);      // throws an error

class Vector {
  constructor(components = []) {
    this.components = components.filter((item) => !isNaN(item));
  }

  add({ components: value = [] }) {
    if (this.check(value)) {
      return new Vector(this.components.map((item, index) => item + value[index]));
    }
    return NaN;
  }

  subtract({ components: value = [] }) {
    if (this.check(value)) {
      return new Vector(this.components.map((item, index) => item - value[index]));
    }
    return NaN;
  }

  dot({ components: value = [] }) {
    if (this.check(value)) {
      return this.components
        .map((item, index) => item + value[index])
        .reduce((acc, item) => acc + item, 0);
    }
    return NaN;
  }

  norm() {
    return +Math.sqrt(this.components.reduce((acc, item) => acc + item ** 2, 0)).toFixed(2);
  }

  check(value) {
    if (value.length != this.components.length) {
      console.error('Векторы разные!');
      return false;
    }
    return true;
  }

  toString() {
    return '(' + String(this.components) + ')';
  }
}

const a = new Vector([1, 2]);
const b = new Vector([2, 3]);
const c = new Vector([4, 4, 4]);

console.log(a.add(b)); // [3, 5]
console.log(b.subtract(a)); // [1, 1]
console.log(a.dot(b)); // 1*2 + 2*3 = 8
console.log(a.norm()); // 2.24
console.log(a.add(c)); // NaN
console.log(String(a)); // (1,2)
