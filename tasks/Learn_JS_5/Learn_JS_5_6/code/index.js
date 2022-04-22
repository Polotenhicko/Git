function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}

const obj = {
  from: 0,
  to: 500,

  iterator() {
    return {
      current: random(this.from, this.to),
      searchNumber: random(this.from, this.to),
      from: this.from,
      to: this.to,

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
  },

  [Symbol.iterator]() {
    return this.iterator();
  },
};

for (const iterator of obj) {
  console.log(iterator);
}

// 2 метод

const obj2 = {
  from: 0,
  to: 500,

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

  [Symbol.iterator]() {
    this.current = random(this.from, this.to);
    this.searchNumber = random(this.from, this.to);
    return this;
  },
};

console.log('////////////////');

setTimeout(function () {
  for (const iterator of obj2) {
    console.log(iterator);
  }
  console.log('////////////////');
}, 3e3);

// 3 метод

setTimeout(function () {
  let iteratorSym = obj2[Symbol.iterator]();
  while (true) {
    let result = iteratorSym.next();
    if (result.done) break;
    console.log(result.value);
  }
}, 6e3);
