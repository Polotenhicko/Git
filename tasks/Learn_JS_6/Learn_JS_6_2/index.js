function sumAll(...args) {
  // args — имя массива
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(2)); // 2

function showNames(name, surname, ...others) {
  console.log(`${name} ${surname} ${others}`);
}

showNames('Name', 'Surname', 'Test', 'Test2'); // Name Surname Test,Test2

// Остаточные параметры всегда в конце

// SyntaxError
// function test(arg1, ...args, arg3) {}
console.log('//////');
function showName() {
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);

  try {
    arguments.map((item) => console.log(item));
  } catch (er) {
    // Ошибка, нет такой функции
    console.error(er);
  }

  // Объект arguments можно перебирать
  // for (let arg of arguments) console.log(arg);
}

// Вывод: 2, Юлий, Цезарь
showName('Юлий', 'Цезарь');

// Вывод: 1, Илья, undefined (второго аргумента нет)
showName('Илья');

function argInArrow() {
  const showArg = () => console.log(arguments.length);
  showArg(1, 2, 3);
}

argInArrow(); // 0, У стрелочных функций нет arguments

function test(arguments) {
  console.log(arguments, arguments.length);
}

test(1, 2, 3); // 1, undefined

let arr = [3, 5, 1];
let arr2 = [6, 5, 8];
// Оператор расширения
console.log(Math.max(...arr)); // 5
console.log(Math.max(...arr, ...arr2)); // 8
console.log(Math.max(1, ...arr, ...arr2, 10)); // 10

let finishArr = [...arr, ...arr2, 5, 6];
console.log(finishArr); // [3, 5, 1, 6, 5, 8, 5, 6] все числа

console.log(Math.max(...finishArr)); // 8

console.log([...'Split']); // ['S', 'p', 'l', 'i', 't']

console.log(...'Split'); // S p l i t

// Оператор расширения работает только с итерируемыми объектами
// Array.from работает как с итерируемыми объектами, так и с псевдомассивами

console.log([...'splice'] == Array.from('splice')); // false
