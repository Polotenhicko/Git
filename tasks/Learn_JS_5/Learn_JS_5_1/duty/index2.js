console.log('//////////////////');
console.log('Могут ли мутировать примитивы в JS');

// try {
//   console.log(++1);
// } catch (error) {
//   // Ошибка
//   console.error(error);
// }

// try {
//   console.log(1++);
// } catch (error) {
//   // Ошибка
//   console.error(error);
// }

// Заккоментил, т.к. syntax error прерывает выполнение скрипта

const arr = {
  name: '123',
  123: 'test',
  false: 'false',
  [1 + 1]: '2',
};

for (const key in arr) {
  console.log(`${typeof key}: ${key}`);
}

// Ключи хранятся как строки

console.log(arr[123] === arr['123']); // true
console.log(arr[false] === arr['false']); // true
console.log(arr[1 + 1] === arr['2']); // true
