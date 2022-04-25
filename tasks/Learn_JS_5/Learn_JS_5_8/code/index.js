function Users() {
  this.userList = new Map();

  this.cache = new Map();

  this.getMaxId = function getMaxId(map) {
    let maxId = -1;
    if (map.size) {
      for (const [id] of map) {
        id > maxId ? (maxId = id) : false;
      }
    }
    return maxId;
  };

  this.add = function add(name, surname) {
    const maxId = this.getMaxId(this.userList) + 1;
    const dateNow = new Date();

    const user = {
      name,
      surname,
      date: `${dateNow.toLocaleDateString()} ${dateNow.toLocaleTimeString()}`,
    };

    this.userList.set(maxId, user);

    const maxIdCache = this.getMaxId(this.cache) + 1;

    this.cache.set(maxIdCache, {
      func: this.add,
      user,
    });
  };

  this.remove = function remove(id) {
    if (this.userList.has(id)) {
      const maxIdCache = this.getMaxId(this.cache) + 1;

      this.cache.set(maxIdCache, {
        func: this.remove,
        user: this.userList.get(id),
      });
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
    }
  };

  this.getLog = function getLog() {
    const cache = Array.from(this.cache.entries());
    for (let i = this.cache.size - 1; i >= 0; i--) {
      const value = cache[i][1];
      const action = value.func == this.remove ? 'Удалён(а)' : 'Добавлен(а)';
      console.log(
        `"${value.user.date} ${action} ${value.user.name} ${value.user.surname}"`
      );
    }
  };
}

const user = new Users();
user.add('Антон1', 'Беринг1');
user.add('Антон2', 'Беринг2');
user.usersLog();
user.remove(0);
console.log('-------');
user.usersLog();

console.log(user.cache);
user.getLog();
console.log('/////////'); // Если не добавлять юзеров
const user1 = new Users();
user1.usersLog();
user1.getLog();
user1.remove(1);
