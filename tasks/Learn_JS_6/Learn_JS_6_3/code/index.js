console.log('Задача Вариант №1');
let value = 0;

function createCounter() {
  return {
    increment: function increment() {
      value++;
    },

    decrement: function decrement() {
      value--;
    },

    getValue: function getValue() {
      return value;
    },
  };
}

const count = createCounter();
console.log(count.getValue()); // 0

count.increment(); // 1
count.increment(); // 2
count.increment(); // 3
count.decrement(); // 2

console.log(count.getValue()); // 2

count.increment(); // 3
count.increment(); // 4
console.log(count.getValue()); // 4

count.decrement(); // 3
count.decrement(); // 2
count.decrement(); // 1
console.log(count.getValue()); // 1
