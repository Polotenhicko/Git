// написать метод для класса родителя с использованием Symbo.species

class MyArr extends Array {
  maxAndMinValue() {
    return new this.constructor[Symbol.species](Math.max(...this), Math.min(...this));
  }
}

class PowerMyArr extends MyArr {
  isEmpty() {
    return this.length === 0;
  }

  static get [Symbol.species]() {
    return MyArr;
  }
}

let arr = new PowerMyArr(1, 2, 3);

// MyArr
console.log(arr.maxAndMinValue()); // 3, 1
