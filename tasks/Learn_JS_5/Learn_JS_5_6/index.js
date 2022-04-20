let range = {
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (const iterator of range) {
  console.log(iterator); // 1, 2, 3, 4, 5
}

console.log('Метод в объекте');

range = {
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

for (let num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

let arrayLike = {
  0: 1,
  1: 2,
  length: 2,
};

let arr = Array.from(arrayLike);
console.log(arr.pop()); // World

console.log(Array.from(arrayLike, (item) => item ** 2)); // 1, 4

let str = 'Hello';

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // выводит символы один за другим
}
