function createCounter(type = undefined) {
  let value = 0;

  const CounterBaseValue = function CounterBaseValue() {
    let value = 0;
    this.types = new Map([
      [
        'increment',
        function () {
          return value;
        },
      ],
      [
        'decrement',
        function () {
          return value ? -value : 0;
        },
      ],
    ]);

    this.changeType = function changeType(newType) {
      type = newType;
      value = 0;
    };

    this.doValue = function doValue() {
      if (this.types.has(type)) value++;
    };

    this.getValue = function getValue() {
      if (this.types.has(type)) return this.types.get(type)();
      return undefined;
    };
  };

  const Counter = function Counter() {
    this.CounterBaseValue = new CounterBaseValue();

    this.increment = function increment() {
      value++;
      this.CounterBaseValue.doValue();
    };

    this.decrement = function decrement() {
      value--;
      this.CounterBaseValue.doValue();
    };

    this.getValue = function getValue() {
      return value;
    };
  };

  return new Counter();
}

const count = createCounter();

count.increment(); // 1
count.increment(); // 2
count.increment(); // 3
count.decrement(); // 2

console.log(count.getValue()); // 2
console.log(count.CounterBaseValue.getValue()); // Не назначен тип undefined

count.CounterBaseValue.changeType('increment');
count.increment(); // 3
count.increment(); // 4
console.log(count.getValue()); // 4
console.log(count.CounterBaseValue.getValue()); // 2

count.CounterBaseValue.changeType('decrement');
console.log(count.CounterBaseValue.getValue()); // 0

count.decrement(); // 3
count.decrement(); // 2
count.decrement(); // 1
console.log(count.getValue()); // 1

console.log(count.CounterBaseValue.getValue()); // -3

// Вопросы:

// Значение по умолчанию было установлено на 'undefined'. Можно было выбрать любое другое значение, потому что логика разделена и основное сравнение идёт через поиск в Map

// Возможно само замыкание не даёт прямо изменять значение value. Других способов я не вижу, да и модификаторов доступа в коде нет.
