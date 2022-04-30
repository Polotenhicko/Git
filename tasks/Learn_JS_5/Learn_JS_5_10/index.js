let arr = ['Arur', 'Akulak'];

let [value1, value2] = arr;

console.log(value1); // 'Arur'
console.log(value2); // 'Akulak'

let [firstName, surname] = 'Ilya Kantor'.split(' ');

console.log(firstName); // 'Ilya'
console.log(surname); // 'Kantor'

// Деструктизация итерируемого объекта
let [one, two, three] = new Set([1, 2, 3]);
let [a, b, c] = 'abc';

console.log(one); // 1
console.log(a); // a

let user = {};
[user.name, user.surname] = 'Ilya Kantor'.split(' ');

console.log(user.name); // Ilya

console.log('rest:');
console.log('/////');

let [name1, name2, ...rest] = [
  'Julius',
  'Caesar',
  'Consul',
  'of the Roman Republic',
];

console.log(name1); // Julius
console.log(name2); // Caesar

console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2

let [name = 'Guest', secondName = 'Anonymous'] = ['Andre'];

console.log(name); // Andre (из массива)
console.log(secondName); // Anonymous (значение по умолчанию)

function getNumber() {
  return 3;
}

function fakeGetNumber() {
  let a = 3;
}

let [number = getNumber(), number2, number3 = fakeGetNumber()] = [];

console.log(number); // 3
console.log(number2); // undefined
console.log(number3); // undefined

// Деструктизация объекта
console.log('-------');

let options = {
  title: 'Menu',
  width: 100,
  height: 200,
};

let { title, width, height } = options;

console.log(title); // Menu
console.log(width); // 100
console.log(height); // 200

let { title: t, width: w, height: h, color: col = '#fff' } = options;

console.log(t); // Menu
console.log(w); // 100
console.log(h); // 200
console.log(col); // '#fff'

// Кроме IE
({ title: t, ...rest } = options);

console.log(t); // Menu
console.log(rest); // {width: 100, height: 200}

console.log(options);
options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ['Cake', 'Donut'],
  extra: true,
};

let {
  size: {
    // положим size сюда
    width: w1 = 100,
    height: h1 = 200,
  },
  items: [item1, item2], // добавим элементы к items
  title: t1 = 'Menu', // отсутствует в объекте (используется значение по умолчанию)
} = options;

console.log(w1); // 100
console.log(h1); // 200
console.log(item1); // Cake

options = {
  title: 'My menu',
  items: ['Item1', 'Item2'],
};

function show({
  title: t = 'Untitled',
  width = 200,
  height = 100,
  items = [],
}) {
  // title, items – взято из options,
  // width, height – используются значения по умолчанию
  console.log(`${t} ${width} ${height}`); // My Menu 200 100
  console.log(items); // Item1, Item2
}

show(options);

try {
  show(); // Ошибка
} catch (error) {
  console.error(error);
}

const show1 = function show1({
  title: t = 'Untitled',
  width = 200,
  height = 100,
  items = [],
} = {}) {
  // title, items – взято из options,
  // width, height – используются значения по умолчанию
  console.log(`${t} ${width} ${height}`); // My Menu 200 100
  console.log(items); // Item1, Item2
};

show1(); // Нет ошибки

user = {
  name: 'John',
  years: 30,
};

({ name, years: age, isAdmin = false } = user);

console.log(name); // John
console.log(age); // 30
console.log(isAdmin); // false

let salaries = {
  John: 100,
  Pete: 300,
  Andre: 300,
  Mary: 250,
};

function topSalary(salaries = null) {
  if (Object.keys(salaries).length) {
    const max = Math.max(...Object.values(salaries));
    for (const [key, value] of Object.entries(salaries)) {
      if (max === value) console.log(key);
    }
  } else {
    console.log(null);
  }
}

topSalary(salaries); // Pete, Andre
topSalary({}); // null
