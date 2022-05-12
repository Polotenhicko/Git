console.log('Задача Вариант №1');

function createCounter() {
  let value = 0;

  const Counter = function Counter() {
    this.increment = function increment() {
      value++;
    };

    this.decrement = function decrement() {
      value--;
    };

    this.getValue = function getValue() {
      return value;
    };
  };

  return new Counter();
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

// Вопросы:

// Значение по умолчанию было установлено на 'undefined'. Можно было выбрать любое другое значение, потому что логика разделена и основное сравнение идёт через поиск в Map

// Возможно само замыкание не даёт прямо изменять значение value. Других способов я не вижу, да и модификаторов доступа в коде нет.
