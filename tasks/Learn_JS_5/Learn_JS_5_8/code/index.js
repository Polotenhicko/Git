function Users() {
  this.userList = new Map();

  this.cache = new Map();

  this.maxId = 0;

  this.setCache = function setCache(func, user) {
    const cacheId = this.maxId++;
    this.cache.set(cacheId, {
      func,
      user,
    });
    return cacheId;
  };

  this.add = function add(name, surname) {
    const dateNow = new Date();

    const userId = this.maxId++;

    const user = {
      userId,
      name,
      surname,
      date: `${dateNow.toLocaleDateString()} ${dateNow.toLocaleTimeString()}`,
    };

    this.userList.set(user.userId, user);

    this.setCache(this.add, user);

    return userId;
  };

  this.remove = function remove(id) {
    if (this.userList.has(id)) {
      this.setCache(this.remove, this.userList.get(id));
      this.userList.delete(id);
    } else {
      console.error(`Пользователя с id ${id} не существует!`);
    }
  };

  this.usersLog = function usersLog() {
    if (this.userList.size) {
      this.userList.forEach((item, index) => {
        console.log(index, item);
      });
    } else {
      console.error('Users List is empty!');
    }
  };

  this.getLog = function getLog() {
    if (this.cache.size) {
      const cache = Array.from(this.cache.entries());
      for (let i = this.cache.size - 1; i >= 0; i--) {
        const value = cache[i][1];
        if (this.functions.has(value.func)) {
          const action = this.functions.get(value.func);
          console.log(
            `"${value.user.date} ${action} ${value.user.name} ${value.user.surname} (id #${value.user.userId})"`
          );
        } else {
          console.error('Такого метода нет!');
        }
      }
    } else {
      console.error('Cache is empty!');
    }
  };

  this.functions = new Map([
    [this.add, 'Добавлен(а)'],
    [this.remove, 'Удалён(а)'],
  ]);
}

const user = new Users();
user.add('Test', 'Testing'); // 0
user.add('Anton', 'Antonov'); // 1

user.usersLog();
user.getLog();

user.remove(0);

user.usersLog();
user.getLog();

console.log('/////////'); // Если не добавлять юзеров
const user1 = new Users();
user1.usersLog();
user1.getLog();
user1.remove(1);
