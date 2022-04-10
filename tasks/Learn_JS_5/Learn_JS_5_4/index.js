const arr = ['первый', 'второй', 'третий'];
console.log(arr);

arr[1] = 'четвёртый';
console.log(arr);

arr[3] = '3';
console.log(arr);

console.log(arr.length); // 4

arr[4] = {
  name: 'test',
  test: this,
};

console.log(arr[4].test); // Window

arr.push('push');
console.log(arr); // В конец добавлена строка 'push'

arr.pop();
console.log(arr); // Удаляет последний элемент

console.log(arr.shift()); // Удаляет первый элемент и сдвигает массив, а аткже может показать его

console.log(arr.unshift('первый')); // возвращает новую длину массива
console.log(arr);

const tempArr = arr;

tempArr.push('test');

console.log(arr); // Добавился 'test'
console.log(arr === tempArr); // true

tempArr[99] = 123; // length == 100 !!
console.log(tempArr); // Оптимизация от js пропадает

for (const item of tempArr) {
  console.log(item); // добавится 93 undefined
}
console.log('------------');
for (const key in tempArr) {
  console.log(tempArr[key]); // вывелось без undefined, но так делать не нужно!!
}

tempArr.length = 0; // очистка массива, т.к. уменьшение массива уничтожает затронутые значения
console.log(tempArr);

const emptyArr = new Array(3);
console.log(emptyArr); // длина = 3, но сам массив пуст
