let arr = ['1', '2', '3'];

delete arr[2]; // arr[2] = empty (undefined)
console.log(arr);

arr = ['1', '2', '3'];

arr.splice(1, 1); // позиция 1, 1 элемент
console.log(arr);

arr = ['1', '2', '3'];
console.log(arr.splice(0, 3, 'один', 'два', 'три')); // удалённые элементы
console.log(arr); // 'один', 'два', 'три'

arr.splice(0, 0, 'ноль');
console.log(arr); // 'ноль','один', 'два', 'три'

arr.splice(0, -1, '1');
console.log(arr);

console.log(arr.slice(0, 3)); // '1', 'ноль', 'один'
console.log(arr.slice(-2, -1)); // 'два'

// slice можно использовать для создания копий массива

const copyArr = arr.slice();
copyArr[0] = 'copy';
console.log(arr);

console.log(arr.concat(copyArr));
console.log(arr.concat({ name: '123' }));

const obj = {
  0: 'aboba',
  [Symbol.isConcatSpreadable]: true, // concat обрабатывает как массив
  length: 1,
};

console.log(arr.concat('asd', obj));

console.log('-------------');
console.log('foreach');

arr.forEach((element, index, array) => {
  console.log(`${element} по индексу ${index} в ${array}`);
});

arr.push(NaN);
arr.push('NaN');

console.log(arr);
console.log(arr.indexOf('ноль')); // индекс == 1
console.log(arr.indexOf('0')); // индекс == -1, т.к. не нашёл
console.log(arr.indexOf(NaN)); // т.к. использует ===

console.log(arr.lastIndexOf('два')); // индекс == 3

console.log(arr.includes('три')); // true
console.log(arr.includes('4')); // false
console.log(arr.includes(NaN)); // true

arr = [1, 2, 3, 4, 5, 6, NaN];

let result = arr.find((item) => Number.isNaN(item));
console.log(result); // NaN

result = arr.find((item) => item < 1);
console.log(result); // undefined

result = arr.findIndex((item) => Number.isNaN(item));
console.log(result); // 6

result = arr.findIndex((item) => item < 1);
console.log(result); // -1

result = arr.filter((item) => item < 4);
console.log(result); // [1,2,3]

result = arr.filter((item) => item < 0);
console.log(result); // []

// map
console.log('map');

result = arr.map(String);
console.log(result); // все элементы стали строками

result = arr.map((item) => (item > 3 ? -item : item));
console.log(result); // [1, 2, 3, -4, -5, -6, NaN]

// sort
const array = [0, -2, 3, 1, -3];
console.log(result.sort()); // [-4, -5, -6, 1, 2, 3, NaN]
console.log(array.sort((a, b) => b - a)); // От большего к меньшему

// reverse
console.log(array);
console.log(array.reverse()); // [-3, -2, 0, 1, 3]

// split
const str = '1,2,3,4,5';
console.log(str.split(',')); // ['1', '2', '3', '4', '5']
console.log(str.split(',', 4)); // ['1', '2', '3', '4']
console.log(str.split('')); // ['1', ',', '2', ',', '3', ',', '4', ',', '5']

const arrStr = str.split(',');
console.log(arrStr.join('_')); // '1_2_3_4_5'

// reduce

result = array.reduce((init, item) => init + +item, 0);
console.log(result);

try {
  console.log([].reduce((init, item) => init + item));
} catch (error) {
  // Ошибка, т.к. init не объявлен, а массив пуст
  console.error(error);
}

console.log(typeof []); // object

console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users.filter(army.canJoin, army);

console.log(soldiers.length); // 2
console.log(soldiers[0].age); // 20
console.log(soldiers[1].age); // 23

// background-color
function camelize(str) {
  const arrStr = str.split('-');
  if (arrStr.length > 1) {
    for (let i = 1; i < arrStr.length; i++) {
      let tempStr = arrStr[i];
      tempStr = tempStr.split('');
      tempStr[0] = tempStr[0].toUpperCase();
      arrStr[i] = tempStr.join('');
    }
    return arrStr.join('');
  }
  return arrStr;
}

// Верный вариант
function camelize(str) {
  return str
    .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']
    .map(
      // Переводит в верхний регистр первые буквы всех элементом массива за исключением первого
      // превращает ['my', 'long', 'word'] в ['my', 'Long', 'Word']
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
}

arr = [5, 3, 8, 1];

function filterRange(inputArray, a = 0, b = 0) {
  if (Array.isArray(inputArray)) {
    return inputArray.filter((item) => item >= a && item <= b);
  }
  return [];
}

console.log(filterRange(arr, 1, 4));

function filterRangeInPlace(inputArray, a = 0, b = 0) {
  if (Array.isArray(inputArray)) {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] < a || inputArray[i] > b) {
        inputArray.splice(i, 1);
        i--;
      }
    }
  }
}

arr = [1, 3, 5, 8];

filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4

console.log(arr); // [1, 3]

arr = ['HTML', 'JavaScript', 'CSS'];

function copySorted(arr) {
  return arr.slice().sort();
}

let sorted = copySorted(arr);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arr); // HTML, JavaScript, CSS (без изменений)

function Calculator() {
  this.methods = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
  };

  this.calculate = function calculate(str) {
    const a = +str.split(' ')[0];
    const oper = str.split(' ')[1];
    const b = +str.split(' ')[2];

    if (!this.methods[oper] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[oper](a, b);
  };

  this.addMethod = function addMethod(name, func) {
    if (!this.methods[name]) {
      this.methods[name] = func;
    }
  };
}

const calc = new Calculator();

console.log(calc.calculate('3 + 7')); // 10

const powerCalc = new Calculator();
powerCalc.addMethod('*', (a, b) => a * b);
powerCalc.addMethod('/', (a, b) => a / b);
powerCalc.addMethod('**', (a, b) => a ** b);

result = powerCalc.calculate('2 ** 3');
console.log(result); // 8

let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

users = [vasya, petya, masha];

let names = users.map((item) => item.name);

console.log(names);

vasya = { name: 'Вася', surname: 'Пупкин', id: 1 };
petya = { name: 'Петя', surname: 'Иванов', id: 2 };
masha = { name: 'Маша', surname: 'Петрова', id: 3 };

users = [vasya, petya, masha];

let usersMapped = users.map((item) => ({
  id: item.id,
  fullName: item.name + ' ' + item.surname,
}));

// usersMapped = [
//   { fullName: "Вася Пупкин", id: 1 },
//   { fullName: "Петя Иванов", id: 2 },
//   { fullName: "Маша Петрова", id: 3 }
// ]

console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // Вася Пупкин

vasya = { name: 'Вася', age: 25 };
petya = { name: 'Петя', age: 30 };
masha = { name: 'Маша', age: 28 };

console.log('--------');

arr = [vasya, petya, masha];

function sortByAge(arr) {
  // const tempArr = arr.map((item) => {});
  // arr.splice(0, arr.length, tempArr);
  arr.sort((a, b) => {
    return a.age > b.age ? 1 : -1;
  });
}

sortByAge(arr);

// теперь: [vasya, masha, petya]
console.log(arr[0].name); // Вася
console.log(arr[1].name); // Маша
console.log(arr[2].name); // Петя

console.log('-------');

vasya = { name: 'Вася', age: 25 };
petya = { name: 'Петя', age: 30 };
masha = { name: 'Маша', age: 29 };

arr = [vasya, petya, masha];

function getAverageAge(arr) {
  return arr.reduce((init, item) => init + +item.age, 0) / arr.length;
}

console.log(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28

function unique(arr) {
  const uniqueArr = [];
  return arr.filter((item) => {
    if (!uniqueArr.includes(item)) {
      uniqueArr.push(item);
      return true;
    }
  });
}

let strings = [
  'кришна',
  'кришна',
  'харе',
  'харе',
  'харе',
  'харе',
  'кришна',
  'кришна',
  ':-O',
];

console.log(unique(strings)); // кришна, харе, :-O
