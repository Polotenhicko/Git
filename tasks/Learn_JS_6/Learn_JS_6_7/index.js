let func = new Function('a', 'console.log(a)');
func('123'); // 123

let func11 = new Function('a,b', 'console.log(a,b)');
func11('123', 123); // 123 123

let func2 = new Function("console.log('функция')");
func2(); // 'функция

// Такие функции имеют внешние ссылки только на глобальное окружение
function getFunc() {
  let value = 'test';

  let func = new Function('console.log(value)');

  return func;
}

try {
  getFunc()(); // ошибка: value не определено
} catch (e) {
  console.error(e);
}

let test = 'test';

function testing() {
  test = 'newTest';
  let func3 = new Function('console.log(test)');
  func3();
}

testing();

let aboba2 = 'aboba';

// Забыл что функция меняет переменные
function aboba() {
  aboba2 = 'aboba aboba';
}

aboba();

console.log(aboba2);

let functestname = 11;

try {
  // Будет ошибка
  let functest = new Function(functestname, 'console.log(11)');
  functest(1);
} catch (e) {
  console.error(e);
}

let name = ['a', 'b', 'c'];
// Можно и массив
let funcName = new Function(name, 'console.log(a,b,c)');

funcName(1, 2, 3); // 1,2,3

name = Symbol('id');
try {
  // Попытается сконвертировать Symbol в string
  funcName = new Function(name, "console.log('test')");
} catch (e) {
  console.error(e);
}
