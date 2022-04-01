// Реализация глубокого клонирования

// Обычное клонирование

let obj = {
  name: 'obj',
  age: 25,
  obj: {
    sine: 'name',
  },
};

function cloneDeep(object) {
  let clone = {};
  for (const key in object) {
    clone[key] = object[key];
  }
  return clone;
}

let clone = cloneDeep(obj);

console.log(clone);

// clone.obj.sine уже заменился на 'clone', почему? С дебагом такого нет

clone.name = 'clone';
clone.obj.sine = 'objclone';

console.log(obj.name);
console.log(obj.obj.sine);

//Глубокое клонирование
