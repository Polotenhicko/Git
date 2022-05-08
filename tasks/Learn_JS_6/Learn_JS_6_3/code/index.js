function createCounter(type = undefined) {
  let value = 0;

  const CounterBaseValue = function CounterBaseValue() {
    this.value = 0;

    this.changeType = function changeType(newType) {
      type = newType;
      this.value = 0;
    };

    this.doValue = function doValue() {
      this.value++;
    };

    this.getValue = function getValue() {
      if (type == 'increment') return this.value;
      if (type == 'decrement') return this.value ? -this.value : 0;
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
