// встроенная функция eval позволяет выполнять строку кода

// let result = eval(code)

// пример

let code = "console.log('строка??')";

eval(code); // строка??

// строка может быть большой, содержать переводы строк, объявления функций и т.п.

// результатом eval будет результат выполнения последней инструкции

let value = eval('1+1');

console.log(value); // 2

value = eval('let i = 0; ++i;');

// 1, т.к. последняя иструкция возвращает 1
console.log(value); // 1

try {
  console.log(i); // ReferenceError: i is not defined
} catch (e) {
  console.error(e);
}

let a = 1;

function f() {
  let a = 2;
  // доступно лексическое окружение
  eval('console.log(a)');
}

f(); // 2

eval('a = 10');
// можно менять значения внешних переменных
console.log(a); // 10

// написано что подключается к внешнему лексическому окружению
// в данный момент к глобальному
// а в строгом режиме создаёт свой
// но у меня всё по пизде
eval('let asd = 123;');

try {
  // asd то и нет
  console.log(asd);
} catch (e) {
  console.error(e);
}

// eval is evil
// минификаторы не трогают переменные eval

// если код не использует внешние перменные, то лучше вызывать так:
// window.eval(...)
// в этом случае код выполняется в глобальной области видимости

let x = 1;

{
  let x = 5;
  // будет глобальная область видимости
  window.eval('console.log(x)'); // 1
}

// если нужны локальные переменные, то можно сделать new Function

let fun = new Function('a', 'console.log(a)');

fun(5); // 5

// создать типо калькулятор

// типо получаю от куда-то
let expression = '2+2*2';
result = eval(expression);

console.log(result); // 6

// можно попробовать через методы массивов и т.п.
