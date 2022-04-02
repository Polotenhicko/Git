// Задача Learn JS по созданию калькулятор через конструктор
function Calculator() {
  this.read = function () {
    this.firstNumber = 1;
    this.secondNumber = 3;
  };
  this.sum = function () {
    return this.firstNumber + this.secondNumber;
  };
  this.mul = function () {
    return this.firstNumber * this.secondNumber;
  };
}

let calculator = new Calculator();
calculator.read();

console.log('Sum=' + calculator.sum());
console.log('Mul=' + calculator.mul());
