// Кеширующая функция из learn js

function slow(x) {
  // здесь могут быть ресурсоёмкие вычисления
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // если кеш содержит такой x,
      return cache.get(x); // читаем из него результат
    }

    let result = func(x); // иначе, вызываем функцию

    cache.set(x, result); // и кешируем (запоминаем) результат
    return result;
  };
}

slow = cachingDecorator(slow);

console.log(slow(1)); // slow(1) кешируем
console.log('Again: ' + slow(1)); // возвращаем из кеша

console.log(slow(2)); // slow(2) кешируем
console.log('Again: ' + slow(2)); // возвращаем из кеша

function callDecrement(value = 0) {
  return --this.value + value;
}

const obj = {
  value: 1,
};

const obj2 = {
  value: 23,
};

console.log(callDecrement.call(obj, 3)); // 3
console.log(callDecrement.call(obj2)); // 22

// call принимает список аргументов
let wrapper = function (func) {
  return func.call(this, ...arguments);
};

// apply принимает псевдомассив аргументов
let wrapper2 = function (func) {
  return func.apply(this, arguments);
};

const objTest = {
  title: 'title',
};

function naming() {
  console.log(this.title, ...arguments);
}

const arr = [1, 2, 3];
naming.apply(objTest, ['1', '2']);
try {
  // Ошибка, ожидается псевдомассив, а закидывается итерируемый объект
  naming.apply(objTest, ...arr);
} catch (e) {
  console.error(e);
}

function work(a, b) {
  return a + b; // произвольная функция или метод
}

function spy(func) {
  spy.calls = [];
  function spy() {
    spy.calls.push([...arguments]);
    return func.apply(this, arguments);
  }
  return spy;
}

work = spy(work);

work(1, 2);
work(4, 5); // 9

console.log(work.calls);

for (let args of work.calls) {
  console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

////////////

function delay(func, ms) {
  return function (...args) {
    setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}

function f(x) {
  console.log(x);
}

// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

// f1000('test'); // показывает "test" после 1000 мс
// f1500('test'); // показывает "test" после 1500 мс

///////////

function debounce(func, ms) {
  let isEnd = true;
  return function () {
    if (isEnd) {
      isEnd = false;
      func.apply(this, arguments);
      setTimeout(() => {
        isEnd = true;
      }, ms);
    }
  };
}

function throttle(func, ms) {
  let isEnd = true;
  let lastArgs;
  return function timeout() {
    if (isEnd) {
      isEnd = false;
      func.apply(this, arguments);
      setTimeout(() => {
        isEnd = true;
        if (lastArgs) {
          timeout.apply(this, lastArgs);
          lastArgs = undefined;
        }
      }, ms);
    } else {
      lastArgs = arguments;
    }
  };
}

function f(a) {
  console.log(a);
}

let f10001 = throttle(f, 1000);

f10001(1); // показывает 1
setTimeout(function () {
  f10001(2);
}, 1e3);
setTimeout(function () {
  f10001(3);
}, 1e3);
// setTimeout(f10001(2), 2e3); // (ограничение, 1000 мс ещё нет)
// setTimeout(f10001(3), 4e3); // (ограничение, 1000 мс ещё нет)
