// Создать конструктор для заказа в магазине в глобальный объект
// Объекты товаров находятся в специальном массиве

window.Cart = function Cart() {
  this.check = new Map();

  this.isLocked = false;

  this.addItem = function addItem(item, count) {
    if (!this.isLocked) {
      const countItem = this.check.get(item);
      count = count > 0 ? +count : 1;
      countItem > 0 && items.includes(item)
        ? this.check.set(item, countItem + count)
        : this.check.set(item, count);
    } else {
      console.error('Добавление заблокировано!');
    }
  };

  this.removeItem = function removeItem(item, count) {
    if (!this.isLocked) {
      const countItem = this.check.get(item);
      if (arguments[1] === undefined || count >= countItem) {
        this.check.delete(item);
      } else {
        if (isNaN(count)) {
          console.error('Убрать count только по цифрам!');
        } else {
          this.check.set(item, countItem - Math.abs(count));
        }
      }
    } else {
      console.error('Удаление заблокировано!');
    }
  };

  this.getCheck = function getCheck() {
    console.log('==========');
    console.group();
    console.log('Чек:');
    for (const [keyObj, count] of this.check) {
      if (count > 0 && items.includes(keyObj)) {
        console.group();
        console.log(`${keyObj.title} x${count} - ${keyObj.price * count}руб`);
        console.groupEnd();
      }
    }
    console.groupEnd();
    console.log('==========');
  };

  this.lockOrder = function lockOrder() {
    this.isLocked = true;
  };

  this.unlockOrder = function unlockOrder() {
    this.isLocked = false;
  };
};

const items = [
  {
    title: 'Пиво',
    price: 100,
  },
  {
    title: 'Яблоко',
    price: 10,
  },
  {
    title: 'Сосика',
    price: 25,
  },
];

const cart = new Cart();

// Добавлени/удаление
cart.addItem(items[0], 2); // count = 2
console.log(cart.check);

cart.addItem(items[0], 2); // count = 4
console.log(cart.check);

cart.removeItem(items[0], 1); // count = 3
console.log(cart.check);

cart.removeItem(items[0], '1'); // count = 2
console.log(cart.check);

cart.removeItem(items[0], 'адын'); // error!
console.log(cart.check); // count = 2

cart.removeItem(items[0]); // Удалит полностью item
console.log(cart.check); // size: 0

cart.lockOrder();
cart.addItem(items[1]); // Добавление заблокировано
cart.removeItem(items[1]); // Удаление заблокировано

cart.unlockOrder();
cart.addItem(items[1]);

console.log(cart.check); // Добавилось

cart.addItem(items[0], 4);
cart.addItem(items[1], 2);
cart.addItem(items[2], 10);

cart.getCheck();
