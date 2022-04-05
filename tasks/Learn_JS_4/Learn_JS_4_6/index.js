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

user = {
  name: 'test',
  toDo() {
    console.log(`${this.name} должен сделать: ${this.toDoList?.first}`);
  },
};

user.toDo(); // test должен сделать: undefined

delete user.toDo;

user.toDo?.(); // Ничего не выведет

let user12 = null;

console.log(user12?.toDo()); // undefined
