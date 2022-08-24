// обычные функции - 1 значение
// генераторы могут порождать (yield) множество значений

// функция-генератор
// function*

function* generateSeq() {
  yield 1;
  yield 2;
  return 3;
}

// когда вызван, то не выполняет свой код, вместо этого возвращает спец объект,
// "генератор" для управления её выполнением

// спец объект
let generator = generateSeq();
console.log(generator.toString()); // [object Generator]
