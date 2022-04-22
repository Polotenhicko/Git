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

const set = new Set();

set.add('1');
set.add('2');
set.add(1);
set.add(2);
set.add(1);
set.add('1');

console.log(set); // {'1', '2', 1, 2}

for (const item of set) {
  console.log(item);
}
console.log('----');
set.forEach((item) => console.log(item));

console.log(set.add('3')); // {'1', '2', 1, 2, '3'}
console.log(set.add('3')); // {'1', '2', 1, 2, '3'}

console.log('Задачи: //////////');

function unique(arr) {
  return Array.from(new Set(arr));
}

let values = [
  'Hare',
  'Krishna',
  'Hare',
  'Krishna',
  'Krishna',
  'Krishna',
  'Hare',
  'Hare',
  ':-O',
];

console.log(unique(values)); // Hare,Krishna,:-O

function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // разбиваем слово на буквы, сортируем и объединяем снова в строку
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares'];

console.log(aclean(arr)); // "nap,teachers,ear" или "PAN,cheaters,era"
