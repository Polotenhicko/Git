try {
} catch (error) {
  // обработка ошибки
}

try {
  console.log('норм');
  console.log('норм2');
} catch (error) {
  // не дойдёт
  console.log('error');
}

console.log('-------');

try {
  console.log('до ошибки');
  test;
  console.log('после ошибки');
} catch (error) {
  // пойдёт сюда
  console.log('error');
}

// try catch работает сихнронно и не сможет отловить асинхронную ошибку
// сможет только так

setTimeout(() => {
  try {
    test;
  } catch (error) {
    console.log('error timeout');
  }
}, 1e3);

console.log('------');

// объект ошибки имеет 2 основных свойства
// name, имя ошибки, и message, текст
// бывает ещё stack - текущий стек вызова

try {
  aaaa;
} catch (error) {
  console.log(error.name); // ReferenceError
  console.log(error.message); // aaaa is not defined
  console.log(error.stack);
  // ReferenceError: aaaa is not defined
  // at index.js:43:3

  console.log(error);
  // ReferenceError: aaaa is not defined
  //   at index.js:43:3
}

console.log('------');

// в новых версиях браузера можно пропускать объект ошибки
try {
  //
} catch {
  //
}

// реальные случаи использования try/catch
// если json неверный, то выпадает ошибка

let json = '{неверный json}';

try {
  let user = JSON.parse(json);
  console.log(user);
} catch (error) {
  console.log(error);
  // можно что-то другое
  // SyntaxError: Unexpected token н in JSON at position 1
  //   at JSON.parse (<anonymous>)
  //   at index.js:71:19
}

// что если нам нужно сделать ошибку?
// оператор throw генерирует ошибку
// throw <объект ошибки>

// это может быть что угодно, число или строка, ну лучше чтобы был объект
// желалателно с полями name и message
// в js есть множество встроенных конструкторов для встроенных ошибок

let error = new Error('message');
error = new SyntaxError('message');
error = new ReferenceError('message');

// для встроенных ошибок свойство name - имя конструктора

console.log(new Error('Ошибка!').name); // Error
// SyntaxError: жесть (at index.js:96:13)
//     at index.js:96:13
console.log(new SyntaxError('жесть'));

json = '{ "age": 29 }';

try {
  let user = JSON.parse(json);

  if (!user.name) {
    // оператор throw
    throw new SyntaxError('Нет имени!');
  }
  console.log(user.name);
} catch (e) {
  console.log(`JSON Error: ${e.message}`); // JSON Error: Нет имени!
}

json = '{"age": 30}';

try {
  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError('Данные неполные');
  }

  console.log(user.name);
} catch (e) {
  if (e.name == 'SyntaxError') {
    console.log('JSON Error: ' + e.message);
  } else {
    // выкинет наружу и сломает скрипт
    throw e;
  }
}

function readData() {
  let json = "{'age': 30}";

  try {
    blbbbb; // ошибка
  } catch (e) {
    if (e.name != 'SyntaxError') {
      throw e; // выкидываем если не знаем как обработать
    }
  }
}

try {
  readData();
} catch (e) {
  console.log('Внешний catch поймал: ' + e);
}

// может содержать ещё одну секцию....finally
// выполнится после try, если не было ошибок
// выполнится после catch если ошибки были

console.log('-----------');

try {
  console.log('траим');
  error();
  console.log('ошибка');
} catch (e) {
  console.log('catch');
} finally {
  console.log('finally');
}
// траим
// catch
// finally

// пример с числами фибаначи

let num = 25;

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error('Должно быть целое неотрицательное число');
  }

  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (e) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

console.log(result || 'Ошибка');
console.log(`Выполнено за ` + diff);

// в случае, если будет -1, т.е. что вызовет ошибку, код всё равно сосчитает сколько прошло времени

// блок finally срабатывает при любом выходе из try...catch и от return тоже

function func() {
  try {
    return 1;
  } catch (error) {
    // ....
  } finally {
    console.log('finally');
  }
}

// будет finally, а потом 1
console.log(func());

// есть глобальный catch, но это не часть спецификации js

// можем присвоить функцию специальному свойству window.onerror
// которая будет вызвана в случае необработанной ошибки

// window.onerror = function (message, url, line, col, error) {
//
// };

// message - сообщение об ошибке
// url - url скрипта
// line, col - номера строки и столбца
// error - объект ошибки
