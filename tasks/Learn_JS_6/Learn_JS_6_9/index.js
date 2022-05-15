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
