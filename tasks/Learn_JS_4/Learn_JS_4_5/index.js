// Задача Learn JS 4.5 по созданию калькулятор через конструктор
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

// Задача Learn JS 4.5 по созданию аккумулятора через конструктор

function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function () {
    //let getValue = +prompt('Введите число', 0);
    let getValue = 1;
    this.value += getValue;
  };
}

let accumulator = new Accumulator(1); // начальное значение 1

accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению

console.log(accumulator.value); // выведет сумму этих значений
