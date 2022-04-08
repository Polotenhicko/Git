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

// Получение подстроки

str = '123456789';
console.log(str.slice(0, 4)); // '1234'
console.log(str.slice(5)); // '6789'
console.log(str.slice(-2)); // '89'
console.log(str.slice(-1)); // '9'
console.log(str.slice(5, 1)); // ''

console.log(str.substring(5, 1)); // '2345'
console.log(str.substring(1, 5)); // '2345'
console.log(str.substring(-2)); // '123456789', т.к. >0 == 0

console.log(str.substr(0, 3)); // '123'
console.log(str.substr(-4, 2)); // 67

// Сравнение строк

console.log('a' > 'A'); // true
console.log('a' > 'z'); // false
console.log('a' > 'Z'); // true

console.log('a'.codePointAt(0)); // 97
console.log('A'.codePointAt(0)); // 65

console.log(String.fromCodePoint(97)); // 'a'

console.log('\u005a'); // 'Z'
