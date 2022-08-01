// написать метод для класса родителя с использованием Symbo.species

class MyArr extends Array {
  maxValue() {
    return new this.constructor(Math.max(...this));
  }
}

class PowerMyArr extends MyArr {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerMyArr(1, 2, 3);
