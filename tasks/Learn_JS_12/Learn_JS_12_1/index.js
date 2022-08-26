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

// основным методом генератора является next()
// при вызове он запускает выполнение кода до ближайшего yield
// возвращая значение

// результатом метода next всегда является объект с двумя свойствами

// value: значение из yield
// done: true если выполнение функции завершено, иначе false

let one = generator.next();

console.log(one); // {value: 1, done: false}

let two = generator.next();

console.log(two); // {value: 2, done: false}

let three = generator.next();

console.log(three); // {value: 3, done: true}

// попробуем дальше вызывать

let next = generator.next();

// послед вызовы будут undefined и done: true
console.log(next); // {value: undefined, done: true}

// оба синтаксиса одинаковы
function* foo() {}
function* foo2() {}

// генераторы входят в состав перебираемых объектов!!!

// не выводит 3!! игнорирует done: true
for (const item of generateSeq()) {
  console.log(item); // 1, 2
}

// фикс
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

for (const item of generateSequence()) {
  console.log(item); // 1, 2,3
}

// т.к. перебираемые объекты, можешь использовать spread

console.log([...generateSequence()]); // [1, 2, 3]

// можно создавать символы итераторы в виде генератора

let range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

console.log([...range]); // [1, 2, 3, 4, 5]

// генератор возвращает объект с методом next и объектом с done value, что и нужно для итерации
// можно генерировать бесконечно

// композиция генераторов (каво?)
// позволяет прозрачно встраивать генераторы друг в друга

function* generateSequence2(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

console.log([...generateSequence2(48, 57)]); // [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]

function* generatePassword() {
  yield* generateSequence2(48, 122);
}

let str = '';

for (let code of generatePassword()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z
