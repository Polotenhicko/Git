console.log('//////////////');

let obj = {
  test: (function () {
    let test = 1;
    return function () {
      return test--;
    };
  })(),
  toString() {
    let test = this.test();
    return test ? test-- : test;
  },
};

console.log(obj > obj);

// Без замыкания:
console.log('=============');

obj = {
  test: 1,
  toString() {
    return this.test ? this.test-- : this.test;
  },
};

console.log(obj > obj);
