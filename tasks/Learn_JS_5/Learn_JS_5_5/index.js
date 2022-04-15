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
