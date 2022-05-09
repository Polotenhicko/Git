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
