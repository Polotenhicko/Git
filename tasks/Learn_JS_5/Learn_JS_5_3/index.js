'use strict';
let str = 'aboba';
console.log(str.length); // 5
console.log(str[0]); // 'a'
console.log(str[0] === str.charAt(0)); // true
console.log(`Символ на несуществующей позиции str[1000] = '${str[1000]}'`); // undefined
console.log(
  `Символ на несуществующей позиции str.charAt(1000) = '${str.charAt(1000)}'`
); // ''

try {
  str[2] = 'G';
} catch (er) {
  // Ошибка в строгом режиме
  console.error(er);
}

str = 'First text';
console.log(str.indexOf('st')); // 3
console.log(str.indexOf('first')); // -1
console.log(str.indexOf('Fi', 2)); // -1

str = 'customerUser';
console.log(str.lastIndexOf('er')); // 10

console.log(~2); // -(2+1) = -3

console.log(str.includes('cust')); // true
console.log(str.includes('cu', 1)); // false

console.log(str.startsWith('cus')); // true
console.log(str.endsWith('user')); // false
