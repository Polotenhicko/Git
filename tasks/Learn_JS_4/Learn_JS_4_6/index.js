let user = {};

console.log(user.name); // undefined

// console.log(user.name.firstName); // Error

console.log(user.name?.firstName); // undefined

try {
  delete user12?.name; // удаляет user12.name если пользователь существует
} catch (er) {
  // ошибка ?
  console.error(er);
}

user = null;

console.log(user?.name); // undefined
console.log(delete user?.name); // true

try {
  console.log(delete user.name); // true
} catch (er) {
  // ошибка, т.к. пытается удалить у undefined свойство name
  console.error(er);
}

// Вызов функции через опциональную цепочку

user = {
  name: 'test',
  toDo() {
    console.log(`${this.name} должен сделать: ${this.toDoList?.first}`);
  },
};

user.toDo(); // test должен сделать: undefined

user.toDoList = {
  first: 'Первое задание',
};

user.toDo(); // test должен сделать: Первое задание

delete user.toDo;

user.toDo?.(); // Ничего не выведет

let user12 = null;

console.log(user12?.toDo()); // undefined

user.toDo = function toDo() {
  return `${this.name} должен сделать: ${this.toDoList?.first}`;
};

// Опциональная цепочка с []

let value = 'temp';

console.log(user[value]); // undefined

value = 'name';

console.log(user[value]); // 'test'

value = 'toDo';

console.log(user[value]?.()); // 'test должен сделать: Первое задание'

value = 'toCreate';

console.log(user[value]?.()); // undefined

try {
  console.log(user[value]());
} catch (er) {
  // Ошибка, т.к. такой функции не существует
  console.error(er);
}
