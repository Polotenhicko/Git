console.log('Задача Вариант №2');
console.log('=====================');

function createCounter2(type = undefined) {
  let value = 0;

  const CounterBaseValue = function CounterBaseValue() {
    // Весь конструктор 2 задача
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
    this.CounterBaseValue = new CounterBaseValue(); // 2 задача

    this.increment = function increment() {
      value++;
      this.CounterBaseValue.doValue(); // 2 задача
    };

    this.decrement = function decrement() {
      value--;
      this.CounterBaseValue.doValue(); // 2 задача
    };

    this.getValue = function getValue() {
      return value;
    };
  };

  return new Counter();
}

// const count = createCounter();
