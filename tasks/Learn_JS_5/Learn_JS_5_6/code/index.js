function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}

function iterator(obj) {
  return {
    current: random(obj.from, obj.to),
    searchNumber: random(obj.from, obj.to),
    from: obj.from,
    to: obj.to,

    next() {
      if (this.current !== this.searchNumber) {
        console.log(`Ищем: ${this.searchNumber}`);
        return {
          done: false,
          value: (this.current = random(this.from, this.to)),
        };
      } else {
        console.log('Нашли!');
        return {
          done: true,
          value: this.current,
        };
      }
    },
  };
}

const obj = {
  from: 0,
  to: 500,

  [Symbol.iterator]() {
    return iterator(this);
  },
};

for (const iterator of obj) {
  console.log(iterator);
}

const obj2 = {
  from: 100,
  to: 200,
};

// obj2[Symbol.iterator] = iterator;

// for (const iterator of obj2) {
//   console.log(iterator);
// }
