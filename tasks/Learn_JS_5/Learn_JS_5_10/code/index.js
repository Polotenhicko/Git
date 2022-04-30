// Деструктрурировать массив как объект и получить не undefined значения.

// Деструктурировать объект как массив. Какая ошибка появляется? Применить Symbol.iterator чтобы деструкторизировать без ошибок

const obj = {
  name: 'John',
  age: 29,
};

const arr = ['Ar', 'From', 'Anakonda'];

let { ...items } = arr;

console.log(items); // {0: 'Ar', 1: 'From', 2: 'Anakonda'}

try {
  let [name] = obj;
  // TypeError: obj is not iterable
} catch (er) {
  console.error(er); // не итерируемый
}

// Деструктуризация через Object.entries
let [name1, age] = Object.entries(obj);

console.log(name1, age);

const obj1 = {
  nameList: ['John', 'Anton', 'Arthur'],
};

obj1[Symbol.iterator] = function () {
  return {
    // Не работает сокращённая запись (но я не уверен)
    nameList: this.nameList,
    index: 0,
    next() {
      let i = this.index++;
      if (i < this.nameList.length) {
        return { done: false, value: this.nameList[i++] };
      }
      return { done: true };
    },
  };
};

for (const item of obj1) {
  console.log(item); // John, Anton, Arthur
}

console.log('//////');
[name1, , name3] = obj1;
console.log(name1); // John
console.log(name3); // Arthur
