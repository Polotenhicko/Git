function makeCounter() {
  let count = 0;
  return function () {
    return count++; // есть доступ к внешней переменной "count"
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

function sayHiBye(firstName, lastName) {
  // функция-помощник, которую мы используем ниже
  function getFullName(firstName = '1', lastName = '2') {
    return firstName + ' ' + lastName;
  }

  console.log('Hello, ' + getFullName());
  console.log('Bye, ' + getFullName());
}
