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
