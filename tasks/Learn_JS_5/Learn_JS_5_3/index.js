let str = 'aboba';
console.log(str.length); // 5
console.log(str[0]); // 'a'
console.log(str[0] === str.charAt(0)); // true
console.log(`Символ на несуществующей позиции str[1000] = '${str[1000]}'`); // undefined
console.log(
  `Символ на несуществующей позиции str.charAt(1000) = '${str.charAt(1000)}'`
); // ''
