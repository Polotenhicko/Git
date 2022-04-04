// Реализация глубокого клонирования

// Обычное клонирование
console.log('Обычное клонирование');

let obj = {
  name: 'obj',
  age: 25,
  obj: {
    sine: 'name',
  },
};

function cloneObj(object) {
  let clone = {};
  for (const key in object) {
    clone[key] = object[key];
  }
  return clone;
}

let clone = cloneObj(obj);

clone.name = 'clone';
clone.obj.sine = 'objclone';

console.log(JSON.parse(JSON.stringify(clone)));
console.log(JSON.parse(JSON.stringify(obj)));

//Глубокое клонирование
console.log('Глубокое клонирование');

obj = {
  name: 'obj',
  age: 25,
  size: {
    title: 'Size',
    with: 80,
    height: 80,
    position: {
      x: 1,
      y: 0,
    },
    test: null,
  },
};

function cloneDeep(object) {
  let clone = {};
  for (const key in object) {
    if (typeof object[key] === 'object' && object[key]) {
      clone[key] = cloneDeep(object[key]);
    } else {
      clone[key] = object[key];
    }
  }
  return clone;
}

clone = cloneDeep(obj);

clone.name = 'clone';
clone.size.title = 'objclone';
clone.size.position.x = 999;

console.log(JSON.parse(JSON.stringify(clone)));
console.log(JSON.parse(JSON.stringify(obj)));
