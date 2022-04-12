// Сравнение Number.isNaN и isNaN

// Number.isNaN() проверяет, является ли значение NaN, но не приводит его к числу!
console.log(Number.isNaN('false')); // false
console.log(Number.isNaN('NaN')); // false
console.log(Number.isNaN('0 / 0')); // false
console.log(Number.isNaN(Infinity)); // false
console.log(Number.isNaN(3 + 'asd')); // false
console.log(Number.isNaN(3 + 3)); // false
console.log('-----');
console.log(Number.isNaN(0 / 0)); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(Number('3a'))); // true
console.log(Number.isNaN(Number.NaN)); // true

// isNaN() приводит введённое значение к числу и проверяет, является ли оно NaN
console.log('//////////');
console.log(isNaN('false')); // true
console.log(isNaN('NaN')); // true
console.log(isNaN('0 / 0')); // true
console.log(isNaN(Infinity)); // false, т.к. Infinity не NaN
console.log(isNaN(3 + 3)); // false
console.log(isNaN(3 + 'asd')); // true
console.log('-----');
console.log(isNaN(0 / 0)); // true
console.log(isNaN(NaN)); // true
console.log(isNaN(Number('3a'))); // true
console.log(isNaN(Number.NaN)); // true
console.log(isNaN()); // true
console.log(isNaN(undefined)); // true
