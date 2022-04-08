// Создание функции для преобразование числа в другие системы счисления

function toAnotherSystem(number, system) {
  if (isFinite(number) && isFinite(system) && system >= 2 && system <= 36) {
    return (+number).toString(+system).toUpperCase();
  } else {
    return NaN;
  }
}

console.log(toAnotherSystem(3, 2)); // 11
console.log(toAnotherSystem(10, 16)); // A
console.log(toAnotherSystem(10, 1)); // NaN
console.log(toAnotherSystem(10, 37)); // NaN
console.log(toAnotherSystem('10', '16')); // A
console.log(toAnotherSystem('10A', 16)); // NaN
console.log(toAnotherSystem('0b11', 10)); // 3

// Создание функции для нахождения суммы покупок

const car = {
  userId: 1234,
  purchases: [
    {
      id: 1,
      name: 'a1',
      price: '100$',
    },
    {
      id: 2,
      name: 'a2',
      price: '50.75$',
    },
  ],
  calcSum: function calcSum() {
    if (Array.isArray(this.purchases) && this.purchases.length > 0) {
      let sum = 0;
      for (const item of this.purchases) {
        const price = parseFloat(item.price);
        if (!Number.isNaN(price)) {
          sum += price;
          sum = Math.round(sum * 100) / 100;
        }
      }
      return sum;
    } else {
      return 0;
    }
  },
};

console.log(car.calcSum()); // 100 + 50.75 == 150.75

car.purchases[0].price = '0.1$';
car.purchases[1].price = '0.2$';
car.purchases.push({ price: '$0.3' });

console.log(car.calcSum()); // 0.1 + 0.2 = 0.3
