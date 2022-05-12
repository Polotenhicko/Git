console.log('//////////////');

let obj = {
  returning: (function () {
    let returned = 1;
    return function () {
      return returned--;
    };
  })(),
  toString() {
    let returned = this.returning();
    return returned ? returned-- : returned;
  },
};

console.log(obj > obj); // true

// Без замыкания:
console.log('=============');

obj = {
  returned: 1,
  toString() {
    return this.returned ? this.returned-- : this.returned;
  },
};

console.log(obj > obj); // true

console.log('Опционально:');

obj = {
  returned: 1,
  toString() {
    if (this.returned++ % 2 == 0) {
      return (this.returned - 1) % 4 == 0 ? 1 : 0;
    } else {
      return 1;
    }
  },
};

console.log(obj > obj); // true
console.log(obj > obj); // false
console.log(obj > obj); // true
console.log(obj > obj); // false
console.log(obj > obj); // true
