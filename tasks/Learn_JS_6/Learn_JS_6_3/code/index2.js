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

console.log(obj > obj); // true

// Без замыкания:
console.log('=============');

obj = {
  test: 1,
  toString() {
    return this.test ? this.test-- : this.test;
  },
};

console.log(obj > obj); // true

console.log('Опционально:');

obj = {
  returned: 1,
  isRotation: true,
  toString() {
    if (this.isRotation) {
      if (this.returned) {
        return this.returned--; // 1
      } else {
        this.isRotation = false;
        return this.returned++; // 0
      }
    } else {
      if (!this.returned) {
        this.isRotation = true;
        return ++this.returned; // 1
      } else {
        return --this.returned; // 0
      }
    }
  },
};

console.log(obj > obj); // true
console.log(obj > obj); // false
console.log(obj > obj); // true
console.log(obj > obj); // false
console.log(obj > obj); // true
