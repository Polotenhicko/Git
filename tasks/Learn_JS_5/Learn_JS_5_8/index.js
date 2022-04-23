let test = { test: 'name' };
const map = new Map();

map.set(test, 'map');
console.log(map);
test = null;
console.log(map);

let john = { name: 'john' };
const weak = new WeakMap();

weak.set(john, 'weak');
console.log(weak);
john = null;
console.log(weak);

let visitsCountMap = new WeakMap();

john = { name: 'John' };

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

countUser(john);

// сборщик мусора сам решит когда удалить объект в weakmap
john = null;

// Задачи решал устно
