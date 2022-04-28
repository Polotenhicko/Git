// Массив является итерируемым объектом
let arr = [1, 2, 3, 4];

// У него есть символ итератор

let iterator = arr[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value);
}

console.log(Array.isArray(arr)); // true

// Итерируемый объект не является массивом

const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

iterator = range[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // 1 2 3 4 5
}

console.log(Array.isArray(range)); // false
