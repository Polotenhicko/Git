let title = 'Document';

console.log(title.toLowerCase()); // 'document'

console.log(typeof title); // string

console.log(String('title').toUpperCase()); // 'TITLE'

let text = new String(123);
console.log(String(text)); // '123'

let value = new Number(0);
console.log(!!value); // true

value = Number(0);
console.log(!!value); // false

text = String('aboba');
console.log(!!text); // false

// Добавление к примитивам новых свойств

value.test = 22;
value.doTest = function doIt() {
  console.log('do it');
};

console.log(value.test); // undefined, в строгом режиме будет ошибка

try {
  value.doTest();
} catch (er) {
  // Ошибка
  console.error(er);
}

text.test = 22;
text.doTest = function doIt() {
  console.log('do it');
};

console.log(text.test); // undefined, в строгом режиме будет ошибка
try {
  text.doTest();
} catch (er) {
  // Ошибка
  console.error(er);
}

// Добавление новых свойств к примитиву, как к объекту

let test = new String('test');

test.toDo = function sayHello() {
  console.log('hello!');
};
test.test = '123';

test.toDo(); // 'hello!'
console.log(test.test); // '123'

test = new Number(24);

test.toDo = function sayHello() {
  console.log('hello!');
};
test.test = '123';

test.toDo(); // 'hello!'
console.log(test.test); // '123'
