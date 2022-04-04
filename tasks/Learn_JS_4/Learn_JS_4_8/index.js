// Преобразование объектов в примитивы
// Создание конструкта

function Customer(name, purse) {
  if (typeof name == 'string' && name) {
    this.name = name;
  } else {
    this.name = 'Customer';
  }

  Number.isNaN(+purse) ? (this.purse = 0) : (this.purse = purse);

  this[Symbol.toPrimitive] = function (hint) {
    switch (hint) {
      case 'string':
        return this.name;
      case 'number':
        return this.purse;
      default:
        return undefined;
    }
  };
}

let customer = new Customer('Custom', 100);

console.log(`Имя покупателя ${customer}`);
console.log(`Баланс: ${+customer}`);
