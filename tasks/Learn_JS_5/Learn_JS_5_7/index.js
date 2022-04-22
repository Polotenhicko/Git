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
console.log('keys:');
for (const iterator of map.keys()) {
  console.log(iterator);
}

console.log('values:');
for (const iterator of map.values()) {
  console.log(iterator);
}

console.log('Пары:');
for (const iterator of map) {
  console.log(iterator);
}

console.log('Пары:');
for (const iterator of map.entries()) {
  console.log(iterator);
}

console.log('Имеет foreach');
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

const obj = {
  name: 'John',
  age: 30,
};

const map1 = new Map(Object.entries(obj));

console.log(map1);

console.log(Object.fromEntries(map1)); // Обратно в объект
console.log('////////');
//set
console.log('set:');
