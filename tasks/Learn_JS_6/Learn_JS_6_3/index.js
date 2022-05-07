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

try {
  console.log(getFullName());
} catch (e) {
  console.error(e); // Не нашёл во внутреннем окружении и во внешнем окружении
}

let test = 'test';

if (true) {
  let test2 = 'test2';
  console.log(`${test2} ${test}`); // test2 test
}

try {
  console.log(`${test}`);
  console.log(`${test2}`); // is not defined
} catch (e) {
  console.error(e);
}

for (let i = 0; i < 10; i++) {
  // У каждой итерации цикла своё собственное лексическое окружение
  // {i: value}
}

try {
  console.log(i); // Ошибка, нет такой переменной
} catch (e) {
  console.error(e);
}

{
  // Создаётся собственное лексическое окружение
  let message = 'Hello';

  console.log(message); // Hello
}

console.log(message); // Ошибка: переменная message не определена
