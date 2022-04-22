function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}

const obj = {
  from: 0,
  to: 500,

  iterator(obj) {
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
  },

  [Symbol.iterator]() {
    return this.iterator(this);
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
    this.current = random(obj.from, obj.to);
    this.searchNumber = random(obj.from, obj.to);
    return this;
  },
};

console.log('////////////////');

setInterval(function () {
  for (const iterator of obj2) {
    console.log(iterator);
  }
}, 3e3);
