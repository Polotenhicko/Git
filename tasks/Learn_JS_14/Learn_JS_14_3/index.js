// каррирование - продвинутая техника работы с функциями

// вот пример каррирование
// f(a, b, c) преобразование f(a)(b)(c)

// каррирование не вызывает функцию, он просто трансформирует её

// создадим вспомогательную функцию curry(f), которая каррирует функцию f с двумя аргументами.

function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)); // 3

// есть в lodash уже функция для каррирования

function sum(a, b) {
  return a + b;
}

curriedSum = _.curry(sum); // используем _.curry из lodash

console.log(curriedSum(1, 2)); // 3, можно вызывать как обычно
console.log(curriedSum(1)(2)); // 3, а можно частично

// пример из ирл
// есть функция логирования log(date, importance, message)

function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

log = _.curry(log);

log(new Date(), 'DEBUG', 'some debug'); // [23:30] [DEBUG] some debug
log(new Date())('DEBUG')('some debug'); // [23:30] [DEBUG] some debug

// давайте сделаем удобную функцию для логов с текущим временем
// теперь logNow - это функция log с фиксированным первым аргументом

let logNow = log(new Date());

logNow('INFO', 'message'); // [23:37] [INFO] message

// сделаем удобную функцию для именно отладочных логов

let debugNow = logNow('DEBUG');

debugNow('message'); // [16:49] [DEBUG] message

// создали частично применённую функцию

// продвинутая функция каррирования

function curryPro(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum3(a, b, c) {
  return a + b + c;
}

let curriedSumPro = curryPro(sum3);

console.log(curriedSumPro(1, 2, 3)); // 6
console.log(curriedSumPro(1)(2)(3)); // 6
console.log(curriedSumPro(1, 2)(3)); // 6

// как каррирование, но более продвинуто
