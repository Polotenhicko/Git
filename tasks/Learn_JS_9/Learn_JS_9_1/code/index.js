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
