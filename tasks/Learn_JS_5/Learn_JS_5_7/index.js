const map = new Map();
map.set('1', 1);
map.set(1, '1');
console.log(map.get('1')); // 1
console.log(map.get(1)); // '1'
console.log(map.size); // 2

const test = { name: 'test' };

map.set(test, 222);
console.log(map.get(test)); // 222
console.log(map.get({ name: 'test' })); // undefined

map.set(NaN, 123);
console.log(map.get(NaN)); // 123

map.set('1', 'str1').set(1, 'num1').set(true, 'bool1');
