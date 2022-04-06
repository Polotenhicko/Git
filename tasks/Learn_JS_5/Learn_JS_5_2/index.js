console.log(1e6); // 1000000
console.log(1e1); // 10
console.log(1e-1); // 1/10 ~ 0.1
console.log(0.001 === 1e-3); // true

// Шестнадцатеричные, двоичные и восьмеричные числа
console.log('Шестнадцатеричные:');
console.log(0xff); // 255
console.log(0xa); // 10
console.log(0xb); // 11

console.log('Восьмеричные:');
console.log(0o11); // 9

console.log('Двоичные:');
console.log(0b11); // 3

console.log('toString:');
let value = 2;
console.log(value.toString(2)); // В 2-ой 2 == 10
value = 255;
console.log(value.toString(16)); // В 16-ой 255 == ff

// Если писать число, то нужно ставить 2 точки для вызова метода
console.log((10).toString(2)); // Либо в круглые скобки

console.log('Округление:');
console.log(`В меньшую сторону: 2.6 = ${Math.floor(2.6)}`); // 2
console.log(`В большую сторону: 2.01 = ${Math.ceil(2.01)}`); // 3
console.log(
  `До ближайшего целого: 2.4 = ${Math.round(2.4)} и 2.5 = ${Math.round(2.5)}`
); // 2 и 3 соответственно
console.log(`Удаление дробной части: 0.01 = ${Math.trunc(0.01)}`); // 0
